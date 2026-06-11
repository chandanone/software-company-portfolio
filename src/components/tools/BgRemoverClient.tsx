"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { removeBackground } from "@imgly/background-removal";
import { UploadIcon, DownloadIcon, Loader2Icon, AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

type Status = "idle" | "downloading" | "processing" | "done" | "error";

export function BgRemoverClient() {
  const [image, setImage] = useState<{ file: File; inputUrl: string } | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const resultRef = useRef<string | null>(null);
  const startTimeRef = useRef(0);

  const onDrop = useCallback((accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;
    if (resultRef.current) {
      URL.revokeObjectURL(resultRef.current);
      resultRef.current = null;
    }
    setResultUrl(null);
    setErrorMsg("");
    setProgress(0);
    setStatus("idle");
    setElapsedTime(0);
    const url = URL.createObjectURL(file);
    setImage({ file, inputUrl: url });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"], "image/webp": [".webp"] },
    maxFiles: 1,
  });

  const handleRemove = async () => {
    if (!image) return;
    setStatus("downloading");
    setProgress(0);
    setErrorMsg("");
    startTimeRef.current = Date.now();

    try {
      const blob = await removeBackground(image.file, {
        model: "isnet_quint8",
        progress: (_key, current, total) => {
          const pct = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0;
          setProgress(pct);
          if (pct < 100) {
            setStatus("downloading");
          } else {
            setStatus("processing");
          }
        },
      });

      const url = URL.createObjectURL(blob);
      resultRef.current = url;
      setResultUrl(url);
      setElapsedTime(Date.now() - startTimeRef.current);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to remove background");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "transparent.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (resultRef.current) {
      URL.revokeObjectURL(resultRef.current);
      resultRef.current = null;
    }
    if (image) {
      URL.revokeObjectURL(image.inputUrl);
    }
    setImage(null);
    setResultUrl(null);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
    setElapsedTime(0);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">AI Background Remover</h2>

      <AnimatePresence mode="wait">
        {!image ? (
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
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
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
                {isDragActive ? "Drop image here" : "Select one image to remove background"}
              </p>
              <p className="mt-1 text-xs text-red-500">PNG, JPG, or WebP &mdash; single image only</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
              >
                <p className="mb-2 text-sm font-medium text-gray-700">Original</p>
                <img
                  src={image.inputUrl}
                  alt="Original"
                  className="max-h-80 w-full rounded-lg border object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.2 }}
              >
                <p className="mb-2 text-sm font-medium text-gray-700">Result</p>
                {resultUrl ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className="flex max-h-80 items-center justify-center overflow-hidden rounded-lg border"
                    style={{
                      backgroundImage:
                        "repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)",
                      backgroundSize: "20px 20px",
                    }}
                  >
                    <img
                      src={resultUrl}
                      alt="Background removed"
                      className="max-h-80 w-full object-contain"
                    />
                  </motion.div>
                ) : (
                  <div className="flex max-h-80 items-center justify-center rounded-lg border bg-gray-50">
                    {status === "error" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-2 p-8 text-red-600"
                      >
                        <AlertCircleIcon className="h-8 w-8" />
                        <p className="text-sm">{errorMsg}</p>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 p-8 text-gray-500">
                        {status === "downloading" || status === "processing" ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-3"
                          >
                            <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm font-medium">
                              {status === "downloading"
                                ? "Downloading AI model on first use..."
                                : "Processing image..."}
                            </p>
                            <div className="h-2 w-48 overflow-hidden rounded-full bg-gray-200">
                              <motion.div
                                className="h-full rounded-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                              />
                            </div>
                            <p className="text-xs">{progress}%</p>
                          </motion.div>
                        ) : (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm"
                          >
                            Click &quot;Remove Background&quot; to start
                          </motion.p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-3">
              <AnimatePresence mode="wait">
                {status !== "done" && status !== "error" && (
                  <motion.button
                    key="remove-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRemove}
                    disabled={status === "downloading" || status === "processing"}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "downloading" || status === "processing" ? (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : (
                      <ScanIcon className="h-4 w-4" />
                    )}
                    {status === "downloading"
                      ? "Downloading..."
                      : status === "processing"
                        ? "Processing..."
                        : "Remove Background"}
                  </motion.button>
                )}

                {status === "done" && (
                  <motion.button
                    key="download-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download Transparent PNG
                  </motion.button>
                )}

                {status === "error" && (
                  <motion.button
                    key="retry-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRemove}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
                  >
                    Retry
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Reset
              </motion.button>
            </div>

            <AnimatePresence>
              {status === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800"
                >
                  <CheckCircle2Icon className="h-5 w-5 shrink-0" />
                  <span>Background removed in {(elapsedTime / 1000).toFixed(1)}s &mdash; click download to save.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </svg>
  );
}
