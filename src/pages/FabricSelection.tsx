import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { FabricCard } from "@/components/FabricCard";
import { FABRICS } from "@/lib/mockData";

const FabricSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { outfit } = location.state || {};

  if (!outfit) {
    navigate("/");
    return null;
  }

  const handleFabricSelect = (fabric: typeof FABRICS[0]) => {
    navigate("/tailor", {
      state: {
        outfit,
        fabric: {
          id: fabric.id,
          name: fabric.name,
          price: fabric.price,
          seller: fabric.seller
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
            <h1 className="font-bold text-lg">Choose Fabric</h1>
            <p className="text-xs text-muted-foreground">Step 1 of 3</p>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Progress Bar */}
        <ProgressBar currentStep={1} />

        {/* Selected Outfit Summary */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Selected Style:</p>
          <p className="font-bold text-foreground">{outfit.name}</p>
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Select Your Fabric</h2>
          <p className="text-sm text-muted-foreground">
            Choose from our verified fabric sellers in Kano
          </p>
        </div>

        {/* Fabric Cards */}
        <div className="space-y-3">
          {FABRICS.map((fabric) => (
            <FabricCard
              key={fabric.id}
              {...fabric}
              onClick={() => handleFabricSelect(fabric)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FabricSelection;
