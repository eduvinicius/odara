import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Button } from "@/app/components/core/Button";
import { wrap } from "../page.data";

export default function ProductNotFound(): React.ReactElement {
  return (
    <>
      <Header />

      <main className="bg-surface-page" style={{ minHeight: "60vh" }}>
        <div
          className="flex flex-col items-center justify-center gap-4 text-center"
          style={{
            ...wrap,
            padding: "clamp(64px,8vw,120px) clamp(16px,4vw,48px)",
          }}
        >
          <h1
            className="font-serif font-semibold"
            style={{ fontSize: "var(--text-3xl)", color: "var(--ink-900)" }}
          >
            Produto não encontrado
          </h1>

          <p className="font-sans max-w-md" style={{ color: "var(--ink-500)" }}>
            O produto que você procura não existe ou foi removido do nosso catálogo.
          </p>

          <Button href="/catalogo" variant="outline">
            Voltar ao catálogo
          </Button>
        </div>
      </main>

      <Footer />
    </>
  );
}
