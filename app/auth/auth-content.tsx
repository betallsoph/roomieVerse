"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedLogo from "../components/AnimatedLogo";
import AuthForm from "./auth-form";

export default function AuthContent() {
  const [bounceKey, setBounceKey] = useState(0);

  const triggerBounce = () => {
    setBounceKey(prev => prev + 1);
  };

  return (
    <div className="wrapper mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row">
      {/* Left Card */}
      <motion.section 
        key={`left-${bounceKey}`}
        className="card flex flex-1 flex-col justify-between bg-white p-8 lg:p-10"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 15
        }}
      >
        <div>
          <AnimatedLogo />
          <p className="mt-6 text-center text-base font-medium leading-relaxed text-zinc-600">
            Nền tảng kết nối roommate đáng tin cậy. Không môi giới, không tin rác - chỉ có người thật tìm phòng thật.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="btn-secondary text-sm"
          >
            Tìm hiểu thêm về roomieVerse
          </Link>
          <Link
            href="/"
            className="btn-primary text-sm"
          >
            Trang chủ
          </Link>
        </div>
      </motion.section>

      {/* Right Card - Auth Form */}
      <AuthForm bounceKey={bounceKey} onModeChange={triggerBounce} />
    </div>
  );
}
