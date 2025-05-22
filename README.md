✏️ Drawing Editor - Prueba Técnica

Este proyecto es un editor visual colaborativo estilo [tldraw](https://www.tldraw.com/), desarrollado como parte de una prueba técnica. Incluye integración con `tldraw`, `shadcn/ui` para los componentes UI, gestión de estado de carga y errores, y estructura de backend mediante `tRPC`. Inicialmente estaba planteado el uso de IA, pero se descartó por limitaciones de acceso en los servicios gratuitos.

---

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **tRPC**
- **tldraw**
- **DeepAI** – IA para generación de formas
- **Vercel** – para despliegue

---

## 🧱 Estructura del Proyecto

├── app/ # Rutas (app router)
│ ├── page.tsx # Home
│ └── editor/page.tsx # Página del editor de dibujo
│ └── generate-image/page.tsx # Página para generar imagenes con IA
├── components/ # Componentes reutilizables
│ ├── ui/ # Componentes de shadcn
│ ├── dialog/ # Dialogo con variantes (error/info/etc)
│ └── buttons/ # Botones con soporte para loading
├── lib/
│ └── utils.ts # Funciones auxiliares
├── server/
│ └── trpc/ # tRPC handler y routers
├── styles/ # Tailwind config
└── public/

---

## 🚀 Funcionalidades

### ✅ Página de Inicio

- Diseño limpio y simple con dos botones para navegar a las paginas.
- Skeleton de carga mientras se monta el editor.

### ✅ Editor de Dibujo

- Basado en `tldraw` con soporte completo para formas, texto, conexiones, etc.
- UI simple y funcional.

### ✅ Botón Personalizado con Loading

- Botón reutilizable que acepta una prop `isLoading` y cambia su estilo/interacción automáticamente.

```tsx
<ButtonWithLoading isLoading={true}>Guardar</ButtonWithLoading>
```

### ✅ tRPC para operaciones de servidor

```tsx
const mutation = trpc.example.saveDrawing.useMutation()

<Button
  disabled={mutation.isLoading}
  onClick={() => mutation.mutate({ data })}
>
  {mutation.isLoading ? "Guardando..." : "Guardar"}
</Button>
```

### ✅ Generación Automática con IA

- Al introducir una descripción en lenguaje natural, se conecta con la API de **DeepAI** para interpretar y generar automáticamente las formas correspondientes dentro del editor.

### 🧪 Pendiente o Fuera de Alcance

❌ Integración estable con IA generativa (por restricciones de uso gratuito en OpenAI, HuggingFace, DeepAI…)

### ✅ Instalación

pnpm install
pnpm run dev
