import Link from "next/link";
import { Search, Heart, FileText, MessageCircle, Bell, Lightbulb } from "lucide-react";

interface EmptyStateProps {
  type:
    | "no-results"
    | "no-favorites"
    | "no-posts"
    | "no-messages"
    | "no-notifications";
  onAction?: () => void;
  actionLabel?: string;
  actionLink?: string;
}

const EMPTY_STATE_CONFIG = {
  "no-results": {
    icon: Search,
    title: "Không tìm thấy kết quả",
    description: "Thử điều chỉnh bộ lọc hoặc mở rộng phạm vi tìm kiếm của bạn",
    actionLabel: "Xóa bộ lọc",
    bgColor: "bg-blue-50",
  },
  "no-favorites": {
    icon: Heart,
    title: "Chưa có tin yêu thích",
    description:
      "Bắt đầu lưu các tin đăng bạn quan tâm để dễ dàng xem lại sau",
    actionLabel: "Khám phá tin đăng",
    actionLink: "/roommate",
    bgColor: "bg-pink-50",
  },
  "no-posts": {
    icon: FileText,
    title: "Bạn chưa đăng tin nào",
    description: "Tạo tin đăng đầu tiên để bắt đầu tìm roommate hoặc phòng trọ",
    actionLabel: "Đăng tin ngay",
    bgColor: "bg-purple-50",
  },
  "no-messages": {
    icon: MessageCircle,
    title: "Chưa có tin nhắn",
    description:
      "Khi bạn bắt đầu trò chuyện với ai đó, tin nhắn sẽ hiển thị ở đây",
    actionLabel: "Tìm roommate",
    actionLink: "/roommate",
    bgColor: "bg-green-50",
  },
  "no-notifications": {
    icon: Bell,
    title: "Chưa có thông báo",
    description: "Bạn sẽ nhận được thông báo về tin nhắn mới, lưu tin và hơn thế nữa",
    bgColor: "bg-yellow-50",
  },
};

export default function EmptyState({
  type,
  onAction,
  actionLabel,
  actionLink,
}: EmptyStateProps) {
  const config = EMPTY_STATE_CONFIG[type];
  const finalActionLabel = actionLabel || config.actionLabel;
  const finalActionLink = actionLink || config.actionLink;
  const IconComponent = config.icon;

  return (
    <div
      className={`card ${config.bgColor} text-center py-16 px-6 max-w-md mx-auto`}
    >
      {/* Icon */}
      <div className="mb-6 flex justify-center">
        <IconComponent className="h-20 w-20 text-zinc-600 animate-pulse" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-3">{config.title}</h3>

      {/* Description */}
      <p className="text-sm text-zinc-600 mb-8 leading-relaxed">
        {config.description}
      </p>

      {/* Action Button */}
      {(finalActionLabel || onAction) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onAction && finalActionLabel ? (
            <button onClick={onAction} className="btn-primary text-sm px-6 py-3">
              {finalActionLabel}
            </button>
          ) : finalActionLink && finalActionLabel ? (
            <Link
              href={finalActionLink}
              className="btn-primary text-sm px-6 py-3 inline-block"
            >
              {finalActionLabel}
            </Link>
          ) : null}

          {/* Secondary action for no-results */}
          {type === "no-results" && (
            <Link
              href="/roommate"
              className="btn-secondary text-sm px-6 py-3 inline-block"
            >
              Xem tất cả tin
            </Link>
          )}
        </div>
      )}

      {/* Additional tips for no-results */}
      {type === "no-results" && (
        <div className="mt-8 text-left">
          <p className="text-xs font-bold text-zinc-700 mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Gợi ý tìm kiếm:
          </p>
          <ul className="text-xs text-zinc-600 space-y-2">
            <li>• Mở rộng khoảng giá tìm kiếm</li>
            <li>• Thử tìm ở các quận lân cận</li>
            <li>• Giảm bớt các yêu cầu về tiện nghi</li>
            <li>• Điều chỉnh ngày dọn vào linh hoạt hơn</li>
          </ul>
        </div>
      )}

      {/* Tips for no-favorites */}
      {type === "no-favorites" && (
        <div className="mt-8 rounded-lg border-2 border-black bg-white p-4 text-left">
          <p className="text-xs font-bold mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Mẹo sử dụng:
          </p>
          <p className="text-xs text-zinc-600">
            Click vào icon <Heart className="inline h-3 w-3" /> ở trang chi tiết để lưu tin. Bạn có thể xem lại
            mọi lúc ở trang này!
          </p>
        </div>
      )}
    </div>
  );
}
