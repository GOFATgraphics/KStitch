import { Home, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  active?: "home" | "search" | "orders" | "profile";
  onNavigate?: (screen: "home" | "search" | "orders" | "profile") => void;
}

export function BottomNav({ active = "home", onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "search" as const, icon: Search, label: "Search" },
    { id: "orders" as const, icon: ShoppingBag, label: "Orders" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elevated">
      <div className="container max-w-lg mx-auto">
        <div className="grid grid-cols-4 h-16">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate?.(id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                active === id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", active === id && "fill-primary/20")} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
