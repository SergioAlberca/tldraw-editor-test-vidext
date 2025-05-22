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

## Mejoras futuras

- ✅ Incluir más tests para cubrir casos adicionales y asegurar mayor estabilidad de la lógica de negocio.
- ✅ Recuperar los datos iniciales del documento directamente desde el servidor en lugar de hacerlo del lado del cliente mediante hooks.
- ✅ Mejorar el motor de IA encargado de generar las imágenes, ya que actualmente funciona de manera bastante deficiente y no ofrece resultados satisfactorios.

### 🧪 Testing

Este proyecto utiliza `jest` y `@testing-library/react` para realizar los tests.

#### Ejecutar todos los tests

```bash
pnpm test

```

### ✅ Instalación

```bash
pnpm install
pnpm dev

```
