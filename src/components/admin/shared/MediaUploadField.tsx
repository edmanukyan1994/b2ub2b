"use client";

import { useCallback, useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaUploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  hint?: string;
};

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|svg)$/i;
const VIDEO_EXT = /\.(webm|mp4)$/i;

function isPreviewable(url: string) {
  return IMAGE_EXT.test(url) || VIDEO_EXT.test(url);
}

export function MediaUploadField({ label, value, onChange, folder, hint }: MediaUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = useCallback(
    async (file: File) => {
      setError("");
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Ошибка загрузки");
        onChange(data.url);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Ошибка загрузки");
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) void upload(file);
    },
    [upload],
  );

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void upload(file);
    e.target.value = "";
  };

  return (
    <div className="p-4">
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>

      {value && isPreviewable(value) && (
        <div className="relative mb-3 inline-block">
          {VIDEO_EXT.test(value) ? (
            <video src={value} className="max-h-40 rounded-lg border border-slate-200" muted autoPlay loop playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="max-h-40 rounded-lg border border-slate-200 object-contain" />
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
            title="Удалить"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition",
          dragging ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-slate-50 hover:border-sky-400 hover:bg-sky-50/50",
          uploading && "pointer-events-none opacity-60",
        )}
      >
        {uploading ? (
          <>
            <Loader2 size={28} className="animate-spin text-sky-600" />
            <p className="mt-2 text-sm text-slate-600">Загрузка…</p>
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              {value ? <ImageIcon size={22} className="text-sky-600" /> : <Upload size={22} className="text-sky-600" />}
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Перетащите файл сюда или нажмите для выбора
            </p>
            <p className="mt-1 text-xs text-slate-500">JPG, PNG, GIF, WebP, SVG, WebM — до 20 МБ</p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/webm,video/mp4"
        className="hidden"
        onChange={onFileSelect}
      />

      {value && (
        <p className="mt-2 truncate text-xs text-slate-500" title={value}>
          {value}
        </p>
      )}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
