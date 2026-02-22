# 2.5.4. Sơ đồ Use Case phân rã (Elaborated Use Cases)

Dưới đây là các sơ đồ Use Case phân rã chi tiết cho từng nhóm Tác nhân trong hệ thống **roomieVerse**, thể hiện rõ các mối quan hệ `<<include>>` (bắt buộc) và `<<extend>>` (mở rộng).

---

### 1. Phân rã Use Case dành cho Khách (Guest)

Sơ đồ này biểu diễn các phân rã chức năng khi người dùng ở trạng thái chưa đăng nhập (Guest). Tương ứng hình: *Sơ đồ usecase dành cho Khách (chưa đăng nhập)*

```mermaid
%%{init: {"theme": "default", "themeVariables": { "primaryColor": "#e8eaf6", "edgeLabelBackground":"#ffffff"}}}%%
flowchart LR
    classDef actor fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef usecase fill:#f3e5f5,stroke:#ab47bc,stroke-width:1px,rx:20,ry:20;
    classDef sub_usecase fill:#f3e5f5,stroke:#ce93d8,stroke-width:1px,rx:20,ry:20;

    G["Khách (Chưa đăng nhập)"]:::actor

    subgraph System ["Nền tảng Tìm phòng roomieVerse"]
        %% Chính
        UC1(["Xem danh sách phòng"]):::usecase
        UC2(["Tìm kiếm theo tiêu chí"]):::usecase
        UC3(["Xem chi tiết phòng"]):::usecase
        UC4(["Đăng ký tài khoản"]):::usecase
        UC5(["Đăng nhập"]):::usecase

        %% Phân rã
        UC1_1(["Xem ảnh phòng rút gọn"]):::sub_usecase
        UC2_1(["Bộ lọc (Giá, Vị trí, Giới tính)"]):::sub_usecase
        UC2_2(["Sắp xếp kết quả (Mới nhất, Giá...)"]):::sub_usecase
        
        UC3_1(["Xem hình ảnh phòng (Carousel)"]):::sub_usecase
        UC3_2(["Xem thông tin liên lạc"]):::sub_usecase
        UC3_3(["Xem đánh giá/Comment phòng"]):::sub_usecase

        UC4_1(["Kiểm tra email & mật khẩu"]):::sub_usecase
        UC4_2(["Khởi tạo Profile Mặc định"]):::sub_usecase
        
        UC5_1(["Xác thực với Firebase"]):::sub_usecase
    end

    %% Flow Actor -> Main UseCase
    G --- UC1
    G --- UC2
    G --- UC3
    G --- UC4
    G --- UC5

    %% Include / Extend
    UC1 -.->|"<<include>>"| UC1_1
    
    UC2 -.->|"<<include>>"| UC2_1
    UC2 -.->|"<<include>>"| UC2_2
    
    UC3 -.->|"<<include>>"| UC3_1
    UC3 -.->|"<<include>>"| UC3_2
    UC3 -.->|"<<extend>>"| UC3_3
    
    UC4 -.->|"<<include>>"| UC4_1
    UC4 -.->|"<<include>>"| UC4_2
    
    UC5 -.->|"<<include>>"| UC5_1
```

---

### 2. Phân rã Use Case dành cho Người dùng (User)

Sơ đồ thể hiện các tác vụ phức tạp của User sau khi đăng nhập (Đăng tin, Quản lý hồ sơ, Tương tác cộng đồng).

