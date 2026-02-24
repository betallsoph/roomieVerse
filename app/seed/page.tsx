"use client";

import { useState } from "react";
import { createListing } from "../data/listings";
import { useAuth } from "../contexts/AuthContext";

const seedData = [
  {
    title: "Tìm bạn nam ở ghép căn hộ 2PN Vinhomes Grand Park Q9",
    category: "roommate" as const,
    roommateType: "have-room" as const,
    introduction:
      "Mình làm IT, 25 tuổi, sống gọn gàng, ít nhậu. Tìm bạn cùng phòng hợp tính.",
    description:
      "Phòng rộng 25m², đầy đủ nội thất, view sông thoáng mát. Hiện tại có 2 bạn nam đang ở, cần thêm 1 bạn nữa. Tòa nhà có gym, hồ bơi, bảo vệ 24/7.",
    city: "Hồ Chí Minh",
    district: "Quận 9",
    specificAddress: "Tòa S5.03, Vinhomes Grand Park",
    buildingName: "Vinhomes Grand Park",
    location: "Vinhomes Grand Park, Quận 9, TP.HCM",
    price: "3500000",
    moveInDate: "01/04/2026",
    propertyTypes: ["apartment"],
    amenities: ["ac", "wifi", "washing", "fridge", "parking"],
    costs: {
      rent: "3.500.000",
      deposit: "3.500.000",
      electricity: "Theo số điện",
      water: "200.000",
      internet: "Miễn phí",
      service: "400.000",
      parking: "100.000",
    },
    roomSize: "25",
    currentOccupants: "2",
    totalRooms: "2",
    minContractDuration: "6 tháng",
    contact: { phone: "0901234567", zalo: "0901234567" },
    preferences: {
      gender: ["male"],
      status: ["worker"],
      schedule: ["flexible"],
      cleanliness: ["normal", "very-clean"],
      habits: ["no-smoke"],
      pets: ["no-pets"],
      moveInTime: ["early-month"],
    },
  },
  {
    title: "Tìm bạn cùng thuê chung cư Masteri Thảo Điền, ngân sách 4-5tr",
    category: "roommate" as const,
    roommateType: "find-partner" as const,
    introduction:
      "Mình 23 tuổi, làm designer, thích nấu ăn. Tìm bạn hợp tính để ở cùng.",
    description:
      "Đang tìm 1 bạn để cùng thuê căn 2PN tại Masteri Thảo Điền. Ngân sách mỗi người khoảng 4-5 triệu. Khu vực an ninh, gần trung tâm, nhiều tiện ích.",
    city: "Hồ Chí Minh",
    district: "Thành phố Thủ Đức",
    specificAddress: "",
    location: "Thảo Điền, TP. Thủ Đức, TP.HCM",
    price: "4500000",
    moveInDate: "15/04/2026",
    timeNegotiable: true,
    propertyTypes: ["apartment"],
    contact: { phone: "0912345678", zalo: "0912345678" },
    preferences: {
      gender: ["female"],
      status: ["worker", "student"],
      schedule: ["late", "flexible"],
      cleanliness: ["normal"],
      habits: ["no-smoke", "flexible"],
      pets: ["cats-ok"],
      moveInTime: ["early-month", "end-month"],
    },
  },
  {
    title: "Cho thuê phòng trọ mới xây gần ĐH Bách Khoa, full nội thất",
    category: "roomshare" as const,
    introduction:
      "Nhà mới xây xong, cho thuê phòng trọ cao cấp. Ưu tiên sinh viên và người đi làm.",
    description:
      "Phòng trọ mới xây, sạch sẽ, an ninh tốt. Gần ĐH Bách Khoa, ĐH Kinh tế. Phòng có ban công thoáng mát, giờ giấc tự do.",
    city: "Hồ Chí Minh",
    district: "Quận 10",
    specificAddress: "268 Lý Thường Kiệt",
    location: "268 Lý Thường Kiệt, Quận 10, TP.HCM",
    price: "3200000",
    moveInDate: "Dọn vào ngay",
    propertyTypes: ["house"],
    amenities: ["ac", "wifi", "fridge", "parking", "security"],
    costs: {
      rent: "3.200.000",
      deposit: "3.200.000",
      electricity: "3.500đ/kWh",
      water: "150.000",
      internet: "100.000",
      parking: "Miễn phí",
    },
    roomSize: "20",
    minContractDuration: "3 tháng",
    contact: { phone: "0923456789", zalo: "0923456789" },
  },
  {
    title: "Studio full nội thất trung tâm Q1 - Cho thuê ngắn ngày/tuần",
    category: "short-term" as const,
    introduction: "",
    description:
      "Studio 30m² full nội thất cao cấp ngay trung tâm Quận 1. Phù hợp dân công tác, du lịch ngắn ngày. Gần chợ Bến Thành, phố đi bộ Nguyễn Huệ.\n\nGiá bao gồm điện nước, wifi, dọn phòng 1 lần/tuần.",
    city: "Hồ Chí Minh",
    district: "Quận 1",
    specificAddress: "Đường Lý Tự Trọng",
    location: "Quận 1, TP.HCM",
    price: "500000",
    moveInDate: "Linh hoạt",
    amenities: ["ac", "wifi", "washing", "fridge", "elevator", "security"],
    contact: { phone: "0945678901", zalo: "0945678901" },
  },
  {
    title: "Sang lại căn hộ 1PN Sunrise City Q7 - HĐ còn 8 tháng",
    category: "sublease" as const,
    introduction: "",
    description:
      "Lý do sang lại: Được công ty chuyển ra Hà Nội công tác dài hạn.\n\nCăn 1PN 50m² tại Sunrise City, Quận 7. Full nội thất. View hồ bơi đẹp.\n\nHợp đồng còn 8 tháng, giá thuê 8.5tr/tháng (giá gốc 9.5tr). Đã đóng cọc 2 tháng.",
    city: "Hồ Chí Minh",
    district: "Quận 7",
    specificAddress: "Sunrise City, Nguyễn Hữu Thọ",
    buildingName: "Sunrise City",
    location: "Quận 7, TP.HCM",
    price: "8500000",
    moveInDate: "01/04/2026",
    minContractDuration: "8 tháng",
    amenities: ["ac", "wifi", "washing", "fridge", "elevator", "security", "parking"],
    costs: {
      rent: "8.500.000",
      deposit: "17.000.000",
      electricity: "Theo số điện",
      water: "300.000",
      internet: "Miễn phí",
      service: "600.000",
      parking: "1.200.000",
    },
    roomSize: "50",
    contact: { phone: "0967890123", zalo: "0967890123" },
  },
];

