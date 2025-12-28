"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { useAuth } from "../../contexts/AuthContext";
import { Lightbulb, MapPin, DollarSign, Eye, Loader2 } from "lucide-react";

type RoommateType = "have-room" | "find-partner";

function CreateRoommateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const type = searchParams.get("type") as RoommateType | null;

  // Redirect if not authenticated or no type
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?returnUrl=/roommate");
    } else if (!type || (type !== "have-room" && type !== "find-partner")) {
      router.push("/roommate");
    }
  }, [isAuthenticated, type, router]);

  const [showPreferences, setShowPreferences] = useState(false);
  const [locationNegotiable, setLocationNegotiable] = useState(false);
  const [timeNegotiable, setTimeNegotiable] = useState(false);
  const [showStatusOther, setShowStatusOther] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form state - Basic Info
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [location, setLocation] = useState("");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [moveInTime, setMoveInTime] = useState("");
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  // Form state - Cost (for have-room only)
  const [costRent, setCostRent] = useState("");
  const [costDeposit, setCostDeposit] = useState("");
  const [costElectricity, setCostElectricity] = useState("");
  const [costWater, setCostWater] = useState("");
  const [costInternet, setCostInternet] = useState("");
  const [costService, setCostService] = useState("");
  const [costParking, setCostParking] = useState("");
  const [costManagement, setCostManagement] = useState("");
  const [costOther, setCostOther] = useState("");

  // Form state - Preferences
  const [prefGender, setPrefGender] = useState<string[]>([]);
  const [prefStatus, setPrefStatus] = useState<string[]>([]);
  const [prefStatusOther, setPrefStatusOther] = useState("");
  const [prefSchedule, setPrefSchedule] = useState<string[]>([]);
  const [prefCleanliness, setPrefCleanliness] = useState<string[]>([]);
  const [prefHabits, setPrefHabits] = useState<string[]>([]);
  const [prefPets, setPrefPets] = useState<string[]>([]);
  const [prefOther, setPrefOther] = useState("");

  if (!type) return null;

  const isHaveRoom = type === "have-room";

  // Validation - check if all required fields are filled
  // For have-room: requires costRent instead of budget/moveInTime
  // For find-partner: all fields required
  const isBasicInfoComplete = isHaveRoom
    ? (title.trim() !== "" &&
       introduction.trim() !== "" &&
       location.trim() !== "" &&
       propertyTypes.length > 0 &&
       costRent.trim() !== "")
    : (title.trim() !== "" &&
       introduction.trim() !== "" &&
       location.trim() !== "" &&
       propertyTypes.length > 0 &&
       budget.trim() !== "" &&
       moveInTime.trim() !== "");

  return (
    <div className="min-h-screen bg-white">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-xl border-2 border-black shadow-[var(--shadow-primary)] p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto flex items-center justify-center relative">
                {/* SVG Spinner then Checkmark Animation */}
                <svg className="w-20 h-20" viewBox="0 0 80 80">
                  {/* Background circle (light green fill) */}
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="#dcfce7"
                    stroke="none"
                  />
                  {/* Spinning loader circle - transforms into complete circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="226"
                    strokeDashoffset="170"
                    style={{
                      transformOrigin: 'center',
                      animation: 'spin 0.6s linear, completeCircle 0.3s ease-out 0.6s forwards',
                    }}
                  />
                  {/* Checkmark that draws after spinner completes */}
                  <path
                    d="M24 42 L35 53 L56 28"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="50"
                    strokeDashoffset="50"
                    style={{
                      animation: 'drawCheck 0.4s ease-out 0.9s forwards',
                    }}
                  />
                </svg>
                <style jsx>{`
                  @keyframes spin {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                  @keyframes completeCircle {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                  @keyframes drawCheck {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                `}</style>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Đăng tin thành công!</h2>
            <p className="text-zinc-600 mb-6">
              Bài đăng của bạn đã được tạo. Chúc bạn sớm tìm được bạn ở cùng ưng ý nhé!
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => router.push('/profile')}
                className="btn-secondary flex-1"
              >
                Về trang hồ sơ
              </button>
              <button
                onClick={() => {
                  const listings = JSON.parse(localStorage.getItem('roommate_listings') || '[]');
                  const lastListing = listings[listings.length - 1];
                  if (lastListing) {
                    router.push(`/listing/${lastListing.id}`);
                  }
                }}
                className="btn-primary flex-1"
              >
                Xem tin đăng
              </button>
            </div>
          </div>
        </div>
      )}

      <MainHeader />

      {/* Hero Section */}
      <section className="py-12 bg-blue-50 relative">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-bold mb-2">
            {isHaveRoom ? "Đăng tin tìm người ở cùng" : "Đăng tin tìm bạn cùng thuê"}
          </h1>
          <p className="text-zinc-600">
            {isHaveRoom
              ? "Bạn có phòng/căn hộ sẵn và muốn tìm người ở ghép"
              : "Bạn muốn tìm bạn trước, rồi cùng nhau đi thuê phòng"}
          </p>
        </div>
        {/* Blur gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white backdrop-blur-sm" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', maskImage: 'linear-gradient(to bottom, transparent, black)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)' }} />
      </section>

      {/* Form Section */}
      <section className="py-12 -mt-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Card - hide when showing preferences */}
              {!showPreferences && (
              <div className="card bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Thông tin cơ bản</h2>
                  {/* Dev: Auto-fill button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isHaveRoom) {
                        setTitle("Tìm bạn ở ghép căn hộ 2PN Vinhomes Grand Park Q9");
                        setIntroduction("Mình là nữ, 25 tuổi, làm văn phòng ở Quận 1. Thói quen sinh hoạt điều độ, thích gọn gàng sạch sẽ. Không hút thuốc, không nuôi thú cưng.");
                        setPropertyTypes(["apartment"]);
                        setLocation("Quận 9, Vinhomes Grand Park");
                        // Cost fields
                        setCostRent("3.500.000");
                        setCostDeposit("1 tháng tiền phòng");
                        setCostElectricity("3.500đ/kWh");
                        setCostWater("100.000đ/người");
                        setCostInternet("Chia đều");
                        setCostService("Bao gồm");
                        setCostParking("Miễn phí");
                        setCostManagement("Không có");
                      } else {
                        setTitle("Tìm bạn cùng thuê phòng khu Thảo Điền");
                        setIntroduction("Mình là nữ, 25 tuổi, làm văn phòng ở Quận 1. Thói quen sinh hoạt điều độ, thích gọn gàng sạch sẽ. Không hút thuốc, không nuôi thú cưng.");
                        setLocation("Quận 2, Thảo Điền, Bình Thạnh");
                        setPropertyTypes(["apartment", "service-apartment"]);
                        setBudget("4-5 triệu/tháng");
                        setMoveInTime("Trong tháng 1/2025");
                      }
                    }}
                    className="text-xs px-3 py-1 bg-yellow-200 border border-black rounded hover:bg-yellow-300"
                  >
                    Auto-fill (Dev)
                  </button>
                </div>
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Tiêu đề bài đăng
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={isHaveRoom ? "Tìm bạn ở ghép căn hộ 2PN Vinhomes" : "Tìm bạn cùng thuê phòng khu Thảo Điền"}
                      className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {showValidationMessage && title.trim() === "" && (
                      <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                    )}
                  </div>

                  {/* Introduction */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Giới thiệu chung bản thân
                    </label>
                    <textarea
                      rows={4}
                      value={introduction}
                      onChange={(e) => setIntroduction(e.target.value)}
                      placeholder="Mình là nữ, 25 tuổi, làm văn phòng. Thói quen sinh hoạt điều độ, thích gọn gàng sạch sẽ..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                    {showValidationMessage && introduction.trim() === "" && (
                      <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                    )}
                  </div>

                  {/* Property Type - show first for have-room */}
                  {isHaveRoom && (
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Loại hình hiện tại
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "apartment", label: "Chung cư" },
                        { value: "room", label: "Trọ" },
                        { value: "service-apartment", label: "Căn hộ dịch vụ" },
                        { value: "dormitory", label: "Ký túc xá" },
                        { value: "house", label: "Nhà riêng" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${propertyTypes.includes(option.value) ? 'bg-blue-100' : 'bg-white'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={propertyTypes.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPropertyTypes([...propertyTypes, option.value]);
                              } else {
                                setPropertyTypes(propertyTypes.filter(t => t !== option.value));
                              }
                            }}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {showValidationMessage && propertyTypes.length === 0 && (
                      <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                    )}
                  </div>
                  )}

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {isHaveRoom ? "Khu vực hiện tại" : "Khu vực mong muốn ở"}
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={isHaveRoom ? "Quận 2, Thảo Điền..." : "Quận 1, Quận 3, Bình Thạnh..."}
                      className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {showValidationMessage && location.trim() === "" && (
                      <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                    )}
                    {!isHaveRoom && (
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={locationNegotiable}
                        onChange={(e) => setLocationNegotiable(e.target.checked)}
                        className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-300 cursor-pointer"
                      />
                      <span className="text-sm text-zinc-600">Có thể thương lượng sau</span>
                    </label>
                    )}
                  </div>

                  {/* Cost Section - for have-room only */}
                  {isHaveRoom && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold">Chi phí</label>
                      <p className="text-sm text-zinc-500 italic mt-1">
                        Nếu không có bất kỳ phí nào trong các loại phí bên dưới, bạn hãy điền 0 thay vì bỏ trống để hệ thống có thể tính toán tốt nhất.
                      </p>
                    </div>

                    {/* Primary costs - 2 columns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Tiền phòng (VNĐ/tháng) *</label>
                        <input
                          type="text"
                          value={costRent}
                          onChange={(e) => setCostRent(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                        {showValidationMessage && costRent.trim() === "" && (
                          <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Tiền cọc</label>
                        <input
                          type="text"
                          value={costDeposit}
                          onChange={(e) => setCostDeposit(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                      </div>
                    </div>

                    {/* Utility costs - 2 columns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Tiền điện</label>
                        <input
                          type="text"
                          value={costElectricity}
                          onChange={(e) => setCostElectricity(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Tiền nước</label>
                        <input
                          type="text"
                          value={costWater}
                          onChange={(e) => setCostWater(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                      </div>
                    </div>

                    {/* Service costs - 2 columns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Phí Internet</label>
                        <input
                          type="text"
                          value={costInternet}
                          onChange={(e) => setCostInternet(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Phí dịch vụ</label>
                        <input
                          type="text"
                          value={costService}
                          onChange={(e) => setCostService(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                      </div>
                    </div>

                    {/* Additional costs - 2 columns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Phí gửi xe</label>
                        <input
                          type="text"
                          value={costParking}
                          onChange={(e) => setCostParking(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Phí quản lý</label>
                        <input
                          type="text"
                          value={costManagement}
                          onChange={(e) => setCostManagement(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        />
                      </div>
                    </div>

                    {/* Other costs - full width */}
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Các phí khác (nếu có)</label>
                      <input
                        type="text"
                        value={costOther}
                        onChange={(e) => setCostOther(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                      />
                    </div>
                  </div>
                  )}

                  {/* Property Type - for find-partner only */}
                  {!isHaveRoom && (
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Loại hình mong muốn ở
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "house", label: "Nhà mặt đất" },
                        { value: "room", label: "Trọ" },
                        { value: "apartment", label: "Chung cư" },
                        { value: "service-apartment", label: "Căn hộ dịch vụ" },
                        { value: "other", label: "Loại hình khác, thương lượng sau..." },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${propertyTypes.includes(option.value) ? 'bg-blue-100' : 'bg-white'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={propertyTypes.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPropertyTypes([...propertyTypes, option.value]);
                              } else {
                                setPropertyTypes(propertyTypes.filter(t => t !== option.value));
                              }
                            }}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {showValidationMessage && propertyTypes.length === 0 && (
                      <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                    )}
                  </div>
                  )}

                  {/* Budget - only for find-partner */}
                  {!isHaveRoom && (
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Ngân sách tối đa
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="5 triệu/tháng"
                      className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {showValidationMessage && budget.trim() === "" && (
                      <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                    )}
                  </div>
                  )}

                  {/* Move-in Time - only for find-partner */}
                  {!isHaveRoom && (
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Thời gian mong muốn tìm được phòng
                    </label>
                    <input
                      type="text"
                      value={moveInTime}
                      onChange={(e) => setMoveInTime(e.target.value)}
                      placeholder="Trong tháng 1/2025, Càng sớm càng tốt..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {showValidationMessage && moveInTime.trim() === "" && (
                      <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                    )}
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={timeNegotiable}
                        onChange={(e) => setTimeNegotiable(e.target.checked)}
                        className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-300 cursor-pointer"
                      />
                      <span className="text-sm text-zinc-600">Có thể thương lượng sau</span>
                    </label>
                  </div>
                  )}
                </div>

                {/* Continue Button - shows when preferences not visible */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (isBasicInfoComplete) {
                        // Auto-fill empty cost fields with "0" for have-room
                        if (isHaveRoom) {
                          if (costDeposit.trim() === "") setCostDeposit("0");
                          if (costElectricity.trim() === "") setCostElectricity("0");
                          if (costWater.trim() === "") setCostWater("0");
                          if (costInternet.trim() === "") setCostInternet("0");
                          if (costService.trim() === "") setCostService("0");
                          if (costParking.trim() === "") setCostParking("0");
                          if (costManagement.trim() === "") setCostManagement("0");
                          if (costOther.trim() === "") setCostOther("0");
                        }
                        setShowPreferences(true);
                      } else {
                        setShowValidationMessage(true);
                      }
                    }}
                    className={`w-full ${
                      isBasicInfoComplete
                        ? 'btn-primary'
                        : 'btn-start opacity-50'
                    }`}
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
              )}

              {/* Roommate Preferences Card - only show after clicking Continue */}
              {showPreferences && (
              <div className="card bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Mong muốn đối với bạn ở cùng</h2>
                  {/* Dev: Auto-fill button */}
                  <button
                    type="button"
                    onClick={() => {
                      setPrefGender(["female"]);
                      setPrefStatus(["working"]);
                      setPrefSchedule(["early"]);
                      setPrefCleanliness(["very-clean"]);
                      setPrefHabits(["no-smoke"]);
                      setPrefPets(["no-pet"]);
                      setPrefOther("Ưu tiên người cùng công ty hoặc làm việc gần");
                    }}
                    className="text-xs px-3 py-1 bg-yellow-200 border border-black rounded hover:bg-yellow-300"
                  >
                    Auto-fill (Dev)
                  </button>
                </div>
                <div className="space-y-6">
                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Giới tính</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "male", label: "Nam" },
                        { value: "female", label: "Nữ" },
                        { value: "any", label: "Không quan trọng" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${prefGender.includes(option.value) ? 'bg-blue-100' : 'bg-white'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={prefGender.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPrefGender([...prefGender, option.value]);
                              } else {
                                setPrefGender(prefGender.filter(v => v !== option.value));
                              }
                            }}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Tình trạng</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "student", label: "Sinh viên" },
                        { value: "working", label: "Đã đi làm" },
                        { value: "both", label: "Vừa học vừa làm" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${prefStatus.includes(option.value) ? 'bg-blue-100' : 'bg-white'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={prefStatus.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPrefStatus([...prefStatus, option.value]);
                              } else {
                                setPrefStatus(prefStatus.filter(v => v !== option.value));
                              }
                            }}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${showStatusOther ? 'bg-blue-100' : 'bg-white'}`}
                      >
                        <input
                          type="checkbox"
                          checked={showStatusOther}
                          onChange={(e) => setShowStatusOther(e.target.checked)}
                          className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                        />
                        <span className="text-sm">Khác</span>
                      </label>
                    </div>
                    {showStatusOther && (
                      <input
                        type="text"
                        value={prefStatusOther}
                        onChange={(e) => setPrefStatusOther(e.target.value)}
                        placeholder="Mô tả thêm về tình trạng..."
                        className="w-full mt-3 px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    )}
                  </div>

                  {/* Schedule */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Giờ giấc</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "early", label: "Ngủ sớm, dậy sớm" },
                        { value: "late", label: "Cú đêm" },
                        { value: "flexible", label: "Linh hoạt" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${prefSchedule.includes(option.value) ? 'bg-blue-100' : 'bg-white'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={prefSchedule.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPrefSchedule([...prefSchedule, option.value]);
                              } else {
                                setPrefSchedule(prefSchedule.filter(v => v !== option.value));
                              }
                            }}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Cleanliness */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Mức độ sạch sẽ</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "very-clean", label: "Rất sạch sẽ" },
                        { value: "normal", label: "Bình thường" },
                        { value: "relaxed", label: "Thoải mái" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${prefCleanliness.includes(option.value) ? 'bg-blue-100' : 'bg-white'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={prefCleanliness.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPrefCleanliness([...prefCleanliness, option.value]);
                              } else {
                                setPrefCleanliness(prefCleanliness.filter(v => v !== option.value));
                              }
                            }}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Habits */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Thói quen</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "no-smoke", label: "Không hút thuốc" },
                        { value: "no-alcohol", label: "Không uống rượu bia" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${prefHabits.includes(option.value) ? 'bg-blue-100' : 'bg-white'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={prefHabits.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPrefHabits([...prefHabits, option.value]);
                              } else {
                                setPrefHabits(prefHabits.filter(v => v !== option.value));
                              }
                            }}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pets */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Thú cưng</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "no-pet", label: "Không nuôi thú cưng" },
                        { value: "pet-ok", label: "Có thể nuôi thú cưng" },
                        { value: "any", label: "Không quan trọng" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors ${prefPets.includes(option.value) ? 'bg-blue-100' : 'bg-white'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={prefPets.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPrefPets([...prefPets, option.value]);
                              } else {
                                setPrefPets(prefPets.filter(v => v !== option.value));
                              }
                            }}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Other */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Khác</label>
                    <input
                      type="text"
                      value={prefOther}
                      onChange={(e) => setPrefOther(e.target.value)}
                      placeholder="Yêu cầu khác về người ở cùng..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
              )}

              {/* Submit Buttons - only show after preferences visible */}
              {showPreferences && (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn-secondary flex-1"
                >
                  Huỷ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Save to localStorage for testing
                    const listingData = {
                      id: `listing-${Date.now()}`,
                      type,
                      title,
                      introduction,
                      location,
                      locationNegotiable,
                      propertyTypes,
                      budget,
                      moveInTime,
                      timeNegotiable,
                      // Cost data (for have-room)
                      ...(isHaveRoom && {
                        costs: {
                          rent: costRent,
                          deposit: costDeposit,
                          electricity: costElectricity,
                          water: costWater,
                          internet: costInternet,
                          service: costService,
                          parking: costParking,
                          management: costManagement,
                          other: costOther,
                        },
                      }),
                      preferences: {
                        gender: prefGender,
                        status: prefStatus,
                        statusOther: prefStatusOther,
                        schedule: prefSchedule,
                        cleanliness: prefCleanliness,
                        habits: prefHabits,
                        pets: prefPets,
                        other: prefOther,
                      },
                      createdAt: new Date().toISOString(),
                      userId: user?.uid,
                    };

                    // Get existing listings or create new array
                    const existingListings = JSON.parse(localStorage.getItem('roommate_listings') || '[]');
                    existingListings.push(listingData);
                    localStorage.setItem('roommate_listings', JSON.stringify(existingListings));

                    setShowSuccessModal(true);
                  }}
                  className="btn-primary flex-1"
                >
                  Đăng tin
                </button>
              </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tips & Checklist */}
              <div className="card bg-yellow-50 !p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-bold">Mẹo & Checklist</h3>
                </div>
                {isHaveRoom ? (
                  <>
                    <ul className="space-y-2 text-sm text-zinc-600 mb-4">
                      <li>• Viết tiêu đề rõ ràng, đầy đủ thông tin</li>
                      <li>• Mô tả chi tiết về phòng và yêu cầu</li>
                      <li>• Đăng giá hợp lý với thị trường</li>
                      <li>• Cập nhật thông tin liên hệ chính xác</li>
                    </ul>
                    <div className="border-t border-yellow-200 pt-3">
                      <p className="text-xs font-semibold text-zinc-500 mb-2">CHUẨN BỊ SẴN:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-yellow-600" />
                          <span>Địa chỉ chính xác</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-yellow-600" />
                          <span>Giá thuê & chi phí phát sinh</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-yellow-600" />
                          <span>Ảnh phòng (sắp có)</span>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <ul className="space-y-2 text-sm text-zinc-600 mb-4">
                      <li>• Giới thiệu bản thân chân thật, dễ gần</li>
                      <li>• Nêu rõ khu vực và loại hình mong muốn</li>
                      <li>• Mô tả thói quen sinh hoạt của bạn</li>
                      <li>• Đưa ra yêu cầu về bạn ở cùng hợp lý</li>
                    </ul>
                    <div className="border-t border-yellow-200 pt-3">
                      <p className="text-xs font-semibold text-zinc-500 mb-2">NÊN CÓ:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-yellow-600" />
                          <span>Khu vực mong muốn rõ ràng</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-yellow-600" />
                          <span>Ngân sách dự kiến</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-yellow-600" />
                          <span>Thời gian dự kiến chuyển vào</span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}

export default function CreateRoommatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    }>
      <CreateRoommateContent />
    </Suspense>
  );
}
