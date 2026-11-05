# Portafolio de Teófilo Rosales

Proyecto React + TypeScript + Vite, preparado para desplegarse en Vercel.

## Requisitos
- Node.js 20 o superior
- npm

## Instalación y ejecución
```bash
npm install
npm run dev
```

## Compilar para producción
```bash
npm run build
npm run preview
```

## Despliegue en Vercel
1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel selecciona **Add New → Project** e importa el repositorio.
3. Vercel detectará Vite automáticamente.
4. Usa `npm run build` como Build Command y `dist` como Output Directory.

## Contenido editable
Los datos de las secciones se mantienen separados del diseño:
- `src/data/projects.tsx`: portafolio. Añade o edita proyectos aquí.
- `src/data/testimonials.tsx`: testimonios de clientes.
- `src/data/experience.tsx`: experiencia y trayectoria profesional.

## Imágenes

Todas las imágenes se almacenan en `public/images/`, organizadas por tipo:
- `projects/`: capturas de proyectos.
- `testimonials/`: fotos o avatares de clientes.
- `experience/`: logotipos de empresas.
- `profile/`: fotografía profesional.
- `general/`: fondos y recursos gráficos generales.

Para proyectos, `screenshot` es opcional. Añade la imagen a `public/images/projects/` y registra su ruta pública en `src/data/projects.tsx`, por ejemplo `screenshot: "/images/projects/mi-proyecto.webp"`. No uses `public` en la ruta. Consulta `public/images/README.md` para más ejemplos.

El contenido general del prototipo original se conserva en `src/siteContent.ts`; estilos en `src/styles.css`; componentes y comportamiento en `src/App.tsx`.
