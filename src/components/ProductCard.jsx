"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  const hasDiscount = product.discountPercentage > 0;

  const stockStatus = () => {
    if (product.stock <= 0) return { label: "Stok Habis", color: "bg-red-50 text-red-500 border-red-200" };
    if (product.stock <= 5) return { label: "Stok Terbatas", color: "bg-amber-50 text-amber-500 border-amber-200" };
    return { label: "Tersedia", color: "bg-green-50 text-green-600 border-green-200" };
  };

  const status = stockStatus();

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Image area */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-brand-300" />
          </div>
        )}

        {/* Top-left badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="w-fit rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="w-fit rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white">
              Baru
            </span>
          )}
          {product.isFeatured && (
            <span className="flex w-fit items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-white">
              <Star className="h-3 w-3 fill-white text-white" />
              Unggulan
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-3 gap-2">
        {/* Name + Price row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 leading-snug">
              {product.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-gray-400 truncate">
              {product.category}
            </p>
          </div>
          <div className="flex flex-col items-end shrink-0">
            {hasDiscount && (
              <span className="text-[10px] text-gray-400 line-through">
                {formatRupiah(product.price)}
              </span>
            )}
            <span className="text-sm font-bold text-gray-900">
              {formatRupiah(product.finalPrice)}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-amber-500">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="font-medium text-gray-600">{product.rating.toFixed(1)}</span>
        </div>

        {/* Stock status + Add to cart */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span
            className={`flex-1 rounded-lg border py-1.5 text-center text-[11px] font-semibold ${status.color}`}
          >
            · {status.label}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="rounded-lg border border-brand-200 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-brand-600 transition hover:bg-brand-500 hover:text-white hover:border-brand-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            + Cart
          </button>
        </div>
      </div>
    </Link>
  );
}