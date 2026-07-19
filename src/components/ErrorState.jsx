import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl2 border border-red-100 bg-red-50 px-6 py-16 text-center">
      <AlertTriangle className="h-12 w-12 text-red-400" />
      <h3 className="text-base font-semibold text-red-700">
        Gagal memuat data
      </h3>
      <p className="max-w-sm text-sm text-red-500">
        {message || "Terjadi kesalahan saat mengambil data dari server."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}