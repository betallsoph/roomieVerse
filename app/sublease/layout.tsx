import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng sang lại",
  description: "Tìm phòng sang lại, chuyển nhượng hợp đồng thuê phòng tại TP.HCM, Hà Nội. Tiết kiệm chi phí, dọn vào ngay.",
  openGraph: {
    title: "Phòng sang lại | roomieVerse",
    description: "Tìm phòng sang lại, chuyển nhượng hợp đồng thuê phòng tại TP.HCM, Hà Nội.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function SubleaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
