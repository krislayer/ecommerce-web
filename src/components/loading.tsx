interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function Loading({
  size = "xl",
  fullScreen = true,
  label = "Cargando",
  className = "",
}: LoadingProps) {
  const spinner = (
    <div
      className={`${sizeMap[size]} animate-spin rounded-full border-2 border-neutral-300 border-t-blue-600 dark:border-neutral-700 dark:border-t-blue-500`}
      aria-label={label}
      role="status"
      aria-live="polite"
    />
  );

  if (!fullScreen) {
    return <div className={className}>{spinner}</div>;
  }

  return (
    <div className={`flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900 ${className}`}>
      {spinner}
    </div>
  );
}
