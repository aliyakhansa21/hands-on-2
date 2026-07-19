import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-pink-200 bg-pink-50 px-2 py-1">
      <button
        onClick={onDecrease}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm transition hover:bg-brand-50"
        aria-label="Kurangi jumlah"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-5 text-center text-sm font-semibold text-gray-700">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm transition hover:bg-brand-50"
        aria-label="Tambah jumlah"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}