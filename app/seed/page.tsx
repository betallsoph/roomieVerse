"use client";

import { useEffect, useState } from "react";
import { createListing } from "../data/listings";
import { useAuth } from "../contexts/AuthContext";

const seedData = [
  // === HAVE-ROOM: Short ===
  {
    title: "Ghép Q7",
    category: "roommate" as const,
    roommateType: "have-room" as const,
    introduction: "Cần bạn.",
    description: "Cần bạn.",
    city: "Hồ Chí Minh",
    district: "Quận 7",
    specificAddress: "Sunrise City",
    location: "Sunrise City, Q7, HCM",
    price: "3500000",
    moveInDate: "Tháng 3",
    propertyTypes: ["chung-cu"],
    phone: "0901234567",
    author: "An",
    postedDate: "20/2/2026",
    preferences: { gender: ["male"], status: ["single"], schedule: ["office"], cleanliness: ["clean"], habits: ["no-smoke"], pets: ["no-pet"], moveInTime: ["asap"] },
  },
  // === HAVE-ROOM: Normal ===
  {
    title: "Tìm bạn nam ở ghép căn hộ 2PN Vinhomes Grand Park Q9",
    category: "roommate" as const,
    roommateType: "have-room" as const,
    introduction: "Phòng rộng 25m², đầy đủ nội thất, view sông thoáng mát. Hiện tại có 2 bạn nam đang ở, cần thêm 1 bạn nữa.",
    description: "Phòng rộng 25m², đầy đủ nội thất, view sông thoáng mát. Hiện tại có 2 bạn nam đang ở, cần thêm 1 bạn nữa.",
    city: "Hồ Chí Minh",
    district: "Quận 9",
    specificAddress: "Vinhomes Grand Park, Nguyễn Xiển",
    location: "Vinhomes Grand Park, Quận 9, TP.HCM",
    price: "3500000",
    moveInDate: "01/03/2026",
    propertyTypes: ["chung-cu"],
    phone: "0912345678",
    author: "Minh Tuấn",
    postedDate: "18/2/2026",
    preferences: { gender: ["male"], status: ["single", "student"], schedule: ["office"], cleanliness: ["clean"], habits: ["no-smoke"], pets: ["no-pet"], moveInTime: ["early-month"] },
  },
  // === HAVE-ROOM: Long ===
  {
    title: "Cần tìm 1 bạn nữ ở ghép căn hộ Studio cao cấp The Marq Quận 1 - Full nội thất - View Bitexco tuyệt đẹp",
    category: "roommate" as const,
    roommateType: "have-room" as const,
    introduction: "Mình là nữ, 25 tuổi, đang làm văn phòng ở Quận 1. Sinh hoạt điều độ, thích gọn gàng sạch sẽ. Không hút thuốc, không nuôi thú cưng. Cuối tuần hay nấu ăn ở nhà, thỉnh thoảng đi cafe với bạn bè. Căn hộ nằm ở tầng 28, view thành phố cực đẹp, nhìn thẳng ra Bitexco. Đầy đủ nội thất cao cấp: máy giặt sấy, tủ lạnh, lò vi sóng, bếp từ, máy lọc nước. Tòa nhà có gym, hồ bơi, sauna miễn phí. Bảo vệ 24/7. Gần Takashimaya, chợ Bến Thành, các quán ăn ngon. Ưu tiên bạn nữ đi làm văn phòng, sống sạch sẽ, giờ giấc ổn định. Mình rất thân thiện và dễ sống, mong tìm được bạn ở cùng hợp ý.",
    description: "Mình là nữ, 25 tuổi, đang làm văn phòng ở Quận 1. Sinh hoạt điều độ, thích gọn gàng sạch sẽ. Không hút thuốc, không nuôi thú cưng. Cuối tuần hay nấu ăn ở nhà, thỉnh thoảng đi cafe với bạn bè. Căn hộ nằm ở tầng 28, view thành phố cực đẹp, nhìn thẳng ra Bitexco. Đầy đủ nội thất cao cấp: máy giặt sấy, tủ lạnh, lò vi sóng, bếp từ, máy lọc nước. Tòa nhà có gym, hồ bơi, sauna miễn phí. Bảo vệ 24/7.",
    city: "Hồ Chí Minh",
    district: "Quận 1",
    specificAddress: "The Marq, 29B Nguyễn Đình Chiểu, Phường Đa Kao",
    location: "The Marq, 29B Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, Hồ Chí Minh",
    price: "8000000",
    moveInDate: "Từ 15/03/2026, có thể thương lượng",
    propertyTypes: ["chung-cu"],
    phone: "0987654321",
    author: "Ngọc Trâm",
    postedDate: "15/2/2026",
    preferences: { gender: ["female"], status: ["single", "working"], schedule: ["office"], cleanliness: ["very-clean"], habits: ["no-smoke", "no-drink"], pets: ["no-pet"], moveInTime: ["any"] },
  },
  // === FIND-PARTNER: Short ===
  {
    title: "Tìm phòng Q3",
    category: "roommate" as const,
    roommateType: "find-partner" as const,
    introduction: "Cần phòng gấp.",
    description: "Cần phòng gấp.",
    city: "Hồ Chí Minh",
    district: "Quận 3",
    specificAddress: "",
    location: "Q3, HCM",
    price: "4000000",
    moveInDate: "ASAP",
    propertyTypes: ["chung-cu", "nha-tro"],
    phone: "0909876543",
    author: "Hùng",
    postedDate: "20/2/2026",
    preferences: { gender: ["any"], status: ["any"], schedule: ["any"], cleanliness: ["clean"], habits: ["no-smoke"], pets: ["no-pet"], moveInTime: ["asap"] },
  },
  // === FIND-PARTNER: Normal ===
  {
    title: "Nam 23t tìm bạn share chi phí thuê Q2",
    category: "roommate" as const,
    roommateType: "find-partner" as const,
    introduction: "Mình nam 23 tuổi, đang làm IT ở Thủ Đức. Muốn tìm bạn nam cùng share phòng khu vực Quận 2 hoặc Thủ Đức. Budget khoảng 3-4 triệu/người.",
    description: "Mình nam 23 tuổi, đang làm IT ở Thủ Đức. Muốn tìm bạn nam cùng share phòng khu vực Quận 2 hoặc Thủ Đức. Budget khoảng 3-4 triệu/người.",
    city: "Hồ Chí Minh",
    district: "Quận 2",
    specificAddress: "",
    location: "Quận 2, TP.HCM",
    price: "4000000",
    moveInDate: "Đầu tháng 3/2026",
    propertyTypes: ["chung-cu"],
    phone: "0911222333",
    author: "Đức Anh",
    postedDate: "17/2/2026",
    preferences: { gender: ["male"], status: ["working"], schedule: ["office"], cleanliness: ["clean"], habits: ["no-smoke"], pets: ["no-pet"], moveInTime: ["early-month"] },
  },
  // === FIND-PARTNER: Long ===
  {
    title: "Nữ 28t tìm bạn nữ cùng thuê căn hộ 2PN khu vực Bình Thạnh hoặc Phú Nhuận - Ưu tiên bạn đi làm văn phòng giờ hành chính",
    category: "roommate" as const,
    roommateType: "find-partner" as const,
    introduction: "Mình nữ 28 tuổi, hiện đang làm marketing ở Quận 1. Mình muốn tìm 1 bạn nữ để cùng thuê căn hộ 2 phòng ngủ ở khu vực Bình Thạnh hoặc Phú Nhuận. Mình thích sống sạch sẽ, gọn gàng, không hút thuốc, không nuôi thú cưng. Cuối tuần mình hay đi yoga, đọc sách, thỉnh thoảng nấu ăn. Mình ưu tiên bạn cũng đi làm giờ hành chính, sống ngăn nắp, tôn trọng không gian riêng của nhau. Budget mình khoảng 4-5 triệu/người (chưa bao gồm điện nước). Mình có thể dọn vào từ đầu tháng 4, nhưng nếu tìm được phòng sớm hơn thì càng tốt. Rất mong tìm được bạn ở cùng hợp ý!",
    description: "Mình nữ 28 tuổi, hiện đang làm marketing ở Quận 1. Mình muốn tìm 1 bạn nữ để cùng thuê căn hộ 2 phòng ngủ ở khu vực Bình Thạnh hoặc Phú Nhuận. Mình thích sống sạch sẽ, gọn gàng, không hút thuốc, không nuôi thú cưng. Cuối tuần mình hay đi yoga, đọc sách, thỉnh thoảng nấu ăn.",
    city: "Hồ Chí Minh",
    district: "Bình Thạnh",
    specificAddress: "",
    location: "Bình Thạnh hoặc Phú Nhuận, TP.HCM",
    price: "5000000",
    moveInDate: "Đầu tháng 4/2026, có thể sớm hơn nếu tìm được phòng",
    propertyTypes: ["chung-cu"],
    phone: "0933444555",
    author: "Thu Hương",
    postedDate: "16/2/2026",
    preferences: { gender: ["female"], status: ["working"], schedule: ["office"], cleanliness: ["very-clean"], habits: ["no-smoke", "no-drink"], pets: ["no-pet"], moveInTime: ["early-month", "any"] },
  },
];

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
      try {
        const id = await createListing({ ...data, userId: user.uid });
        ids.push(`${data.title.slice(0, 30)}... → ${id}`);
      } catch (err) {
        ids.push(`FAIL: ${data.title.slice(0, 30)}... → ${err}`);
      }
    }
    setResults(ids);
    setStatus("Xong!");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seed Test Data</h1>
      <p className="text-sm text-zinc-500 mb-4">User: {user?.email || "Chưa đăng nhập"}</p>
      <button onClick={handleSeed} className="btn-primary mb-6" disabled={status === "Đang tạo..."}>
        {status === "Đang tạo..." ? "Đang tạo..." : "Tạo 6 listings (3 have-room + 3 find-partner)"}
      </button>
      <p className="font-bold mb-2">{status}</p>
      {results.map((r, i) => (
        <p key={i} className="text-sm text-zinc-700 mb-1">{r}</p>
      ))}
    </div>
  );
}
