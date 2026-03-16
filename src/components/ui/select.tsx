"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "flex w-full appearance-none rounded-lg border border-slate-200 bg-white pl-4 pr-12 py-4 text-base font-bold text-slate-900 shadow-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>option]:font-bold",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-900"
          aria-hidden
        />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
