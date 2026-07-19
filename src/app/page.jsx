"use client";

import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/services/api";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError("");

      const nextProducts = await getProducts();
      setProducts(nextProducts);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat produk dari API."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return Array.from(unique).filter(Boolean);
  }, [products]);

  const visibleProducts = useMemo(() => {
    let result = products;

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    const sorted = [...result];
    switch (sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, searchTerm, selectedCategory, sortOption]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOption("default");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Daftar Produk</h1>
          <p className="mt-0.5 text-sm text-gray-400">
            Temukan produk UMKM favoritmu — diambil dari SISTECH E-Commerce API.
          </p>
        </div>

        {/* Search bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOption={sortOption}
          onSortChange={setSortOption}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {isLoading && <LoadingSkeleton />}

      {!isLoading && error && (
        <ErrorState message={error} onRetry={loadProducts} />
      )}

      {!isLoading && !error && visibleProducts.length === 0 && (
        <EmptyState onReset={handleResetFilters} />
      )}

      {!isLoading && !error && visibleProducts.length > 0 && (
        <>
          <p className="text-sm text-gray-400">
            Menampilkan{" "}
            <span className="font-semibold text-gray-600">
              {visibleProducts.length}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-gray-600">
              {products.length}
            </span>{" "}
            produk
          </p>
          <ProductGrid products={visibleProducts} />
        </>
      )}
    </div>
  );
}