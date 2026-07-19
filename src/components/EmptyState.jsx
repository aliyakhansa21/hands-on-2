import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "Belum ada produk",
  message = "Coba ubah kata kunci pencarian atau filter kategori kamu.",
  onReset,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-pink-100 bg-pink-50/50 px-6 py-16 text-center">
      <SearchX className="h-12 w-12 text-brand-300" />
      <h3 className="text-base font-semibold text-gray-700">{title}</h3>
      <p className="max-w-sm text-sm text-gray-500">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Reset Filter
        </button>
      )}
    </div>
  );
}