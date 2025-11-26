"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AnimatedLogo() {
  const [rotation, setRotation] = useState(0);

  const handleMouseEnter = () => {
    // Random rotation between -3 and 3 degrees
    const randomRotation = Math.random() * 6 - 3;
    setRotation(randomRotation);
  };

  const handleMouseLeave = () => {
    setRotation(0);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-bold text-black">Welcome to</span>
      <Link href="/">
        <Image
          src="/roomieverselogowpic.png"
          alt="roomieVerse"
          width={1000}
          height={250}
          className="h-64 w-auto transition-all duration-300 hover:scale-125"
          style={{ transform: `rotate(${rotation}deg)` }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          priority
        />
      </Link>
    </div>
  );
}
