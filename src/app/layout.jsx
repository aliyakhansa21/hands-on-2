import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Sistoko | E-Commerce UMKM",
  description:
    "Sistoko - marketplace sederhana untuk UMKM, dibangun untuk tugas SISTECH 2026 Frontend Engineering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="min-h-screen bg-white antialiased font-jakarta">
        <CartProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            {children}
          </main>
          <footer className="mt-16 border-t border-pink-100 bg-pink-50/40 py-8 text-center text-xs text-gray-500">
            Dibuat dengan 🩷 untuk SISTECH 2026 Hands On — Frontend Engineering
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}