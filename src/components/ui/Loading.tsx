export function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-(--color-primary) border-t-transparent" />
        <p className="text-(--color-text-light)">불러오는 중...</p>
      </div>
    </div>
  );
}
