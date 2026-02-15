import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cộng đồng",
  description: "Cộng đồng roomieVerse - Chia sẻ mẹo thuê phòng, review khu vực, pass đồ và kết nối với cộng đồng thuê phòng.",
  openGraph: {
    title: "Cộng đồng | roomieVerse",
    description: "Chia sẻ mẹo thuê phòng, review khu vực, pass đồ và kết nối với cộng đồng thuê phòng.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
