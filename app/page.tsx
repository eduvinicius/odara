import Link from "next/link";
import Image from "next/image";
import { HandHeart, Gift, MessageCircle } from "lucide-react";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Eyebrow } from "@/app/components/core/Eyebrow";
import { Button } from "@/app/components/core/Button";
import { ProductSections } from "@/app/components/home/ProductSections";
import { WHATSAPP } from "@/lib/data";

function ValueItem({
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

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section style={{ background: "var(--gradient-page)" }}>
          <div
            className="grid items-center gap-12"
            style={{
              maxWidth: "var(--container-max)",
              margin: "0 auto",
              padding: "clamp(40px,6vw,80px) clamp(16px,4vw,48px)",
              gridTemplateColumns: "1.05fr 0.95fr",
            }}
          >
            <div className="flex flex-col gap-5.5 items-start">
              <Eyebrow>Arte em presentear</Eyebrow>
              <h1
                className="font-serif font-semibold text-ink-900 leading-[1.05]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                Presentes que abraçam quem você ama
              </h1>
              <p className="text-lg text-ink-700 max-w-115 leading-[1.6]">
                Peças artesanais montadas e embrulhadas à mão, com carinho. Escolha o presente,
                monte seu pedido e finalize pelo WhatsApp.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/catalogo">
                  <Button variant="primary" size="lg" iconRight="arrow-right">
                    Ver catálogo
                  </Button>
                </Link>
                <Link href="/sobre">
                  <Button variant="outline" size="lg">
                    Quem somos
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className="relative rounded-xl overflow-hidden shadow-lg border border-border-soft"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src="/odara-hero.jpg"
                alt="Presentes artesanais Odara"
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Values strip */}
        <section className="bg-surface-card border-t border-b border-border-soft">
          <div
            className="grid gap-8"
            style={{
              maxWidth: "var(--container-max)",
              margin: "0 auto",
              padding: "32px clamp(16px,4vw,48px)",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <ValueItem
              icon={HandHeart}
              title="Feito à mão"
              text="Cada peça é montada com cuidado e atenção aos detalhes."
            />
            <ValueItem
              icon={Gift}
              title="Embrulho especial"
              text="Laços de cetim e acabamento pensado para emocionar."
            />
            <ValueItem
              icon={MessageCircle}
              title="Pedido no WhatsApp"
              text="Monte o carrinho e finalize a compra conversando com a gente."
            />
          </div>
        </section>

        {/* Product sections (client — manages favorites) */}
        <ProductSections />

        {/* WhatsApp CTA band */}
        <section className="bg-emerald-500">
          <div
            className="flex flex-col items-center text-center gap-4.5"
            style={{
              maxWidth: "var(--container-max)",
              margin: "0 auto",
              padding: "clamp(44px,6vw,72px) clamp(16px,4vw,48px)",
            }}
          >
            <Eyebrow align="center" color="var(--gold-200)">
              Feito com amor para você
            </Eyebrow>
            <h2
              className="font-serif font-semibold text-cream-50 max-w-140"
              style={{ fontSize: "var(--text-3xl)" }}
            >
              Precisa de ajuda para escolher o presente perfeito?
            </h2>
            <p className="max-w-120" style={{ color: "rgba(247,237,225,0.82)" }}>
              Fale com a gente no WhatsApp — ajudamos você a montar um presente inesquecível.
            </p>
            <Button
              variant="whatsapp"
              size="lg"
              iconLeft="message-circle"
              href={`https://wa.me/${WHATSAPP}`}
            >
              Conversar no WhatsApp
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
