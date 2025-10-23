import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        verified: "bg-verified/10 text-verified border border-verified/20",
        rating: "bg-star/10 text-star border border-star/20",
        trust: "bg-trust-bg text-primary border border-trust-border shadow-trust",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeCustomProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function BadgeCustom({ className, variant, icon, children, ...props }: BadgeCustomProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  );
}

export { BadgeCustom, badgeVariants };
