import { Separator } from "./separator";

export default function Footer() {
  return (
    <footer className="bg-white mt-auto border-t">
      <Separator />
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Desarrollado por Sergio Alberca · Vidext · Prueba Técnica</span>
        <a
          href="https://tldraw.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-primary"
        >
          Ver Tldraw
        </a>
      </div>
    </footer>
  );
}
