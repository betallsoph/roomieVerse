# Biểu Đồ Use Case (Use Case Diagram) - roomieVerse

Dưới đây là các bản vẽ và danh sách Use Case thiết kế cho hệ thống **roomieVerse**, được chia theo từng nhóm vai trò (Actor) để bạn dễ dàng đưa vào báo cáo môn học.

## 1. Danh sách Tác nhân (Actors)

Hệ thống có 3 tác nhân chính:
1. **Khách viếng thăm (Guest):** Người dùng chưa đăng nhập vào hệ thống.
2. **Thành viên (Member):** Người dùng đã đăng ký và đăng nhập thành công. (Kế thừa quyền của Guest).
3. **Quản trị viên (Admin):** Người dùng có quyền truy cập trang quản trị hệ thống.

---

## 2. Biểu đồ Use Case Tổng thể

Bạn có thể copy đoạn mã Mermaid này và dán vào các trình duyệt hỗ trợ (chẳng hạn như [Mermaid Live Editor](https://mermaid.live/) hoặc Notion, GitHub) để lấy hình ảnh bỏ vào file Word báo cáo.

```mermaid
flowchart LR
    %% Định dạng style cho Actor
    classDef actor fill:transparent,stroke:none,color:#000;

    %% Định nghĩa Actors
    Guest(("Khách (Guest)")):::actor
    Member((nThành viên (Member)")):::actor
    Admin(("👨‍💼\nQuản trị (Admin)")):::actor

    %% Hệ thống
    subgraph roomieVerse["Hệ thống roomieVerse"]
        direction TB
        %% Khách
        UC1("Xem danh sách phòng")
        UC2("Xem chi tiết phòng")
        UC3("Đăng ký / Đăng nhập")
        UC_Search("Tìm kiếm / Lọc phòng")
        
        %% Thành viên
        UC4("Quản lý hồ sơ cá nhân")
        UC5("Đăng tin (Tìm phòng / Tìm bạn)")
        UC6("Quản lý tin đăng của mình")
        UC7("Tương tác Cộng đồng (Đăng bài, Cmt)")
        UC8("Gửi Báo cáo vi phạm")
        UC9("Lưu tin yêu thích")
        
        %% Admin
        UC10("Duyệt / Từ chối tin đăng")
        UC11("Quản lý Cộng đồng & Xét duyệt")
        UC12("Xử lý Báo cáo vi phạm")
        UC13("Quản lý Blog")
        UC14("Quản lý người dùng hệ thống")
    end

    %% Mối quan hệ Khách
    Guest --> UC1
    Guest --> UC2
    Guest --> UC3
    Guest --> UC_Search

    %% Mối quan hệ Thành viên
    Member --> UC1
    Member --> UC2
    Member --> UC_Search
    Member --> UC4
    Member --> UC5
    Member --> UC6
    Member --> UC7
    Member --> UC8
    Member --> UC9

    %% Mối quan hệ Cấu trúc (Include/Extend) - Nâng cao cho báo cáo
    UC5 -. "<<include>>" .-> UC3
    UC6 -. "<<include>>" .-> UC3
    UC7 -. "<<include>>" .-> UC3

    %% Mối quan hệ Admin
    Admin --> UC10
    Admin --> UC11
    Admin --> UC12
    Admin --> UC13
    Admin --> UC14
```

---

## 3. Đặc tả các Use Case chính (Dùng cho Báo Cáo)

Dưới đây là nội dung văn bản cụ thể để bạn cho vào bảng phân tích (Đặc tả Use Case) trong quyển báo cáo:

### Phân hệ Người dùng (Guest & Member)

| Mã UC | Tên Use Case | Tác nhân | Mô tả tóm tắt |
| :--- | :--- | :--- | :--- |
| **UC01** | Đăng ký / Đăng nhập | Khách, Thành viên | Cho phép người dùng tạo tài khoản mới bằng Email/SĐT hoặc đăng nhập qua Google để truy cập tính năng của hệ thống. |
| **UC02** | Xem danh sách tin đăng | Khách, Thành viên | Xem các tin "Có phòng sẵn", "Tìm người ở ghép", "Phòng ngắn ngày", "Sang nhượng" trên trang chủ/trang share. |
| **UC03** | Tìm kiếm và Lọc tin | Khách, Thành viên | Người dùng kết hợp bộ lọc (Khu vực, Giá, Loại phòng) để tìm kiếm các tin phù hợp nhất. |
| **UC04** | Xem chi tiết tin đăng | Khách, Thành viên | Xem hình ảnh, mô tả, nội quy, tiện ích và số điện thoại liên hệ của người đăng bài. |
| **UC05** | Quản lý Hồ sơ | Thành viên | Người dùng có thể cập nhật thông tin cá nhân (Tên, Năm sinh, Nghề nghiệp, Mô tả lối sống) để người khác tìm hiểu. |
| **UC06** | Đăng tin mới | Thành viên | Điền form chi tiết để đăng thông tin tìm phòng hoặc chia sẻ phòng. Tin sẽ vào trạng thái "Chờ duyệt". |
| **UC07** | Quản lý tin cá nhân | Thành viên | Xem lại các tin đã đăng, tiến hành ẩn tin (khi đã tìm được người) hoặc xóa tin. |
| **UC08** | Tham gia Cộng đồng | Thành viên | Đăng bài viết chia sẻ kinh nghiệm (Tips, Review) hoặc bình luận vào bài của người khác. |
| **UC09** | Báo cáo vi phạm | Thành viên | Báo cáo các tin đăng tà đạo, sai sự thật hoặc người dùng lừa đảo gửi về cho Admin. |

### Phân hệ Quản trị (Admin)

| Mã UC | Tên Use Case | Tác nhân | Mô tả tóm tắt |
| :--- | :--- | :--- | :--- |
| **UC10** | Duyệt tin đăng | Admin | Kiểm tra chất lượng của tin đăng mới. Duyệt để hiển thị public hoặc từ chối kèm lý do. |
| **UC11** | Duyệt bài Cộng đồng | Admin | Kiểm duyệt các bài viết blog/review từ user đăng lên box cộng đồng. |
| **UC12** | Xử lý Báo cáo | Admin | Đọc báo cáo vi phạm từ user hằng ngày, đưa ra quyết định khóa bài hoặc khóa tài khoản của người vi phạm. |
| **UC13** | Quản lý Tin Blog | Admin | Tạo, chỉnh sửa, định dạng và xuất bản các bài viết trên chuyên mục Blog của dự án. |
| **UC14** | Quản lý Hệ thống | Admin | Xem thống kê số lượng User, quản lý trạng thái hoạt động của danh sách tài khoản (Active/Banned). |

---
**💡 Tips cho báo cáo:** Bạn có thể copy đoạn Mermaid kia dán vào https://mermaid.live, sau đó tùy chỉnh màu sắc và xuất dưới dạng `.PNG` siêu nét để chèn vào file Word nhé!
