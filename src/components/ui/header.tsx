import { Separator } from "./separator";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Editor Visual
          </h1>
          <p className="text-sm text-muted-foreground">
            Prueba técnica usando Tldraw, tRPC, Next.js y más.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">🚀 Mayo 2025</span>
      </div>
      <Separator />
    </header>
  );
}