const FLOW_LABELS: Record<string, string> = {
  "roommate:have-room": "Có phòng tìm người",
  "roommate:find-partner": "Tìm bạn thuê chung",
  roomshare: "Tìm phòng share",
  "short-term": "Phòng ngắn ngày",
  sublease: "Sang nhượng",
};

export default function SeedPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState<string[]>([]);

  const handleSeed = async () => {
    if (!user) {
      setStatus("Bạn cần đăng nhập trước!");
      return;
    }
    setStatus("Đang tạo...");
    const ids: string[] = [];
    for (const data of seedData) {
      const flowKey =
        data.category === "roommate"
          ? `${data.category}:${(data as { roommateType?: string }).roommateType}`
          : data.category;
      const label = FLOW_LABELS[flowKey] || data.category;
      try {
        const id = await createListing({ ...data, userId: user.uid, author: user.displayName || user.email || "Ẩn danh" });
        ids.push(`${label}: ${data.title.slice(0, 40)}... → ${id}`);
      } catch (err) {
        ids.push(`FAIL [${label}]: ${err}`);
      }
    }
    setResults(ids);
    setStatus("Xong!");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seed Test Data</h1>
      <p className="text-sm text-zinc-500 mb-4">
        User: {user?.email || "Chưa đăng nhập"}
      </p>
      <button
        onClick={handleSeed}
        className="btn-primary mb-6"
        disabled={status === "Đang tạo..."}
      >
        {status === "Đang tạo..."
          ? "Đang tạo..."
          : "Tạo 5 listings (1 per flow)"}
      </button>
      <p className="font-bold mb-2">{status}</p>
      {results.map((r, i) => (
        <p key={i} className="text-sm text-zinc-700 mb-1">
          {r}
        </p>
      ))}
    </div>
  );
}
