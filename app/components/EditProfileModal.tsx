'use client';

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ProfileData {
  gender: string;
  birthYear: string;
  occupation: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
  initialData: ProfileData;
}

export default function EditProfileModal({ isOpen, onClose, onSave, initialData }: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>({
    gender: '',
    birthYear: '',
    occupation: ''
  });

  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  // Update form when modal opens with initial data
  useEffect(() => {
    if (isOpen) {
      setFormData({
        gender: initialData.gender || '',
        birthYear: initialData.birthYear || '',
        occupation: initialData.occupation || ''
      });
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Partial<ProfileData> = {};
    if (!formData.gender) newErrors.gender = 'Vui lòng chọn giới tính';
    if (!formData.birthYear) newErrors.birthYear = 'Vui lòng nhập năm sinh';
    if (!formData.occupation) newErrors.occupation = 'Vui lòng nhập nghề nghiệp';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Chỉnh sửa hồ sơ</h2>
          <p className="text-sm text-zinc-600">
            Cập nhật thông tin cá nhân của bạn
          </p>
        </div>

        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          {/* Giới tính */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'Nam' })}
                className={`flex-1 rounded-lg border-2 border-black px-4 py-3 text-sm font-bold transition-all ${formData.gender === 'Nam'
                    ? 'bg-blue-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white hover:bg-gray-50'
                  }`}
              >
                Nam
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'Nữ' })}
                className={`flex-1 rounded-lg border-2 border-black px-4 py-3 text-sm font-bold transition-all ${formData.gender === 'Nữ'
                    ? 'bg-blue-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white hover:bg-gray-50'
                  }`}
              >
                Nữ
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'Khác' })}
                className={`flex-1 rounded-lg border-2 border-black px-4 py-3 text-sm font-bold transition-all ${formData.gender === 'Khác'
                    ? 'bg-blue-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white hover:bg-gray-50'
                  }`}
              >
                Khác
              </button>
            </div>
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
          </div>

          {/* Năm sinh */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Năm sinh <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off" type="number"
              min="1950"
              max={new Date().getFullYear()}
              placeholder="1998"
              value={formData.birthYear}
              onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
              className="w-full rounded-lg border-2 border-black px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {errors.birthYear && <p className="mt-1 text-sm text-red-600">{errors.birthYear}</p>}
          </div>

          {/* Nghề nghiệp */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nghề nghiệp hiện tại <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off" type="text"
              placeholder="Software Engineer"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full rounded-lg border-2 border-black px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.occupation && <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary btn-click-sink text-base px-6 py-3 flex-1"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn-primary btn-click-sink text-base px-6 py-3 flex-1"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
