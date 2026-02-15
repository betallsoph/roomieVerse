import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm Roommate",
  description: "Tìm bạn cùng phòng, tìm người ở ghép tại TP.HCM, Hà Nội và các thành phố lớn. Đăng tin miễn phí, kết nối nhanh chóng trên roomieVerse.",
  openGraph: {
    title: "Tìm Roommate | roomieVerse",
    description: "Tìm bạn cùng phòng, tìm người ở ghép tại TP.HCM, Hà Nội và các thành phố lớn.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RoommateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
