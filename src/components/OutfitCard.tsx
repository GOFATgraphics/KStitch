import { Card } from "@/components/ui/card";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface OutfitCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  orderCount: number;
  onClick?: () => void;
  className?: string;
}

export function OutfitCard({
  image,
  title,
  price,
  rating,
  orderCount,
  onClick,
  className,
}: OutfitCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1">
          <BadgeCustom variant="rating" icon={<Star className="w-3 h-3 fill-current" />}>
            {rating.toFixed(1)}
          </BadgeCustom>
          <span className="text-xs text-muted-foreground">({orderCount})</span>
        </div>
        <p className="text-lg font-bold text-primary">₦{price.toLocaleString()}</p>
      </div>
    </Card>
  );
}
