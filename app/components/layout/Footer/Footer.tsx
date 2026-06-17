import { Logo } from "@/app/components/core/Logo";
import { Divider } from "@/app/components/core/Divider";
import { FooterCol } from "./FooterCol";
import { FOOTER_NAV_ITEMS, FOOTER_CONTACT_ITEMS, FOOTER_SERVICE_ITEMS } from "./footer.data";

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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 items-start"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
        }}
      >
        <div className="flex flex-col gap-3.5 max-w-70">
          <Logo size="md" color="var(--gold-200)" />
          <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(247,237,225,0.78)" }}>
            Presentes artesanais, montados e embrulhados à mão. Feito com amor para você.
          </p>
        </div>

        <FooterCol title="Navegar"     items={FOOTER_NAV_ITEMS}     />
        <FooterCol title="Contato"     items={FOOTER_CONTACT_ITEMS} />
        <FooterCol title="Atendimento" items={FOOTER_SERVICE_ITEMS} />
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
