# Learnings from Building the Smart Image Utilities

## Architecture

- **`src/app/tools/`** — Next.js App Router pages (server components loading lazy client components)
- **`src/components/tools/`** — All interactive logic lives here, keeping pages slim

Each tool page uses `dynamic()` import with `ssr: false` since they rely on browser APIs (canvas, FileReader, `Blob`).

## 1. AI Background Remover (`BgRemoverClient.tsx`)

| Library | Purpose |
|---------|---------|
| `@imgly/background-removal` | On-device AI segmentation (ONNX runtime in browser) |
| `react-dropzone` | Drag-and-drop file upload |

- The model (`isnet_quint8`) is downloaded on first use — the progress callback differentiates the "downloading model" vs "processing" states.
- Memory management: `URL.revokeObjectURL()` on reset / re-upload to avoid leaks.
- Result preview uses a CSS checkerboard background (`repeating-conic-gradient`) to show transparency.

## 2. Image to PDF Converter (`ImageToPdfClient.tsx`)

| Library | Purpose |
|---------|---------|
| `jspdf` | Create and export PDF documents client-side |
| `@hello-pangea/dnd` | Drag-and-drop reordering of image thumbnails |
| `react-dropzone` | Multi-file image upload |

- Image aspect-ratio fitting: `imgAspect > pageAspect` → fit by width, else by height. Centers the image within margins.
- `crypto.randomUUID()` for stable drag-and-drop keys (avoiding index-as-key bugs).
- Helper `fileToDataUrl()` wraps `FileReader.readAsDataURL` in a Promise.
- All PDF settings (page size, orientation, margins) are configurable via `<select>`.

## 3. PDF Page Rearranger (`PdfRearrangeClient.tsx`)

| Library | Purpose |
|---------|---------|
| `pdf-lib` | Read, copy pages, and write new PDF (no rendering needed) |
| `pdfjs-dist` | Render PDF pages to canvas for thumbnail previews |
| `@hello-pangea/dnd` | Drag-and-drop reordering of page thumbnails |

- Dual-library approach: `pdfjs-dist` renders thumbnails (heavy), `pdf-lib` handles the structural copy (lightweight). Separating concerns avoids pulling pdf.js into the export path.
- `renderPageToThumbnail()` uses a canvas at 0.4 scale → `toDataURL("image/webp", 0.85)` for compact thumbnails.
- `loadPdfjs()` is a singleton (module-level variable) — the worker script and WASM are only fetched once per session.
- `thumbnailUrlsRef` holds all generated data URLs so they can be revoked on cleanup / re-upload.
- The page index badge shows the *current* (visual) position, not the original PDF page number.

## Cross-cutting Patterns

- **State machine per tool**: `idle → loading/processing → done/error`. Each state maps to distinct UI.
- **No server files**: All processing is 100% client-side. Files never leave the browser.
- **Memory hygiene**: Every `URL.createObjectURL` has a corresponding `revokeObjectURL` on reset/unmount.
- **Lazy components**: `dynamic(() => import(...), { ssr: false })` keeps bundle size lean and avoids SSR errors for browser-only APIs.
- **Consistent UI shell**: `tools/layout.tsx` provides the sidebar nav, back-to-home link, and gradient background. Individual pages only supply the tool card content.
