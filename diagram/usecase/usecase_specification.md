# 2.5.3. Bảng đặc tả Use Case cốt lõi

Dưới đây là bảng đặc tả ngắn gọn cho các Use Case chính trong biểu đồ tổng quát của hệ thống **roomieVerse**.

**Bảng 2.2. Danh sách đặc tả Use Case cốt lõi**

| Tên Use Case | Actor chính | Mô tả ngắn |
| :--- | :--- | :--- |
| **Đăng ký tài khoản** | Khách (Guest) | Tạo tài khoản mới (sử dụng Email/Password hoặc Google), khởi tạo thông tin hồ sơ cơ bản. |
| **Đăng nhập / Đăng xuất** | Tất cả người dùng | Xác thực thông tin người dùng qua hệ thống của Firebase Auth, quản lý phiên đăng nhập và điều hướng. |
| **Xem / Tìm phòng** | Tất cả người dùng | Xem danh sách các tin nhượng phòng/tìm người ở ghép hiển thị dưới dạng thẻ; sử dụng bộ lọc (giá, khu vực, từ khóa) để tìm kiếm. |
| **Xem chi tiết phòng** | Tất cả người dùng | Xem toàn bộ chi tiết một bài đăng bao gồm ảnh (carousel), mô tả, giá cả, và thông tin liên hệ của chủ bài đăng. |
| **Đăng tin phòng / share** | Người dùng (User) | Điền biểu mẫu, tải hình ảnh lên hệ thống (AWS S3) và tạo tin đang cần nhượng phòng hoặc tìm roomate. Chờ phê duyệt từ quản trị. |
| **Liên lạc & Trò chuyện** | Người dùng (User) | Lấy thông tin liên lạc (Zalo, SĐT) từ bài đăng chi tiết để trao đổi trực tiếp với người cho thuê/nhượng phòng. |
| **Quản lý bài của tôi** | Người dùng (User) | Xem danh sách các bài đã đăng, tạm ẩn bài khi không còn nhu cầu, hoặc xóa vĩnh viễn bài đăng của chính mình. |
| **Tham gia cộng đồng** | Người dùng (User) | Đăng thảo luận, chia sẻ kinh nghiệm nội trú, bình luận vào bài viết của người khác và tương tác (Like). |
| **Duyệt / Từ chối yêu cầu** | Quản trị viên (Admin) | Xem danh sách các bài đăng (Posts) ở trạng thái chờ duyệt (pending). Quyết định duyệt (active) hoặc từ chối hiển thị lên Feed chung. |
| **Quản lý người dùng & hệ thống** | Quản trị viên (Admin) | Quản lý danh sách tài khoản (phân quyền user/mod/admin), cấm tài khoản vi phạm và xử lý các báo cáo vi phạm (reports). |
