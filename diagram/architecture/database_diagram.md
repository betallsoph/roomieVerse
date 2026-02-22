# Sơ Đồ Cơ Sở Dữ Liệu (Database Diagram / ERD) - roomieVerse

Do roomieVerse sử dụng Cloud Firestore (NoSQL), sơ đồ dữ liệu dưới đây sẽ được mô phỏng theo dạng Collections/Documents (Tương đương Tables/Rows trong SQL) với quan hệ Liên kết ID (Bởi NoSQL không có Foreign Key cứng).

Sơ đồ sử dụng chuẩn **ER Diagram** (Entity Relationship) của Mermaid. Bạn hãy copy mã dưới đây vào **[Mermaid Live Editor](https://mermaid.live/)** để dán vào file báo cáo.

```mermaid
%%{init: {"theme": "default"}}%%
erDiagram
    %% Định nghĩa các Collection (Bảng)

    USERS {
        string uid PK "Firebase Auth UID"
        string email "Email người dùng"
        string displayName "Tên hiển thị"
        string photoURL "Link S3 Avatar"
        string gender "Giới tính"
        string birthYear "Năm sinh"
        string occupation "Sinh viên / Đi làm"
        string role "user | mod | tester | admin"
        object lifestyle "Sở thích lối sống (JSON/Map)"
        timestamp createdAt "Ngày khởi tạo"
        timestamp updatedAt "Ngày cập nhật"
    }

    POSTS {
        string id PK "Post ID tự sinh"
        string userId FK "ID Người đăng"
        string title "Tiêu đề tin đăng"
        string category "roommate | roomshare"
        string price "Giá tiền"
        string location "Địa chỉ cụ thể"
        string city "Tỉnh / Thành phố"
        string district "Quận / Huyện"
        string moveInDate "Ngày có thể dọn vào"
        string description "Mô tả chi tiết"
        string status "active | pending | hidden"
        string phone "SĐT liên lạc"
        string zalo "Zalo liên lạc"
        array images "Mảng URL ảnh (AWS S3)"
        object preferences "Yêu cầu bạn cùng phòng (Map)"
        object costs "Chi tiết chi phí (Map)"
        timestamp createdAt "Ngày tạo bài"
        timestamp moderatedAt "Ngày Admin duyệt"
    }

    COMMUNITY_POSTS {
        string id PK "Community Post ID"
        string authorId FK "ID Người đăng"
        string authorName "Tên người đăng (Snapshot)"
        string category "tips | drama | review | blog"
        string title "Tiêu đề bài cộng đồng"
        string content "Nội dung Markdown/Text"
        string status "active | pending | deleted"
        int likes "Tổng lượt thích"
        int comments "Tổng lượt bình luận"
        int views "Tổng lượt xem"
        timestamp createdAt "Ngày đăng"
    }

    COMMENTS {
        string id PK "Comment ID"
        string postId FK "ID của Community Post (Parent)"
        string authorId FK "ID Người bình luận"
        string authorName "Tên hiển thị lúc CMT"
        string content "Nội dung bình luận"
        int likes "Lượt thích comment"
        string status "active | deleted"
        timestamp createdAt "Thời gian CMT"
    }

    REPORTS {
        string id PK "Report Ticket ID"
        string reportedBy FK "UID Người tố cáo"
        string listingId FK "ID Bài Post bị tố cáo"
        string reason "Lý do (Lừa đảo, Chửi thề...)"
        string details "Chi tiết mô tả thêm"
        string status "pending | reviewed | resolved"
        string reviewedBy FK "Admin UID xử lý"
        timestamp createdAt "Ngày gửi"
    }

    SAVED_POSTS {
        string id PK "Favorite ID"
        string userId FK "UID người lưu"
        string listingId FK "ID Bài Post đã lưu"
        timestamp createdAt "Ngày lưu"
    }

    BLOGS {
        string id PK "Blog ID"
        string authorId FK "Admin UID viết bài"
        string title "Tiêu đề Blog CMS"
        string content "Chi tiết bài viết"
        string thumbnail "Ảnh bìa"
        string status "draft | public"
        timestamp createdAt "Ngày đăng"
    }

    %% Định nghĩa các Mối Quan Hệ (Relationships)
    %% NoSQL giải quyết Relation bằng cách lưu trữ UID/ID vào trường dữ liệu

    USERS ||--o{ POSTS : "tạo (1 - N)"
    USERS ||--o{ COMMUNITY_POSTS : "viết (1 - N)"
    USERS ||--o{ COMMENTS : "bình luận (1 - N)"
    USERS ||--o{ REPORTS : "gửi tố cáo (1 - N)"
    USERS ||--o{ SAVED_POSTS : "lưu bài (1 - N)"
    USERS ||--o{ BLOGS : "CMS đăng bài (Admin)"

    POSTS ||--o{ REPORTS : "bị report (1 - N)"
    POSTS ||--o{ SAVED_POSTS : "được User lưu (1 - N)"

    COMMUNITY_POSTS ||--o{ COMMENTS : "chứa (1 - N)"

```

### Phân tích Kiến trúc NoSQL Firestore của RoomieVerse:
1. **Denormalization (Phi chuẩn hóa dữ liệu)**:
   - Trong bảng `COMMUNITY_POSTS` và `COMMENTS`, thay vì chỉ lưu `authorId`, hệ thống RoomieVerse đã lưu trữ thêm cả `authorName` và `authorPhoto`. Việc copy dữ liệu này (Snapshotting) là kỹ thuật kinh điển trong NoSQL giúp giảm thiểu số lần gọi Query Read để "Join" bảng `USERS`, tối ưu hóa tối đa tốc độ hiển thị và chi phí đọc Data của Firebase.
2. **Sub-Collections / Root Collections**:
   - `COMMENTS` có thể được tổ chức dưới dạng Sub-collection của `COMMUNITY_POSTS` (`community_posts/{id}/comments/{id}`) để giới hạn scope query.
   - Các dữ liệu phức tạp (`lifestyle`, `preferences`, `costs`) được lưu trữ dưới dạng **Map (JSON Object)** trong chính Document cha để tránh phải tách bảng như SQL.
3. **Array Data**:
   - `images` chứa trực tiếp một mảng (Array) các Link liên kết qua dịch vụ Amazon S3 thay vì phải tạo một bảng `IMAGES` riêng rẽ như SQL.
