"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { jsPDF } from "jspdf";
import {
  UploadIcon,
  DownloadIcon,
  GripVerticalIcon,
  Trash2Icon,
  Loader2Icon,
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";

interface ImageItem {
  id: string;
  file: File;
  preview: string;
}

type PageFormat = "a4" | "letter";
type Orientation = "portrait" | "landscape";
type Margin = "none" | "small" | "large";

const FORMAT_SIZES: Record<PageFormat, [number, number]> = {
  a4: [210, 297],
  letter: [215.9, 279.4],
};

const MARGIN_VALUES: Record<Margin, number> = {
  none: 0,
  small: 10,
  large: 20,
};

const thumbnailItem = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 18 } },
} as const;

export function ImageToPdfClient() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [format, setFormat] = useState<PageFormat>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [margin, setMargin] = useState<Margin>("small");
  const [generating, setGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onDrop = useCallback((accepted: File[]) => {
    setErrorMsg("");
    setSuccessMsg("");
    setImages((prev) => {
      const combined = [...prev, ...accepted.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }))];
      if (combined.length > 5) {
        setErrorMsg("Maximum 5 images allowed.");
        return prev;
      }
      return combined;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
  });

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    setImages(items);
  };

  const generatePdf = async () => {
    if (images.length === 0) {
      setErrorMsg("Please upload at least one image.");
      return;
    }
    setGenerating(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const [w, h] = FORMAT_SIZES[format];
      const isLandscape = orientation === "landscape";
      const pageW = isLandscape ? h : w;
      const pageH = isLandscape ? w : h;
      const m = MARGIN_VALUES[margin];
      const usableW = pageW - m * 2;
      const usableH = pageH - m * 2;

      const pdf = new jsPDF({
        orientation: isLandscape ? "l" : "p",
        unit: "mm",
        format: format === "a4" ? "a4" : "letter",
      });

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const img = images[i];
        const dataUrl = await fileToDataUrl(img.file);
        const imgProps = pdf.getImageProperties(dataUrl);
        const imgAspect = imgProps.width / imgProps.height;
        const pageAspect = usableW / usableH;

        let renderW: number, renderH: number, offsetX: number, offsetY: number;

        if (imgAspect > pageAspect) {
          renderW = usableW;
          renderH = renderW / imgAspect;
          offsetX = m;
          offsetY = m + (usableH - renderH) / 2;
        } else {
          renderH = usableH;
          renderW = renderH * imgAspect;
          offsetY = m;
          offsetX = m + (usableW - renderW) / 2;
        }

        pdf.addImage(dataUrl, "JPEG", offsetX, offsetY, renderW, renderH, undefined, "FAST");
      }

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "images.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccessMsg(`PDF generated with ${images.length} page${images.length > 1 ? "s" : ""}!`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to generate PDF");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Image to PDF Converter</h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="w-full"
      >
        <div
          {...getRootProps()}
          className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
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
            <UploadIcon className="mb-3 h-8 w-8 text-gray-400" />
          </motion.div>
          <p className="text-sm font-medium text-gray-700">
            {isDragActive ? "Drop images here" : "Drag & drop images or click to browse"}
          </p>
          <p className="mt-1 text-xs text-red-500">PNG, JPG, or WebP &mdash; max 5 images</p>
        </div>
      </motion.div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Page Size:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as PageFormat)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="a4">A4</option>
            <option value="letter">US Letter</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Orientation:</label>
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as Orientation)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Margins:</label>
          <select
            value={margin}
            onChange={(e) => setMargin(e.target.value as Margin)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="none">None</option>
            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      {images.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3 text-sm text-gray-500"
        >
          Drag to reorder &mdash; {images.length} image{images.length > 1 ? "s" : ""}
        </motion.p>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mb-6 flex flex-wrap gap-4"
            >
              {images.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      variants={thumbnailItem}
                      initial="hidden"
                      animate="show"
                      className={`group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow ${
                        snapshot.isDragging ? "shadow-lg" : ""
                      }`}
                      style={{ width: 140, ...provided.draggableProps.style }}
                    >
                      <img
                        src={item.preview}
                        alt={`Image ${index + 1}`}
                        className="h-32 w-full object-cover"
                      />
                      <div
                        {...provided.dragHandleProps}
                        className="absolute left-1 top-1 cursor-grab rounded bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <GripVerticalIcon className="h-4 w-4" />
                      </div>
                      <button
                        onClick={() => removeImage(item.id)}
                        className="absolute right-1 top-1 rounded bg-red-500/80 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                      <div className="px-2 py-1 text-xs text-gray-500 truncate">
                        {item.file.name}
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

      <div className="flex flex-wrap items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={generatePdf}
          disabled={generating || images.length === 0}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {generating ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <DownloadIcon className="h-4 w-4" />
          )}
          {generating ? "Generating PDF..." : "Download PDF"}
        </motion.button>

        {images.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              images.forEach((img) => URL.revokeObjectURL(img.preview));
              setImages([]);
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Clear All
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
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
            className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            <CheckCircle2Icon className="h-5 w-5 shrink-0" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
