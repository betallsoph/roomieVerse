"use client";

import Link from "next/link";
import { useState } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className = "" }: NavLinkProps) {
  const [hoverColor, setHoverColor] = useState<"blue" | "pink">("blue");

  const handleMouseEnter = () => {
    setHoverColor(Math.random() > 0.5 ? "blue" : "pink");
  };

  const colorClass = hoverColor === "blue" ? "hover:text-blue-300" : "hover:text-pink-400";

  return (
    <Link
      href={href}
      className={`nav-link ${colorClass} ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Link>
  );
}
