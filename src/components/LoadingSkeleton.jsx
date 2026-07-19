function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl2 border border-pink-100 bg-white shadow-card">
      <div className="aspect-square w-full animate-pulse bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50 bg-[length:400%_100%] animate-shimmer" />
      <div className="space-y-2 p-3">
        <div className="h-2 w-1/3 animate-pulse rounded bg-pink-100" />
        <div className="h-3 w-full animate-pulse rounded bg-pink-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-pink-100" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-4 w-16 animate-pulse rounded bg-pink-100" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-pink-100" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}