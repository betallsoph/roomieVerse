"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithGoogle } = useAuth();

  const returnUrl = searchParams.get("returnUrl") || "/home";

  function handleModeChange(newMode: AuthMode) {
    setMode(newMode);
    setError(null);
    onModeChange?.();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Implement email/password auth with Firebase
    setError("Email/Password chưa được hỗ trợ. Vui lòng đăng nhập bằng Google.");
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      router.push(returnUrl);
    } catch (err: unknown) {
      // Ignore error when user closes popup
      const firebaseError = err as { code?: string };
      if (firebaseError.code !== 'auth/popup-closed-by-user') {
        console.error("Google login error:", err);
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    }
    setIsLoading(false);
  }

  function handlePhoneLogin() {
    // TODO: Implement phone auth with Firebase
    setError("Đăng nhập bằng số điện thoại chưa được hỗ trợ. Vui lòng đăng nhập bằng Google.");
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

      {/* Error message */}
      {error && (
        <div className="mt-4 rounded-xl border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Social Login Buttons - Only show on Login */}
      {mode === "login" && (
        <>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-0.5 flex-1 bg-zinc-200"></div>
            <span className="text-sm font-bold text-zinc-700">Đăng nhập bằng</span>
            <div className="h-0.5 flex-1 bg-zinc-200"></div>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black transition-all duration-200 hover:shadow-[4px_4px_0_#000] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Google
            </button>

            <button
              type="button"
              onClick={handlePhoneLogin}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-black bg-blue-300 px-4 py-3 text-sm font-bold text-black transition-all duration-200 hover:shadow-[4px_4px_0_#000] hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Số điện thoại
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-0.5 flex-1 bg-zinc-200"></div>
            <span className="text-xs font-medium text-zinc-400">hoặc</span>
            <div className="h-0.5 flex-1 bg-zinc-200"></div>
          </div>
        </>
      )}

      {/* Email/Password Form */}
      <form className={`space-y-5 ${mode === "signup" ? "mt-8" : ""}`} onSubmit={handleSubmit}>
        <label className="block text-sm">
          <span className="font-semibold text-black">
            Email
          </span>
          <input
            type="text"
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
            type="password"
            name="password"
            className="mt-2 w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-base font-medium text-black transition-all duration-200 focus:outline-none focus:shadow-[3px_3px_0_#000]"
            placeholder="********"
          />
        </label>

        <button
          type="submit"
          className="btn-primary w-full px-6 py-4 text-base font-bold uppercase"
        >
          {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
        </button>
      </form>

      {/* Terms - Only show on Signup */}
      {mode === "signup" && (
        <p className="mt-6 text-xs font-medium text-zinc-600">
          Bằng việc tiếp tục, bạn đồng ý với <span className="font-bold text-blue-400">Terms</span> và <span className="font-bold text-blue-400">Privacy</span> của roomieVerse.
        </p>
      )}
    </motion.section>
  );
}
