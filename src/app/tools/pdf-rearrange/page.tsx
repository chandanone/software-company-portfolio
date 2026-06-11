"use client";

import dynamic from "next/dynamic";

const PdfRearrangeClient = dynamic(
  () => import("@/components/tools/PdfRearrangeClient").then((mod) => ({ default: mod.PdfRearrangeClient })),
  { ssr: false }
);

export default function PdfRearrangePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">PDF Page Rearranger</h2>
        <p className="mt-1 text-gray-600">
          Upload a PDF, reorder pages with drag-and-drop, delete unwanted pages, then export the new document.
        </p>
      </div>
      <PdfRearrangeClient />
    </div>
  );
}
