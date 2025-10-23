import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { CategoryPills } from "@/components/CategoryPills";
import { OutfitCard } from "@/components/OutfitCard";
import { TrustBanner } from "@/components/TrustBanner";
import { BottomNav } from "@/components/BottomNav";
import heroImage from "@/assets/hero-marketplace.jpg";
import senatorOutfit from "@/assets/outfit-senator.jpg";
import babaribaOutfit from "@/assets/outfit-babariga.jpg";

// Mock data for outfits
const OUTFITS = [
  {
    id: "1",
    image: senatorOutfit,
    title: "Premium Senator Kaftan",
    price: 12000,
    rating: 4.9,
    orderCount: 234,
  },
  {
    id: "2",
    image: babaribaOutfit,
    title: "Royal Babariga",
    price: 15000,
    rating: 4.8,
    orderCount: 189,
  },
  {
    id: "3",
    image: senatorOutfit,
    title: "Classic Senator Style",
    price: 10000,
    rating: 4.7,
    orderCount: 156,
  },
  {
    id: "4",
    image: babaribaOutfit,
    title: "Traditional Babariga",
    price: 13500,
    rating: 4.9,
    orderCount: 203,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeNav, setActiveNav] = useState<"home" | "search" | "orders" | "profile">("home");

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header greeting="Sannu" userName="Abubakar" />

      {/* Hero Section */}
      <section className="relative h-48 overflow-hidden">
        <img
          src={heroImage}
          alt="Kano Marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Custom Made, Delivered Home
          </h2>
          <p className="text-sm text-muted-foreground">
            Connect with verified tailors in Kano
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Categories */}
        <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Trust Banner */}
        <TrustBanner />

        {/* Outfits Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Popular Styles</h3>
            <button className="text-sm text-primary font-medium hover:underline">
              See all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {OUTFITS.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                {...outfit}
                onClick={() => console.log("Outfit clicked:", outfit.id)}
              />
            ))}
          </div>
        </section>

        {/* Additional Trust Section */}
        <section className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          <h3 className="text-lg font-bold text-foreground">Why Choose KanoStitch?</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-foreground">Verified Tailors</p>
                <p className="text-sm text-muted-foreground">
                  Only trusted, experienced professionals
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-foreground">Escrow Protection</p>
                <p className="text-sm text-muted-foreground">
                  Your payment is safe until delivery
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-foreground">Home Delivery</p>
                <p className="text-sm text-muted-foreground">
                  We deliver right to your doorstep
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav active={activeNav} onNavigate={setActiveNav} />
    </div>
  );
};

export default Index;
