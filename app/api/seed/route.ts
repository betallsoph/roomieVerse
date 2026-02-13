import { NextResponse } from "next/server";
import { getAdminDb } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const mockListings = [
  {
    id: "rm-seed-have-room",
    category: "roommate",
    roommateType: "have-room",
    title: "Cần tìm 1 bạn nam ở ghép chung cư Vinhomes Grand Park Q9",
    authorName: "Minh Tuấn",
    description: "Phòng rộng 25m², đầy đủ nội thất, view sông thoáng mát. Hiện tại có 2 bạn nam đang ở, cần thêm 1 bạn nữa.",
    introduction: "Mình là dân IT, 25 tuổi, sống gọn gàng, ít nhậu. Tìm bạn cùng phòng hợp tính.",
    price: "3.500.000đ/tháng",
    location: "Vinhomes Grand Park, Quận 9, TP.HCM",
    city: "Hồ Chí Minh",
    district: "Quận 9",
    specificAddress: "Tòa S5.03",
    buildingName: "Vinhomes Grand Park",
    moveInDate: "01/03/2026",
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
    othersIntro: "2 bạn nam, 1 bạn làm IT, 1 bạn làm marketing. Sống gọn gàng, ít nhậu.",
    minContractDuration: "6 tháng",
    preferences: {
      gender: ["male"],
      status: ["worker"],
      schedule: ["flexible"],
      cleanliness: ["normal", "very-clean"],
      habits: ["no-smoke"],
      pets: ["no-pets"],
      moveInTime: ["early-month"],
    },
    contact: {
      phone: "0901234567",
      zalo: "0901234567",
    },
    userId: "seed-user-1",
    status: "active",
  },
  {
    id: "rm-seed-find-partner",
    category: "roommate",
    roommateType: "find-partner",
    title: "Tìm bạn cùng thuê chung cư Masteri Thảo Điền, ngân sách 4-5tr",
    authorName: "Thanh Hà",
    description: "Mình đang tìm 1 bạn nữ để cùng thuê căn 2PN tại Masteri Thảo Điền. Ngân sách mỗi người khoảng 4-5 triệu.",
    introduction: "Mình 23 tuổi, làm designer, thích nấu ăn và nuôi mèo. Tìm bạn nữ hợp tính để ở cùng.",
    price: "4.000.000 - 5.000.000đ/tháng",
    location: "Thảo Điền, Quận 2, TP.HCM",
    city: "Hồ Chí Minh",
    district: "Thành phố Thủ Đức",
    moveInDate: "15/03/2026",
    timeNegotiable: true,
    propertyTypes: ["apartment"],
    preferences: {
      gender: ["female"],
      status: ["worker", "student"],
      schedule: ["late", "flexible"],
      cleanliness: ["normal"],
      habits: ["no-smoke", "flexible"],
      pets: ["cats-ok"],
      moveInTime: ["early-month", "end-month"],
    },
    contact: {
      phone: "0912345678",
      zalo: "0912345678",
      facebook: "thanhha.design",
    },
    userId: "seed-user-2",
    status: "active",
  },
  {
    id: "rs-seed-roomshare",
    category: "roomshare",
    title: "Cho thuê phòng trọ mới xây gần ĐH Bách Khoa, full nội thất",
    authorName: "Anh Khoa",
    description: "Phòng trọ mới xây, sạch sẽ, an ninh tốt. Gần ĐH Bách Khoa, ĐH Kinh tế, chợ Thủ Đức. Phòng có ban công thoáng mát.",
    introduction: "Nhà mình mới xây xong, cho thuê phòng trọ cao cấp. Ưu tiên sinh viên và người đi làm.",
    price: "3.200.000đ/tháng",
    location: "268 Lý Thường Kiệt, Quận 10, TP.HCM",
    city: "Hồ Chí Minh",
    district: "Quận 10",
    specificAddress: "268 Lý Thường Kiệt",
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
    contact: {
      phone: "0923456789",
      zalo: "0923456789",
    },
    userId: "seed-user-3",
    status: "active",
  },
];

export async function POST() {
  try {
    const db = getAdminDb();
    const batch = db.batch();

    for (const listing of mockListings) {
      const docRef = db.collection("listings").doc(listing.id);
      batch.set(docRef, {
        ...listing,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        viewCount: 0,
        favoriteCount: 0,
      });
    }

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Seeded ${mockListings.length} listings`,
      ids: mockListings.map((l) => l.id),
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
