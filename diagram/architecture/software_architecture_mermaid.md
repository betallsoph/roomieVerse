# Sơ Đồ Kiến Trúc Phần Mềm (Software Architecture) - roomieVerse

Dưới đây là sơ đồ Software Architecture được biểu diễn bằng Mermaid. Bạn có thể chèn trực tiếp đoạn mã dưới đây vào Markdown (như GitHub, Notion) hoặc xem qua [Mermaid Live Editor](https://mermaid.live/).

```mermaid
%%{init: {"theme": "default", "themeVariables": { "primaryColor": "#ffffff", "edgeLabelBackground":"#ffffff"}}}%%
architecture-beta
    group user_layer(cloud)[Khách / Quản trị viên]
    
    group vercel(server)[Hosting Vercel & Serverless]
    
    group client(browser)[Client-Side (Frontend)] in vercel
    service nextjs(hexagon)[Next.js Pages & UI] in client
    service auth_state(disk)[Auth State & Context] in client
    service fb_client(cloud)[Firebase Client SDK] in client

    group backend(server)[Backend Logic (Serverless)] in vercel
    service api(gear)[Next.js API Routes] in backend
    service admin_sdk(gear)[Firebase Admin SDK] in backend
    service aws_sdk(gear)[AWS S3 SDK] in backend

    group cloud_services(cloud)[Dịch vụ Đám mây]
    service auth(disk)[Firebase Auth] in cloud_services
    service firestore(database)[Cloud Firestore] in cloud_services
    service s3(disk)[Amazon S3 Storage] in cloud_services

    %% Kết nối User tới Vercel
    user_layer:b --> t:nextjs

    %% Nội bộ Client
    nextjs:r <--> l:auth_state
    nextjs:b <--> t:fb_client

    %% Client tới Cloud Services
    fb_client:r --> l:auth
    fb_client:b --> t:firestore

    %% Client tới API Serverless
    nextjs:b --> t:api

    %% API Serverless tới Backend SDKs
    api:b --> t:admin_sdk
    api:r --> l:aws_sdk

    %% Backend SDKs tới Cloud Services
    admin_sdk:b --> t:firestore
    admin_sdk:r --> l:auth
    aws_sdk:b --> t:s3

    %% Tải ảnh trực tiếp từ S3 về Next.js
    nextjs:l <-- r:s3
```

---
*Ghi chú: Cú pháp architecture-beta này là một tính năng vẽ Architecture mới rực rỡ của Mermaid. Mình đã nhóm các khối (Vercel, Client, API, Cloud) thành từng cụm rõ ràng.*

Trong trường hợp bạn muốn **Sơ đồ CSDL/Flowchart truyền thống bằng Mermaid (dễ tương thích hơn với file báo cáo Word)**, hãy sử dụng đoạn mã ở chuẩn C4 Diagram / Flowchart dưới đây:

```mermaid
%%{init: {"theme": "default"}}%%
flowchart TB
    actor U as "Người dùng / Admin"

    subgraph Vercel ["Vercel Hosting"]
        direction TB
        subgraph Client ["Client-Side (Giao diện hiển thị)"]
            UI["Next.js Pages & Components\n(Tailwind, Framer Motion)"]
            State["Auth Context & State\n(React Hooks, SWR)"]
            FBClient["Firebase Client SDK"]
        end

        subgraph Server ["Server-Side (Backend Logic)"]
            API["Next.js API Routes\n(Serverless Functions)"]
            AdminSDK["Firebase Admin SDK"]
            AWSSDK["AWS S3 SDK"]
        end
    end

    subgraph Cloud ["Dịch vụ Đám mây (SaaS)"]
        direction LR
        FirebaseAuth["Firebase Authentication"]
        Firestore[("Cloud Firestore\n(NoSQL DB)")]
        AmazonS3[("Amazon S3\n(Image Storage)")]
    end

    %% User Interaction
    U -->|"Truy cập Web (HTTPS)"| UI

    %% Client Flow
    UI <-->|"Render & Quản lý State"| State
    UI <-->|"Đọc Realtime & Tương tác"| FBClient
    UI -->|"Gọi chức năng bảo mật\n(Upload, Cấp quyền)"| API

    %% Firebase Flow
    FBClient -->|"Xác thực trực tiếp\n(Login/Register)"| FirebaseAuth
    FBClient -->|"Đọc/Ghi dữ liệu\n(Dưới Client Rules)"| Firestore

    %% Server Flow
    API -->|"Bypass Firewall, Thực thi Admin"| AdminSDK
    API -->|"Yêu cầu vé tải ảnh ngắn hạn"| AWSSDK

    AdminSDK -->|"Ghi dữ liệu Quyền"| Firestore
    AdminSDK -->|"Xử lý Tài khoản Nội bộ"| FirebaseAuth

    AWSSDK -->|"Kết nối & Ký URL Presigned"| AmazonS3

    %% Direct S3 Communication
    UI <-->|"Tải/Upload hình ảnh trực tiếp\n(Sau khi có vé URL)"| AmazonS3
```
