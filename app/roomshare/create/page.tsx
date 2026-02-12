"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { useAuth } from "../../contexts/AuthContext";
import { MapPin, DollarSign, Eye, Loader2, Camera, Users, Phone } from "lucide-react";
import { cities, getDistrictsByLabel } from "../../data/locations";

function CreateRoomshareContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();

    // Step management via URL
    const step = searchParams.get("step") || "1";

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth?returnUrl=/roomshare");
        }
    }, [isAuthenticated, router]);

    // Form state - Basic Info
    const [propertyType, setPropertyType] = useState<"apartment" | "house">("apartment");
    const [title, setTitle] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [othersIntro, setOthersIntro] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");
    const [buildingName, setBuildingName] = useState("");
    const [addressOther, setAddressOther] = useState("");
    const [totalRooms, setTotalRooms] = useState("");
    const [roomSize, setRoomSize] = useState("");
    const [currentOccupants, setCurrentOccupants] = useState("");
    const [rentPrice, setRentPrice] = useState("");
    const [deposit, setDeposit] = useState("");
    const [minLeaseDuration, setMinLeaseDuration] = useState("");

    // Form state - Costs (apartment-specific extras)
    const [costElectricity, setCostElectricity] = useState("");
    const [costWater, setCostWater] = useState("");
    const [costInternet, setCostInternet] = useState("");
    const [costService, setCostService] = useState("");
    const [costParking, setCostParking] = useState("");
    const [costManagement, setCostManagement] = useState("");
    const [costOther, setCostOther] = useState("");

    // Form state - Images & Amenities
    const [images, setImages] = useState<string[]>([]);
    const [amenities, setAmenities] = useState<string[]>([]);
    const [amenitiesOther, setAmenitiesOther] = useState("");

    // Form state - Preferences
    const [prefGender, setPrefGender] = useState<string[]>([]);
    const [prefStatus, setPrefStatus] = useState<string[]>([]);
    const [prefStatusOther, setPrefStatusOther] = useState("");
    const [showStatusOther, setShowStatusOther] = useState(false);
    const [prefSchedule, setPrefSchedule] = useState<string[]>([]);
    const [prefCleanliness, setPrefCleanliness] = useState<string[]>([]);
    const [prefHabits, setPrefHabits] = useState<string[]>([]);
    const [prefPets, setPrefPets] = useState<string[]>([]);
    const [prefMoveInTime, setPrefMoveInTime] = useState<string[]>([]);
    const [prefOther, setPrefOther] = useState("");

    // Form state - Contact
    const [contactPhone, setContactPhone] = useState("");
    const [contactZalo, setContactZalo] = useState("");
    const [sameAsPhone, setSameAsPhone] = useState(false);
    const [contactFacebook, setContactFacebook] = useState("");
    const [contactInstagram, setContactInstagram] = useState("");

    // UI state
    const [showValidation, setShowValidation] = useState(false);
    const [showImagesValidation, setShowImagesValidation] = useState(false);
    const [showPreferencesValidation, setShowPreferencesValidation] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Sync Zalo with Phone
    useEffect(() => {
        if (sameAsPhone) setContactZalo(contactPhone);
    }, [sameAsPhone, contactPhone]);

    // Validation helpers
    const isStep1Complete = title.trim() !== "" && city.trim() !== "" && district.trim() !== "" && rentPrice.trim() !== "" && totalRooms !== "" && roomSize.trim() !== "" && currentOccupants !== "";

    const isStep2Complete = images.length > 0 && amenities.length > 0;

    const isStep3Complete = true; // Cost step - no required fields besides rentPrice (already in step 1)

    const isStep4Complete = prefGender.length > 0 && prefStatus.length > 0 && prefSchedule.length > 0 && prefCleanliness.length > 0 && prefHabits.length > 0 && prefPets.length > 0 && prefMoveInTime.length > 0;

    // Progress for sidebar
    const currentStep = parseInt(step);
    const totalSteps = 5;
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    const isApartment = propertyType === "apartment";

    // Dev auto-fill
    const autoFill = () => {
        // Step 1
        setPropertyType("apartment");
        setTitle("Share phòng dư căn hộ 2PN Vinhomes Grand Park Q9");
        setIntroduction("Mình là Minh, 25 tuổi, đang làm IT ở Q1. Sinh hoạt điều độ, thích nấu ăn, không hút thuốc. Cuối tuần hay đi cafe hoặc chạy bộ.");
        setOthersIntro("Hiện tại có 1 bạn nam 24 tuổi, làm marketing, rất thân thiện và sạch sẽ. Bạn ấy cũng ngủ sớm và thích nấu ăn.");
        setCity("Hồ Chí Minh");
        setDistrict("Quận 9");
        setSpecificAddress("Vinhomes Grand Park, Nguyễn Xiển, P. Long Thạnh Mỹ");
        setBuildingName("S5.03 - Tầng 12");
        setTotalRooms("2");
        setRoomSize("18");
        setCurrentOccupants("1");
        setMinLeaseDuration("6 tháng");
        setRentPrice("4.500.000");
        setDeposit("1 tháng tiền phòng");
        // Step 2 - no images auto (need manual), but set amenities
        setAmenities(["ac", "wifi", "washing", "fridge", "kitchen", "parking", "pool", "gym", "elevator", "security", "furnished", "private-wc"]);
        // Step 3
        setCostElectricity("3.500đ/kWh");
        setCostWater("Chia đều (~100k/người)");
        setCostInternet("Wifi miễn phí (đã bao gồm)");
        setCostService("Bao gồm trong phí quản lý");
        setCostManagement("8.000đ/m²");
        setCostParking("Xe máy miễn phí, ô tô 1.2tr/tháng");
        setCostOther("Dọn vệ sinh chung 2 lần/tuần");
        // Step 4
        setPrefGender(["male"]);
        setPrefStatus(["working"]);
        setPrefSchedule(["early"]);
        setPrefCleanliness(["very-clean"]);
        setPrefHabits(["no-smoke"]);
        setPrefPets(["no-pet"]);
        setPrefMoveInTime(["asap"]);
        setPrefOther("Ưu tiên bạn đi làm giờ hành chính, không mang bạn về khuya.");
        // Step 5
        setContactPhone("0909123456");
        setContactZalo("0909123456");
        setSameAsPhone(true);
        setContactFacebook("facebook.com/minh.nguyen");
        setContactInstagram("@minh.nguyen");
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-white">
            {/* Dev Auto-Fill Button */}
            {process.env.NODE_ENV === "development" && (
                <button
                    onClick={autoFill}
                    className="fixed bottom-6 right-6 z-50 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-600 transition-colors text-sm font-bold flex items-center gap-2 border-2 border-black"
                    title="Auto-fill all fields with sample data"
                >
                    🤖 Auto Fill
                </button>
            )}
            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-xl border-2 border-black shadow-[var(--shadow-primary)] p-8 text-center animate-in zoom-in-95 duration-300">
                        <div className="mb-4">
                            <div className="w-20 h-20 mx-auto flex items-center justify-center relative">
                                <svg className="w-20 h-20" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="36" fill="#fce7f3" stroke="none" />
                                    <circle
                                        cx="40" cy="40" r="36" fill="none"
                                        stroke="#db2777" strokeWidth="4" strokeLinecap="round"
                                        strokeDasharray="226" strokeDashoffset="170"
                                        style={{ transformOrigin: 'center', animation: 'spin 0.6s linear, completeCircle 0.3s ease-out 0.6s forwards' }}
                                    />
                                    <path
                                        d="M24 42 L35 53 L56 28" fill="none"
                                        stroke="#db2777" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                                        strokeDasharray="50" strokeDashoffset="50"
                                        style={{ animation: 'drawCheck 0.4s ease-out 0.9s forwards' }}
                                    />
                                </svg>
                                <style jsx>{`
                                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                                    @keyframes completeCircle { to { stroke-dashoffset: 0; } }
                                    @keyframes drawCheck { to { stroke-dashoffset: 0; } }
                                `}</style>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Đăng tin thành công!</h2>
                        <p className="text-zinc-600 mb-6">Tin share phòng của bạn đã được đăng. Chúc bạn sớm tìm được người ở cùng phù hợp!</p>
                        <div className="flex gap-3">
                            <button onClick={() => router.push('/roomshare')} className="btn-secondary flex-1">Về trang chủ</button>
                            <button
                                onClick={() => {
                                    const listings = JSON.parse(localStorage.getItem('roomshare_listings') || '[]');
                                    const lastListing = listings[listings.length - 1];
                                    if (lastListing) router.push(`/roomshare/listing/${lastListing.id}`);
                                }}
                                className="btn-pink flex-1"
                            >Xem tin đăng</button>
                        </div>
                    </div>
                </div>
            )}

            <MainHeader />

            {/* Hero */}
            <section className="py-12 bg-pink-50 relative">
                <div className="mx-auto max-w-7xl px-6">
                    <h1 className="text-3xl font-bold mb-2">Đăng tin share phòng dư</h1>
                    <p className="text-zinc-600">Bạn có phòng dư trong căn hộ/nhà và muốn tìm người ở cùng</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)' }} />
            </section>

            {/* Form */}
            <section className="py-12 -mt-8">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* ===== STEP 1: Thông tin cơ bản ===== */}
                            {step === "1" && (
                                <div className="card bg-white">
                                    <h2 className="text-xl font-bold mb-6">Thông tin phòng</h2>
                                    <div className="space-y-6">

                                        {/* Property Type Toggle */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-pink-600">Loại hình nhà</label>
                                            <div className="flex gap-3">
                                                {[
                                                    { value: "apartment", label: "Chung cư / Căn hộ" },
                                                    { value: "house", label: "Nhà nguyên căn" },
                                                ].map((opt) => (
                                                    <label
                                                        key={opt.value}
                                                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all flex-1 justify-center ${propertyType === opt.value ? 'border-pink-500 bg-pink-50 font-bold' : 'border-black bg-white hover:bg-zinc-50'}`}
                                                    >
                                                        <input type="radio" name="propertyType" value={opt.value} checked={propertyType === opt.value} onChange={(e) => setPropertyType(e.target.value as "apartment" | "house")} className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-pink-500 checked:border-pink-500 cursor-pointer" />
                                                        <span className="text-sm">{opt.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-pink-600">Tiêu đề bài đăng</label>
                                            <input type="text" value={title} onChange={(e) => { if (e.target.value.length <= 80) setTitle(e.target.value); }} placeholder="VD: Share phòng dư căn hộ 2PN Vinhomes Q9" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                            <p className="text-xs text-zinc-500 mt-1 text-right">{title.length}/80</p>
                                            {showValidation && title.trim() === "" && <p className="text-sm text-pink-500 mt-1">Vui lòng nhập tiêu đề</p>}
                                        </div>

                                        {/* Introduction */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-pink-600">Giới thiệu về bản thân</label>
                                            <textarea value={introduction} onChange={(e) => { if (e.target.value.length <= 500) setIntroduction(e.target.value); }} placeholder="Giới thiệu ngắn về bạn: tuổi, nghề nghiệp, thói quen sinh hoạt..." rows={3} className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none" />
                                            <p className="text-xs text-zinc-500 mt-1 text-right">{introduction.length}/500</p>
                                        </div>

                                        {/* Others Introduction */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-pink-600">Giới thiệu về những người ở phòng khác (nếu có)</label>
                                            <textarea value={othersIntro} onChange={(e) => { if (e.target.value.length <= 500) setOthersIntro(e.target.value); }} placeholder="VD: Hiện tại có 2 bạn nữ, 1 bạn sinh viên năm 3, 1 bạn đi làm. Mọi người đều thân thiện..." rows={3} className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none" />
                                            <p className="text-xs text-zinc-500 mt-1 text-right">{othersIntro.length}/500</p>
                                        </div>

                                        {/* Address Section */}
                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-pink-600">Địa chỉ</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* City */}
                                                <div>
                                                    <select value={city} onChange={(e) => { setCity(e.target.value); setDistrict(""); }} className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white appearance-none">
                                                        <option value="">Chọn Thành phố</option>
                                                        {cities.map((c) => <option key={c.value} value={c.label}>{c.label}</option>)}
                                                    </select>
                                                </div>
                                                {/* District */}
                                                <div>
                                                    <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white appearance-none" disabled={!city}>
                                                        <option value="">{city ? "Chọn Quận / Huyện" : "Chọn Thành phố trước"}</option>
                                                        {city && getDistrictsByLabel(city).map((d) => <option key={d.value} value={d.label}>{d.label}</option>)}
                                                    </select>
                                                </div>
                                                {/* Specific Address */}
                                                <div className="col-span-2">
                                                    <input type="text" value={specificAddress} onChange={(e) => setSpecificAddress(e.target.value)} placeholder="Địa chỉ cụ thể (số nhà, đường, phường...)" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                                </div>
                                                {/* Building Name - Apartment only */}
                                                {isApartment && (
                                                    <div className="col-span-2">
                                                        <input type="text" value={buildingName} onChange={(e) => setBuildingName(e.target.value)} placeholder="Tên toà nhà / Block / Tầng (nếu có)" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                                    </div>
                                                )}
                                            </div>
                                            {showValidation && (city.trim() === "" || district.trim() === "") && <p className="text-sm text-pink-500 mt-2">Vui lòng điền đầy đủ địa chỉ</p>}
                                        </div>

                                        {/* Room Details */}
                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-pink-600">Chi tiết căn nhà / phòng</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Total Rooms */}
                                                <div>
                                                    <label className="block text-xs font-medium mb-1 text-zinc-600">Số phòng ngủ trong căn</label>
                                                    <select value={totalRooms} onChange={(e) => setTotalRooms(e.target.value)} className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white appearance-none">
                                                        <option value="">Chọn...</option>
                                                        <option value="1">1 phòng</option>
                                                        <option value="2">2 phòng</option>
                                                        <option value="3">3 phòng</option>
                                                        <option value="4">4 phòng</option>
                                                        <option value="5+">5 phòng trở lên</option>
                                                    </select>
                                                </div>
                                                {/* Room Size */}
                                                <div>
                                                    <label className="block text-xs font-medium mb-1 text-zinc-600">Diện tích phòng dư cho thuê (m²)</label>
                                                    <input type="text" value={roomSize} onChange={(e) => setRoomSize(e.target.value)} placeholder="VD: 15" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                                </div>
                                                {/* Current Occupants */}
                                                <div>
                                                    <label className="block text-xs font-medium mb-1 text-zinc-600">Tổng số người đang ở trong cả căn</label>
                                                    <select value={currentOccupants} onChange={(e) => setCurrentOccupants(e.target.value)} className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white appearance-none">
                                                        <option value="">Chọn...</option>
                                                        <option value="1">1 người</option>
                                                        <option value="2">2 người</option>
                                                        <option value="3">3 người</option>
                                                        <option value="4+">4 người trở lên</option>
                                                    </select>
                                                </div>
                                                {/* Min Lease */}
                                                <div>
                                                    <label className="block text-xs font-medium mb-1 text-zinc-600">Thời hạn thuê tối thiểu</label>
                                                    <select value={minLeaseDuration} onChange={(e) => setMinLeaseDuration(e.target.value)} className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white appearance-none">
                                                        <option value="">Chọn...</option>
                                                        <option value="1 tháng">1 tháng</option>
                                                        <option value="3 tháng">3 tháng</option>
                                                        <option value="6 tháng">6 tháng</option>
                                                        <option value="1 năm">1 năm</option>
                                                        <option value="Linh hoạt">Linh hoạt</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {showValidation && (totalRooms === "" || roomSize.trim() === "" || currentOccupants === "") && <p className="text-sm text-pink-500 mt-2">Vui lòng điền đầy đủ thông tin phòng</p>}
                                        </div>

                                        {/* Rent Price only */}
                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-pink-600">Giá phòng</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium mb-1 text-zinc-600">Giá phòng/tháng <span className="text-pink-500">*</span></label>
                                                    <input type="text" value={rentPrice} onChange={(e) => setRentPrice(e.target.value)} placeholder="VD: 3.500.000" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium mb-1 text-zinc-600">Tiền cọc</label>
                                                    <input type="text" value={deposit} onChange={(e) => setDeposit(e.target.value)} placeholder="VD: 1 tháng tiền phòng" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                                </div>
                                            </div>
                                            {showValidation && rentPrice.trim() === "" && <p className="text-sm text-pink-500 mt-2">Vui lòng nhập giá phòng</p>}
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex gap-4 pt-4">
                                            <button type="button" onClick={() => router.push('/roomshare')} className="btn-secondary flex-1">Huỷ</button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (isStep1Complete) {
                                                        router.push('/roomshare/create?step=2');
                                                    } else {
                                                        setShowValidation(true);
                                                    }
                                                }}
                                                className={`flex-1 ${isStep1Complete ? 'btn-pink' : 'btn-start opacity-50'}`}
                                            >Tiếp tục</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ===== STEP 2: Hình ảnh & Tiện nghi ===== */}
                            {step === "2" && (
                                <div className="card bg-white">
                                    <h2 className="text-xl font-bold mb-6">Hình ảnh & Tiện nghi</h2>
                                    <div className="space-y-6">
                                        {/* Upload Images */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-pink-600">Hình ảnh phòng/nhà (Tối đa 5 ảnh)</label>
                                            <div className="space-y-3">
                                                {images.length > 0 && (
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {images.map((img, idx) => (
                                                            <div key={idx} className="relative group">
                                                                <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-32 object-cover rounded-lg border-2 border-black" />
                                                                <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {images.length < 5 && (
                                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-black rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <Camera className="w-8 h-8 mb-2 text-zinc-500" />
                                                            <p className="text-sm text-zinc-500">Click để chọn ảnh ({images.length}/5)</p>
                                                        </div>
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file && images.length < 5) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => setImages([...images, reader.result as string]);
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }} />
                                                    </label>
                                                )}
                                            </div>
                                            <p className="text-xs text-zinc-500 mt-2">Hình ảnh thật sẽ giúp bài đăng thu hút hơn. Yêu cầu tối thiểu 1 hình.</p>
                                            {showImagesValidation && images.length === 0 && <p className="text-sm text-pink-500 mt-1 font-bold">Vui lòng tải lên ít nhất 1 hình ảnh</p>}
                                        </div>

                                        {/* Amenities */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-pink-600">Tiện nghi</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {[
                                                    { value: 'ac', label: 'Điều hòa' },
                                                    { value: 'wifi', label: 'Wifi' },
                                                    { value: 'washing', label: 'Máy giặt' },
                                                    { value: 'fridge', label: 'Tủ lạnh' },
                                                    { value: 'kitchen', label: 'Bếp' },
                                                    { value: 'parking', label: 'Chỗ đậu xe' },
                                                    ...(isApartment ? [
                                                        { value: 'pool', label: 'Hồ bơi' },
                                                        { value: 'gym', label: 'Gym' },
                                                        { value: 'elevator', label: 'Thang máy' },
                                                    ] : []),
                                                    { value: 'security', label: 'Bảo vệ 24/7' },
                                                    { value: 'balcony', label: 'Ban công' },
                                                    { value: 'furnished', label: 'Nội thất' },
                                                    { value: 'private-wc', label: 'WC riêng' },
                                                    { value: 'other', label: 'Khác' },
                                                ].map((amenity) => (
                                                    <div key={amenity.value} className={amenity.value === 'other' ? 'col-span-2 sm:col-span-3' : ''}>
                                                        <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all ${amenities.includes(amenity.value) ? 'border-pink-500 bg-pink-50' : 'border-black bg-white hover:bg-zinc-50'}`}>
                                                            <input type="checkbox" checked={amenities.includes(amenity.value)} onChange={(e) => { if (e.target.checked) { setAmenities([...amenities, amenity.value]); } else { setAmenities(amenities.filter(a => a !== amenity.value)); } }} className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-pink-500 checked:border-pink-500 cursor-pointer flex-shrink-0" />
                                                            <span className="text-sm">{amenity.label}</span>
                                                        </label>
                                                        {amenity.value === 'other' && amenities.includes('other') && (
                                                            <input type="text" value={amenitiesOther} onChange={(e) => setAmenitiesOther(e.target.value)} placeholder="Nhập tiện nghi khác..." className="w-full mt-2 px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm" autoFocus />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex gap-4 pt-4">
                                            <button type="button" onClick={() => router.push('/roomshare/create?step=1')} className="btn-secondary flex-1">Quay lại</button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (images.length === 0) { setShowImagesValidation(true); return; }
                                                    if (isStep2Complete) router.push('/roomshare/create?step=3');  // -> Chi phí chi tiết
                                                }}
                                                className={`flex-1 ${isStep2Complete ? 'btn-pink' : 'btn-start opacity-50 cursor-not-allowed'}`}
                                            >Tiếp tục</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ===== STEP 3: Chi phí chi tiết ===== */}
                            {step === "3" && (
                                <div className="card bg-white">
                                    <h2 className="text-xl font-bold mb-6">Chi phí chi tiết</h2>
                                    <p className="text-sm text-zinc-500 mb-6">Điền chi tiết các khoản chi phí để người thuê nắm rõ tổng chi phí hàng tháng.</p>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-zinc-600">Tiền điện</label>
                                                <input type="text" value={costElectricity} onChange={(e) => setCostElectricity(e.target.value)} placeholder="VD: 3.500đ/kWh" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-zinc-600">Tiền nước</label>
                                                <input type="text" value={costWater} onChange={(e) => setCostWater(e.target.value)} placeholder="VD: Chia đều" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-zinc-600">Internet</label>
                                                <input type="text" value={costInternet} onChange={(e) => setCostInternet(e.target.value)} placeholder="VD: 200.000đ chia đều" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                            </div>
                                            {isApartment && (
                                                <>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1 text-zinc-600">Phí dịch vụ</label>
                                                        <input type="text" value={costService} onChange={(e) => setCostService(e.target.value)} placeholder="VD: Bao gồm" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium mb-1 text-zinc-600">Phí quản lý</label>
                                                        <input type="text" value={costManagement} onChange={(e) => setCostManagement(e.target.value)} placeholder="VD: 8.000đ/m²" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                                    </div>
                                                </>
                                            )}
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-zinc-600">Phí giữ xe</label>
                                                <input type="text" value={costParking} onChange={(e) => setCostParking(e.target.value)} placeholder="VD: Miễn phí" className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1 text-zinc-600">Chi phí khác</label>
                                                <input type="text" value={costOther} onChange={(e) => setCostOther(e.target.value)} placeholder="Ghi chú thêm..." className="w-full px-4 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                                            </div>
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex gap-4 pt-4">
                                            <button type="button" onClick={() => router.push('/roomshare/create?step=2')} className="btn-secondary flex-1">Quay lại</button>
                                            <button
                                                type="button"
                                                onClick={() => router.push('/roomshare/create?step=4')}
                                                className="flex-1 btn-pink"
                                            >Tiếp tục</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ===== STEP 4: Yêu cầu người ở cùng ===== */}
                            {step === "4" && (
                                <div className="card bg-white">
                                    <h2 className="text-xl font-bold mb-6">Yêu cầu nho nhỏ đối với bạn thuê phòng</h2>
                                    <div className="space-y-6">
                                        {[
                                            { label: "Giới tính", name: "prefGender", state: prefGender, setter: setPrefGender, options: [{ value: "male", label: "Nam" }, { value: "female", label: "Nữ" }, { value: "any", label: "Không quan trọng" }] },
                                            { label: "Tình trạng", name: "prefStatus", state: prefStatus, setter: setPrefStatus, options: [{ value: "student", label: "Sinh viên" }, { value: "working", label: "Đã đi làm" }, { value: "both", label: "Vừa học vừa làm" }, { value: "other", label: "Khác" }] },
                                            { label: "Giờ giấc", name: "prefSchedule", state: prefSchedule, setter: setPrefSchedule, options: [{ value: "early", label: "Ngủ sớm, dậy sớm" }, { value: "late", label: "Cú đêm" }, { value: "flexible", label: "Linh hoạt" }] },
                                            { label: "Mức độ sạch sẽ", name: "prefCleanliness", state: prefCleanliness, setter: setPrefCleanliness, options: [{ value: "very-clean", label: "Rất sạch sẽ" }, { value: "normal", label: "Bình thường" }, { value: "relaxed", label: "Thoải mái" }] },
                                            { label: "Thói quen", name: "prefHabits", state: prefHabits, setter: setPrefHabits, options: [{ value: "no-smoke", label: "Không hút thuốc" }, { value: "no-alcohol", label: "Không uống rượu bia" }, { value: "flexible", label: "Linh hoạt" }] },
                                            { label: "Thú cưng", name: "prefPets", state: prefPets, setter: setPrefPets, options: [{ value: "no-pet", label: "Không nuôi thú cưng" }, { value: "pet-ok", label: "Có thể nuôi thú cưng" }, { value: "any", label: "Không quan trọng" }] },
                                            { label: "Thời gian dọn vào", name: "prefMoveInTime", state: prefMoveInTime, setter: setPrefMoveInTime, options: [{ value: "early-month", label: "Đầu tháng" }, { value: "end-month", label: "Cuối tháng" }, { value: "any", label: "Thời gian bất kỳ" }, { value: "asap", label: "Càng sớm càng tốt" }] },
                                        ].map((field) => (
                                            <div key={field.name}>
                                                <label className="block text-sm font-bold mb-2 text-pink-600">{field.label}</label>
                                                <div className="flex flex-wrap gap-3">
                                                    {field.options.map((option) => (
                                                        <label key={option.value} className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-black cursor-pointer hover:bg-zinc-50 transition-colors bg-white">
                                                            <input
                                                                type="radio"
                                                                name={field.name}
                                                                value={option.value}
                                                                checked={field.state.includes(option.value)}
                                                                onClick={(e) => { if (field.state.includes((e.target as HTMLInputElement).value)) { e.preventDefault(); field.setter([]); if (field.name === "prefStatus") setShowStatusOther(false); } }}
                                                                onChange={(e) => { field.setter([e.target.value]); if (field.name === "prefStatus") setShowStatusOther(e.target.value === "other"); }}
                                                                className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-pink-500 checked:border-pink-500 cursor-pointer"
                                                            />
                                                            <span className="text-sm">{option.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {field.name === "prefStatus" && showStatusOther && (
                                                    <input type="text" value={prefStatusOther} onChange={(e) => setPrefStatusOther(e.target.value)} placeholder="Mô tả thêm..." className="w-full mt-3 px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                                )}
                                            </div>
                                        ))}

                                        {/* Other */}
                                        <div>
                                            <label className="block text-sm font-bold mb-2 text-pink-600">Khác</label>
                                            <input type="text" value={prefOther} onChange={(e) => setPrefOther(e.target.value)} placeholder="Yêu cầu khác về người ở cùng..." className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex gap-4 pt-4">
                                            <button type="button" onClick={() => router.push('/roomshare/create?step=3')} className="btn-secondary flex-1">Quay lại</button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!isStep4Complete) { setShowPreferencesValidation(true); } else { setShowPreferencesValidation(false); router.push('/roomshare/create?step=5'); }
                                                }}
                                                className={`flex-1 ${isStep4Complete ? 'btn-pink' : 'btn-start opacity-50'}`}
                                            >Tiếp tục</button>
                                        </div>
                                        {showPreferencesValidation && !isStep4Complete && (
                                            <div className="mt-4 p-4 bg-pink-50 border-2 border-pink-300 rounded-lg">
                                                <p className="text-sm font-semibold text-pink-600">⚠️ Bạn chưa điền đủ thông tin!</p>
                                                <p className="text-xs text-pink-600 mt-1">Vui lòng chọn tất cả các mục.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ===== STEP 5: Thông tin liên hệ ===== */}
                            {step === "5" && (
                                <>
                                    <div className="card bg-white">
                                        <h2 className="text-xl font-bold mb-6">Thông tin liên lạc</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-bold mb-2 text-pink-600">Số điện thoại <span className="text-pink-500">*</span></label>
                                                <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="0123456789" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-2 text-pink-600">Zalo</label>
                                                <input type="text" value={contactZalo} onChange={(e) => setContactZalo(e.target.value)} placeholder="Số Zalo (nếu khác SĐT)" disabled={sameAsPhone} className={`w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400 ${sameAsPhone ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`} />
                                                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                                    <input type="checkbox" checked={sameAsPhone} onChange={(e) => setSameAsPhone(e.target.checked)} className="w-4 h-4 rounded appearance-none border-2 border-black checked:bg-pink-500 checked:border-pink-500" />
                                                    <span className="text-sm">Dùng chung số điện thoại</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-2 text-pink-600">Facebook</label>
                                                <input type="text" value={contactFacebook} onChange={(e) => setContactFacebook(e.target.value)} placeholder="Link Facebook hoặc tên Facebook" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-2 text-pink-600">Instagram</label>
                                                <input type="text" value={contactInstagram} onChange={(e) => setContactInstagram(e.target.value)} placeholder="Username hoặc link Instagram" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => router.push('/roomshare/create?step=4')} className="btn-secondary flex-1">Trở lại</button>
                                        <button
                                            type="button"
                                            disabled={contactPhone.trim() === ""}
                                            onClick={async () => {
                                                try {
                                                    const { uploadImages } = await import('../../lib/imageUpload');
                                                    const listingId = `rs-${Date.now()}`;
                                                    const uploadedImages = images.length > 0
                                                        ? await uploadImages(images, "listings", listingId)
                                                        : [];

                                                    const { createListing } = await import('../../data/listings');
                                                    await createListing({
                                                        category: "roomshare",
                                                        roommateType: "have-room",
                                                        propertyType: propertyType as "house" | "apartment",
                                                        title,
                                                        introduction,
                                                        description: introduction,
                                                        othersIntro,
                                                        city,
                                                        district,
                                                        specificAddress,
                                                        buildingName: isApartment ? buildingName : "",
                                                        addressOther,
                                                        location: [specificAddress, buildingName, district, city].filter(Boolean).join(', '),
                                                        totalRooms,
                                                        roomSize,
                                                        currentOccupants,
                                                        price: rentPrice,
                                                        minContractDuration: minLeaseDuration,
                                                        costs: {
                                                            rent: rentPrice,
                                                            deposit,
                                                            electricity: costElectricity,
                                                            water: costWater,
                                                            internet: costInternet,
                                                            service: isApartment ? costService : "",
                                                            parking: costParking,
                                                            management: isApartment ? costManagement : "",
                                                            other: costOther,
                                                        },
                                                        images: uploadedImages,
                                                        amenities,
                                                        amenitiesOther,
                                                        moveInDate: "Linh hoạt",
                                                        author: user?.displayName || "Ẩn danh",
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

                                                    localStorage.removeItem('roomshare_draft');
                                                    setShowSuccessModal(true);
                                                } catch (error) {
                                                    console.error("Error creating listing:", error);
                                                    alert("Có lỗi khi đăng tin. Vui lòng thử lại.");
                                                }
                                            }}
                                            className={`flex-1 ${contactPhone.trim() === "" ? 'btn-start opacity-50 cursor-not-allowed' : 'btn-pink'}`}
                                        >Đăng tin</button>
                                    </div>
                                </>
                            )}

                        </div>

                        {/* Sidebar - Progress */}
                        <div className="space-y-6">
                            <div className="py-2">
                                <div className="relative pl-2">
                                    <div className="absolute left-[19px] top-4 bottom-4 w-1.5 bg-zinc-100 rounded-full" />
                                    <div className="absolute left-[19px] top-4 w-1.5 bg-black rounded-full transition-all duration-700 ease-out" style={{ height: `${progressPercentage}%` }} />
                                    <div className="space-y-8 relative">
                                        {[
                                            { step: 1, title: "Thông tin", subtitle: "Phòng & Địa chỉ", icon: <MapPin className="w-3 h-3" /> },
                                            { step: 2, title: "Hình ảnh", subtitle: "Tiện nghi & Ảnh", icon: <Camera className="w-3 h-3" /> },
                                            { step: 3, title: "Chi phí", subtitle: "Chi tiết giá", icon: <DollarSign className="w-3 h-3" /> },
                                            { step: 4, title: "Mong muốn", subtitle: "Người ở cùng", icon: <Users className="w-3 h-3" /> },
                                            { step: 5, title: "Liên hệ", subtitle: "SĐT & MXH", icon: <Phone className="w-3 h-3" /> },
                                        ].map((s) => (
                                            <div key={s.step} className="flex gap-4 items-center group">
                                                <div className={`relative z-10 w-6 h-6 rounded-full border-[3px] flex items-center justify-center bg-white transition-all duration-300 ${currentStep === s.step ? 'border-black scale-125 shadow-lg' : currentStep > s.step ? 'border-black' : 'border-zinc-200'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${currentStep >= s.step ? 'bg-black' : 'bg-zinc-200'} ${currentStep === s.step ? 'animate-pulse' : ''}`} />
                                                </div>
                                                <div className={`transition-opacity duration-300 ${currentStep >= s.step ? 'opacity-100' : 'opacity-40'}`}>
                                                    <p className="font-bold text-sm uppercase tracking-wide">{s.title}</p>
                                                    <p className="text-xs text-zinc-500">{s.subtitle}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ShareFooter />
        </div>
    );
}

export default function CreateRoomsharePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <CreateRoomshareContent />
        </Suspense>
    );
}
