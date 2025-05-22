import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Generador de formas con texto
        </h1>
        <p className="text-gray-600 mb-8">
          Escribe una descripción como{" "}
          <span className="italic">un círculo rojo grande</span> y deja que el
          editor haga el resto.
        </p>
        <Link
          href="/editor"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Ir al editor
        </Link>
        <Link
          href="/generate-image"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Generar Imagen con IA
        </Link>
      </div>
    </main>
  );
}
