import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-3.5 text-base",
};

const variants = {
  primary: "liquid-btn-primary",
  secondary: "liquid-btn-glass",
  ghost: "text-muted hover:text-primary bg-transparent border-0 shadow-none",
  glass: "liquid-btn-glass",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
  hover = true,
  glass = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[1.75rem] p-6 md:p-8",
        glass ? "liquid-card" : "liquid-glass",
        hover && "cursor-pointer",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex cursor-default items-center liquid-glass-pill-nested px-4 py-1.5 text-xs font-semibold text-secondary", className)}>
      {children}
    </span>
  );
}
