"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/format";
import QuantityStepper from "@/components/QuantityStepper";
import EmptyState from "@/components/EmptyState";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-800">
          Keranjang Belanja
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm font-medium text-red-500 hover:text-red-600"
          >
            Kosongkan Keranjang
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Keranjang kamu masih kosong"
          message="Yuk mulai belanja produk UMKM favoritmu di halaman utama."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-3 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl2 border border-pink-100 bg-white p-3 shadow-card"
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-pink-50">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-brand-300" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm font-bold text-brand-700">
                    {formatRupiah(item.price)}
                  </p>
                </div>

                <QuantityStepper
                  quantity={item.quantity}
                  onIncrease={() => increaseQty(item.id)}
                  onDecrease={() => decreaseQty(item.id)}
                />

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Hapus produk"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-xl2 border border-pink-100 bg-pink-50/50 p-5 shadow-card">
            <h2 className="text-base font-bold text-gray-800">
              Ringkasan Belanja
            </h2>

            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Total Item</span>
              <span>{totalItems}</span>
            </div>

            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-pink-200 pt-4 text-base font-bold text-gray-800">
              <span>Total</span>
              <span className="text-brand-700">{formatRupiah(totalPrice)}</span>
            </div>

            <button className="mt-5 w-full rounded-full bg-brand-500 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600">
              Checkout
            </button>

            <Link
              href="/"
              className="mt-3 block text-center text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              ← Lanjut Belanja
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}