import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || label?.replace(/\s+/g, "-").toLowerCase();

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            id={checkboxId}
            className={cn(
              "peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-colors checked:border-primary-600 checked:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50",
              error && "border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          <Check className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" />
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="cursor-pointer text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
