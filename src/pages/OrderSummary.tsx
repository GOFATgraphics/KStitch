import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import { DELIVERY_FEE } from "@/lib/mockData";
import { toast } from "sonner";
import trustShield from "@/assets/trust-shield.png";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { outfit, fabric, tailor } = location.state || {};

  if (!outfit || !fabric || !tailor) {
    navigate("/");
    return null;
  }

  const total = fabric.price + tailor.price + DELIVERY_FEE;

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!", {
      description: "Your order has been received. We'll send you updates via SMS.",
      duration: 3000,
    });
    
    // Navigate to home after a short delay
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="text-center flex-1 mx-4">
            <h1 className="font-bold text-lg">Order Summary</h1>
            <p className="text-xs text-muted-foreground">Step 3 of 3</p>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Progress Bar */}
        <ProgressBar currentStep={3} />

        {/* Order Details Card */}
        <Card className="p-5 border-border shadow-elevated space-y-4">
          <h2 className="font-bold text-lg text-foreground mb-4">Order Details</h2>
          
          {/* Outfit */}
          <div className="space-y-1 pb-3 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Outfit Style</p>
                <p className="font-semibold text-foreground">{outfit.name}</p>
              </div>
            </div>
          </div>

          {/* Fabric */}
          <div className="space-y-1 pb-3 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Fabric</p>
                <p className="font-semibold text-foreground">{fabric.name}</p>
                <p className="text-xs text-muted-foreground">by {fabric.seller}</p>
              </div>
              <p className="font-bold text-foreground">₦{fabric.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Tailor */}
          <div className="space-y-1 pb-3 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Tailor</p>
                <p className="font-semibold text-foreground">{tailor.name}</p>
                <p className="text-xs text-muted-foreground">Ready in {tailor.time}</p>
              </div>
              <p className="font-bold text-foreground">₦{tailor.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Delivery */}
          <div className="space-y-1 pb-3 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Delivery Fee</p>
              </div>
              <p className="font-bold text-foreground">₦{DELIVERY_FEE.toLocaleString()}</p>
            </div>
          </div>

          {/* Total */}
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-foreground">Total</p>
              <p className="text-2xl font-bold text-primary">₦{total.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Trust/Protection Notice */}
        <div className="bg-gradient-trust border border-trust-border rounded-xl p-5 shadow-trust">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img src={trustShield} alt="Protection" className="w-12 h-12" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-bold text-primary text-base">Protection Notice</h3>
              <p className="text-sm text-foreground leading-relaxed">
                Your <span className="font-bold">₦{total.toLocaleString()}</span> is held safely in escrow. 
                The tailor gets paid only after you confirm delivery of your outfit.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <Card className="p-4 bg-muted/50 border-border">
          <h3 className="font-semibold text-foreground mb-2 text-sm">What happens next?</h3>
          <ol className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-bold text-primary">1.</span>
              <span>Fabric seller delivers to tailor</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">2.</span>
              <span>Tailor creates your outfit ({tailor.time})</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">3.</span>
              <span>We deliver to your address</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">4.</span>
              <span>You confirm and payment is released</span>
            </li>
          </ol>
        </Card>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-elevated">
        <div className="container max-w-lg mx-auto">
          <Button
            onClick={handlePlaceOrder}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-lg font-bold h-14"
          >
            Place Order - ₦{total.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
