"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageIcon, ScanIcon, FileImageIcon, ArrowLeftIcon } from "lucide-react";

const tools = [
  {
    href: "/tools/bg-remover",
    label: "Background Remover",
    icon: ScanIcon,
    description: "Remove image backgrounds with AI",
  },
  {
    href: "/tools/image-to-pdf",
    label: "Image to PDF",
    icon: FileImageIcon,
    description: "Convert images to PDF documents",
  },
  {
    href: "/tools/pdf-rearrange",
    label: "PDF Rearranger",
    icon: ImageIcon,
    description: "Reorder and edit PDF pages",
  },
];

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Smart Image & Document Utilities</h1>
          <p className="mt-2 text-gray-600">
            All processing happens 100% in your browser. Nothing is uploaded to any server.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:w-64 shrink-0">
            <nav className="flex flex-col gap-2.5 lg:sticky lg:top-8">
              {tools.map((tool) => {
                const isActive = pathname === tool.href;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 w-full
                      ${
                        isActive
                          ? "bg-white border-blue-200 text-blue-600 shadow-sm"
                          : "bg-gray-50/50 border-gray-200/60 text-gray-600 hover:bg-white hover:border-gray-200 hover:text-gray-900 hover:shadow-sm"
                      }`}
                  >
                    <tool.icon
                      className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                        isActive ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500"
                      }`}
                    />
                    <div className="text-left min-w-0">
                      <div className={`truncate ${isActive ? "text-gray-900 font-semibold" : "text-gray-700 font-medium"}`}>
                        {tool.label}
                      </div>
                      <div className="text-[11px] text-gray-400 font-normal truncate">
                        {tool.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
