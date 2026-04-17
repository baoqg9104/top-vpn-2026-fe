import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "success" | "highlight";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        {
          "border-transparent bg-primary text-white hover:opacity-80": variant === "default",
          "border-transparent bg-secondary text-white hover:opacity-80": variant === "secondary",
          "border-transparent bg-success text-white hover:opacity-80": variant === "success",
          "border-transparent bg-highlight text-white hover:opacity-80": variant === "highlight",
          "text-gray-900": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
