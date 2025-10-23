import { Shield } from "lucide-react";
import trustShield from "@/assets/trust-shield.png";

export function TrustBanner() {
  return (
    <div className="bg-gradient-trust border border-trust-border rounded-xl p-6 shadow-trust">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img src={trustShield} alt="Trust Shield" className="w-12 h-12" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-bold text-primary text-lg">Your Money is Protected</h3>
          <p className="text-sm text-muted-foreground">
            We hold your payment securely until you receive your order. Shop with confidence knowing your money is safe.
          </p>
        </div>
      </div>
    </div>
  );
}
