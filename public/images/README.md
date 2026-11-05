# Imágenes del portafolio

Guarda aquí las imágenes del sitio. Todo lo que esté dentro de `public/` se publica tal cual y se referencia desde la raíz (`/`).

## Carpetas

- `projects/`: capturas y miniaturas de proyectos.
- `testimonials/`: fotografías o avatares de clientes.
- `experience/`: logotipos de empresas o marcas de la trayectoria.
- `profile/`: fotografía o retrato profesional.
- `general/`: imágenes decorativas, fondos e imágenes compartidas.

## Cómo usar una imagen

1. Copia el archivo en la carpeta correspondiente.
2. Usa una ruta que comience por `/images/` (no incluyas `public`).
3. Para una captura de proyecto, edita `src/data/projects.tsx` y añade `screenshot` al objeto:

```tsx
{
  name: "Nombre del proyecto",
  domain: "ejemplo.com",
  description: "Descripción breve",
  screenshot: "/images/projects/ejemplo.webp"
}
```

Ejemplos de rutas para otros recursos:

- Perfil: `/images/profile/teofilo.webp`
- Testimonio: `/images/testimonials/nombre-cliente.webp`
- Experiencia: `/images/experience/empresa.svg`
- Imagen general: `/images/general/fondo-hero.webp`

Se recomienda usar WebP o AVIF para fotografías y PNG/SVG para gráficos o logotipos. Mantén nombres de archivo en minúsculas, sin espacios ni tildes.
