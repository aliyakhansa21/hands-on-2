"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Store, BadgeCheck, Check } from "lucide-react";
import { getProductById, getStoreById } from "@/services/api";
import { formatRupiah, conditionLabel } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import ErrorState from "@/components/ErrorState";

function DetailSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-8 md:grid-cols-2">
      <div className="aspect-square rounded-xl2 bg-pink-100" />
      <div className="space-y-4">
        <div className="h-3 w-24 rounded bg-pink-100" />
        <div className="h-6 w-3/4 rounded bg-pink-100" />
        <div className="h-4 w-1/3 rounded bg-pink-100" />
        <div className="h-8 w-1/2 rounded bg-pink-100" />
        <div className="h-24 w-full rounded bg-pink-100" />
        <div className="h-10 w-40 rounded-full bg-pink-100" />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  async function loadProduct() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getProductById(id);

      if (!data) {
        setError("Produk tidak ditemukan.");
        setProduct(null);
        return;
      }

      setProduct(data);

      if (data.storeId) {
        try {
          const storeData = await getStoreById(data.storeId);
          setStore(storeData);
        } catch (_) {
          setStore(null);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat detail produk."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const hasDiscount = product?.discountPercentage > 0;

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => router.back()}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        ← Kembali
      </button>

      {isLoading && <DetailSkeleton />}

      {!isLoading && error && (
        <ErrorState message={error} onRetry={loadProduct} />
      )}

      {!isLoading && !error && product && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl2 border border-pink-100 bg-pink-50">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ShoppingBag className="h-20 w-20 text-brand-300" />
              </div>
            )}

            <div className="absolute left-3 top-3 flex flex-col gap-1">
              {hasDiscount && (
                <span className="w-fit rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                  Diskon {product.discountPercentage}%
                </span>
              )}
              {product.isNewArrival && (
                <span className="w-fit rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                  Produk Baru
                </span>
              )}
              {product.isFeatured && (
                <span className="flex w-fit items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white">
                  <Star className="h-3 w-3 fill-white text-white" />
                  Unggulan
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                {product.category}
                {product.brand ? ` · ${product.brand}` : ""}
              </p>
              <span className="rounded-full border border-pink-200 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                {conditionLabel(product.condition)}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-gray-800">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-amber-500">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400">
                · Stok {product.stock > 0 ? product.stock : "habis"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {formatRupiah(product.price)}
                </span>
              )}
              <p className="text-3xl font-extrabold text-brand-700">
                {formatRupiah(product.finalPrice)}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>

            {store && (
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-pink-100 bg-pink-50/50 p-3">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-white">
                  {store.logo ? (
                    <Image
                      src={store.logo}
                      alt={store.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Store className="h-6 w-6 text-brand-400" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-gray-800">
                      {store.name}
                    </span>
                    {store.isOfficial && (
                      <span className="flex items-center gap-0.5 rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        <BadgeCheck className="h-3 w-3" />
                        Official
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{store.city}</span>
                    <span>·</span>
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{store.rating.toFixed(1)}</span>
                    <span>·</span>
                    <span>{store.productCount} produk</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {product.stock <= 0 ? "Stok Habis" : "Tambah ke Keranjang"}
              </button>

              <Link
                href="/cart"
                className="rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
              >
                Lihat Keranjang
              </Link>

              {justAdded && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                  <Check className="h-4 w-4" />
                  Ditambahkan ke keranjang!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}