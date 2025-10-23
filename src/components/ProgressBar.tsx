import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: 1 | 2 | 3;
  labels?: [string, string, string];
}

export function ProgressBar({ currentStep, labels = ["Fabric", "Tailor", "Checkout"] }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                step <= currentStep
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step}
            </div>
            {index < 2 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 rounded transition-all",
                  step < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {labels.map((label, index) => (
          <span
            key={label}
            className={cn(
              "transition-colors",
              index + 1 <= currentStep && "text-primary font-medium"
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
