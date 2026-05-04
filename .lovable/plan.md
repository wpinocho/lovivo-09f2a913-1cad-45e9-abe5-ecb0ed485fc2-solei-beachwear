

## Plan: imagen sticky + verificación de tipografía/tokens

### Parte A — Hacer la imagen del producto sticky (no la columna derecha)

**Problema actual**
En `src/pages/ui/ProductPageUI.tsx` línea 283, la **columna derecha** (info) es la que tiene `lg:sticky lg:top-24 lg:self-start`. Esto causa que cuando el contenido derecho es corto, queda flotando, y no replica el patrón premium (Rodata, Aesop, Apple) donde la **imagen** se queda fija mientras el detalle scrollea.

**Cambio**
- Línea 177 (galería, `lg:col-span-7`): agregar `lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)]` para que la galería completa (thumbs verticales + imagen principal) se quede pegada.
- Línea 283 (info, `lg:col-span-5`): quitar `lg:sticky lg:top-24 lg:self-start`, dejar solo `space-y-8`.
- Asegurar que el padre `<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">` (línea 175) NO tenga `overflow-hidden` (ya está OK) — sticky requiere que ningún ancestro corte overflow.
- En la galería desktop interior (línea 179, `hidden md:flex gap-4`): mantener tal cual; el sticky aplica al wrapper exterior.
- Verificar que la imagen principal `aspect-[4/5]` no exceda `100vh - 7rem` en pantallas chicas — agregar `lg:max-h-[80vh]` al contenedor de imagen principal (línea 218) para que no desborde y la sticky funcione visualmente.

**Resultado**: idéntico patrón a tus referencias — la imagen queda fija a la izquierda, la columna derecha (precio, variantes, CTAs, acordeones) scrollea libremente.

### Parte B — Confirmar tipografía y colores ligados al sistema global

**Diagnóstico**
Revisé `tailwind.config.ts` + `src/index.css` + el archivo PDP. Estado actual:

- **Tipografía**: la PDP **NO** usa `font-dm-sans`, `font-poppins`, etc. hardcoded. Usa solo modificadores neutrales (`text-3xl`, `font-light`, `font-semibold`, `tracking-tight`). La `font-family` se hereda del `<body>` global, que viene del template (`EcommerceTemplate`). **Ya está bien**: si cambias la fuente global, la PDP se actualiza sola.
- **Colores**: todos los colores usan tokens semánticos HSL (`text-foreground`, `text-muted-foreground`, `text-primary`, `bg-background`, `bg-muted/30`, `border-border`, `bg-foreground text-background` para el badge). **Ya está bien**: si cambias los HSL en `index.css`, la PDP se actualiza sola.
- **Único hardcode encontrado**: ninguno. Todo limpio.

**Acción**: ninguna. Confirmo en respuesta. Solo agrego un comentario al inicio del archivo documentando que la PDP usa tokens semánticos para que futuros cambios respeten el patrón.

### Archivo a modificar

Solo `src/pages/ui/ProductPageUI.tsx`. Tres cambios puntuales:

1. Línea 177 → agregar clases sticky a la galería.
2. Línea 218 → agregar `lg:max-h-[80vh]` al contenedor de imagen principal.
3. Línea 283 → quitar clases sticky de la columna info.

### Verificación post-cambio

- Desktop 1328px: scrollear la página y confirmar que la imagen del producto (con sus thumbnails verticales) se queda visible arriba mientras la columna derecha scrollea hasta los acordeones.
- Mobile: sin cambios (la galería es carousel, no aplica sticky).
- Confirmar que la sticky bar de "Comprar ahora / Agregar al carrito" sigue apareciendo cuando los CTAs salen del viewport.

### Lo que NO cambia

- Lógica del headless, tracking, variantes, Express Checkout, suscripciones.
- Layout 7/5, breadcrumbs, highlights, acordeones, stepper de cantidad.
- Colores ni tipografía (ya están en tokens del sistema).

