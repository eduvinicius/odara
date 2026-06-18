const SKELETON_KEYS = ["sk-0", "sk-1", "sk-2", "sk-3"] as const;

export function FeedbackSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      {SKELETON_KEYS.map((key) => (
        <div
          key={key}
          className="flex-1 min-w-0 rounded-lg animate-pulse"
          style={{ height: "220px", background: "var(--cream-200)" }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
