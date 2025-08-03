import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  size = "sm",
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
    error: "bg-gradient-to-r from-red-500 to-pink-500 text-white"
  }

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge