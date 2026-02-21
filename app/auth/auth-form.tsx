"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { SparklesText } from "../components/sparkles-text";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  bounceKey?: number;
  onModeChange?: () => void;
}

export default function AuthForm({ bounceKey = 0, onModeChange }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [policyModal, setPolicyModal] = useState<"terms" | "privacy" | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithGoogle, loginWithEmail, signUpWithEmail, isAuthenticated, isMod, profileChecked } = useAuth();
  const justLoggedIn = useRef(false);

  const returnUrl = searchParams.get("returnUrl") || "/home";

  // Redirect after login — wait for role to be resolved
  useEffect(() => {
    if (!justLoggedIn.current || !isAuthenticated || !profileChecked) return;
    justLoggedIn.current = false;

    if (isMod) {
      router.push("/admin");
    } else {
      router.push(returnUrl);
    }
  }, [isAuthenticated, isMod, profileChecked, router, returnUrl]);

  function handleModeChange(newMode: AuthMode) {
    setMode(newMode);
    setError(null);
    onModeChange?.();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const password = (formData.get("password") as string)?.trim();
    const displayName = (formData.get("displayName") as string)?.trim();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      setIsLoading(false);
      return;
    }

    if (mode === "signup" && password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, displayName || email.split("@")[0]);
      }
      justLoggedIn.current = true;
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      const errorMap: Record<string, string> = {
        "auth/user-not-found": "Không tìm thấy tài khoản với email này.",
        "auth/wrong-password": "Mật khẩu không đúng.",
        "auth/invalid-credential": "Email hoặc mật khẩu không đúng.",
        "auth/email-already-in-use": "Email này đã được sử dụng.",
        "auth/weak-password": "Mật khẩu phải có ít nhất 6 ký tự.",
        "auth/invalid-email": "Email không hợp lệ.",
        "auth/too-many-requests": "Quá nhiều lần thử. Vui lòng thử lại sau.",
      };
      setError(errorMap[firebaseError.code || ""] || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      // Don't redirect here — useEffect will handle it after admin status is resolved
      justLoggedIn.current = true;
    } catch (err: unknown) {
      // Ignore error when user closes popup
      const firebaseError = err as { code?: string };
      if (firebaseError.code !== 'auth/popup-closed-by-user') {
        console.error("Google login error:", err);
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
      setIsLoading(false);
    }
  }

  return (
    <motion.section
      key={bounceKey}
      className="card flex flex-1 flex-col justify-center bg-white p-8 lg:p-10"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15
      }}
    >
      {/* Login/Signup Toggle */}
      <div className="flex rounded-xl border-2 border-black bg-blue-100 p-1 text-sm font-bold tracking-wide">
        <button
          type="button"
          onClick={() => handleModeChange("login")}
          className={`flex-1 rounded-lg px-6 py-3 transition-all duration-200 ${
            mode === "login"
              ? "bg-blue-300 text-black border-2 border-black"
              : "text-black"
          }`}
        >
          Đăng nhập
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("signup")}
          className={`flex-1 rounded-lg px-6 py-3 transition-all duration-200 ${
            mode === "signup"
              ? "bg-blue-300 text-black border-2 border-black"
              : "text-black"
          }`}
        >
          Đăng ký
        </button>
      </div>

      {/* Heading - Only show on Signup */}
      {mode === "signup" && (
        <div className="mt-8">
          <p className="text-lg font-medium text-black">Tạo tài khoản</p>
          <SparklesText
            className="text-4xl font-bold"
            sparklesCount={10}
            colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
          >
            roomieVerse
          </SparklesText>
        </div>
      )}

      {/* Google Login Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black transition-all duration-200 hover:shadow-[4px_4px_0_#000] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Tiếp tục với Google
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-0.5 flex-1 bg-zinc-200"></div>
        <span className="text-xs font-medium text-zinc-400">hoặc</span>
        <div className="h-0.5 flex-1 bg-zinc-200"></div>
      </div>

      {/* Email/Password Form */}
      <form autoComplete="off" className={`space-y-5 ${mode === "signup" ? "mt-8" : ""}`} onSubmit={handleSubmit}>
        {mode === "signup" && (
          <label className="block text-sm">
            <span className="font-semibold text-black">
              Tên hiển thị
            </span>
            <input
              autoComplete="off" type="text"
              name="displayName"
              className="mt-2 w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-base font-medium text-black transition-all duration-200 focus:outline-none focus:shadow-[3px_3px_0_#000]"
              placeholder="Tên của bạn"
            />
          </label>
        )}

        <label className="block text-sm">
          <span className="font-semibold text-black">
            Email
          </span>
          <input
            autoComplete="off" type="email"
            name="email"
            className="mt-2 w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-base font-medium text-black transition-all duration-200 focus:outline-none focus:shadow-[3px_3px_0_#000]"
            placeholder="you@roomieverse.com"
          />
        </label>

        <label className="block text-sm">
          <span className="font-semibold text-black">
            Mật khẩu
          </span>
          <input
            autoComplete="off" type="password"
            name="password"
            className="mt-2 w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-base font-medium text-black transition-all duration-200 focus:outline-none focus:shadow-[3px_3px_0_#000]"
            placeholder="********"
          />
        </label>

        {/* Error message */}
        {error && (
          <div className="rounded-xl border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full px-6 py-4 text-base font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="h-5 w-5 mx-auto animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            mode === "login" ? "Đăng nhập" : "Tạo tài khoản"
          )}
        </button>
      </form>

      {/* Terms - Only show on Signup */}
      {mode === "signup" && (
        <p className="mt-6 text-xs font-medium text-zinc-600">
          Bằng việc tiếp tục, bạn đồng ý với{" "}
          <button type="button" onClick={() => setPolicyModal("terms")} className="font-bold text-blue-400 underline hover:text-blue-600">
            Điều khoản
          </button>{" "}
          và{" "}
          <button type="button" onClick={() => setPolicyModal("privacy")} className="font-bold text-blue-400 underline hover:text-blue-600">
            Chính sách bảo mật
          </button>{" "}
          của roomieVerse.
        </p>
      )}

      {/* Policy Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setPolicyModal(null)}>
          <div
            className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPolicyModal(null)}
              className="absolute right-4 top-4 rounded-lg p-1 hover:bg-zinc-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {policyModal === "terms" ? <TermsContent /> : <PrivacyContent />}

            <button
              type="button"
              onClick={() => setPolicyModal(null)}
              className="mt-6 w-full rounded-xl border-2 border-black bg-blue-100 px-4 py-3 text-sm font-bold hover:bg-blue-200 transition-colors"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
}

function TermsContent() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-zinc-700 pr-2">
      <h2 className="text-xl font-black text-black">Điều Khoản Sử Dụng</h2>

      <div>
        <h3 className="font-bold text-black mb-1">1. Tài khoản</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>Bạn phải từ 18 tuổi trở lên để tạo tài khoản.</li>
          <li>Thông tin đăng ký phải chính xác và trung thực.</li>
          <li>Bạn chịu trách nhiệm bảo mật tài khoản của mình.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-black mb-1">2. Nội dung đăng tải</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>Tin đăng phải mô tả chính xác phòng trọ hoặc nhu cầu tìm bạn cùng phòng.</li>
          <li>Nghiêm cấm nội dung sai sự thật, lừa đảo, quấy rối, hoặc vi phạm pháp luật.</li>
          <li>roomieVerse có quyền gỡ bỏ nội dung vi phạm mà không cần thông báo trước.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-black mb-1">3. Quy tắc sử dụng</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>Không sử dụng nền tảng cho mục đích thương mại hoặc quảng cáo trái phép.</li>
          <li>Không spam hoặc làm phiền người dùng khác.</li>
          <li>Không cố gắng truy cập trái phép vào hệ thống.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-black mb-1">4. Trách nhiệm</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>roomieVerse là nền tảng kết nối, không phải bên trung gian cho thuê phòng.</li>
          <li>Chúng tôi không chịu trách nhiệm về giao dịch giữa các người dùng.</li>
          <li>Bạn nên tự xác minh thông tin trước khi đưa ra quyết định.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-black mb-1">5. Đình chỉ & thay đổi</h3>
        <p>roomieVerse có quyền đình chỉ tài khoản vi phạm. Điều khoản có thể được cập nhật và chúng tôi sẽ thông báo khi có thay đổi quan trọng.</p>
      </div>

      <p className="text-xs text-zinc-400">Liên hệ: roomieversebyantt@gmail.com</p>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-zinc-700 pr-2">
      <h2 className="text-xl font-black text-black">Chính Sách Bảo Mật</h2>

      <div>
        <h3 className="font-bold text-black mb-1">1. Thông tin thu thập</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Tài khoản:</strong> Tên, email, ảnh đại diện.</li>
          <li><strong>Hồ sơ:</strong> Giới tính, năm sinh, nghề nghiệp, sở thích.</li>
          <li><strong>Liên hệ:</strong> SĐT, Zalo, Facebook, Instagram (chỉ khi bạn tự cung cấp).</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-black mb-1">2. Sử dụng thông tin</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>Cung cấp dịch vụ kết nối phòng trọ và roommate.</li>
          <li>Hiển thị thông tin liên hệ cho người quan tâm đến tin đăng.</li>
          <li>Kiểm duyệt nội dung và gửi thông báo liên quan.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-black mb-1">3. Chia sẻ thông tin</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>Hồ sơ công khai hiển thị cho người dùng khác.</li>
          <li>Thông tin liên hệ chỉ hiển thị cho người đã đăng nhập.</li>
          <li>Chúng tôi <strong>không bán</strong> thông tin cá nhân cho bên thứ ba.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-black mb-1">4. Bảo mật & quyền của bạn</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>Dữ liệu lưu trữ trên Firebase (Google Cloud) với mã hóa.</li>
          <li>Bạn có thể xem, chỉnh sửa hồ sơ và xóa tin đăng bất cứ lúc nào.</li>
          <li>Liên hệ chúng tôi để yêu cầu xóa toàn bộ tài khoản.</li>
        </ul>
      </div>

      <p className="text-xs text-zinc-400">Liên hệ: roomieversebyantt@gmail.com</p>
    </div>
  );
}
