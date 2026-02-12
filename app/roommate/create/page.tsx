"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { useAuth } from "../../contexts/AuthContext";
import { Lightbulb, MapPin, DollarSign, Eye, Loader2, NotebookPen } from "lucide-react";
import { cities, getDistrictsByLabel } from "../../data/locations";

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

  // Handle steps via URL params for browser back button support
  const step = searchParams.get("step");

  useEffect(() => {
    if (step === "2") {
      setShowAmenities(true);
      setShowPreferences(false);
      setShowContactInfo(false);
    } else if (step === "3") {
      setShowAmenities(false);
      setShowPreferences(true);
      setShowContactInfo(false);
    } else if (step === "4") {
      setShowAmenities(false);
      setShowPreferences(false);
      setShowContactInfo(true);
    } else {
      // Default step 1
      setShowAmenities(false);
      setShowPreferences(false);
      setShowContactInfo(false);
    }
  }, [step]);

  const [showPreferences, setShowPreferences] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false); // NEW STEP
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [locationNegotiable, setLocationNegotiable] = useState(false);
  const [timeNegotiable, setTimeNegotiable] = useState(false);
  const [showStatusOther, setShowStatusOther] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Draft Modal State
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);

  // Form state - Basic Info
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [addressOther, setAddressOther] = useState("");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [moveInTime, setMoveInTime] = useState("");
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [showPreferencesValidation, setShowPreferencesValidation] = useState(false);
  const [showImagesValidation, setShowImagesValidation] = useState(false);

  // Form state - Room Details (for have-room only)
  const [roomSize, setRoomSize] = useState("");
  const [currentOccupants, setCurrentOccupants] = useState("");
  const [minContractDuration, setMinContractDuration] = useState("");


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
  const [prefMoveInTime, setPrefMoveInTime] = useState<string[]>([]);
  const [prefOther, setPrefOther] = useState("");

  // Form state - Contact Info
  const [contactPhone, setContactPhone] = useState("");
  const [contactZalo, setContactZalo] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);

  // Sync Zalo with Phone when checkbox is checked
  useEffect(() => {
    if (sameAsPhone) {
      setContactZalo(contactPhone);
    }
  }, [sameAsPhone, contactPhone]);
  const [contactFacebook, setContactFacebook] = useState("");
  const [contactInstagram, setContactInstagram] = useState("");

  // Form state - Images & Amenities
  const [images, setImages] = useState<string[]>([]); // Base64 preview
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenitiesOther, setAmenitiesOther] = useState("");

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('roommate_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // Only load if matching type
        if (draft.type === type) {
          setDraftData(draft);
          setShowDraftModal(true);
        }
      } catch {
        // Invalid draft, ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleRestoreDraft = () => {
    if (!draftData) return;

    setTitle(draftData.title || "");
    setIntroduction(draftData.introduction || "");
    setCity(draftData.city || "");
    setDistrict(draftData.district || "");
    setSpecificAddress(draftData.specificAddress || "");
    setBuildingName(draftData.buildingName || "");
    setLocationNegotiable(draftData.locationNegotiable || false);
    setPropertyTypes(draftData.propertyTypes || []);
    setBudget(draftData.budget || "");
    setMoveInTime(draftData.moveInTime || "");
    setTimeNegotiable(draftData.timeNegotiable || false);
    setImages(draftData.images || []);
    setAmenities(draftData.amenities || []);
    setAmenitiesOther(draftData.amenitiesOther || "");
    setRoomSize(draftData.roomSize || "");
    setCurrentOccupants(draftData.currentOccupants || "");
    setMinContractDuration(draftData.minContractDuration || "");
    setCostRent(draftData.costRent || "");
    setCostDeposit(draftData.costDeposit || "");
    setCostElectricity(draftData.costElectricity || "");
    setCostWater(draftData.costWater || "");
    setCostInternet(draftData.costInternet || "");
    setCostService(draftData.costService || "");
    setCostParking(draftData.costParking || "");
    setCostManagement(draftData.costManagement || "");
    setCostOther(draftData.costOther || "");
    setPrefGender(draftData.prefGender || []);
    setPrefStatus(draftData.prefStatus || []);
    setPrefStatusOther(draftData.prefStatusOther || "");
    setPrefSchedule(draftData.prefSchedule || []);
    setPrefCleanliness(draftData.prefCleanliness || []);
    setPrefHabits(draftData.prefHabits || []);
    setPrefPets(draftData.prefPets || []);
    setPrefMoveInTime(draftData.prefMoveInTime || []);
    setPrefOther(draftData.prefOther || "");
    setContactPhone(draftData.contactPhone || "");
    setContactZalo(draftData.contactZalo || "");
    setSameAsPhone(draftData.sameAsPhone || false);
    setContactFacebook(draftData.contactFacebook || "");
    setContactInstagram(draftData.contactInstagram || "");

    setShowDraftModal(false);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem('roommate_draft');
    setDraftData(null);
    setShowDraftModal(false);
  };

  if (!type) return null;

  const isHaveRoom = type === "have-room";

  // Validation - check if all required fields are filled
  // For have-room: requires costRent instead of budget/moveInTime
  // For find-partner: all fields required
  const isBasicInfoComplete = isHaveRoom
    ? (title.trim() !== "" &&
      introduction.trim() !== "" &&
      city.trim() !== "" && district.trim() !== "" &&
      propertyTypes.length > 0 &&
      costRent.trim() !== "")
    : (title.trim() !== "" &&
      introduction.trim() !== "" &&
      city.trim() !== "" && district.trim() !== "" &&
      propertyTypes.length > 0 &&
      budget.trim() !== "" &&
      moveInTime.trim() !== "");

  // Check if all required preferences are filled
  const arePreferencesComplete =
    prefGender.length > 0 &&
    prefStatus.length > 0 &&
    prefSchedule.length > 0 &&
    prefCleanliness.length > 0 &&
    prefHabits.length > 0 &&
    prefPets.length > 0 &&
    prefMoveInTime.length > 0;

  // Calculate progress percentage
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    let rawPercent = 0;

    // Progress milestones based on type:
    // have-room: Step 1 (0->33%) → Step 2 (33->66%) → Step 3 (66->100%)
    // find-partner: Step 1 (0->50%) → Step 3 (50->100%) [skip step 2]

    if (!showAmenities && !showPreferences) {
      // --- STEP 1: Basic Info ---
      // have-room: Target 33% | find-partner: Target 50%

      let step1Total = 4; // title, introduction, location, propertyTypes
      if (isHaveRoom) {
        step1Total += 1; // costRent
      } else {
        step1Total += 2; // budget, moveInTime
      }

      let step1Filled = 0;
      if (title.trim()) step1Filled++;
      if (introduction.trim()) step1Filled++;
      if (city.trim() && district.trim() && specificAddress.trim()) step1Filled++;
      if (propertyTypes.length > 0) step1Filled++;

      if (isHaveRoom) {
        if (costRent.trim()) step1Filled++;
      } else {
        if (budget.trim()) step1Filled++;
        if (moveInTime.trim()) step1Filled++;
      }

      const step1Progress = (step1Filled / step1Total);
      const step1End = isHaveRoom ? 33 : 50;
      rawPercent = 3 + (step1Progress * (step1End - 3));

    } else if (showAmenities && !showPreferences) {
      // --- STEP 2: Details (only for have-room) ---
      // Range: 33% -> 66%

      let step2Total = 1; // images (mandatory)
      step2Total += 1; // amenities

      if (isHaveRoom) {
        step2Total += 3; // roomSize, currentOccupants, minContractDuration
      }

      let step2Filled = 0;
      if (images.length > 0) step2Filled++;
      if (amenities.length > 0) step2Filled++;

      if (isHaveRoom) {
        if (roomSize.trim()) step2Filled++;
        if (currentOccupants.trim()) step2Filled++;
        if (minContractDuration.trim()) step2Filled++;
      }

      const step2Progress = (step2Filled / step2Total);
      rawPercent = 33 + (step2Progress * (66 - 33));

    } else if (showPreferences) {
      // --- STEP 3: Preferences ---
      // have-room: 66% -> 100% | find-partner: 50% -> 100%

      let step3Total = 7;
      let step3Filled = 0;
      if (prefGender.length > 0) step3Filled++;
      if (prefStatus.length > 0) step3Filled++;
      if (prefSchedule.length > 0) step3Filled++;
      if (prefCleanliness.length > 0) step3Filled++;
      if (prefHabits.length > 0) step3Filled++;
      if (prefPets.length > 0) step3Filled++;
      if (prefMoveInTime.length > 0) step3Filled++;

      const step3Progress = (step3Filled / step3Total);
      const step3Start = isHaveRoom ? 66 : 50;
      rawPercent = step3Start + (step3Progress * (100 - step3Start));
    }

    setProgressPercentage(rawPercent);

  }, [
    // Dependencies
    isHaveRoom, showAmenities, showPreferences,
    title, introduction, city, district, specificAddress, buildingName, addressOther, propertyTypes, costRent, budget, moveInTime,
    roomSize, currentOccupants, minContractDuration, images, amenities,
    prefGender, prefStatus, prefSchedule, prefCleanliness, prefHabits, prefPets, prefMoveInTime
  ]);

  // Dev auto-fill - fills ALL fields across ALL steps
  const autoFill = () => {
    if (isHaveRoom) {
      // Step 1
      setTitle("Tìm bạn ở ghép căn hộ 2PN Vinhomes Grand Park Q9");
      setIntroduction("Mình là nữ, 25 tuổi, đang làm văn phòng ở Quận 1. Sinh hoạt điều độ, thích gọn gàng sạch sẽ. Không hút thuốc, không nuôi thú cưng. Cuối tuần hay nấu ăn và đọc sách.");
      setPropertyTypes(["apartment"]);
      setCity("Hồ Chí Minh");
      setDistrict("Quận 9");
      setSpecificAddress("Vinhomes Grand Park, Nguyễn Xiển, P. Long Thạnh Mỹ");
      setBuildingName("Tháp S3.02 - Tầng 12");
      setRoomSize("20");
      setCurrentOccupants("1");
      setMinContractDuration("6 tháng");
      // Step 2
      setCostRent("3.500.000");
      setCostDeposit("1 tháng tiền phòng");
      setCostElectricity("3.500đ/kWh");
      setCostWater("100.000đ/người");
      setCostInternet("Wifi miễn phí (đã bao gồm)");
      setCostService("Bao gồm trong phí quản lý");
      setCostParking("Xe máy miễn phí");
      setCostManagement("8.000đ/m²");
      setCostOther("Dọn vệ sinh chung 2 lần/tuần");
      // Amenities
      setAmenities(["ac", "wifi", "washing", "fridge", "kitchen", "parking", "security", "furnished"]);
    } else {
      // find-partner
      setTitle("Tìm bạn cùng thuê căn hộ khu Thảo Điền - Q2");
      setIntroduction("Mình là nữ, 24 tuổi, làm marketing ở Quận 1. Thích nấu ăn, sạch sẽ gọn gàng. Không hút thuốc, thích nuôi mèo. Đang tìm bạn nữ cùng thuê căn hộ 2PN để chia sẻ chi phí.");
      setCity("Hồ Chí Minh");
      setDistrict("Quận 2 (Thủ Đức)");
      setSpecificAddress("Khu vực Thảo Điền hoặc lân cận");
      setPropertyTypes(["apartment", "service-apartment"]);
      setBudget("4-5 triệu/người/tháng");
      setMoveInTime("Đầu tháng 3/2026");
    }
    // Step 3 - Preferences (shared)
    setPrefGender(["female"]);
    setPrefStatus(["working"]);
    setPrefSchedule(["early"]);
    setPrefCleanliness(["very-clean"]);
    setPrefHabits(["no-smoke"]);
    setPrefPets(["no-pet"]);
    setPrefMoveInTime(["asap"]);
    setPrefOther("Ưu tiên bạn đi làm giờ hành chính, không mang bạn về khuya.");
    // Step 4 - Contact
    setContactPhone("0909123456");
    setContactZalo("0909123456");
    setSameAsPhone(true);
    setContactFacebook("facebook.com/linh.tran");
    setContactInstagram("@linh.tran");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dev Auto-Fill Button */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={autoFill}
          className="fixed bottom-6 right-6 z-50 bg-blue-400 text-black px-4 py-2 rounded-full shadow-lg hover:bg-blue-500 transition-colors text-sm font-bold flex items-center gap-2 border-2 border-black"
          title="Auto-fill all fields with sample data"
        >
          🤖 Auto Fill
        </button>
      )}
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
                    router.push(`/roommate/listing/${lastListing.id}`);
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
            {isHaveRoom ? "Đăng tin tìm người ở ghép cùng" : "Đăng tin tìm bạn cùng thuê"}
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
              {/* Basic Info Card - hide when showing other steps */}
              {!showAmenities && !showPreferences && !showContactInfo && (
                <div className="card bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Thông tin cơ bản</h2>
                  </div>
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
                        Tiêu đề bài đăng
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                          if (e.target.value.length <= 80) {
                            setTitle(e.target.value);
                          }
                        }}
                        maxLength={80}
                        placeholder="Nhập tối đa 80 ký tự"
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {showValidationMessage && title.trim() === "" && (
                        <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                      )}
                    </div>


                    {/* Property Type - show before Address for have-room */}
                    {isHaveRoom && (
                      <div className="mb-6">
                        <label className="block text-sm font-bold mb-2 text-blue-600">
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
                              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                            >
                              <input
                                type="radio"
                                name="propertyType"
                                value={option.value}
                                checked={propertyTypes.includes(option.value)}
                                onClick={(e) => {
                                  // Allow untick by clicking again
                                  if (propertyTypes.includes((e.target as HTMLInputElement).value)) {
                                    e.preventDefault();
                                    setPropertyTypes([]);
                                  }
                                }}
                                onChange={(e) => {
                                  setPropertyTypes([e.target.value]);
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

                    {/* Location - moved before Introduction for have-room */}
                    {isHaveRoom && (
                      <div>
                        <label className="block text-sm font-bold mb-2 text-blue-600">
                          Địa chỉ
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* City */}
                          <div>
                            <select
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                                setDistrict(""); // Reset district when city changes
                              }}
                              className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            >
                              <option value="">Chọn thành phố</option>
                              {cities.map((c) => (
                                <option key={c.value} value={c.label}>
                                  {c.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* District */}
                          <div>
                            <select
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                              disabled={!city}
                              className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white disabled:bg-zinc-100 disabled:cursor-not-allowed"
                            >
                              <option value="">{city ? "Chọn quận/huyện" : "Chọn thành phố trước"}</option>
                              {city && getDistrictsByLabel(city).map((d) => (
                                <option key={d.value} value={d.label}>
                                  {d.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* Specific Address */}
                          <div>
                            <input
                              type="text"
                              value={specificAddress}
                              onChange={(e) => setSpecificAddress(e.target.value)}
                              placeholder="Số nhà - Tên đường"
                              className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                          {/* Building Name */}
                          <div>
                            <input
                              type="text"
                              value={buildingName}
                              onChange={(e) => setBuildingName(e.target.value)}
                              placeholder="Tên toà nhà - Tên chung cư - Block"
                              className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                          {/* Other Address Info */}
                          <div className="col-span-2">
                            <input
                              type="text"
                              value={addressOther}
                              onChange={(e) => setAddressOther(e.target.value)}
                              placeholder="Nếu bạn còn gì khác thì nhập ở đây nhé!"
                              maxLength={50}
                              className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </div>
                        {showValidationMessage && (city.trim() === "" || district.trim() === "") && (
                          <p className="text-sm text-pink-500 mt-1">Vui lòng điền đầy đủ địa chỉ ^^</p>
                        )}
                      </div>
                    )}


                    {/* Property Type - show before Introduction for have-room */}


                    {/* Introduction */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
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


                    {/* Location - for find-partner only (have-room location is above) */}
                    {!isHaveRoom && (
                      <div>
                        <label className="block text-sm font-bold mb-2 text-blue-600">
                          Khu vực mong muốn ở
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* City */}
                          <div>
                            <select
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                                setDistrict(""); // Reset district when city changes
                              }}
                              className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            >
                              <option value="">Chọn thành phố</option>
                              {cities.map((c) => (
                                <option key={c.value} value={c.label}>
                                  {c.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* District */}
                          <div>
                            <select
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                              disabled={!city}
                              className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white disabled:bg-zinc-100 disabled:cursor-not-allowed"
                            >
                              <option value="">{city ? "Chọn quận/huyện" : "Chọn thành phố trước"}</option>
                              {city && getDistrictsByLabel(city).map((d) => (
                                <option key={d.value} value={d.label}>
                                  {d.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* Other Address Info */}
                          <div className="col-span-2">
                            <input
                              type="text"
                              value={addressOther}
                              onChange={(e) => setAddressOther(e.target.value)}
                              placeholder="Nếu bạn còn gì khác thì nhập ở đây nhé!"
                              maxLength={50}
                              className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </div>
                        {showValidationMessage && (city.trim() === "" || district.trim() === "") && (
                          <p className="text-sm text-pink-500 mt-1">Vui lòng điền đầy đủ khu vực ^^</p>
                        )}
                        <label className="flex items-center gap-2 mt-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={locationNegotiable}
                            onChange={(e) => setLocationNegotiable(e.target.checked)}
                            className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-300 cursor-pointer"
                          />
                          <span className="text-sm text-zinc-600">Có thể thương lượng sau</span>
                        </label>
                      </div>
                    )}

                    {/* Cost Section - for have-room only - SIMPLIFIED */}
                    {isHaveRoom && (
                      <div>
                        <label className="block text-sm font-bold text-blue-600">
                          Chi phí tổng tất cả các loại phí hàng tháng
                        </label>
                        <p className="text-sm text-zinc-500 italic mt-1 mb-2">
                          Để dễ dàng nhất cho việc xác định ngân sách của bạn ở cùng, hãy điền chi phí sau khi đã tính hết tất cả nhé. Bạn có thể bàn lại với bạn ở cùng về các khoản nhỏ bên trong nó.
                        </p>
                        <input
                          type="text"
                          value={costRent}
                          onChange={(e) => setCostRent(e.target.value)}
                          placeholder="Ví dụ: 5 triệu/tháng"
                          className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {showValidationMessage && costRent.trim() === "" && (
                          <p className="text-sm text-pink-500 mt-1">Bạn quên chỗ này nè ^^</p>
                        )}
                        <p className="text-xs text-zinc-500 italic mt-2">
                          Tổng chi phí bao gồm tất cả các loại phí: tiền phòng, điện, nước, internet, phí dịch vụ, phí quản lý...
                        </p>
                      </div>
                    )}



                    {/* Property Type - for find-partner only */}
                    {!isHaveRoom && (
                      <div>
                        <label className="block text-sm font-bold mb-2 text-blue-600">
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
                              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                            >
                              <input
                                type="radio"
                                name="propertyType"
                                value={option.value}
                                checked={propertyTypes.includes(option.value)}
                                onClick={(e) => {
                                  if (propertyTypes.includes((e.target as HTMLInputElement).value)) {
                                    e.preventDefault();
                                    setPropertyTypes([]);
                                  }
                                }}
                                onChange={(e) => {
                                  setPropertyTypes([e.target.value]);
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
                        <label className="block text-sm font-bold mb-2 text-blue-600">
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
                        <label className="block text-sm font-bold mb-2 text-blue-600">
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
                            // Skip step 2 (images & amenities) for find-partner
                            router.push(`/roommate/create?type=${type}&step=${isHaveRoom ? '2' : '3'}`);
                          } else {
                            setShowValidationMessage(true);
                          }
                        }}
                        className={`flex-1 ${isBasicInfoComplete
                          ? 'btn-primary'
                          : 'btn-start opacity-50'
                          }`}
                      >
                        Tiếp tục
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Upload Images & Amenities */}
              {showAmenities && !showPreferences && !showContactInfo && (
                <div className="card bg-white">
                  <h2 className="text-xl font-bold mb-6">Hình ảnh & Tiện nghi</h2>

                  <div className="space-y-6">
                    {/* Room Details - for have-room only */}
                    {isHaveRoom && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Room Size */}
                        <div>
                          <label className="block text-sm font-bold mb-2 text-blue-600">
                            Diện tích (m²)
                          </label>
                          <input
                            type="text"
                            value={roomSize}
                            onChange={(e) => setRoomSize(e.target.value)}
                            placeholder="Ví dụ: 20"
                            className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                          />
                        </div>

                        {/* Current Occupants */}
                        <div>
                          <label className="block text-sm font-bold mb-2 text-blue-600">
                            Số người đang ở
                          </label>
                          <select
                            value={currentOccupants}
                            onChange={(e) => setCurrentOccupants(e.target.value)}
                            className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white appearance-none"
                          >
                            <option value="">Chọn...</option>
                            <option value="1">1 người</option>
                            <option value="2">2 người</option>
                            <option value="3">3 người</option>
                            <option value="4+">4 người trở lên</option>
                          </select>
                        </div>

                        {/* Min Contract Duration */}
                        <div>
                          <label className="block text-sm font-bold mb-2 text-blue-600">
                            Thời hạn hợp đồng còn lại
                          </label>
                          <select
                            value={minContractDuration}
                            onChange={(e) => setMinContractDuration(e.target.value)}
                            className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white appearance-none"
                          >
                            <option value="">Chọn...</option>
                            <option value="1 tháng">1 tháng</option>
                            <option value="3 tháng">3 tháng</option>
                            <option value="6 tháng">6 tháng</option>
                            <option value="1 năm">1 năm</option>
                            <option value="Linh hoạt">Linh hoạt</option>
                          </select>
                        </div>
                      </div>
                    )}
                    {/* Upload Images */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
                        Hình ảnh phòng/nhà (Tối đa 5 ảnh)
                      </label>
                      <div className="space-y-3">
                        {/* Image Preview */}
                        {images.length > 0 && (
                          <div className="grid grid-cols-3 gap-3">
                            {images.map((img, idx) => (
                              <div key={idx} className="relative group">
                                <img
                                  src={img}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border-2 border-black"
                                />
                                <button
                                  type="button"
                                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Upload Button */}
                        {images.length < 5 && (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-black rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                              <p className="text-sm text-zinc-500">
                                Click để chọn ảnh ({images.length}/5)
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file && images.length < 5) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setImages([...images, reader.result as string]);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 mt-2">
                        Hình ảnh thật sẽ giúp bài đăng của bạn thu hút hơn. Yêu cầu tối thiểu 1 hình để tiếp tục.
                      </p>
                      {showImagesValidation && images.length === 0 && (
                        <p className="text-sm text-pink-500 mt-1 font-bold">Vui lòng tải lên ít nhất 1 hình ảnh</p>
                      )}
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
                        Tiện nghi
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { value: 'ac', label: 'Điều hòa' },
                          { value: 'wifi', label: 'Wifi' },
                          { value: 'washing', label: 'Máy giặt' },
                          { value: 'fridge', label: 'Tủ lạnh' },
                          { value: 'kitchen', label: 'Bếp' },
                          { value: 'parking', label: 'Chỗ đậu xe' },
                          { value: 'pool', label: 'Hồ bơi' },
                          { value: 'gym', label: 'Gym' },
                          { value: 'elevator', label: 'Thang máy' },
                          { value: 'security', label: 'Bảo vệ 24/7' },
                          { value: 'balcony', label: 'Ban công' },
                          { value: 'furnished', label: 'Nội thất' },
                          { value: 'other', label: 'Khác' },
                        ].map((amenity) => (
                          <div key={amenity.value} className={amenity.value === 'other' ? 'col-span-2 sm:col-span-3' : ''}>
                            <label
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all ${amenities.includes(amenity.value)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-black bg-white hover:bg-zinc-50'
                                }`}
                            >
                              <input
                                type="checkbox"
                                checked={amenities.includes(amenity.value)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAmenities([...amenities, amenity.value]);
                                  } else {
                                    setAmenities(amenities.filter(a => a !== amenity.value));
                                  }
                                }}
                                className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer flex-shrink-0"
                              />
                              <span className="text-sm">{amenity.label}</span>
                            </label>
                            {amenity.value === 'other' && amenities.includes('other') && (
                              <input
                                type="text"
                                value={amenitiesOther}
                                onChange={(e) => setAmenitiesOther(e.target.value)}
                                placeholder="Nhập tiện nghi khác..."
                                className="w-full mt-2 px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                autoFocus
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => router.push(`/roommate/create?type=${type}`)}
                      className="flex-1 btn-secondary"
                    >
                      Quay lại
                    </button>
                    {(() => {
                      const isStep2Complete = isHaveRoom
                        ? (images.length > 0 && amenities.length > 0 && roomSize.trim() !== "" && currentOccupants !== "" && minContractDuration !== "")
                        : (images.length > 0 && amenities.length > 0);
                      return (
                        <button
                          type="button"
                          onClick={() => {
                            if (images.length === 0) {
                              setShowImagesValidation(true);
                              return;
                            }
                            if (!isStep2Complete) {
                              return;
                            }
                            router.push(`/roommate/create?type=${type}&step=3`);
                          }}
                          className={`flex-1 ${isStep2Complete ? 'btn-primary' : 'btn-start opacity-50 cursor-not-allowed'}`}
                        >
                          Tiếp tục
                        </button>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Roommate Preferences Card - only show after clicking Continue */}
              {showPreferences && !showContactInfo && (
                <div className="card bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Mong muốn đối với bạn ở cùng</h2>
                  </div>
                  <div className="space-y-6">
                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">Giới tính</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "male", label: "Nam" },
                          { value: "female", label: "Nữ" },
                          { value: "any", label: "Không quan trọng" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                          >
                            <input
                              type="radio"
                              name="prefGender"
                              value={option.value}
                              checked={prefGender.includes(option.value)}
                              onClick={(e) => {
                                if (prefGender.includes((e.target as HTMLInputElement).value)) {
                                  e.preventDefault();
                                  setPrefGender([]);
                                }
                              }}
                              onChange={(e) => {
                                setPrefGender([e.target.value]);
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
                      <label className="block text-sm font-bold mb-2 text-blue-600">Tình trạng</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "student", label: "Sinh viên" },
                          { value: "working", label: "Đã đi làm" },
                          { value: "both", label: "Vừa học vừa làm" },
                          { value: "other", label: "Khác" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                          >
                            <input
                              type="radio"
                              name="prefStatus"
                              value={option.value}
                              checked={prefStatus.includes(option.value)}
                              onClick={(e) => {
                                if (prefStatus.includes((e.target as HTMLInputElement).value)) {
                                  e.preventDefault();
                                  setPrefStatus([]);
                                  setShowStatusOther(false);
                                }
                              }}
                              onChange={(e) => {
                                setPrefStatus([e.target.value]);
                                if (e.target.value === "other") {
                                  setShowStatusOther(true);
                                } else {
                                  setShowStatusOther(false);
                                }
                              }}
                              className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                            />
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
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
                      <label className="block text-sm font-bold mb-2 text-blue-600">Giờ giấc</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "early", label: "Ngủ sớm, dậy sớm" },
                          { value: "late", label: "Cú đêm" },
                          { value: "flexible", label: "Linh hoạt" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                          >
                            <input
                              type="radio"
                              name="prefSchedule"
                              value={option.value}
                              checked={prefSchedule.includes(option.value)}
                              onClick={(e) => {
                                if (prefSchedule.includes((e.target as HTMLInputElement).value)) {
                                  e.preventDefault();
                                  setPrefSchedule([]);
                                }
                              }}
                              onChange={(e) => {
                                setPrefSchedule([e.target.value]);
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
                      <label className="block text-sm font-bold mb-2 text-blue-600">Mức độ sạch sẽ</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "very-clean", label: "Rất sạch sẽ" },
                          { value: "normal", label: "Bình thường" },
                          { value: "relaxed", label: "Thoải mái" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                          >
                            <input
                              type="radio"
                              name="prefCleanliness"
                              value={option.value}
                              checked={prefCleanliness.includes(option.value)}
                              onClick={(e) => {
                                if (prefCleanliness.includes((e.target as HTMLInputElement).value)) {
                                  e.preventDefault();
                                  setPrefCleanliness([]);
                                }
                              }}
                              onChange={(e) => {
                                setPrefCleanliness([e.target.value]);
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
                      <label className="block text-sm font-bold mb-2 text-blue-600">Thói quen</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "no-smoke", label: "Không hút thuốc" },
                          { value: "no-alcohol", label: "Không uống rượu bia" },
                          { value: "flexible", label: "Linh hoạt" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                          >
                            <input
                              type="radio"
                              name="prefHabits"
                              value={option.value}
                              checked={prefHabits.includes(option.value)}
                              onClick={(e) => {
                                if (prefHabits.includes((e.target as HTMLInputElement).value)) {
                                  e.preventDefault();
                                  setPrefHabits([]);
                                }
                              }}
                              onChange={(e) => {
                                setPrefHabits([e.target.value]);
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
                      <label className="block text-sm font-bold mb-2 text-blue-600">Thú cưng</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "no-pet", label: "Không nuôi thú cưng" },
                          { value: "pet-ok", label: "Có thể nuôi thú cưng" },
                          { value: "any", label: "Không quan trọng" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                          >
                            <input
                              type="radio"
                              name="prefPets"
                              value={option.value}
                              checked={prefPets.includes(option.value)}
                              onClick={(e) => {
                                if (prefPets.includes((e.target as HTMLInputElement).value)) {
                                  e.preventDefault();
                                  setPrefPets([]);
                                }
                              }}
                              onChange={(e) => {
                                setPrefPets([e.target.value]);
                              }}
                              className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                            />
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Move-in Time */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
                        {isHaveRoom ? "Thời gian dọn vào" : "Thời gian mong muốn ở cùng/ thuê được phòng"}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "early-month", label: "Đầu tháng" },
                          { value: "end-month", label: "Cuối tháng" },
                          { value: "any", label: "Thời gian bất kỳ" },
                          { value: "asap", label: "Càng sớm càng tốt" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white"
                          >
                            <input
                              type="radio"
                              name="prefMoveInTime"
                              value={option.value}
                              checked={prefMoveInTime.includes(option.value)}
                              onClick={(e) => {
                                if (prefMoveInTime.includes((e.target as HTMLInputElement).value)) {
                                  e.preventDefault();
                                  setPrefMoveInTime([]);
                                }
                              }}
                              onChange={(e) => {
                                setPrefMoveInTime([e.target.value]);
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
                      <label className="block text-sm font-bold mb-2 text-blue-600">Khác</label>
                      <input
                        type="text"
                        value={prefOther}
                        onChange={(e) => setPrefOther(e.target.value)}
                        placeholder="Yêu cầu khác về người ở cùng..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    {/* Continue button for preferences */}
                    {!showContactInfo && (
                      <div className="pt-4">
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              // Go back to step 1 for find-partner (skipped step 2)
                              router.push(`/roommate/create?type=${type}${isHaveRoom ? '&step=2' : ''}`);
                            }}
                            className="btn-secondary flex-1"
                          >
                            Quay lại
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!arePreferencesComplete) {
                                setShowPreferencesValidation(true);
                              } else {
                                setShowPreferencesValidation(false);
                                router.push(`/roommate/create?type=${type}&step=4`);
                              }
                            }}
                            className={`flex-1 ${arePreferencesComplete ? 'btn-primary' : 'btn-start opacity-50'}`}
                          >
                            Tiếp tục
                          </button>
                        </div>
                        {/* Validation message for preferences */}
                        {showPreferencesValidation && !arePreferencesComplete && (
                          <div className="mt-4 p-4 bg-pink-50 border-2 border-pink-300 rounded-lg">
                            <p className="text-sm font-semibold text-pink-600">
                              ⚠️ Bạn chưa điền đủ thông tin!
                            </p>
                            <p className="text-xs text-pink-600 mt-1">
                              Vui lòng chọn tất cả các mục: Giới tính, Tình trạng, Giờ giấc, Mức độ sạch sẽ, Thói quen, Thú cưng và {isHaveRoom ? "Thời gian dọn vào" : "Thời gian mong muốn"}.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Contact Information Card - show after preferences completed */}
              {showContactInfo && (
                <div className="card bg-white">
                  <h2 className="text-xl font-bold mb-6">Thông tin liên lạc</h2>
                  <div className="space-y-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
                        Số điện thoại <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="0123456789"
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    {/* Zalo */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
                        Zalo
                      </label>
                      <input
                        type="text"
                        value={contactZalo}
                        onChange={(e) => setContactZalo(e.target.value)}
                        placeholder="Số Zalo (nếu khác SĐT)"
                        disabled={sameAsPhone}
                        className={`w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 ${sameAsPhone ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                      />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sameAsPhone}
                          onChange={(e) => setSameAsPhone(e.target.checked)}
                          className="w-4 h-4 rounded appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500"
                        />
                        <span className="text-sm">Dùng chung số điện thoại</span>
                      </label>
                    </div>

                    {/* Facebook */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
                        Facebook
                      </label>
                      <input
                        type="text"
                        value={contactFacebook}
                        onChange={(e) => setContactFacebook(e.target.value)}
                        placeholder="Link Facebook hoặc tên Facebook"
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="block text-sm font-bold mb-2 text-blue-600">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={contactInstagram}
                        onChange={(e) => setContactInstagram(e.target.value)}
                        placeholder="Username hoặc link Instagram"
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons - always show when on contact info page */}
              {showContactInfo && (
                <>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(`/roommate/create?type=${type}&step=3`);
                      }}
                      className="btn-secondary flex-1"
                    >
                      Trở lại
                    </button>
                    <button
                      type="button"
                      disabled={contactPhone.trim() === ""}
                      onClick={async () => {
                        try {
                          // Upload images to R2 (falls back to base64 if R2 not configured)
                          const { uploadImages } = await import('../../lib/imageUpload');
                          const listingId = `rm-${Date.now()}`;
                          const uploadedImages = images.length > 0
                            ? await uploadImages(images, "listings", listingId)
                            : [];

                          const { createListing } = await import('../../data/listings');
                          await createListing({
                            category: "roommate",
                            roommateType: type as "have-room" | "find-partner",
                            title,
                            introduction,
                            description: introduction,
                            city,
                            district,
                            specificAddress,
                            buildingName,
                            addressOther,
                            location: [specificAddress, buildingName, district, city].filter(Boolean).join(', '),
                            locationNegotiable,
                            propertyTypes,
                            price: isHaveRoom ? costRent : budget,
                            moveInDate: moveInTime,
                            timeNegotiable,
                            images: uploadedImages,
                            amenities,
                            amenitiesOther,
                            author: user?.displayName || "Ẩn danh",
                            ...(isHaveRoom && {
                              roomSize,
                              currentOccupants,
                              minContractDuration,
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
                              moveInTime: prefMoveInTime,
                              other: prefOther,
                            },
                            phone: contactPhone,
                            zalo: contactZalo,
                            facebook: contactFacebook,
                            instagram: contactInstagram,
                            userId: user?.uid || "",
                          });

                          // Remove draft if exists
                          localStorage.removeItem('roommate_draft');
                          setShowSuccessModal(true);
                        } catch (error) {
                          console.error("Error creating listing:", error);
                          alert("Có lỗi khi đăng tin. Vui lòng thử lại.");
                        }
                      }}
                      className={`flex-1 ${contactPhone.trim() === "" ? 'btn-start opacity-50 cursor-not-allowed' : 'btn-primary'}`}
                    >
                      Đăng tin
                    </button>
                  </div>


                </>
              )}

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metro Style Progress */}
              <div className="py-2">
                <div className="relative pl-2">
                  {/* Track Line Background */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-1.5 bg-zinc-100 rounded-full" />

                  {/* Track Line Active */}
                  <div
                    className="absolute left-[19px] top-4 w-1.5 bg-black rounded-full transition-all duration-700 ease-out"
                    style={{
                      height: `${progressPercentage}%`
                    }}
                  />



                  <div className="space-y-8 relative">

                    {/* Station 1 */}
                    <div className="flex gap-4 items-center group">
                      <div className={`
                        relative z-10 w-6 h-6 rounded-full border-[3px] flex items-center justify-center bg-white transition-all duration-300
                        ${(!showAmenities && !showPreferences) ? 'border-black scale-125 shadow-lg' : 'border-black'}
                      `}>
                        {/* Dot for station */}
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${(!showAmenities && !showPreferences) ? 'bg-black animate-pulse' : 'bg-black'}`} />
                      </div>
                      <div className="transition-opacity duration-300">
                        <p className="font-bold text-sm uppercase tracking-wide">Thông tin</p>
                        <p className="text-xs text-zinc-500">Cơ bản & Chi phí</p>
                      </div>
                    </div>

                    {/* Station 2 - only for have-room */}
                    {isHaveRoom && (
                      <div className="flex gap-4 items-center group">
                        <div className={`
                          relative z-10 w-6 h-6 rounded-full border-[3px] flex items-center justify-center bg-white transition-all duration-300
                          ${showAmenities || showPreferences ? 'border-black' : 'border-zinc-200'}
                          ${(showAmenities && !showPreferences) ? 'scale-125 shadow-lg' : ''}
                        `}>
                          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${showAmenities || showPreferences ? 'bg-black' : 'bg-zinc-200'} ${(showAmenities && !showPreferences) ? 'animate-pulse' : ''}`} />
                        </div>
                        <div className={`transition-opacity duration-300 ${(showAmenities || showPreferences) ? 'opacity-100' : 'opacity-40'}`}>
                          <p className="font-bold text-sm uppercase tracking-wide">Chi tiết</p>
                          <p className="text-xs text-zinc-500">Tiện nghi & Ảnh</p>
                        </div>
                      </div>
                    )}

                    {/* Station 3 */}
                    <div className="flex gap-4 items-center group">
                      <div className={`
                        relative z-10 w-6 h-6 rounded-full border-[3px] flex items-center justify-center bg-white transition-all duration-300
                        ${showPreferences ? 'border-black scale-125 shadow-lg' : 'border-zinc-200'}
                      `}>
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${showPreferences ? 'bg-black animate-pulse' : 'bg-zinc-200'}`} />
                      </div>
                      <div className={`transition-opacity duration-300 ${showPreferences ? 'opacity-100' : 'opacity-40'}`}>
                        <p className="font-bold text-sm uppercase tracking-wide">Mong muốn</p>
                        <p className="text-xs text-zinc-500">Bạn ở cùng</p>
                      </div>
                    </div>

                    {/* Station 4 */}
                    <div className="flex gap-4 items-center group">
                      <div className="relative z-10 w-6 h-6 rounded-full border-[3px] border-zinc-200 flex items-center justify-center bg-white">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                      </div>
                      <div className="opacity-40">
                        <p className="font-bold text-sm uppercase tracking-wide">Hoàn tất</p>
                        <p className="text-xs text-zinc-500">Đăng tin</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              {/* Tips & Checklist */}
              <div className="card bg-yellow-50 !p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-bold">Mẹo để được duyệt bài nhanh</h3>
                </div>
                {isHaveRoom ? (
                  <>
                    <ul className="space-y-2 text-sm text-zinc-600 mb-4">
                      <li>• Viết tiêu đề rõ ràng, đầy đủ thông tin</li>
                      <li>• Mô tả chi tiết về phòng và yêu cầu</li>
                      <li>• Đăng giá hợp lý với thị trường</li>
                      <li>• Cập nhật thông tin liên hệ chính xác</li>
                    </ul>

                  </>
                ) : (
                  <>
                    <ul className="space-y-2 text-sm text-zinc-600 mb-4">
                      <li>• Giới thiệu bản thân chân thật, dễ gần</li>
                      <li>• Nêu rõ khu vực và loại hình mong muốn</li>
                      <li>• Mô tả thói quen sinh hoạt của bạn</li>
                      <li>• Đưa ra yêu cầu về bạn ở cùng hợp lý</li>
                    </ul>

                  </>
                )}
              </div>

              {/* Preview & Draft buttons - Sidebar */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="flex-1 btn-secondary"
                >
                  Xem trước
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const draftData = {
                      type,
                      title,
                      introduction,
                      city,
                      district,
                      specificAddress,
                      buildingName,
                      addressOther,
                      locationNegotiable,
                      propertyTypes,
                      budget,
                      moveInTime,
                      timeNegotiable,
                      images,
                      amenities,
                      amenitiesOther,
                      roomSize,
                      currentOccupants,
                      minContractDuration,
                      costRent,
                      costDeposit,
                      costElectricity,
                      costWater,
                      costInternet,
                      costService,
                      costParking,
                      costManagement,
                      costOther,
                      prefGender,
                      prefStatus,
                      prefStatusOther,
                      prefSchedule,
                      prefCleanliness,
                      prefHabits,
                      prefPets,
                      prefMoveInTime,
                      prefOther,
                      contactPhone,
                      contactZalo,
                      contactFacebook,
                      contactInstagram,
                      savedAt: new Date().toISOString(),
                    };
                    localStorage.setItem('roommate_draft', JSON.stringify(draftData));
                    alert('Đã lưu nháp thành công! Bạn có thể quay lại tiếp tục sau.');
                  }}
                  className="flex-1 btn-secondary"
                >
                  Lưu nháp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Preview Modal */}
      {
        showPreviewModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl border-2 border-black shadow-[var(--shadow-primary)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-blue-50 p-6 border-b-2 border-black flex items-center justify-between sticky top-0">
                <h2 className="text-xl font-bold">👁️ Xem trước bài đăng</h2>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-blue-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-2xl font-bold">{title || "(Chưa có tiêu đề)"}</h3>

                {/* Price */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-black">
                  <p className="text-sm text-zinc-500">{isHaveRoom ? "Tiền thuê phòng" : "Ngân sách"}</p>
                  <p className="text-2xl font-bold">{isHaveRoom ? costRent : budget || "(Chưa nhập)"}</p>
                </div>

                {/* Room Info */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500">Địa chỉ</p>
                    <p className="font-semibold">{[specificAddress, buildingName, district, city].filter(Boolean).join(', ') || "(Chưa nhập)"}</p>
                  </div>
                  {isHaveRoom && propertyTypes.length > 0 && (
                    <div>
                      <p className="text-zinc-500">Loại hình</p>
                      <p className="font-semibold">
                        {propertyTypes.map(t => {
                          if (t === "house") return "Nhà mặt đất";
                          if (t === "room") return "Trọ";
                          if (t === "apartment") return "Chung cư";
                          if (t === "service-apartment") return "Căn hộ dịch vụ";
                          return t;
                        }).join(", ")}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-zinc-500">Dọn vào</p>
                    <p className="font-semibold">{moveInTime || "(Chưa nhập)"}</p>
                  </div>
                  {roomSize && (
                    <div>
                      <p className="text-zinc-500">Diện tích</p>
                      <p className="font-semibold">{roomSize} m²</p>
                    </div>
                  )}
                  {currentOccupants && (
                    <div>
                      <p className="text-zinc-500">Số người đang ở</p>
                      <p className="font-semibold">{currentOccupants}</p>
                    </div>
                  )}
                  {minContractDuration && (
                    <div>
                      <p className="text-zinc-500">Thời hạn hợp đồng còn lại</p>
                      <p className="font-semibold">{minContractDuration}</p>
                    </div>
                  )}
                </div>

                {/* Amenities */}
                {amenities.length > 0 && (
                  <div>
                    <p className="text-sm font-bold uppercase text-zinc-500 mb-2">Tiện nghi</p>
                    <div className="flex flex-wrap gap-2">
                      {amenities.filter(a => a !== 'other').map(a => (
                        <span key={a} className="px-3 py-1 bg-blue-100 rounded-lg border-2 border-black text-sm">
                          {a === "ac" && "Điều hòa"}
                          {a === "wifi" && "Wifi"}
                          {a === "washing" && "Máy giặt"}
                          {a === "fridge" && "Tủ lạnh"}
                          {a === "kitchen" && "Bếp"}
                          {a === "parking" && "Chỗ đậu xe"}
                          {a === "elevator" && "Thang máy"}
                          {a === "security" && "Bảo vệ 24/7"}
                          {a === "balcony" && "Ban công"}
                          {a === "furnished" && "Nội thất"}
                        </span>
                      ))}
                      {amenitiesOther && (
                        <span className="px-3 py-1 bg-yellow-100 rounded-lg border-2 border-black text-sm">{amenitiesOther}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Introduction */}
                <div>
                  <p className="text-sm font-bold uppercase text-zinc-500 mb-2">Giới thiệu</p>
                  <p className="text-zinc-700 whitespace-pre-line">{introduction || "(Chưa nhập giới thiệu)"}</p>
                </div>

                {/* Images Preview */}
                {images.length > 0 && (
                  <div>
                    <p className="text-sm font-bold uppercase text-zinc-500 mb-2">Hình ảnh ({images.length})</p>
                    <div className="grid grid-cols-3 gap-2">
                      {images.slice(0, 6).map((img, idx) => (
                        <div key={idx} className="aspect-square bg-zinc-100 rounded-lg overflow-hidden">
                          <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div className="bg-zinc-50 p-4 rounded-lg border-2 border-black">
                  <p className="text-sm font-bold uppercase text-zinc-500 mb-2">Thông tin liên hệ</p>
                  <p className="font-semibold">📞 {contactPhone || "(Chưa nhập)"}</p>
                  {contactZalo && <p className="text-sm text-zinc-600">Zalo: {contactZalo}</p>}
                </div>
              </div>
              <div className="p-6 border-t-2 border-black bg-zinc-50 sticky bottom-0">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="w-full btn-primary"
                >
                  Đóng xem trước
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Draft Found Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <NotebookPen className="w-8 h-8 text-black" strokeWidth={1.5} />
                <h3 className="text-xl font-bold">Tìm thấy bản nháp</h3>
              </div>
              <p className="text-zinc-600 mb-6 font-medium">
                Bạn có một bản nháp đã lưu trước đó. Bạn có muốn khôi phục lại không?
              </p>
              <div className="p-3 bg-zinc-50 border-2 border-black/10 rounded-lg mb-6">
                <p className="text-sm text-zinc-500">
                  Nếu chọn <span className="font-bold text-red-500">Bỏ qua</span>, bản nháp cũ sẽ bị xóa và không thể khôi phục.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDiscardDraft}
                  className="flex-1 btn-secondary justify-center text-center"
                >
                  Bỏ qua
                </button>
                <button
                  onClick={handleRestoreDraft}
                  className="flex-1 btn-primary justify-center text-center"
                >
                  Khôi phục
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ShareFooter />
    </div >
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
