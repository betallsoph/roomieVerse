import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm Phòng",
  description: "Tìm phòng cho thuê, phòng trọ giá rẻ tại TP.HCM, Hà Nội và các thành phố lớn. Đăng tin miễn phí trên roomieVerse.",
  openGraph: {
    title: "Tìm Phòng | roomieVerse",
    description: "Tìm phòng cho thuê, phòng trọ giá rẻ tại TP.HCM, Hà Nội và các thành phố lớn.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RoomshareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
