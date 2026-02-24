import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

// 5 listings: 1 per flow (have-room, find-partner, roomshare, short-term, sublease)
// userId & authorName are injected at runtime from the authenticated user
function getMockListings(userId: string, authorName: string) {
  return [
    {
      id: "rm-seed-have-room",
      category: "roommate",
      roommateType: "have-room",
      title: "Cần tìm 1 bạn ở ghép chung cư Vinhomes Grand Park Q9",
      authorName,
      description:
        "Phòng rộng 25m², đầy đủ nội thất, view sông thoáng mát. Hiện tại có 2 bạn đang ở, cần thêm 1 bạn nữa.",
      introduction:
        "Mình làm IT, 25 tuổi, sống gọn gàng, ít nhậu. Tìm bạn cùng phòng hợp tính.",
      price: "3.500.000đ/tháng",
      location: "Vinhomes Grand Park, Quận 9, TP.HCM",
      city: "Hồ Chí Minh",
      district: "Quận 9",
      specificAddress: "Tòa S5.03",
      buildingName: "Vinhomes Grand Park",
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
      othersIntro:
        "2 bạn nam, 1 bạn làm IT, 1 bạn làm marketing. Sống gọn gàng.",
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
      contact: { phone: "0901234567", zalo: "0901234567" },
      userId,
      status: "active",
    },
    {
      id: "rm-seed-find-partner",
      category: "roommate",
      roommateType: "find-partner",
      title: "Tìm bạn cùng thuê chung cư Masteri Thảo Điền, ngân sách 4-5tr",
      authorName,
      description:
        "Đang tìm 1 bạn để cùng thuê căn 2PN tại Masteri Thảo Điền. Ngân sách mỗi người khoảng 4-5 triệu.",
      introduction:
        "Mình 23 tuổi, làm designer, thích nấu ăn. Tìm bạn hợp tính để ở cùng.",
      price: "4.500.000đ/tháng",
      location: "Thảo Điền, TP. Thủ Đức, TP.HCM",
      city: "Hồ Chí Minh",
      district: "Thành phố Thủ Đức",
      moveInDate: "15/04/2026",
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
      contact: { phone: "0912345678", zalo: "0912345678" },
      userId,
      status: "active",
    },
    {
      id: "rs-seed-roomshare",
      category: "roomshare",
      title: "Cho thuê phòng trọ mới xây gần ĐH Bách Khoa, full nội thất",
      authorName,
      description:
        "Phòng trọ mới xây, sạch sẽ, an ninh tốt. Gần ĐH Bách Khoa, ĐH Kinh tế. Phòng có ban công thoáng mát.",
      introduction:
        "Nhà mới xây xong, cho thuê phòng trọ cao cấp. Ưu tiên sinh viên và người đi làm.",
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
      contact: { phone: "0923456789", zalo: "0923456789" },
      userId,
      status: "active",
    },
    {
      id: "st-seed-studio-q1",
      category: "short-term",
      title: "Studio full nội thất trung tâm Q1 - Cho thuê ngắn ngày/tuần",
      authorName,
      description:
        "Studio 30m² full nội thất cao cấp ngay trung tâm Quận 1. Phù hợp dân công tác, du lịch ngắn ngày. Gần chợ Bến Thành, phố đi bộ Nguyễn Huệ.\n\nGiá bao gồm điện nước, wifi, dọn phòng 1 lần/tuần.",
      price: "500.000đ/đêm",
      location: "Quận 1, TP.HCM",
      city: "Hồ Chí Minh",
      district: "Quận 1",
      specificAddress: "Đường Lý Tự Trọng",
      moveInDate: "Linh hoạt",
      amenities: ["ac", "wifi", "washing", "fridge", "elevator", "security"],
      contact: { phone: "0945678901", zalo: "0945678901" },
      userId,
      status: "active",
    },
    {
      id: "sl-seed-apartment-q7",
      category: "sublease",
      title: "Sang lại căn hộ 1PN Sunrise City Q7 - HĐ còn 8 tháng",
      authorName,
      description:
        "Lý do sang lại: Được công ty chuyển ra Hà Nội công tác dài hạn nên cần sang lại phòng gấp.\n\nCăn 1PN 50m² tại Sunrise City, Quận 7. Full nội thất. View hồ bơi đẹp.\n\nHợp đồng còn 8 tháng, giá thuê 8.5tr/tháng (giá gốc 9.5tr). Đã đóng cọc 2 tháng.",
      price: "8.500.000đ/tháng",
      location: "Quận 7, TP.HCM",
      city: "Hồ Chí Minh",
      district: "Quận 7",
      specificAddress: "Sunrise City, Nguyễn Hữu Thọ",
      buildingName: "Sunrise City",
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
      userId,
      status: "active",
    },
  ];
}

// Clear all listings
export async function DELETE() {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection("listings").get();

    if (snapshot.empty) {
      return NextResponse.json({ success: true, message: "No listings to delete" });
    }

    const batches: FirebaseFirestore.WriteBatch[] = [];
    let batch = db.batch();
    let count = 0;

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      count++;
      if (count % 500 === 0) {
        batches.push(batch);
        batch = db.batch();
      }
    });
    batches.push(batch);

    await Promise.all(batches.map((b) => b.commit()));

    return NextResponse.json({ success: true, message: `Deleted ${count} listings` });
  } catch (error) {
    console.error("Clear listings error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// Seed listings — requires auth so userId & authorName come from the caller
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    let userId = "demo-user";
    let authorName = "Demo User";

    // If authenticated, use the caller's info
    if (authHeader?.startsWith("Bearer ")) {
      const idToken = authHeader.split("Bearer ")[1];
      const adminAuth = getAdminAuth();
      const decoded = await adminAuth.verifyIdToken(idToken);
      userId = decoded.uid;
      authorName = decoded.name || decoded.email || "Demo User";
    }

    const db = getAdminDb();
    const listings = getMockListings(userId, authorName);
    const batch = db.batch();

    for (const listing of listings) {
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
      message: `Seeded ${listings.length} listings for ${authorName}`,
      ids: listings.map((l) => l.id),
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
