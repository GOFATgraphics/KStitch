import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Senator",
  "Babariga",
  "Kaftan",
  "Jalabiya",
  "Agbada",
];

interface CategoryPillsProps {
  selected?: string;
  onSelect?: (category: string) => void;
}

export function CategoryPills({ selected = "All", onSelect }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect?.(category)}
          className={cn(
            "rounded-full whitespace-nowrap transition-all",
            selected === category
              ? "bg-primary hover:bg-primary/90 shadow-md"
              : "hover:bg-primary/10 hover:border-primary/50"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
