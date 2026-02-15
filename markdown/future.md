# Future Scaling Roadmap

> Lộ trình phát triển kỹ thuật khi project scale up.
> Ưu tiên serverless architecture xuyên suốt.

---

## Giai đoạn 1: 0 → 1k users (hiện tại)

- **1 collection `listings`** cho tất cả listing types (roommate, roomshare, short-term)
- Firestore free tier đủ xài
- Next.js API routes (serverless) — không cần backend riêng
- Firebase Auth + Firestore + Cloudflare R2
- Ship nhanh, validate ý tưởng, không optimize sớm

---

## Giai đoạn 2: 1k → 10k users

### Tách collection theo nghiệp vụ (khi cần)

```
roommate_listings/     → tìm bạn ở ghép + có phòng cho thuê (giữ chung vì cùng luồng)
short_term_listings/   → cho thuê ngắn ngày (tách ra nếu có booking/calendar/payment)
community_posts/       → đã tách ✓
community_comments/    → đã tách ✓
```

**Khi nào tách?** Khi short-term có luồng nghiệp vụ riêng: booking, check-in/out, availability calendar, giá/đêm, hủy phòng. Nếu chỉ "đăng tin → liên hệ" thì giữ chung.

### Cải thiện

- Firestore Blaze plan (pay-as-you-go)
- Edge functions cho API routes (Vercel Edge / Cloudflare Workers)
- Image optimization pipeline (sharp + R2)
- Basic analytics (view counts, search patterns)

---

## Giai đoạn 3: 10k → 50k users

### Database migration

- **Chuyển listings sang PostgreSQL** (Supabase hoặc Neon) — cần full-text search, complex filters, JOIN, analytics
- **Giữ Firestore** cho real-time: chat, notifications, online status
- **Community → Supabase** (đã plan sẵn, xem technical reminder bên dưới)
- Connection pooling: Supabase có sẵn PgBouncer, Neon có serverless driver

### Search

- Thêm Algolia hoặc Meilisearch cho search listings
- Hoặc dùng PostgreSQL full-text search (pg_trgm) nếu đủ

### Serverless scaling

- Vercel Edge Functions hoặc Cloudflare Workers cho API
- Không cần tách backend riêng — serverless auto-scale
- Dùng ISR (Incremental Static Regeneration) cho listing pages phổ biến
- Queue cho async tasks: Vercel Cron, Inngest, hoặc Trigger.dev (gửi notification, update counters, sync search index)

### Caching

- Redis (Upstash — serverless Redis) cho hot data: trending posts, search results, user sessions
- CDN caching cho static assets (Vercel/Cloudflare tự động)

---

## Giai đoạn 4: 50k+ users

### Vẫn serverless, nhưng mature hơn

- **Tách theo domain** (không phải microservices kiểu K8s, mà là separate serverless functions/projects):
  - Listing service (Vercel project hoặc Cloudflare Worker)
  - Booking service (nếu có short-term booking flow)
  - Community service
  - Notification service
- **Message queue**: Inngest / Trigger.dev / Cloudflare Queues cho async processing
- **Database**: managed PostgreSQL (Supabase/Neon/PlanetScale) với read replicas
- **Edge caching**: Cloudflare KV hoặc Vercel Edge Config cho frequently accessed data
- **Monitoring**: Sentry, Vercel Analytics, custom dashboards

### Serverless có scale được 50k+ không?

**Có.** Lý do:
- Vercel handles billions of requests/month cho nhiều company
- Cloudflare Workers xử lý hàng triệu req/sec
- Cold start giải quyết bằng edge functions (~1-5ms cold start)
- Database connections: dùng serverless drivers (Neon serverless, Supabase pooling)
- Long-running tasks: dùng queue-based processing, không chạy trong request handler

**Chỉ cần lưu ý:**
- Serverless function timeout (Vercel: 10s hobby, 60s pro, 300s enterprise)
- Concurrent execution limits (Vercel: 1000 concurrent cho pro)
- Database connection limits → dùng pooling

---

## Technical Reminders

### Supabase migration cho Community

> Khi DAU > 300 hoặc community reads > 50k/ngày, cân nhắc migrate community sang Supabase PostgreSQL.
> Lý do: community có nhiều reads (browse posts, load comments), Firestore tính phí per-read sẽ đắt hơn Supabase unlimited reads.
> Auth vẫn giữ Firebase — Supabase chỉ dùng database, gọi qua REST API với Firebase UID.

### Firestore → PostgreSQL migration path

1. Export Firestore data bằng `firebase-admin` script
2. Transform data sang relational schema
3. Import vào Supabase/Neon
4. Update data layer files (chỉ cần sửa `app/data/*.ts`, UI không đổi)
5. Run parallel (đọc từ cả 2) trong 1-2 tuần để verify
6. Cut over hoàn toàn

---

## Quyết định kiến trúc đã chốt

| Quyết định | Lựa chọn | Lý do |
|---|---|---|
| Listings collection | 1 collection chung | Code đơn giản, query chéo dễ, admin/favorites/reports không cần biết type |
| Community | Collection riêng (`community_posts`, `community_comments`) | Nghiệp vụ khác hoàn toàn với listings |
| Backend | Serverless (Next.js API routes) | User thích serverless, scale tự động, không quản lý server |
| Auth | Firebase Auth | Đã implement, Google/email sign-in |
| Storage | Cloudflare R2 | S3-compatible, free egress |
| Primary DB | Firestore (hiện tại) → PostgreSQL (tương lai) | Firestore free tier tốt cho giai đoạn đầu |
