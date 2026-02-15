import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng ngắn ngày",
  description: "Tìm phòng cho thuê ngắn ngày, thuê theo tuần tại TP.HCM, Hà Nội. Phù hợp cho du lịch, công tác ngắn hạn.",
  openGraph: {
    title: "Phòng ngắn ngày | roomieVerse",
    description: "Tìm phòng cho thuê ngắn ngày, thuê theo tuần tại TP.HCM, Hà Nội.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function ShortTermLayout({ children }: { children: React.ReactNode }) {
  return children;
}
