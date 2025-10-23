import { Card } from "@/components/ui/card";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { MapPin, Star } from "lucide-react";

interface FabricCardProps {
  id: string;
  name: string;
  price: number;
  seller: string;
  location: string;
  rating: number;
  onClick: () => void;
}

export function FabricCard({ name, price, seller, location, rating, onClick }: FabricCardProps) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 border-border"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{seller}</p>
          </div>
          <BadgeCustom variant="rating" icon={<Star className="w-3 h-3 fill-current" />}>
            {rating.toFixed(1)}
          </BadgeCustom>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-2xl font-bold text-primary">₦{price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/yard</span>
        </div>
      </div>
    </Card>
  );
}
