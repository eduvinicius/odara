const SKELETON_KEYS = ["sk-0", "sk-1", "sk-2", "sk-3"] as const;

export function SkeletonGrid() {
  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
      {SKELETON_KEYS.map((key) => (
        <div
          key={key}
          className="rounded-xl bg-cream-100 animate-pulse"
          style={{ height: 320 }}
        />
      ))}
    </div>
  );
}
