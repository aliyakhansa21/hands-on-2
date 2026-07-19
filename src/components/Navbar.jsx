"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href) => pathname === href;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-pink-100/30 bg-white/40 backdrop-blur-xl shadow-sm"
          : "border-gray-100 bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-3 sm:px-6">
        {/* Logo — kiri */}
        <Link href="/" className="flex items-center gap-2 shrink-0 justify-self-start">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-bold text-white shadow-sm">
            S
          </span>
          <span className="text-lg font-extrabold tracking-tight text-brand-700">
            Sistoko
          </span>
        </Link>

        {/* Nav Pills — tengah */}
        <nav className="hidden items-center justify-center gap-1 sm:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive("/")
                ? "bg-pink-50 text-brand-600"
                : "text-gray-500 hover:bg-pink-50 hover:text-brand-600"
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/cart"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive("/cart")
                ? "bg-pink-50 text-brand-600"
                : "text-gray-500 hover:bg-pink-50 hover:text-brand-600"
            }`}
          >
            Keranjang
          </Link>
        </nav>

        {/* Cart Button — kanan */}
        <div className="flex justify-end">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-brand-200 bg-pink-50 px-4 py-2 text-sm font-semibold text-brand-600 transition hover:bg-pink-100 shrink-0"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Keranjang</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}