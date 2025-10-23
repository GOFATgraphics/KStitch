import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { TailorCard } from "@/components/TailorCard";
import { Card } from "@/components/ui/card";
import { TAILORS } from "@/lib/mockData";

const TailorSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { outfit, fabric } = location.state || {};

  if (!outfit || !fabric) {
    navigate("/");
    return null;
  }

  const handleTailorSelect = (tailor: typeof TAILORS[0]) => {
    navigate("/order-summary", {
      state: {
        outfit,
        fabric,
        tailor: {
          id: tailor.id,
          name: tailor.name,
          price: tailor.price,
          time: tailor.time
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="font-bold text-lg">Choose Tailor</h1>
            <p className="text-xs text-muted-foreground">Step 2 of 3</p>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Progress Bar */}
        <ProgressBar currentStep={2} />

        {/* Selected Items Summary */}
        <div className="space-y-2">
          <Card className="p-3 border-border bg-gradient-card">
            <p className="text-xs text-muted-foreground mb-1">Selected Style:</p>
            <p className="font-bold text-foreground">{outfit.name}</p>
          </Card>
          <Card className="p-3 border-primary/20 bg-primary/5">
            <p className="text-xs text-muted-foreground mb-1">Selected Fabric:</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-foreground">{fabric.name}</p>
              <p className="font-semibold text-primary">₦{fabric.price.toLocaleString()}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">by {fabric.seller}</p>
          </Card>
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Select Your Tailor</h2>
          <p className="text-sm text-muted-foreground">
            All tailors are verified and highly rated
          </p>
        </div>

        {/* Tailor Cards */}
        <div className="space-y-3">
          {TAILORS.map((tailor) => (
            <TailorCard
              key={tailor.id}
              {...tailor}
              onClick={() => handleTailorSelect(tailor)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TailorSelection;
