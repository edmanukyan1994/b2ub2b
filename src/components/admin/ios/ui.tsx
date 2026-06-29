"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function IosApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F2F2F7] font-[-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',sans-serif] text-[#000] antialiased">
      <div className="mx-auto min-h-screen w-full max-w-lg bg-[#F2F2F7] shadow-xl md:my-4 md:min-h-[calc(100vh-2rem)] md:overflow-hidden md:rounded-[2rem] md:border md:border-black/10">
        {children}
      </div>
    </div>
  );
}

export function IosNavBar({
  title,
  subtitle,
  onBack,
  action,
  actionLabel = "Сохранить",
  actionDisabled,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: () => void;
  actionLabel?: string;
  actionDisabled?: boolean;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-[#F2F2F7]/90 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 flex items-center gap-0.5 rounded-lg px-1 py-1 text-[17px] text-[#007AFF] active:opacity-60"
            >
              <ChevronLeft size={22} />
              Назад
            </button>
          )}
        </div>
        {action && (
          <button
            type="button"
            onClick={action}
            disabled={actionDisabled}
            className="shrink-0 rounded-lg px-2 py-1 text-[17px] font-semibold text-[#007AFF] disabled:opacity-40 active:opacity-60"
          >
            {actionLabel}
          </button>
        )}
      </div>
      <div className="mt-1 px-1">
        <h1 className="truncate text-[34px] font-bold leading-tight tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-[15px] text-[#8E8E93]">{subtitle}</p>}
      </div>
    </header>
  );
}

export function IosGroup({ title, children, footer }: { title?: string; children: React.ReactNode; footer?: string }) {
  return (
    <section className="mb-6">
      {title && <h2 className="mb-2 px-5 text-[13px] font-normal uppercase tracking-wide text-[#8E8E93]">{title}</h2>}
      <div className="mx-4 overflow-hidden rounded-[10px] bg-white">{children}</div>
      {footer && <p className="mt-2 px-5 text-[13px] leading-snug text-[#8E8E93]">{footer}</p>}
    </section>
  );
}

export function IosRow({
  label,
  value,
  onClick,
  destructive,
  chevron = Boolean(onClick),
}: {
  label: string;
  value?: string;
  onClick?: () => void;
  destructive?: boolean;
  chevron?: boolean;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 border-b border-[#C6C6C8]/40 px-4 py-3.5 text-left last:border-b-0 active:bg-[#E5E5EA]",
        onClick && "cursor-pointer",
      )}
    >
      <span className={cn("text-[17px]", destructive ? "text-[#FF3B30]" : "text-[#000]")}>{label}</span>
      <span className="flex min-w-0 items-center gap-2">
        {value && <span className="truncate text-[17px] text-[#8E8E93]">{value}</span>}
        {chevron && onClick && <ChevronRight size={18} className="shrink-0 text-[#C7C7CC]" />}
      </span>
    </Tag>
  );
}

export function IosField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <div className="border-b border-[#C6C6C8]/40 px-4 py-3 last:border-b-0">
      <label className="mb-1.5 block text-[13px] text-[#8E8E93]">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full resize-none bg-transparent text-[17px] outline-none placeholder:text-[#C7C7CC]"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[17px] outline-none placeholder:text-[#C7C7CC]"
        />
      )}
      {hint && <p className="mt-1 text-[12px] text-[#8E8E93]">{hint}</p>}
    </div>
  );
}

export function IosSegmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mx-4 mb-4 flex rounded-[9px] bg-[#E5E5EA] p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex-1 rounded-[7px] py-1.5 text-center text-[13px] font-medium transition-all",
            value === opt.value ? "bg-white text-[#000] shadow-sm" : "text-[#8E8E93]",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function IosButton({
  children,
  onClick,
  variant = "primary",
  disabled,
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "destructive";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-[12px] py-3.5 text-[17px] font-semibold active:opacity-80 disabled:opacity-40",
        variant === "primary" && "bg-[#007AFF] text-white",
        variant === "secondary" && "bg-white text-[#007AFF]",
        variant === "destructive" && "bg-white text-[#FF3B30]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function IosToast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-2.5 text-[15px] font-medium text-white shadow-lg",
        type === "success" ? "bg-[#34C759]" : "bg-[#FF3B30]",
      )}
    >
      {message}
    </div>
  );
}
