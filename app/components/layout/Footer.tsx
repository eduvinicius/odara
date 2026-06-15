import Link from "next/link";
import { Logo } from "@/app/components/core/Logo";
import { Divider } from "@/app/components/core/Divider";

function FooterCol({ title, items }: { title: string; items: { label: string; href?: string }[] }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="font-sans text-2xs uppercase tracking-[0.28em] text-gold-300">
        {title}
      </span>
      {items.map(({ label, href }) =>
        href ? (
          <Link
            key={label}
            href={href}
            className="font-sans text-sm text-left"
            style={{ color: "rgba(247,237,225,0.78)" }}
          >
            {label}
          </Link>
        ) : (
          <span
            key={label}
            className="font-sans text-sm"
            style={{ color: "rgba(247,237,225,0.78)" }}
          >
            {label}
          </span>
        )
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="text-cream-100"
      style={{
        background: "var(--emerald-600)",
        padding: "clamp(40px, 6vw, 72px) clamp(16px, 4vw, 48px) 32px",
      }}
    >
      <div
        className="grid gap-10 items-start"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
        }}
      >
        <div className="flex flex-col gap-[14px] max-w-[280px]">
          <Logo size="md" color="var(--gold-200)" />
          <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(247,237,225,0.78)" }}>
            Presentes artesanais, montados e embrulhados à mão. Feito com amor para você.
          </p>
        </div>

        <FooterCol
          title="Navegar"
          items={[
            { label: "Início",      href: "/" },
            { label: "Catálogo",    href: "/catalog" },
            { label: "Quem somos",  href: "/about" },
          ]}
        />

        <FooterCol
          title="Contato"
          items={[
            { label: "WhatsApp" },
            { label: "@odara.presentes" },
            { label: "contato@odara.com.br" },
          ]}
        />

        <FooterCol
          title="Atendimento"
          items={[
            { label: "Seg a Sex · 9h–18h" },
            { label: "Sáb · 9h–13h" },
            { label: "Envios para todo o Brasil" },
          ]}
        />
      </div>

      <div style={{ maxWidth: "var(--container-max)", margin: "40px auto 0" }}>
        <Divider />
        <p
          className="text-center mt-5 font-sans text-xs"
          style={{ color: "rgba(247,237,225,0.6)" }}
        >
          © 2026 Odara · Arte em presentear · Catálogo para visualização — pedidos finalizados pelo WhatsApp
        </p>
      </div>
    </footer>
  );
}
