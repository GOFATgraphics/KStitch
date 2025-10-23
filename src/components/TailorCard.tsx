import { Card } from "@/components/ui/card";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { MapPin, Star, Clock, CheckCircle2 } from "lucide-react";

interface TailorCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  orders: number;
  location: string;
  time: string;
  onClick: () => void;
}

export function TailorCard({ name, price, rating, orders, location, time, onClick }: TailorCardProps) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 border-border"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-lg">{name}</h3>
              <BadgeCustom variant="verified" icon={<CheckCircle2 className="w-3 h-3" />}>
                Verified
              </BadgeCustom>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{orders.toLocaleString()} orders completed</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <BadgeCustom variant="rating" icon={<Star className="w-3 h-3 fill-current" />}>
            {rating.toFixed(1)}
          </BadgeCustom>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-sm text-muted-foreground">Tailoring Fee</span>
          <span className="text-xl font-bold text-primary">₦{price.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}
