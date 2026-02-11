// Vietnam Cities and Districts Data
// Only TP.HCM and Da Lat for now, others commented out

export interface District {
  value: string;
  label: string;
}

export interface City {
  value: string;
  label: string;
  districts: District[];
}

export const cities: City[] = [
  {
    value: "ho-chi-minh",
    label: "TP. Hồ Chí Minh",
    districts: [
      { value: "quan-1", label: "Quận 1" },
      { value: "quan-2", label: "Quận 2" },
      { value: "quan-3", label: "Quận 3" },
      { value: "quan-4", label: "Quận 4" },
      { value: "quan-5", label: "Quận 5" },
      { value: "quan-6", label: "Quận 6" },
      { value: "quan-7", label: "Quận 7" },
      { value: "quan-8", label: "Quận 8" },
      { value: "quan-9", label: "Quận 9" },
      { value: "quan-10", label: "Quận 10" },
      { value: "quan-11", label: "Quận 11" },
      { value: "quan-12", label: "Quận 12" },
      { value: "binh-tan", label: "Bình Tân" },
      { value: "binh-thanh", label: "Bình Thạnh" },
      { value: "go-vap", label: "Gò Vấp" },
      { value: "phu-nhuan", label: "Phú Nhuận" },
      { value: "tan-binh", label: "Tân Bình" },
      { value: "tan-phu", label: "Tân Phú" },
      { value: "thu-duc", label: "Thủ Đức" },
      { value: "binh-chanh", label: "Bình Chánh" },
      { value: "can-gio", label: "Cần Giờ" },
      { value: "cu-chi", label: "Củ Chi" },
      { value: "hoc-mon", label: "Hóc Môn" },
      { value: "nha-be", label: "Nhà Bè" },
    ],
  },
  {
    value: "da-lat",
    label: "Đà Lạt",
    districts: [
      { value: "phuong-1", label: "Phường 1" },
      { value: "phuong-2", label: "Phường 2" },
      { value: "phuong-3", label: "Phường 3" },
      { value: "phuong-4", label: "Phường 4" },
      { value: "phuong-5", label: "Phường 5" },
      { value: "phuong-6", label: "Phường 6" },
      { value: "phuong-7", label: "Phường 7" },
      { value: "phuong-8", label: "Phường 8" },
      { value: "phuong-9", label: "Phường 9" },
      { value: "phuong-10", label: "Phường 10" },
      { value: "phuong-11", label: "Phường 11" },
      { value: "phuong-12", label: "Phường 12" },
      { value: "xuan-tho", label: "Xuân Thọ" },
      { value: "xuan-truong", label: "Xuân Trường" },
      { value: "ta-nung", label: "Tà Nung" },
      { value: "tram-hanh", label: "Trạm Hành" },
    ],
  },
  // Future cities - uncomment when ready
  // {
  //   value: "ha-noi",
  //   label: "Hà Nội",
  //   districts: [
  //     { value: "ba-dinh", label: "Ba Đình" },
  //     { value: "hoan-kiem", label: "Hoàn Kiếm" },
  //     { value: "dong-da", label: "Đống Đa" },
  //     { value: "hai-ba-trung", label: "Hai Bà Trưng" },
  //     { value: "hoang-mai", label: "Hoàng Mai" },
  //     { value: "thanh-xuan", label: "Thanh Xuân" },
  //     { value: "cau-giay", label: "Cầu Giấy" },
  //     { value: "long-bien", label: "Long Biên" },
  //     { value: "tay-ho", label: "Tây Hồ" },
  //     { value: "nam-tu-liem", label: "Nam Từ Liêm" },
  //     { value: "bac-tu-liem", label: "Bắc Từ Liêm" },
  //     { value: "ha-dong", label: "Hà Đông" },
  //   ],
  // },
  // {
  //   value: "da-nang",
  //   label: "Đà Nẵng",
  //   districts: [
  //     { value: "hai-chau", label: "Hải Châu" },
  //     { value: "thanh-khe", label: "Thanh Khê" },
  //     { value: "son-tra", label: "Sơn Trà" },
  //     { value: "ngu-hanh-son", label: "Ngũ Hành Sơn" },
  //     { value: "lien-chieu", label: "Liên Chiểu" },
  //     { value: "cam-le", label: "Cẩm Lệ" },
  //   ],
  // },
];

// Helper functions
export function getCityByValue(value: string): City | undefined {
  return cities.find((c) => c.value === value);
}

export function getCityByLabel(label: string): City | undefined {
  return cities.find((c) => c.label === label);
}

export function getDistrictsByCity(cityValue: string): District[] {
  const city = getCityByValue(cityValue);
  return city?.districts || [];
}

export function getDistrictsByLabel(cityLabel: string): District[] {
  const city = getCityByLabel(cityLabel);
  return city?.districts || [];
}
