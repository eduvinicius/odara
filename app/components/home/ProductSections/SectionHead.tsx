import { Eyebrow } from "@/app/components/core/Eyebrow";
import { Divider } from "@/app/components/core/Divider";

export function SectionHead({ eyebrow, title, sub }: Readonly<{ eyebrow: string; title: string; sub?: string }>) {
  return (
    <div className="text-center max-w-155 mx-auto mb-9 flex flex-col items-center gap-2.5">
      <Eyebrow align="center">{eyebrow}</Eyebrow>
      <h2 className="font-serif text-3xl font-semibold text-ink-900">{title}</h2>
      <Divider width="120px" />
      {sub && <p className="text-ink-500 text-md">{sub}</p>}
    </div>
  );
}
