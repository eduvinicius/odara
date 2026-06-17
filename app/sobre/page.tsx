import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Eyebrow } from "@/app/components/core/Eyebrow";
import { Divider } from "@/app/components/core/Divider";
import { Button } from "@/app/components/core/Button";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { VALUES, STATS, wrap } from "./page.data";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section
          className="border-b border-border-soft"
          style={{ background: "var(--gradient-page)" }}
        >
          <div
            className="flex flex-col items-center gap-4 text-center"
            style={{ ...wrap, padding: "clamp(48px,6vw,84px) clamp(16px,4vw,48px)" }}
          >
            <Eyebrow align="center">Quem somos</Eyebrow>
            <h1
              className="font-serif font-semibold text-ink-900 leading-[1.08]"
              style={{ fontSize: "clamp(2.4rem,5vw,3.4rem)", maxWidth: 680 }}
            >
              Uma loja feita de afeto e de detalhes
            </h1>
            <Divider width="140px" />
            <p
              className="text-lg text-ink-700 leading-[1.7]"
              style={{ maxWidth: "var(--container-narrow)" }}
            >
              A Odara nasceu do desejo de transformar gestos simples em memórias inesquecíveis.
              Cada presente é pensado, montado e embrulhado à mão — porque acreditamos que a
              forma de presentear também é uma forma de dizer &quot;eu te amo&quot;.
            </p>
          </div>
        </section>

        {/* Image + story */}
        <section style={{ ...wrap, padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)" }}>
          <div
            className="grid items-center gap-12"
            style={{ gridTemplateColumns: "0.9fr 1.1fr" }}
          >
            {/* Image */}
            <div
              className="rounded-xl overflow-hidden shadow-lg border border-border-std"
              style={{ aspectRatio: "4 / 3", position: "relative" }}
            >
              <Image
                src="/odara-gifts.jpg"
                alt="Presentes e detalhes Odara"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Story */}
            <div className="flex flex-col gap-4.5">
              <Eyebrow>Nossa história</Eyebrow>
              <h2 className="font-serif text-3xl font-semibold text-ink-900">
                Arte em presentear
              </h2>
              <p className="text-ink-700 leading-[1.7]">
                Começamos pequenininho, embrulhando presentes para amigos e família. O carinho
                nos detalhes virou propósito: hoje atendemos clientes de todo o Brasil com peças
                artesanais, aromas, joias delicadas e caixas surpresa montadas uma a uma.
              </p>
              <p className="text-ink-700 leading-[1.7]">
                Não trabalhamos com pagamento no site — preferimos conversar. Você monta seu
                pedido por aqui e finaliza no WhatsApp, onde combinamos tudo com a atenção que
                cada presente merece.
              </p>

              {/* Stats */}
              <div className="flex gap-10 mt-2">
                {STATS.map(({ number, label }) => (
                  <div key={label} className="text-center">
                    <div className="font-serif text-4xl font-semibold text-gold-500 leading-none">
                      {number}
                    </div>
                    <div className="text-sm text-ink-500 mt-1.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-surface-sunken">
          <div style={{ ...wrap, padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)" }}>
            <div className="flex flex-col items-center gap-2.5 text-center mb-10">
              <Eyebrow align="center">No que acreditamos</Eyebrow>
              <h2 className="font-serif text-3xl font-semibold text-ink-900">Nossos valores</h2>
            </div>

            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-surface-card border border-border-soft rounded-lg p-7 shadow-sm flex flex-col gap-3"
                >
                  <span className="w-13 h-13 rounded-circle bg-cream-100 inline-flex items-center justify-center text-gold-500">
                    <Icon size={24} />
                  </span>
                  <div className="font-serif text-xl font-semibold text-ink-900">{title}</div>
                  <div className="text-ink-500 leading-[1.6]">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-emerald-500">
          <div
            className="flex flex-col items-center gap-4.5 text-center"
            style={{ ...wrap, padding: "clamp(44px,6vw,72px) clamp(16px,4vw,48px)" }}
          >
            <Eyebrow align="center" color="var(--gold-200)">
              Vamos conversar?
            </Eyebrow>
            <h2
              className="font-serif text-3xl font-semibold text-cream-50"
              style={{ maxWidth: 540 }}
            >
              Estamos aqui para ajudar a presentear
            </h2>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                variant="whatsapp"
                size="lg"
                iconLeft="message-circle"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
              >
                Falar no WhatsApp
              </Button>
              <Link href="/catalogo">
                <Button
                  variant="outline"
                  size="lg"
                  style={{ color: "var(--cream-50)", borderColor: "rgba(247,237,225,0.5)" }}
                >
                  Ver catálogo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
