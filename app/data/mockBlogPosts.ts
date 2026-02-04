export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  category: "tips" | "story" | "guide" | "news";
  image?: string;
  tags: string[];
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "tim-roommate-phu-hop-10-dieu-can-biet",
    title: "Tìm roommate phù hợp: 10 điều cần biết trước khi chung phòng",
    excerpt: "Bạn đang tìm người ở ghép? Đây là những điều quan trọng bạn cần xem xét để tìm được roommate hợp gu và sống chung hòa thuận.",
    content: `
# Tìm roommate phù hợp: 10 điều cần biết

Sống chung với người lạ không phải chuyện đơn giản. Đây là 10 điều quan trọng bạn cần biết:

## 1. Thói quen sinh hoạt
Hãy tìm hiểu về giờ giấc, thói quen sinh hoạt hàng ngày của roommate. Người thích thức khuya và người dậy sớm rất khó hòa hợp.

## 2. Tính cách và lối sống
Bạn thích yên tĩnh hay ồn ào? Thích giao lưu hay thích riêng tư? Những điều này rất quan trọng.

## 3. Vệ sinh và sự sạch sẽ
Một trong những lý do phổ biến nhất dẫn đến mâu thuẫn là vấn đề vệ sinh. Hãy thống nhất về tiêu chuẩn sạch sẽ ngay từ đầu.

## 4. Chi phí và tài chính
Rõ ràng về mọi chi phí: tiền nhà, điện nước, internet, ăn uống chung. Tránh những hiểu lầm về tiền bạc.

## 5. Không gian riêng tư
Dù sống chung nhưng mỗi người cần có không gian riêng. Tôn trọng ranh giới của nhau.

## 6. Quy tắc chung
Thiết lập các quy tắc cơ bản: khách đến chơi, sử dụng chung đồ dùng, tiếng ồn, vv.

## 7. Thú cưng
Nếu một bên có thú cưng, hãy thống nhất rõ ràng về vấn đề này từ đầu.

## 8. Chia sẻ công việc nhà
Ai làm gì? Ai dọn dẹp khu vực chung? Hãy chia công việc công bằng.

## 9. Giao tiếp
Giao tiếp cởi mở là chìa khóa. Có vấn đề gì hãy nói thẳng, đừng giữ trong lòng.

## 10. Thời gian cam kết
Thống nhất về thời gian ở tối thiểu để cả hai đều có kế hoạch rõ ràng.

**Kết luận**: Tìm roommate phù hợp không dễ, nhưng nếu làm đúng cách, bạn có thể tìm được người bạn tốt suốt đời!
    `,
    author: "Minh Anh",
    authorRole: "Founder RoomieVerse",
    publishedDate: "15/11/2024",
    readTime: "5 phút",
    category: "tips",
    tags: ["roommate", "tips", "sống chung"],
  },
  {
    id: 2,
    slug: "cau-chuyen-tim-phong-tro-o-sai-gon",
    title: "Câu chuyện tìm phòng trọ ở Sài Gòn: Từ 2 triệu đến 10 triệu/tháng",
    excerpt: "Hành trình 3 tháng tìm phòng trọ của một bạn trẻ mới đến Sài Gòn làm việc. Những trải nghiệm thú vị và bài học đáng giá.",
    content: `
# Câu chuyện tìm phòng trọ ở Sài Gòn

Mình là Linh, 23 tuổi, vừa tốt nghiệp và chuyển vào Sài Gòn làm việc cách đây 3 tháng. Đây là câu chuyện tìm phòng trọ của mình.

## Tuần 1: Cú sốc về giá cả
Lần đầu tiên nghe giá phòng trọ Sài Gòn, mình choáng váng. Một phòng 15m2 ở Q1 giá 5-6 triệu? What?!

## Tuần 2-3: Đi xem phòng marathon
Mình đã xem hơn 20 phòng trong 2 tuần. Có phòng đẹp nhưng xa công ty. Có phòng gần nhưng... xấu đến không thể tin được.

## Tuần 4-6: Tìm hiểu về các quận
Q1, Q2: Đẹp nhưng đắt
Q7: Đẹp, hơi xa
Bình Thạnh: Vừa túi tiền, gần trung tâm
Thủ Đức: Rẻ nhưng xa

## Tuần 7-8: Quyết định tìm roommate
Để tiết kiệm, mình quyết định tìm người ở ghép. Và đó là quyết định đúng đắn!

## Tháng 3: Tìm được "home sweet home"
Cuối cùng mình tìm được căn 2PN ở Bình Thạnh, share với 1 bạn nữ. Giá 4.5tr/người, gần công ty, sạch sẽ.

## Bài học rút ra:
1. Đừng vội vàng, hãy dành thời gian tìm hiểu
2. Roommate là lựa chọn tốt cho người mới
3. Bình Thạnh là quận "vàng" - vừa túi tiền vừa tiện
4. Đặt câu hỏi nhiều khi xem phòng
5. Trust your gut feeling!

Chúc các bạn tìm được căn phòng ưng ý nhé!
    `,
    author: "Linh Nguyễn",
    authorRole: "Content Writer",
    publishedDate: "10/11/2024",
    readTime: "4 phút",
    category: "story",
    tags: ["sài gòn", "kinh nghiệm", "story"],
  },
  {
    id: 3,
    slug: "huong-dan-viet-tin-dang-hap-dan",
    title: "Hướng dẫn viết tin đăng hấp dẫn: Thu hút roommate chất lượng",
    excerpt: "Một bài đăng tốt có thể giúp bạn tìm được roommate phù hợp nhanh hơn gấp 3 lần. Đây là cách viết tin đăng hiệu quả.",
    content: `
# Hướng dẫn viết tin đăng hấp dẫn

Bạn muốn tin đăng của mình nổi bật và thu hút đúng người? Hãy làm theo những tips sau:

## 1. Tiêu đề phải rõ ràng, cụ thể
❌ "Tìm người ở ghép"
✅ "Căn 2PN Bình Thạnh - tìm bạn nữ 23-28t, sạch sẽ, yên tĩnh"

## 2. Mô tả chi tiết về phòng
- Diện tích
- Nội thất
- Tiện ích xung quanh
- Giá cả rõ ràng
- Điện nước, internet

## 3. Nói về bản thân
Chia sẻ một chút về:
- Nghề nghiệp
- Thói quen sinh hoạt
- Sở thích
- Tính cách

## 4. Nêu rõ yêu cầu
Bạn tìm roommate như thế nào?
- Giới tính, độ tuổi
- Nghề nghiệp ổn định
- Không hút thuốc/thú cưng
- Vệ sinh, giờ giấc

## 5. Thêm ảnh thật
Ảnh đẹp tăng cơ hội được liên hệ lên 300%!

## 6. Thông tin liên hệ
- Số điện thoại
- Zalo/Telegram
- Thời gian có thể liên hệ

## Ví dụ một bài đăng tốt:

**"Căn 2PN Bình Thạnh 45m2 - tìm bạn nữ 23-30t"**

📍 Địa điểm: Bình Thạnh, gần Điện Biên Phủ
💰 Giá: 4.5tr/người (đã gồm điện nước, internet)
📅 Dọn vào: 01/12/2024

**Về căn phòng:**
- 2 phòng ngủ riêng biệt, mỗi phòng 12m2
- Phòng khách, bếp chung
- Full nội thất: giường, tủ, máy lạnh
- Máy giặt, tủ lạnh, bếp gas
- Có ban công, thoáng mát

**Về mình:**
Mình Anh, 25t, làm marketing. Thường đi làm 9-6, tối về thích nấu ăn, xem phim. Mình khá yên tĩnh, thích sạch sẽ gọn gàng.

**Tìm roommate:**
- Nữ 23-30 tuổi
- Có công việc ổn định
- Sạch sẽ, giờ giấc hợp lý
- Không hút thuốc

Liên hệ: 0901234567 (Anh)

---

Bài đăng tốt = Roommate chất lượng. Đầu tư thời gian viết kỹ nhé!
    `,
    author: "Đức Anh",
    authorRole: "Marketing Manager",
    publishedDate: "05/11/2024",
    readTime: "6 phút",
    category: "guide",
    tags: ["hướng dẫn", "tips", "đăng tin"],
  },
  {
    id: 4,
    slug: "top-5-quan-ly-tuong-cho-nguoi-tre",
    title: "Top 5 quận lý tưởng cho người trẻ thuê phòng ở Sài Gòn 2024",
    excerpt: "Phân tích chi tiết về 5 quận phổ biến nhất cho người trẻ thuê phòng: giá cả, tiện ích, giao thông, và cuộc sống.",
    content: `
# Top 5 quận lý tưởng cho người trẻ

Dựa trên khảo sát 500+ người dùng RoomieVerse, đây là 5 quận được yêu thích nhất:

## 1. Bình Thạnh ⭐⭐⭐⭐⭐
**Giá trung bình:** 3.5-5 triệu/người

**Ưu điểm:**
- Gần trung tâm nhưng giá hợp lý
- Nhiều quán ăn, cafe
- Giao thông thuận tiện
- Cộng đồng người trẻ đông

**Nhược điểm:**
- Một số khu vực hẹp, tắc đường
- Ồn ào vào cuối tuần

**Phù hợp:** Người đi làm văn phòng Q1, Q3

## 2. Quận 7 ⭐⭐⭐⭐
**Giá trung bình:** 4-6 triệu/người

**Ưu điểm:**
- Khu vực mới, hiện đại
- An ninh tốt
- Nhiều chung cư đẹp
- Không gian thoáng

**Nhược điểm:**
- Xa trung tâm
- Ít quán ăn bình dân
- Giá cao hơn trung bình

**Phù hợp:** Người làm Nam Sài Gòn, thích yên tĩnh

## 3. Thủ Đức ⭐⭐⭐⭐
**Giá trung bình:** 2.5-4 triệu/người

**Ưu điểm:**
- Giá rẻ nhất trong list
- Gần các trường ĐH
- Đang phát triển nhanh
- Nhiều lựa chọn

**Nhược điểm:**
- Xa trung tâm Q1
- Giao thông đông
- Chưa nhiều tiện ích

**Phù hợp:** Sinh viên, người mới đi làm

## 4. Quận 10 ⭐⭐⭐⭐
**Giá trung bình:** 3-5 triệu/người

**Ưu điểm:**
- Trung tâm thành phố
- Gần nhiều công ty
- An ninh tốt
- Nhiều trường học

**Nhược điểm:**
- Ít phòng cho thuê
- Giá cao
- Khu vực cũ, nhà cũ nhiều

**Phù hợp:** Người làm Q1, Q3, Q10

## 5. Quận 2 (Thủ Đức mới) ⭐⭐⭐⭐
**Giá trung bình:** 4.5-7 triệu/người

**Ưu điểm:**
- Khu vực cao cấp
- An ninh tốt nhất
- Nhiều expat, quốc tế
- Cảnh quan đẹp

**Nhược điểm:**
- Đắt nhất trong list
- Xa trung tâm
- Nhiều khu "quá fancy"

**Phù hợp:** Người thu nhập cao, thích lifestyle sang

## Kết luận
- **Bình Thạnh**: Lựa chọn cân bằng nhất
- **Q7**: Cho người thích hiện đại
- **Thủ Đức**: Cho túi tiền hạn hẹp
- **Q10**: Cho người làm trung tâm
- **Q2**: Cho người thích sang chảnh

Bạn thích quận nào? Comment cho mình biết nhé!
    `,
    author: "Minh Anh",
    authorRole: "Founder RoomieVerse",
    publishedDate: "01/11/2024",
    readTime: "7 phút",
    category: "guide",
    tags: ["sài gòn", "quận", "hướng dẫn"],
  },
  {
    id: 5,
    slug: "roomieverse-ra-mat-tinh-nang-moi",
    title: "RoomieVerse ra mắt tính năng Blog Community - Kết nối cộng đồng",
    excerpt: "Chúng tôi vừa ra mắt tính năng mới giúp người dùng chia sẻ câu chuyện, kinh nghiệm tìm phòng và kết nối với nhau.",
    content: `
# RoomieVerse ra mắt Blog Community

Chào các RoomieFam! 👋

Chúng mình vui mừng thông báo về tính năng mới: **Blog Community**!

## Tính năng mới gì?

### 1. Chia sẻ câu chuyện
Bạn có câu chuyện thú vị về việc tìm phòng trọ? Hãy chia sẻ với cộng đồng!

### 2. Tips & Guides
Bạn có kinh nghiệm tìm phòng? Viết hướng dẫn giúp người mới!

### 3. Hỏi đáp
Đặt câu hỏi và nhận câu trả lời từ cộng đồng.

### 4. Review khu vực
Chia sẻ đánh giá về các khu vực bạn đã ở.

## Tại sao chúng mình làm tính năng này?

RoomieVerse không chỉ là nơi tìm phòng trọ, mà còn là **cộng đồng** của những người trẻ đang tìm kiếm nơi ở lý tưởng.

Chúng mình tin rằng:
- Kinh nghiệm thực tế > Quảng cáo
- Cộng đồng > Cá nhân
- Chia sẻ > Giữ kín

## Cách tham gia?

1. **Đọc bài viết** từ những thành viên khác
2. **Viết bài** chia sẻ kinh nghiệm của bạn
3. **Comment** và tương tác
4. **Kết nối** với những người cùng suy nghĩ

## Chương trình đặc biệt

🎁 **Viết bài - Nhận quà:**
- Bài viết hay nhất tuần: Voucher 500k
- Top 3 người viết nhiều nhất: Premium Account 3 tháng
- Tất cả bài viết được duyệt: Tăng độ ưu tiên tin đăng

## Roadmap tiếp theo

Trong tháng 12, chúng mình sẽ ra mắt:
- ⭐ Tính năng Favorites (yêu thích bài đăng)
- 💬 Hệ thống tin nhắn trực tiếp
- 🔍 Tìm kiếm nâng cao
- ✅ Xác thực người dùng

## Lời cảm ơn

Cảm ơn 1000+ RoomieFam đã tin tưởng và sử dụng RoomieVerse!

Mọi góp ý vui lòng gửi về: hello@roomieverse.vn

Let's build the best roommate community together! 🏠❤️

---

**Team RoomieVerse**
Making roommate finding easier, one story at a time.
    `,
    author: "Team RoomieVerse",
    authorRole: "Product Team",
    publishedDate: "05/12/2024",
    readTime: "3 phút",
    category: "news",
    tags: ["news", "update", "announcement"],
  },
  {
    id: 6,
    slug: "5-loi-thuong-gap-khi-tim-roommate",
    title: "5 lỗi thường gặp khi tìm roommate và cách tránh",
    excerpt: "Những sai lầm phổ biến khiến bạn mất thời gian và tiền bạc khi tìm người ở ghép. Học cách tránh ngay từ đầu!",
    content: `
# 5 lỗi thường gặp khi tìm roommate

Đã có hơn 80% người dùng mắc ít nhất 1 trong 5 lỗi này. Bạn thì sao?

## Lỗi 1: Chọn theo giá rẻ nhất ❌
**Tại sao sai:** Giá rẻ thường đi kèm với vấn đề: phòng xấu, vị trí xa, người ở không ổn.

**Cách tránh:**
- Đặt budget hợp lý (30-40% thu nhập)
- Ưu tiên vị trí và chất lượng
- "Cheap is expensive" trong dài hạn

## Lỗi 2: Không gặp mặt trước ❌
**Tại sao sai:** Giao tiếp online khác gặp trực tiếp. Feeling khi gặp mặt rất quan trọng.

**Cách tránh:**
- Luôn gặp mặt trước khi quyết định
- Quan sát cách người ta sống
- Trust your gut!

## Lỗi 3: Không hỏi đủ câu hỏi ❌
**Tại sao sai:** Không hỏi = không biết = mâu thuẫn sau này.

**Cách tránh:**
Hỏi về:
- Thói quen sinh hoạt
- Vệ sinh, sạch sẽ
- Bạn bè thăm nhà
- Tiếng ồn, nhạc
- Nấu ăn, sử dụng chung

## Lỗi 4: Không làm rõ về tiền ❌
**Tại sao sai:** Tiền bạc là nguồn gốc mâu thuẫn #1.

**Cách tránh:**
- Viết rõ ràng mọi chi phí
- Ai trả gì, khi nào
- Tiền cọc, quy định
- Phạt nếu vi phạm

## Lỗi 5: Không set boundaries ❌
**Tại sao sai:** Không có ranh giới = xung đột không ngừng.

**Cách tránh:**
- Thỏa thuận quy tắc chung
- Không gian riêng của mỗi người
- Giờ giấc, khách đến nhà
- Sử dụng đồ chung

## Bonus Tips:

### ✅ Làm:
- Viết checklist trước khi tìm
- Hỏi nhiều, quan sát kỹ
- Thử ở 1-2 tháng trước (nếu được)
- Giữ liên lạc tốt

### ❌ Không làm:
- Quyết định vội vàng
- Tin 100% lời nói
- Bỏ qua red flags
- Ngại nói không

## Kết luận

Tìm roommate là nghệ thuật, không phải may mắn. Chuẩn bị kỹ = Thành công!

**Checklist tìm roommate:**
□ Gặp mặt trực tiếp
□ Xem phòng trực tiếp
□ Hỏi 20+ câu hỏi
□ Rõ ràng về tiền bạc
□ Set expectations & boundaries
□ Thử ở ngắn hạn (nếu được)
□ Trust your feeling

Good luck tìm roommate! 🍀
    `,
    author: "Thu Hương",
    authorRole: "Life Coach",
    publishedDate: "25/10/2024",
    readTime: "5 phút",
    category: "tips",
    tags: ["tips", "mistakes", "advice"],
  },
];
