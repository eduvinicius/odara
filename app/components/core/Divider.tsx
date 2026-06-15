interface DividerProps {
  heart?: boolean;
  width?: string;
  className?: string;
}

export function Divider({ heart = true, width = "100%", className }: DividerProps) {
  return (
    <div
      className={`flex items-center gap-3 text-gold-400${className ? ` ${className}` : ""}`}
      style={{ width }}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
      {heart && <span className="text-[13px] leading-none">♥</span>}
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
    </div>
  );
}
