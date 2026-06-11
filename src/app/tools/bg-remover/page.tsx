"use client";

import dynamic from "next/dynamic";

const BgRemoverClient = dynamic(
  () => import("@/components/tools/BgRemoverClient").then((mod) => ({ default: mod.BgRemoverClient })),
  { ssr: false }
);

export default function BgRemoverPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">In-Browser AI Background Remover</h2>
        <p className="mt-1 text-gray-600">
          Uses on-device AI to remove backgrounds from your images. No data is ever uploaded.
        </p>
      </div>
      <BgRemoverClient />
    </div>
  );
}
