# Marvel Tracker — Design System (Cómic Editorial / Vivid Narrative)

> Sistema de diseño formalizado para Marvel Tracker.  
> Todos los ejemplos de código usan los tokens `marvel.*` definidos en [`tailwind.config.js`](file:///c:/Users/Gonzalo/Desktop/Diseño%20y%20Desarrollo/UCM/tailwind.config.js).  
> **NO** usar valores hex hardcodeados en componentes — usar siempre los tokens del sistema.

---

## 1. Brand & Filosofía

La estética evoluciona de Cinematic Glassmorphism a **Cómic Editorial (Vivid Narrative / MCU Tracker Modern)**: la sensación física e ilustrada de un archivo impreso de Marvel, con papel de periódico claro (*newsprint*), tipografía editorial de alto impacto, alto contraste en tinta negra y rojo de marca, y la inclusión de badges de edición numerada (**ISSUE #XX**).

### Pilares estilísticos

1. **Claridad Papel & Textura Halftone** — Fondo claro en blanco roto/crema (`marvel.paper`) enriquecido con un patrón sutil de puntos de imprenta (*halftone dot pattern*) sin librerías externas.
2. **Cero Translucidez & Alto Contraste** — Todo es plano, sólido y estructurado. Cero `backdrop-blur`, cero sombras difusas ni efectos de vidrio. El contraste se logra con bordes nítidos de tinta y rellenos sólidos.
3. **Red Accent & Dividers** — El rojo Marvel (`marvel-red` `#C81D25`) actúa como el ancla de marca en botones de acción principal, acentos dominantes y líneas divisorias finas de sección.
4. **Tratamiento Editorial Bold** — Tipografía condensada, pesos pesados (`font-bold`, `font-black`) y texto en **MAYÚSCULAS** para cabeceras y labels, emulando la rotulación clásica de viñetas y portadas de cómic.

---

## 2. Tipografía (Vivid Narrative / Cómic Editorial)

Adoptamos **3 familias tipográficas específicas** para recrear la jerarquía visual de las historietas impresas:

1. **`Bebas Neue` (`font-display`)**: Para titulares, encabezados de sección y nombres de películas/cards (100% mayúsculas, impacto condensado).
2. **`Hanken Grotesk` (`font-body`)**: Para texto de cuerpo, resúmenes y descripciones explicativas.
3. **`Space Grotesk` (`font-label`)**: Para etiquetas de metadatos, botones, fechas, duraciones y badges de edición numerada ("ISSUE #XX").

| Nivel | Uso | Familia | Clase | Tratamiento |
|---|---|---|---|---|
| **Display / Headlines** | Headers principales, títulos de vista | `Bebas Neue` | `font-display` | `uppercase tracking-wider text-2xl → text-4xl` |
| **Card Titles** | Nombres de producciones en cards | `Bebas Neue` | `font-display` | `uppercase tracking-wide text-lg leading-none` |
| **Body** | Párrafos, resúmenes, descripciones | `Hanken Grotesk` | `font-body` | `text-xs → text-sm leading-relaxed` |
| **Labels / CTAs** | Botones, badges "ISSUE #XX", metadatos | `Space Grotesk` | `font-label` | `uppercase tracking-wider font-bold text-xs` |

---

## 3. Paleta de Colores

### 3.1 Namespace Sugerido: `marvel.*` (Actualizado para Cómic Editorial)

Recomendamos **mantener el namespace `marvel.*`** actualizando sus tokens internos para asegurar continuidad de importación y evitar romper referencias existentes en refactorizaciones graduales.

| Token | Clase Tailwind | Hex / Valor | Uso |
|---|---|---|---|
| `marvel.paper.DEFAULT` | `bg-marvel-paper` | `#F7F4EE` | Fondo base de la aplicación (crema/papel impreso) |
| `marvel.paper.dim` | `bg-marvel-paper-dim` | `#EFECE6` | Fondos secundarios hundidos, contenedores neutros |
| `marvel.card` | `bg-marvel-card` | `#FFFFFF` | Superficie sólida de cards y paneles (blanco puro) |
| `marvel.red.DEFAULT` | `bg-marvel-red`, `text-marvel-red` | `#C81D25` | Rojo primario de marca, CTAs, badges destacados |
| `marvel.red.hover` | `hover:bg-marvel-red-hover` | `#A8151C` | Hover de botones primarios |
| `marvel.red.dark` | `bg-marvel-red-dark` | `#800A10` | Borde o fondo acentuado |
| `marvel.ink.DEFAULT` | `text-marvel-ink`, `border-marvel-ink` | `#12131A` | Texto principal, bordes de alto contraste |
| `marvel.ink.muted` | `text-marvel-ink-muted` | `#52525B` | Texto secundario y descripciones de párrafo |
| `marvel.divider` | `border-marvel-divider`, `bg-marvel-divider` | `#C81D25` | Líneas divisorias finas rojas entre secciones |
| `marvel.issue` | `bg-marvel-issue`, `text-white` | `#12131A` | Fondo del badge "ISSUE #XX" (Negro Tinta Sólido sobre pósters) |
| `marvel.error.DEFAULT` | `text-marvel-error`, `bg-marvel-error` | `#E11D48` | Tono carmesí de alerta (distinto del rojo marca #C81D25 y del negro) |
| `marvel.error.muted` | `bg-marvel-error-muted` | `#FFE4E6` | Fondo suave de contenedores de error/alerta |

---

## 4. Textura de Fondo (Puntos Halftone)

Para emular la textura de imprenta de cómic impreso en masa sin librerías externas, se define una clase CSS utility en `index.css`:

```css
/* Textura de puntos de imprenta (Halftone Dot Pattern) */
.bg-comic-dots {
  background-color: #F7F4EE;
  background-image: radial-gradient(#D4CECE 1.2px, transparent 1.2px);
  background-size: 12px 12px;
  background-attachment: fixed;
}
```

- **Renderizado vectorial nativo**: Se escala a cualquier resolución retina sin distorsión.
- **Rendimiento óptimo**: Procesado por GPU mediante CSS puro.

---

## 5. Formas & Estructura (Shapes)

El lenguaje de formas cambia a **Duro Editorial (Hard Editorial)**: esquinas mucho más rectas y definidas, transmitiendo la rigidez de las páginas y marcos de historieta.

| Elemento | Border Radius | Clase Tailwind |
|---|---|---|
| Botones primarios/secundarios | `6px` | `rounded-md` |
| Cards de producción (`MCUCard`) | `8px` - `12px` | `rounded-lg` |
| Inputs y Selects | `6px` | `rounded-md` |
| Badges & "ISSUE #XX" | `2px` - `4px` | `rounded-xs` / `rounded-sm` (rectangulares) |
| Avatares / Indicadores circulares | Full | `rounded-full` |

> **Regla**: Eliminar los bordes excesivamente redondeados (`rounded-2xl`, `rounded-3xl`, `rounded-full` en cards). Las tarjetas deben ser marcadamente rectangulares.

---

## 6. Especificación de Componentes

### 6.1 Botones

#### Primary Button
Relleno rojo sólido `#C81D25`, texto en mayúsculas blanco bold, esquinas rectas.

```html
<button class="bg-marvel-red hover:bg-marvel-red-hover active:translate-y-0.5 text-white text-xs font-black uppercase tracking-wider rounded-md px-5 py-2.5 transition-all cursor-pointer border border-marvel-red-dark shadow-sm">
  EXPLORAR FASE
</button>
```

#### Secondary Button
Superficie blanca sólida (`#FFFFFF`), borde fino negro o rojo, texto tinta negra en mayúsculas.

```html
<button class="bg-marvel-card hover:bg-marvel-paper-dim text-marvel-ink text-xs font-bold uppercase tracking-wider rounded-md px-4 py-2 border border-marvel-ink/20 hover:border-marvel-ink transition-all cursor-pointer">
  FILTRAR
</button>
```

#### Ghost Button
Sin fondo. Texto rojo en mayúsculas con sublineado en hover.

```html
<button class="text-marvel-red hover:underline text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">
  VER DETALLES →
</button>
```

---

### 6.2 Cards de Producción (`MCUCard`)

Sustituyen el estilo glass místico por una estructura plana, marco fino de tinta/rojo y una etiqueta **"ISSUE #XX"**.

```html
<div class="bg-marvel-card border border-marvel-ink/15 hover:border-marvel-red rounded-lg p-3 shadow-xs hover:shadow-md transition-all group relative">
  <!-- Badge Esquinero Estilo Cómic -->
  <div class="absolute top-2 left-2 z-20 bg-marvel-issue text-white font-black text-[10px] tracking-widest px-2 py-0.5 rounded-xs uppercase shadow-xs border border-white/20">
    ISSUE #01
  </div>

  <!-- Poster Image (Esquinas rectas) -->
  <div class="aspect-[2/3] w-full rounded-md overflow-hidden bg-marvel-paper-dim border border-marvel-ink/10 relative">
    <img src="..." alt="Movie Title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>

  <!-- Título y Metadata -->
  <div class="mt-3">
    <h3 class="font-bold text-marvel-ink text-sm uppercase tracking-tight line-clamp-1">
      IRON MAN
    </h3>
    <p class="text-xs text-marvel-ink-muted font-medium mt-0.5">
      2008 • FASE 1
    </p>
  </div>
</div>
```

---

### 6.3 Input Fields

Fondo blanco sólido, bordes limpios de tinta, focus activo con línea roja fina.

```html
<input
  type="text"
  placeholder="BUSCAR PELÍCULA O SERIE..."
  class="w-full px-3.5 py-2 bg-marvel-card border border-marvel-ink/20 focus:border-marvel-red text-marvel-ink placeholder-marvel-ink-muted text-xs font-semibold uppercase tracking-wider rounded-md outline-none transition-all"
/>
```

---

### 6.4 Chips & Badges

Bloques sólidos rectangulares en mayúsculas de alto contraste.

```html
<!-- Badge "ISSUE #XX" Esquinero -->
<span class="bg-marvel-issue text-white font-black text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-xs border border-white/20">
  ISSUE #12
</span>

<!-- Badge Fase / Tipo -->
<span class="bg-marvel-red text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs">
  PELÍCULA
</span>
```

---

### 6.5 Divisores de Sección

En lugar de sombras oscuras o bordes translúcidos, se utilizan **líneas finas rojas**:

```html
<div class="w-full h-[1px] bg-marvel-red/40 my-6"></div>
```

---

## 7. Componente Piloto Recomendado

Para realizar el cambio gradual y validar el impacto visual sin romper la aplicación, proponemos comenzar con:

1. **`Button` Primario + Secundario**: Validar la respuesta táctil, pesos de fuente y hover en botones.
2. **`MCUCard.tsx` (Card de Producción)**: Validar la integración del badge **"ISSUE #XX"**, la remoción del `backdrop-blur` y la respuesta del hover sobre el fondo claro con puntos.

