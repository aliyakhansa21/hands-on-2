"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search Input */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari produk..."
          className="w-48 rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 outline-none transition focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100 sm:w-56"
        />
      </div>

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100 cursor-pointer"
      >
        <option value="all">Semua Kategori</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100 cursor-pointer"
      >
        <option value="default">Urutkan</option>
        <option value="price-asc">Harga: Rendah ke Tinggi</option>
        <option value="price-desc">Harga: Tinggi ke Rendah</option>
        <option value="rating-desc">Rating Tertinggi</option>
        <option value="name-asc">Nama: A-Z</option>
      </select>
    </div>
  );
}