import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { Star } from "lucide-react";
import { OUTFITS } from "@/lib/mockData";
import senatorOutfit from "@/assets/outfit-senator.jpg";
import babaribaOutfit from "@/assets/outfit-babariga.jpg";
import { toast } from "sonner";

const OutfitDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // Get outfit data from route state or find it in mock data
  const outfit = location.state?.outfit || OUTFITS.find(o => o.id === id);
  
  if (!outfit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Outfit not found</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  // Use alternating images based on ID
  const outfitImage = parseInt(outfit.id) % 2 === 1 ? senatorOutfit : babaribaOutfit;

  const handleCustomMake = () => {
    navigate("/fabric", { 
      state: { 
        outfit: {
          id: outfit.id,
          name: outfit.name,
          price: outfit.price,
          image: outfitImage
        }
      } 
    });
  };

  const handleBuyReadyMade = () => {
    toast.info("Coming soon!", {
      description: "Ready-made purchase feature is under development."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="font-bold text-lg line-clamp-1">{outfit.name}</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Image */}
        <div className="aspect-[4/5] rounded-xl overflow-hidden bg-muted shadow-card">
          <img
            src={outfitImage}
            alt={outfit.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and Rating */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">{outfit.name}</h2>
          <div className="flex items-center gap-2">
            <BadgeCustom variant="rating" icon={<Star className="w-3 h-3 fill-current" />}>
              {outfit.rating.toFixed(1)}
            </BadgeCustom>
            <span className="text-sm text-muted-foreground">
              ({outfit.orders} orders)
            </span>
          </div>
        </div>

        {/* Buy Ready-Made Option */}
        <Card className="p-4 bg-gradient-card border-border">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Buy Ready-Made</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Available sizes: M, L, XL, XXL
              </p>
              <p className="text-lg font-bold text-foreground mb-3">
                From ₦{outfit.price.toLocaleString()}
              </p>
              <Button
                variant="outline"
                onClick={handleBuyReadyMade}
                className="w-full"
              >
                Select Size
              </Button>
            </div>
          </div>
        </Card>

        {/* Custom Make Option */}
        <Card className="p-4 bg-gradient-trust border-trust-border shadow-trust">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Custom Make</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Choose your fabric → Pick your tailor → Get perfect fit ✨
              </p>
              <Button
                onClick={handleCustomMake}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Start Custom Order
              </Button>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="p-4 border-border">
          <h3 className="font-bold text-foreground mb-2">About this style</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This traditional {outfit.name.toLowerCase()} is expertly crafted by verified tailors in Kano. 
            Perfect for special occasions, cultural events, and everyday elegance. 
            Made with premium fabrics and attention to detail.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default OutfitDetail;
