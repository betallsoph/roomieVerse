# Danh Sách Sequence Diagram - roomieVerse (Mermaid)

Dưới đây là mã Mermaid cho 29 Sequence Diagrams (Biểu đồ Tuần tự) tương ứng với 29 chức năng trong bản thiết kế. Bạn có thể copy từng đoạn mã và dán vào [Mermaid Live Editor](https://mermaid.live/) hoặc chèn trực tiếp vào file Word/Markdown.

---

### 1. Phân Hệ Xác Thực (Authentication)

#### 1. AUTH-101: Đăng ký / Đăng nhập Email
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant Auth as Firebase Auth
    participant DB as Firestore (users)

    U->>UI: Nhập Email, Password, (Tên)
    UI->>UI: Kiểm tra dữ liệu (Validation)
    UI->>Auth: Gửi request Đăng nhập / Đăng ký
    Auth-->>UI: Trả về Xác thực & UID
    opt Nếu là Đăng ký mới
        UI->>DB: Ghi dữ liệu Profile & Role='user'
        DB-->>UI: Xác nhận tạo mới
    end
    UI->>U: Điều hướng vào trang chủ
```

#### 2. AUTH-102: Đăng nhập Google
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant Auth as Firebase Auth
    participant DB as Firestore (users)

    U->>UI: Click Đăng nhập Google
    UI->>Auth: Mở Popup Google OAuth
    Auth-->>UI: Thông tin Google (Email, UID)
    UI->>DB: Kiểm tra tài khoản
    alt Lần đầu đăng nhập
        DB-->>UI: Chưa có Data
        UI->>DB: Khởi tạo Profile (Role='user')
    else Đã tồn tại
        DB-->>UI: Trả về thông tin User
    end
    UI->>U: Cập nhật Session & Điều hướng
```

#### 3. AUTH-103: Quên Mật Khẩu
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant Auth as Firebase Auth
    participant Mail as Email Service

    U->>UI: Nhập Email nhận mã
    UI->>UI: Kiểm tra định dạng Email
    UI->>Auth: sendPasswordResetEmail(email)
    Auth->>Mail: Gửi link tạo lại Mật khẩu
    Mail-->>U: Nhận Email
    Auth-->>UI: Thông báo thành công
    UI->>U: "Vui lòng kiểm tra hộp thư"
```

#### 4. AUTH-104: Đăng Xuất
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant Auth as Firebase Auth

    U->>UI: Click Đăng xuất
    UI->>Auth: signOut()
    Auth-->>UI: Xác nhận đăng xuất
    UI->>UI: Xóa Session / Cập nhật Context
    UI->>U: Chuyển hướng về Landing Page (/)
```

---

### 2. Phân Hệ Hồ Sơ (Profile)

#### 5. PROF-201: Cập nhật Thông tin
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant DB as Firestore (users)

    U->>UI: Điền form Tên, SĐT, Sở thích
    UI->>UI: Xác thực Phone Format
    UI->>DB: PATCH Data (cập nhật trường tương ứng)
    DB-->>UI: Success
    UI->>U: Cập nhật View trang cá nhân
```

#### 6. PROF-202: Cập nhật Avatar
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant S3 as AWS S3 Storage
    participant DB as Firestore (users)

    U->>UI: Bấm File Ảnh Mới
    UI->>S3: Upload ảnh (Yêu cầu Presigned URL)
    S3-->>UI: Upload thành công & Trả URL Ảnh
    UI->>DB: Update trường 'avatarUrl'
    DB-->>UI: Cập nhật thành công
    UI->>U: Render lại hình ảnh trên Website
```

---

### 3. Phân Hệ Đăng Tin & Tìm Phòng (Posts)

#### 7. POST-301: Xem Danh sách
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant DB as Firestore (posts)

    U->>UI: Truy cập trang Share
    UI->>DB: Query Lấy tin: status='active', order=desc
    DB-->>UI: Trả về cục Data (JSON)
    UI->>UI: Phân trang & Render giao diện Card
    UI->>U: Hiển thị danh sách phòng
```

#### 8. POST-302: Lọc & Tìm kiếm
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant DB as Firestore (posts)

    U->>UI: Chọn Khoảng giá / Vùng / Nhập chữ
    UI->>DB: Query Lọc theo Field Giá, Vị trí
    DB-->>UI: Mảng các bài viết khớp
    UI->>UI: Lọc tiếp text dưới Client (nếu cần) & Re-render
    UI->>U: Kết quả lọc mới nhất
```

#### 9. POST-303: Xem Bài Chi Tiết
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant DB as Firestore (posts)

    U->>UI: Bấm vào 1 Card bài viết (ID)
    UI->>DB: Get Document(ID)
    DB-->>UI: Chi tiết Object bài đăng
    UI->>UI: Load trang (Carousel Ảnh, Chi tiết)
    UI->>U: View hoàn chỉnh của bài đăng
```

#### 10. POST-304: Đăng tin Phòng / Share
```mermaid
sequenceDiagram
    actor U as Người Dùng
    participant UI as Giao diện Web
    participant S3 as AWS S3 Storage
    participant DB as Firestore (posts)

    U->>UI: Điền Form Thông tin, Tải bộ ảnh (Tối đa X pic)
    UI->>S3: Upload bộ ảnh
    S3-->>UI: Nhận Mảng Object URL
    UI->>DB: Add() Record: Ảnh url, mô tả, vị trí, giá, status='pending'
    DB-->>UI: Tạo document thành công
    UI->>U: Báo "Bài đăng đang chờ duyệt"
```

#### 11. POST-305: Đăng tin tìm Roommate
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant DB as Firestore (posts)

    U->>UI: Nhập form Yêu cầu ghép (Budget, Yêu cầu)
    UI->>DB: Create Document: Type='Looking', status='pending'
    DB-->>UI: Confirm
    UI->>U: Alert chờ Admin duyệt
```

#### 12. POST-306: Ẩn/Hiện Tin (Toggle Status)
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Trang cá nhân
    participant DB as Firestore (posts)

    U->>UI: Click "Tạm Ẩn" / "Hiện lại"
    UI->>DB: Update 'status' toggle (hidden/active)
    DB-->>UI: OK
    UI->>U: Badge trên Card đổi màu
```

#### 13. POST-307: Xóa Tin Của Mình
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Trang cá nhân
    participant S3 as AWS S3 Storage
    participant DB as Firestore (posts)

    U->>UI: Click "Xóa bài"
    UI->>U: (Confirm Modal) "Xác nhận xóa?"
    U->>UI: "Có"
    UI->>S3: Xóa List ID Ảnh tương ứng
    UI->>DB: Delete Document
    DB-->>UI: OK
    UI->>UI: Cập nhật DOM, xóa Card khỏi danh sách
```

#### 14. POST-308: Lưu Tim (Favorite)
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant DB as Firestore (saved_posts)

    U->>UI: Ấn Icon Trái tim trên Tin
    UI->>DB: Update array Favorites của User-ID
    DB-->>UI: Xác nhận
    UI->>U: Icon đổi màu Đỏ / Bỏ đỏ
```

---

### 4. Phân Hệ Cộng Đồng (Community)

#### 15. COMM-401: Xem Tab Cộng Đồng
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant DB as Firestore (community_posts)

    U->>UI: Truy cập tab Cộng Đồng
    UI->>DB: Query bài post mới nhất / Hot
    DB-->>UI: Array Post (Title, Tags, Stats)
    UI->>U: Render List
```

#### 16. COMM-402: Tạo Topic Mới
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Form Nhập bài
    participant API as Censor Logic (Tục tĩu)
    participant DB as Firestore (community_posts)

    U->>UI: Điền Title, Content, Chọn Tags
    UI->>API: Text filter module
    API-->>UI: Valid
    UI->>DB: Insert Post
    DB-->>UI: Document ID
    UI->>U: Load thẳng bài đăng mới nhất lên đầu Top
```

#### 17. COMM-403: Quản lý Bình luận
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Tab Cộng đồng chi tiết
    participant DB as Sub-collection (comments)

    U->>UI: Nhập text "Bình luận"
    UI->>DB: Thêm record comment gắn với Post-ID
    DB-->>UI: Ok
    UI->>DB: Tăng lượt CountCmt trong Post
    DB-->>UI: Ok
    UI->>U: Render Comment box mới lên mành hình
```

#### 18. COMM-404: Bấm Like Thảo luận
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Tab Cộng đồng
    participant DB as Database (Transaction)

    U->>UI: Ấn nút Like Bài viết
    UI->>DB: Bắt đầu Transaction (Tăng +1 like & thêm UID vào Liked_By)
    DB-->>UI: Hoàn tất
    UI->>U: Cộng 1 số trên UI
```

---

### 5. Phân Hệ Hệ Thống & Báo Cáo

#### 19. REP-501: Gửi Tố Cáo (Report)
```mermaid
sequenceDiagram
    actor U as User
    participant UI as Giao diện Web
    participant DB as Firestore (reports)

    U->>UI: Ấn nút Report (Cờ)
    UI->>U: Bật Modal chọn lý do / text input
    U->>UI: Điền Nội dung Cảnh cáo & Submit
    UI->>DB: Tạo new Ticket (TargetID, Người gửi, Lý do)
    DB-->>UI: Thành công
    UI->>U: Alert "Cảm ơn đóng góp"
```

#### 20. SYS-601: Xem Trang Tĩnh Nhập Môn (Landing)
```mermaid
sequenceDiagram
    actor G as Khách
    participant UI as Giao diện Web

    G->>UI: Request root '/'
    UI-->>UI: Render HTML tĩnh với Next.js
    UI->>G: Hiển thị UX nhanh nhất & Animation
```

#### 21. SYS-602: Xem Điều khoản
```mermaid
sequenceDiagram
    actor G as Khách
    participant UI as Giao diện (About)

    G->>UI: Bấm vào 'Điều khoản sử dụng'
    UI->>UI: Load Component Markdown/Text
    UI->>G: Hiển thị luật lệ
```

---

### 6. Phân Hệ Quản Trị (Admin Dashboard)

#### 22. ADM-701: Admin Truy cập App
```mermaid
sequenceDiagram
    actor A as Mod / Admin
    participant UI as React UI (Router)
    participant Auth as AuthContext

    A->>UI: Trỏ Link `/admin`
    UI->>Auth: Kiểm tra UseAuth Hook (IsMod / IsAdmin?)
    Auth-->>UI: Trả về Cấp bậc
    UI->>A: Load Thành công Trang Dashboard
```

#### 23. ADM-702: Xem List Chờ duyệt (Duyệt Tin)
```mermaid
sequenceDiagram
    actor A as Mod / Admin
    participant UI as Admin Moderation
    participant DB as Firestore (posts)

    A->>UI: Vào mục Quản lý Tin mới
    UI->>DB: Query `status == 'pending'`
    DB-->>UI: Mảng Document chưa duyệt
    UI->>A: Hiện Grid Card dạng chờ duyệt
```

#### 24. ADM-703: Quyết Định (Duyệt/Thải) Bài
```mermaid
sequenceDiagram
    actor A as Mod / Admin
    participant UI as Admin Dashboard
    participant DB as Firestore (posts)

    A->>UI: Xem bài -> Bấm nút [Duyệt] hoặc [Từ chối]
    UI->>DB: PATCH status ('active' / 'rejected') 
    DB-->>UI: Xong
    UI->>A: Xóa Card khỏi Vùng Pending Queue
```

#### 25. ADM-704: Quản Trị Tab Cộng Đồng
```mermaid
sequenceDiagram
    actor A as Mod / Admin
    participant UI as Admin Community
    participant DB as Firestore (community_posts)

    A->>UI: Vào Mảng kiểm tra Viết Bậy
    UI->>DB: Query list Comment/Post nguy cơ Spam
    A->>UI: Click Xóa / Block Post
    UI->>DB: Thực thi Delete Action
    DB-->>UI: Confirm
    UI->>A: Cập nhật List
```

#### 26. ADM-705: Xử Lý Cờ Báo Cáo
```mermaid
sequenceDiagram
    actor A as Admin
    participant UI as Admin Report Tab
    participant DB as Firestore (reports)

    A->>UI: Xem Ticket Report #998
    UI->>A: Hiển thị nội dung
    A->>UI: Hành động Cảnh cáo / Xóa -> Click 'Resolve'
    UI->>DB: PATCH ticket status='resolved'
    DB-->>UI: Ticket khép lại
```

#### 27. ADM-706: Ban / Cấm Tài Khoản
```mermaid
sequenceDiagram
    actor A as Admin
    participant UI as Cài Đặt Users
    participant DB as Firestore (users)

    A->>UI: Check User Profile Lừa Đảo
    A->>UI: Nhấn 'Ban Account'
    UI->>DB: Cập nhật trạng thái Active=false
    DB-->>UI: OK
    UI->>A: Tài khoản đó khi Login sẽ bị Server văng ra
```

#### 28. ADM-707: Manage Roles (Cấp Quyền)
```mermaid
sequenceDiagram
    actor A as Super Admin
    participant UI as Quản lý Hệ Thống
    participant API as Next.js API Routes (Admin SDK)

    A->>UI: Chỉnh Role Của Minh Anh -> 'mod'
    UI->>API: Request POST Change Role
    API->>API: Xác minh Quyền Server AdminSDK
    API->>Firestore: Ghi đè Role trực tiếp
    Firestore-->>API: Success
    API-->>UI: Trả 200 OK Response
    UI->>A: UI hiện Cấp Quyền Thành Công
```

#### 29. ADM-708: Viết Blog SEO
```mermaid
sequenceDiagram
    actor A as Admin
    participant UI as Admin Blog CMS
    participant S3 as AWS S3 Storage
    participant DB as Firestore (blogs)

    A->>UI: Trình soạn thảo Text/Markdown Tip Ở Ghép
    UI->>S3: Tái sử dụng Module Upload S3 (Ảnh)
    A->>UI: Publish
    UI->>DB: Insert Collection 'blogs' (Status='public')
    DB-->>UI: Render ra Phía Front-end Web Blog
```
