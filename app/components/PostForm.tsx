"use client";

import { useState } from "react";

interface PostFormProps {
  formTitle: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  onClose: () => void;
}

export default function PostForm({
  formTitle,
  titlePlaceholder,
  descriptionPlaceholder,
  onClose,
}: PostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    moveInDate: "",
    description: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
    // Reset form
    setFormData({
      title: "",
      price: "",
      location: "",
      moveInDate: "",
      description: "",
      phone: "",
    });
  };

  return (
    <div className="mb-16 rounded-xl border-2 border-black bg-white p-10 shadow-[var(--shadow-primary)]">
      <h2 className="mb-8 text-3xl font-bold">{formTitle}</h2>
      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="mb-3 block text-sm font-bold">Tiêu đề *</label>
          <input
            autoComplete="off" type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder={titlePlaceholder}
            className="w-full rounded-lg border-2 border-black p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-sm font-bold">
              Giá thuê/tháng *
            </label>
            <input
              autoComplete="off" type="text"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="4.5tr"
              className="w-full rounded-lg border-2 border-black p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-bold">Khu vực *</label>
            <input
              autoComplete="off" type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Q1, gần Lê Lợi"
              className="w-full rounded-lg border-2 border-black p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-sm font-bold">
              Ngày dọn vào *
            </label>
            <input
              autoComplete="off" type="text"
              required
              value={formData.moveInDate}
              onChange={(e) =>
                setFormData({ ...formData, moveInDate: e.target.value })
              }
              placeholder="01/12/2024"
              className="w-full rounded-lg border-2 border-black p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-bold">
              Số điện thoại *
            </label>
            <input
              autoComplete="off" type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="0901 234 567"
              className="w-full rounded-lg border-2 border-black p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-bold">Mô tả *</label>
          <textarea
            autoComplete="off" required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder={descriptionPlaceholder}
            rows={6}
            className="w-full rounded-lg border-2 border-black p-4 text-sm font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn-primary flex-1">
            Đăng tin
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
