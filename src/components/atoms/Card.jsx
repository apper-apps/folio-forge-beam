import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  className, 
  hover = false,
  children, 
  ...props 
}, ref) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 shadow-sm",
        hover && "hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card