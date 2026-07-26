# Marvel Tracker 🛡️✨

Una aplicación web moderna e interactiva para seguir la cronología completa del Universo Cinematográfico de Marvel (MCU), marcar producciones vistas, calificar películas y series, guardar favoritos y sincronizar tu progreso en tiempo real con Supabase.

---

## 🚀 Tecnologías Utilizadas

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Estilos & Animaciones**: [TailwindCSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer-motion.dev/) + [Lucide React](https://lucide.dev/)
- **Backend & Autenticación**: [Supabase](https://supabase.com/) (Auth, PostgreSQL Database, Storage)
- **Deployment**: [Vercel](https://vercel.com/)

---

## ⚙️ Configuración Local

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/tu-usuario/ucm-tracker.git
cd ucm-tracker
npm install
```

### 2. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📦 Build de Producción

Para compilar el proyecto y verificar que no existan errores de TypeScript:

```bash
npm run build
```

Los archivos estáticos generados se guardarán en la carpeta `dist/`.

---

## 📄 Licencia

Este proyecto es de uso personal.
