export function ValueItem({
  icon: Icon,
  title,
  text,
}: Readonly<{
  icon: React.ComponentType<{ size: number; className: string }>;
  title: string;
  text: string;
}>) {
  return (
    <div className="flex gap-3.5 items-start">
      <span className="flex-none w-11 h-11 rounded-circle bg-cream-100 border border-border-soft inline-flex items-center justify-center text-gold-500">
        <Icon size={20} className="text-gold-500" />
      </span>
      <div>
        <div className="font-serif text-lg font-semibold text-ink-900">{title}</div>
        <div className="text-sm text-ink-500 leading-normal">{text}</div>
      </div>
    </div>
  );
}
