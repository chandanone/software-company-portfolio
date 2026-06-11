"use client";

import dynamic from "next/dynamic";

const ImageToPdfClient = dynamic(
  () => import("@/components/tools/ImageToPdfClient").then((mod) => ({ default: mod.ImageToPdfClient })),
  { ssr: false }
);

export default function ImageToPdfPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Image to PDF Converter</h2>
        <p className="mt-1 text-gray-600">
          Combine multiple images into a single PDF. Drag thumbnails to reorder, adjust page settings, then download.
        </p>
      </div>
      <ImageToPdfClient />
    </div>
  );
}