```mermaid
%%{init: {"theme": "default", "themeVariables": { "primaryColor": "#e8eaf6", "edgeLabelBackground":"#ffffff"}}}%%
flowchart LR
    classDef actor fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef usecase fill:#f3e5f5,stroke:#ab47bc,stroke-width:1px,rx:20,ry:20;
    classDef sub_usecase fill:#f3e5f5,stroke:#ce93d8,stroke-width:1px,rx:20,ry:20;

    U["Người dùng (Đã đăng nhập)"]:::actor

    subgraph System ["Nền tảng Tìm phòng roomieVerse"]
        %% Chính
        UC1(["Tạo tin Đăng phòng/Share"]):::usecase
        UC2(["Quản lý Hồ sơ cá nhân"]):::usecase
        UC3(["Quản lý Bài đăng của tôi"]):::usecase
        UC4(["Tham gia Cộng đồng"]):::usecase
        UC5(["Lưu tin nhắn / Báo cáo"]):::usecase

        %% Phân rã
        UC1_1(["Tải ảnh lên hệ thống (AWS S3)"]):::sub_usecase
        UC1_2(["Chọn Vị trí Map API"]):::sub_usecase
        
        UC2_1(["Cập nhật Sở thích & Lối sống"]):::sub_usecase
        UC2_2(["Thay đổi Mật khẩu"]):::sub_usecase
        
        UC3_1(["Ẩn/Hiện bài viết"]):::sub_usecase
        UC3_2(["Xóa bài vĩnh viễn"]):::sub_usecase

        UC4_1(["Thêm Bình luận"]):::sub_usecase
        UC4_2(["Bấm Thích (Like)"]):::sub_usecase
        UC4_3(["Viết bài Thảo luận mới"]):::sub_usecase
        
        UC5_1(["Thêm bài vào mục Yêu thích"]):::sub_usecase
        UC5_2(["Gửi cờ Báo cáo Spam"]):::sub_usecase
    end

    %% Flow Actor -> Main UseCase
    U --- UC1
    U --- UC2
    U --- UC3
    U --- UC4
    U --- UC5

    %% Include / Extend
    UC1 -.->|"<<include>>"| UC1_1
    UC1 -.->|"<<extend>>"| UC1_2
    
    UC2 -.->|"<<include>>"| UC2_1
    UC2 -.->|"<<extend>>"| UC2_2
    
    UC3 -.->|"<<include>>"| UC3_1
    UC3 -.->|"<<extend>>"| UC3_2
    
    UC4 -.->|"<<extend>>"| UC4_1
    UC4 -.->|"<<extend>>"| UC4_2
    UC4 -.->|"<<extend>>"| UC4_3
    
    UC5 -.->|"<<extend>>"| UC5_1
    UC5 -.->|"<<extend>>"| UC5_2
```

---

### 3. Phân rã Use Case dành cho Ban Quản Trị (Admin Dashboard)

Sơ đồ thể hiện luồng làm việc của kiểm duyệt viên và admin.

```mermaid
%%{init: {"theme": "default", "themeVariables": { "primaryColor": "#e8eaf6", "edgeLabelBackground":"#ffffff"}}}%%
flowchart LR
    classDef actor fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef usecase fill:#f3e5f5,stroke:#ab47bc,stroke-width:1px,rx:20,ry:20;
    classDef sub_usecase fill:#f3e5f5,stroke:#ce93d8,stroke-width:1px,rx:20,ry:20;

    A["Quản trị viên / Mod"]:::actor

    subgraph System ["Dashboard Quản Trị roomieVerse"]
        %% Chính
        UC1(["Duyệt Tin Bài (Moderation)"]):::usecase
        UC2(["Xử lý Báo Cáo (Reports)"]):::usecase
        UC3(["Quản lý Người Dùng"]):::usecase
        UC4(["Quản lý Blog Hệ Thống"]):::usecase

        %% Phân rã
        UC1_1(["Duyệt cho phép Hiển thị"]):::sub_usecase
        UC1_2(["Từ chối bài chờ duyệt"]):::sub_usecase
        UC1_3(["Xóa Comment bậy bạ (Cộng đồng)"]):::sub_usecase
        
        UC2_1(["Xem chi tiết Ticket Report"]):::sub_usecase
        UC2_2(["Đánh dấu Ticket Giải quyết"]):::sub_usecase
        
        UC3_1(["Thăng cấp phân quyền (Set Role)"]):::sub_usecase
        UC3_2(["Khóa/Cấm tài khoản Spam"]):::sub_usecase

        UC4_1(["Viết bài SEO mới"]):::sub_usecase
    end

    %% Flow Actor -> Main UseCase
    A --- UC1
    A --- UC2
    A --- UC3
    A --- UC4

    %% Include / Extend
    UC1 -.->|"<<include>>"| UC1_1
    UC1 -.->|"<<extend>>"| UC1_2
    UC1 -.->|"<<extend>>"| UC1_3
    
    UC2 -.->|"<<include>>"| UC2_1
    UC2 -.->|"<<include>>"| UC2_2
    
    UC3 -.->|"<<extend>>"| UC3_1
    UC3 -.->|"<<extend>>"| UC3_2
    
    UC4 -.->|"<<include>>"| UC4_1
```
