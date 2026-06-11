"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { PDFDocument } from "pdf-lib";
import {
  UploadIcon,
  DownloadIcon,
  GripVerticalIcon,
  Trash2Icon,
  Loader2Icon,
  AlertCircleIcon,
  CheckCircle2Icon,
  FileTextIcon,
} from "lucide-react";

interface PageItem {
  id: string;
  index: number;
  thumbnail: string;
}

const pageItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 18 } },
} as const;

export function PdfRearrangeClient() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [exporting, setExporting] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const pdfBufferRef = useRef<ArrayBuffer | null>(null);
  const thumbnailUrlsRef = useRef<string[]>([]);

  const isBusy = loading || exporting || shuffling;

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  useEffect(() => {
    return () => {
      thumbnailUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const onDrop = useCallback(async (accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;
    setErrorMsg("");
    setSuccessMsg("");
    setFileName(file.name);
    setProgress(0);
    setProgressLabel("");

    thumbnailUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    thumbnailUrlsRef.current = [];

    try {
      setLoading(true);
      setProgressLabel("Reading PDF file...");
      setProgress(10);

      const sourceBuffer = await file.arrayBuffer();
      pdfBufferRef.current = sourceBuffer.slice(0);

      setProgressLabel("Loading PDF engine...");
      setProgress(25);

      const pdfjs = await loadPdfjs();
      const data = new Uint8Array(sourceBuffer);
      const pdf = await pdfjs.getDocument({ data }).promise;
      const totalPages = pdf.numPages;

      if (totalPages > 5) {
        throw new Error(`PDF has ${totalPages} pages. Maximum allowed is 5 pages.`);
      }

      const items: PageItem[] = [];
      const urls: string[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const pct = 30 + Math.round((i / totalPages) * 60);
        setProgress(pct);
        setProgressLabel(`Rendering page ${i} of ${totalPages}...`);

        const page = await pdf.getPage(i);
        const thumbnail = await renderPageToThumbnail(page);
        const id = crypto.randomUUID();
        items.push({ id, index: i, thumbnail });
        urls.push(thumbnail);
      }

      setProgress(100);
      setProgressLabel(`Loaded ${totalPages} page${totalPages > 1 ? "s" : ""}`);

      thumbnailUrlsRef.current = urls;
      setPages(items);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to read PDF");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (sourceIndex === destIndex) return;

    setShuffling(true);
    setSuccessMsg("");

    setTimeout(() => {
      setPages((prev) => {
        const items = Array.from(prev);
        const [removed] = items.splice(sourceIndex, 1);
        items.splice(destIndex, 0, removed);
        return items;
      });
      setShuffling(false);
      setSuccessMsg(`Moved page ${sourceIndex + 1} to position ${destIndex + 1}.`);
    }, 800);
  };

  const removePage = (id: string, displayIndex: number) => {
    setPages((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      setSuccessMsg(`Page ${displayIndex} deleted.`);
      return filtered;
    });
  };

  const exportPdf = async () => {
    if (pages.length === 0) {
      setErrorMsg("No pages to export.");
      return;
    }
    setExporting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const srcDoc = await PDFDocument.load(pdfBufferRef.current!);
      const newDoc = await PDFDocument.create();

      for (const item of pages) {
        const [copiedPage] = await newDoc.copyPages(srcDoc, [item.index - 1]);
        newDoc.addPage(copiedPage);
      }

      const pdfBytes = await newDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `rearranged-${fileName || "output.pdf"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccessMsg(`Exported PDF with ${pages.length} page${pages.length > 1 ? "s" : ""}!`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to export PDF");
    } finally {
      setExporting(false);
    }
  };

  const handleReset = () => {
    thumbnailUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    thumbnailUrlsRef.current = [];
    pdfBufferRef.current = null;
    setPages([]);
    setFileName("");
    setErrorMsg("");
    setSuccessMsg("");
    setProgress(0);
    setProgressLabel("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-900">PDF Page Rearranger</h2>

      <AnimatePresence mode="wait">
        {pages.length === 0 && !loading ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full"
          >
            <div
              {...getRootProps()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 sm:p-12 text-center transition-colors ${
                isDragActive
                  ? "border-primary bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={isDragActive ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <UploadIcon className="mb-4 h-10 w-10 text-gray-400" />
              </motion.div>
              <p className="text-sm font-medium text-gray-700">
                {isDragActive ? "Drop PDF here" : "Select one PDF (max 5 pages)"}
              </p>
              <p className="mt-1 text-xs text-red-500">Single PDF &mdash; 5 page limit</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="space-y-4 rounded-lg border bg-gray-50 p-4 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader2Icon className="h-5 w-5 text-primary" />
              </motion.div>
              <p className="text-sm font-medium text-gray-700">{progressLabel}</p>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            </div>
            <p className="text-xs text-gray-500">{progress}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!loading && pages.length > 0 ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileTextIcon className="h-5 w-5" />
                <span>{fileName}</span>
                <span className="text-gray-400">
                  &mdash; {pages.length} page{pages.length > 1 ? "s" : ""}
                </span>
                {shuffling && (
                  <span className="ml-2 inline-flex items-center gap-1.5 text-xs text-primary font-semibold animate-pulse">
                    <Loader2Icon className="h-3 w-3 animate-spin" />
                    your order is cookin up, plz wait
                  </span>
                )}
              </div>
              <button
                disabled={isBusy}
                onClick={handleReset}
                className="text-sm text-gray-500 underline hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Upload different PDF
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Drag pages to reorder, click the trash icon to delete a page.
            </p>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="pages" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start"
                  >
                    {pages.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={isBusy}>
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            variants={pageItemVariants}
                            initial="hidden"
                            animate="show"
                            className={`group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow w-[calc(50%-6px)] sm:w-40 max-w-[160px] sm:max-w-none ${
                              snapshot.isDragging ? "shadow-lg ring-2 ring-primary" : ""
                            }`}
                            style={{ ...provided.draggableProps.style }}
                          >
                            <div className="relative">
                              <img
                                src={item.thumbnail}
                                alt={`Page ${index + 1}`}
                                className="h-36 w-full object-contain bg-gray-50"
                              />
                            </div>
                            <div className="flex items-center justify-between border-t bg-gray-50 px-2.5 py-1.5">
                              <span className="text-xs font-semibold text-gray-500">
                                Page {index + 1}
                              </span>
                              <div className="flex items-center gap-1">
                                <div
                                  {...provided.dragHandleProps}
                                  className={isBusy ? "p-1 text-gray-300 cursor-not-allowed" : "cursor-grab p-1 text-gray-400 hover:text-gray-600 active:cursor-grabbing"}
                                  title={isBusy ? "Rearranging in progress..." : "Drag to reorder"}
                                >
                                  <GripVerticalIcon className="h-4 w-4" />
                                </div>
                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() => removePage(item.id, index + 1)}
                                  className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                                  title={isBusy ? "Rearranging in progress..." : "Delete page"}
                                >
                                  <Trash2Icon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={isBusy ? {} : { scale: 1.03 }}
                whileTap={isBusy ? {} : { scale: 0.97 }}
                onClick={exportPdf}
                disabled={isBusy || pages.length === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {exporting ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <DownloadIcon className="h-4 w-4" />
                )}
                {exporting ? "Exporting..." : "Export New PDF"}
              </motion.button>
            </div>

            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  <AlertCircleIcon className="h-5 w-5 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800"
                >
                  <CheckCircle2Icon className="h-5 w-5 shrink-0" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

let pdfjsModule: typeof import("pdfjs-dist") | null = null;

async function loadPdfjs() {
  if (!pdfjsModule) {
    pdfjsModule = await import("pdfjs-dist");
    try {
      pdfjsModule.GlobalWorkerOptions.workerSrc =
        "//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs";
    } catch { /* best-effort */ }
  }
  return pdfjsModule;
}

async function renderPageToThumbnail(page: import("pdfjs-dist").PDFPageProxy): Promise<string> {
  const viewport = page.getViewport({ scale: 0.4 });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d")!;
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas.toDataURL("image/webp", 0.85);
}
