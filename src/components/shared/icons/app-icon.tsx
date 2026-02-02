"use client"

import iconBlackImg from "@/assets/images/icon-black.png";
import iconWhiteImg from "@/assets/images/icon-white.png";

import { useTheme } from "next-themes";

export function AppIcon() {
  const { theme } = useTheme();

  return (
    <img
      src={theme === "light" ? iconBlackImg : iconWhiteImg}
      width={204}
      height={204}
      className="w-full img-to-hide"
      alt="Iconé do logo da Smart Consig"
    />
  )
}
