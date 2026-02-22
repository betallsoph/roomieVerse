# Sơ Đồ Lớp (Class Diagram) - roomieVerse

Mô hình dữ liệu (Database Schema / Class Diagram) của hệ thống roomieVerse được thiết kế gọn gàng thông qua các entities cốt lõi trong file `types.ts`.
Dưới đây là sơ đồ Class Diagram bằng Mermaid, bạn có thể copy vào [Mermaid Live](https://mermaid.live/) để xuất ảnh chèn báo cáo.

```mermaid
classDiagram
    class UserProfile {
        +String uid
        +String email
        +String displayName
        +String photoURL
        +String gender
        +String birthYear
        +String occupation
        +UserRole role
        +String createdAt
        +String updatedAt
        +updateProfile()
        +changeRole()
    }

    class LifestylePreferences {
        +List~String~ schedule
        +List~String~ cleanliness
        +List~String~ habits
        +String otherHabits
    }

    class RoomListing {
        +String id
        +String userId
        +String title
        +String description
        +String price
        +String location
        +List~String~ images
        +String phone
        +String zalo
        +ListingStatus status
        +RoommateType roommateType
        +PropertyType propertyType
        +String postedDate
        +String createdAt
        +String updatedAt
        +createListing()
        +updateStatus()
        +deleteListing()
    }

    class RoommatePreferences {
        +List~String~ gender
        +List~String~ status
        +List~String~ schedule
        +List~String~ cleanliness
        +List~String~ pets
        +List~String~ moveInTime
    }

    class RoomCosts {
        +String rent
        +String deposit
        +String electricity
        +String water
        +String internet
    }

    class CommunityPost {
        +String id
        +String authorId
        +String authorName
        +CommunityCategory category
        +String title
        +String content
        +int likes
        +int comments
        +int views
        +CommunityStatus status
        +String createdAt
        +createPost()
        +likePost()
    }

    class CommunityComment {
        +String id
        +String postId
        +String authorId
        +String content
        +int likes
        +String status
        +String createdAt
        +addComment()
        +removeComment()
    }

    class Report {
        +String id
        +String listingId
        +String reportedBy
        +String reason
        +String details
        +String status
        +String reviewedBy
        +submitReport()
        +resolveReport()
    }

    class Favorite {
        +String id
        +String userId
        +String listingId
        +String createdAt
        +toggleFavorite()
    }

    %% Relationships
    UserProfile "1" *-- "1" LifestylePreferences : has
    UserProfile "1" --> "0..*" RoomListing : posts
    UserProfile "1" --> "0..*" CommunityPost : writes
    UserProfile "1" --> "0..*" CommunityComment : comments
    UserProfile "1" --> "0..*" Favorite : saves
    UserProfile "1" --> "0..*" Report : submits
    
    RoomListing "1" *-- "1" RoommatePreferences : has
    RoomListing "1" *-- "1" RoomCosts : contains
    RoomListing "1" <-- "0..*" Report : is reported
    RoomListing "1" <-- "0..*" Favorite : is saved

    CommunityPost "1" *-- "0..*" CommunityComment : contains
```

### Giải thích các mối quan hệ (Relationships):
1. **Thành phần (Composition `*--`)**: 
   - `UserProfile` chứa `LifestylePreferences`.
   - `RoomListing` chứa `RoommatePreferences` và `RoomCosts`.
   - `CommunityPost` chứa danh sách các `CommunityComment`.
2. **Liên kết (Association `-->`)**:
   - `User (UserProfile)` tạo ra nhiều Bài đăng phòng (`RoomListing`), Bài cộng đồng (`CommunityPost`).
   - `User` có thể tạo nhiều `Favorite` (Lưu bài) và `Report` (Báo cáo vi phạm).
