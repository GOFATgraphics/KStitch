import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OutfitDetail from "./pages/OutfitDetail";
import FabricSelection from "./pages/FabricSelection";
import TailorSelection from "./pages/TailorSelection";
import OrderSummary from "./pages/OrderSummary";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/outfit/:id" element={<OutfitDetail />} />
          <Route path="/fabric" element={<FabricSelection />} />
          <Route path="/tailor" element={<TailorSelection />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/order-tracking/:orderId?" element={<OrderTracking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
