import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";

interface HeaderProps {
  greeting?: string;
  userName?: string;
}

export function Header({ greeting = "Sannu", userName = "Guest" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            KanoStitch
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground">{greeting}! 👋</p>
            <p className="text-xs text-muted-foreground">{userName}</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
