export function formatRupiah(amount) {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function conditionLabel(condition) {
  const map = {
    New: "Baru",
    Used: "Bekas",
    Refurbished: "Refurbished",
  };
  return map[condition] ?? condition;
}