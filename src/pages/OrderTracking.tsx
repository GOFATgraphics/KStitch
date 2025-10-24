import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, MoreVertical, TruckIcon, MessageCircle, Phone, ChevronDown, Check, Clock, Package, Scissors, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type OrderStatus = "confirmed" | "fabric_collected" | "at_tailor" | "in_progress" | "quality_check" | "out_for_delivery" | "delivered";

const OrderTracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = "KN-00123";
  
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("at_tailor");
  const [showMenu, setShowMenu] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Order status updated");
    }, 800);
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    toast.success("Order number copied!");
  };

  const statusConfig = {
    confirmed: {
      title: "Order Confirmed ✨",
      gradient: "from-blue-500 to-blue-600",
      progress: 20,
      icon: "✓",
    },
    fabric_collected: {
      title: "Fabric Collected 📦",
      gradient: "from-purple-500 to-purple-600",
      progress: 40,
      icon: "📦",
    },
    at_tailor: {
      title: "Fabric Delivered to Tailor ✨",
      gradient: "from-primary to-primary/90",
      progress: 60,
      icon: "✂️",
    },
    in_progress: {
      title: "Your Outfit is Being Made 🪡",
      gradient: "from-orange-500 to-orange-600",
      progress: 80,
      icon: "🪡",
    },
    quality_check: {
      title: "Quality Check Complete ✓",
      gradient: "from-teal-500 to-teal-600",
      progress: 90,
      icon: "✓",
    },
    out_for_delivery: {
      title: "Out for Delivery 🚚",
      gradient: "from-blue-600 to-blue-700",
      progress: 95,
      icon: "🚚",
    },
    delivered: {
      title: "Delivered Successfully! 🎉",
      gradient: "from-emerald-500 to-emerald-600",
      progress: 100,
      icon: "🎉",
    },
  };

  const timelineSteps = [
    {
      id: "confirmed",
      title: "Order Confirmed",
      description: "Your payment of ₦11,200 is held securely",
      timestamp: "2 hours ago",
      status: "completed",
      icon: Check,
      badge: "Payment Secured",
    },
    {
      id: "fabric_collected",
      title: "Fabric Collected",
      description: "Shadda Premium fabric from Kano Textiles",
      timestamp: "1 hour 30 minutes ago",
      status: "completed",
      icon: Package,
      location: "Kwari Market",
    },
    {
      id: "at_tailor",
      title: "Delivered to Tailor",
      description: "Abubakar Fashion has received your fabric",
      timestamp: "Just now",
      status: "current",
      icon: Scissors,
      location: "Zoo Road",
      tailor: { name: "Abubakar Fashion", avatar: "A" },
    },
    {
      id: "in_progress",
      title: "Tailoring in Progress",
      description: "Your outfit is being carefully crafted",
      estimated: "Will start in a few hours",
      duration: "Typically takes 3-5 days",
      status: "pending",
      icon: Clock,
    },
    {
      id: "quality_check",
      title: "Quality Check",
      description: "Final inspection before delivery",
      status: "pending",
      icon: Check,
    },
    {
      id: "out_for_delivery",
      title: "Out for Delivery",
      description: "On the way to your location",
      status: "pending",
      icon: TruckIcon,
    },
    {
      id: "delivered",
      title: "Delivered & Confirmed",
      description: "Confirm receipt and release payment",
      status: "pending",
      icon: Sparkles,
    },
  ];

  const currentConfig = statusConfig[currentStatus];
  const completedSteps = timelineSteps.findIndex(step => step.id === currentStatus);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-32">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b shadow-sm">
        <div className="container max-w-2xl mx-auto px-5 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-all active:scale-90"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex-1 text-center">
              <h1 className="font-bold text-lg">#{orderNumber}</h1>
              <p className="text-xs text-muted-foreground">Placed 2 hours ago</p>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all hover:bg-muted/80"
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-12 w-56 bg-background border rounded-xl shadow-lg p-2 animate-fade-in z-50">
                  <button onClick={copyOrderNumber} className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-3">
                    📋 <span>Copy Order Number</span>
                  </button>
                  <button onClick={() => setShowOrderDetails(true)} className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-3">
                    ℹ️ <span>Order Details</span>
                  </button>
                  <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-3">
                    📞 <span>Contact Support</span>
                  </button>
                  <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-3 text-destructive">
                    ❌ <span>Cancel Order</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-5 py-5 space-y-4">
        {/* Hero Status Card */}
        <Card className={cn(
          "relative overflow-hidden p-6 shadow-xl border-0 bg-gradient-to-br text-white",
          currentConfig.gradient,
          isRefreshing && "animate-pulse"
        )}>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-wider opacity-70 mb-2">CURRENT STATUS</p>
            <h2 className="text-2xl font-extrabold mb-4 animate-fade-in">{currentConfig.title}</h2>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500 shadow-glow"
                  style={{ width: `${currentConfig.progress}%` }}
                />
              </div>
              <p className="text-sm opacity-80 text-right">{currentConfig.progress}% Complete</p>
            </div>
          </div>

          {/* Animated Icon */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20 animate-float">
            {currentConfig.icon}
          </div>
        </Card>

        {/* Estimated Delivery */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <TruckIcon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
              <p className="text-lg font-bold">Wednesday, November 6</p>
              <p className="text-sm text-muted-foreground">Between 9 AM - 6 PM</p>
            </div>
          </div>
        </Card>

        {/* Order Details Collapsible */}
        <Card className="overflow-hidden">
          <button
            onClick={() => setShowOrderDetails(!showOrderDetails)}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium flex items-center gap-2">
              📋 Order Details
            </span>
            <ChevronDown className={cn(
              "h-5 w-5 transition-transform",
              showOrderDetails && "rotate-180"
            )} />
          </button>

          {showOrderDetails && (
            <div className="border-t px-5 py-4 space-y-3 animate-accordion-down">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Outfit:</span>
                <span className="font-medium">Premium Senator Kaftan</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fabric:</span>
                <span className="font-medium">₦3,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tailor:</span>
                <span className="font-medium">₦7,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery:</span>
                <span className="font-medium">₦500</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-primary">₦11,200</span>
              </div>
            </div>
          )}
        </Card>

        {/* Timeline Section */}
        <Card className="p-6 shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">📍</span>
            <h2 className="text-lg font-bold">Order Journey</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border" 
                 style={{ 
                   backgroundImage: `linear-gradient(to bottom, 
                     hsl(var(--primary)) 0%, 
                     hsl(var(--primary)) ${(completedSteps / timelineSteps.length) * 100}%, 
                     hsl(var(--border)) ${(completedSteps / timelineSteps.length) * 100}%, 
                     hsl(var(--border)) 100%)`
                 }}
            />

            {/* Timeline Steps */}
            <div className="space-y-8">
              {timelineSteps.map((step, index) => {
                const isCompleted = index <= completedSteps;
                const isCurrent = step.status === "current";
                const isPending = step.status === "pending";

                return (
                  <div key={step.id} className="relative pl-12 animate-slide-in" style={{ animationDelay: `${index * 80}ms` }}>
                    {/* Circle Indicator */}
                    <div className={cn(
                      "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                      isCompleted && "bg-primary border-primary shadow-md",
                      isCurrent && "bg-background border-4 border-primary animate-pulse-ring",
                      isPending && "bg-muted border-border"
                    )}>
                      {isCompleted ? (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      ) : isCurrent ? (
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{index + 1}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className={cn(
                      "space-y-2",
                      isCurrent && "bg-primary/5 -ml-4 pl-4 -mr-6 pr-6 py-3 rounded-r-lg border-l-4 border-primary"
                    )}>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className={cn(
                          "font-semibold",
                          isCompleted && "text-foreground",
                          isCurrent && "text-primary",
                          isPending && "text-muted-foreground"
                        )}>
                          {step.title}
                        </h3>
                        {step.timestamp && (
                          <span className={cn(
                            "text-xs whitespace-nowrap",
                            isCurrent ? "text-primary animate-pulse" : "text-muted-foreground"
                          )}>
                            {step.timestamp}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground">{step.description}</p>

                      {step.badge && (
                        <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                          🛡️ {step.badge}
                        </span>
                      )}

                      {step.location && (
                        <p className="text-xs text-muted-foreground">📍 {step.location}</p>
                      )}

                      {step.tailor && isCurrent && (
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                            {step.tailor.avatar}
                          </div>
                          <Button size="sm" variant="outline" className="text-xs h-8">
                            💬 Chat with Tailor
                          </Button>
                        </div>
                      )}

                      {step.duration && (
                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3 mt-2">
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 {step.duration}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </main>

      {/* Action Buttons (Fixed Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t shadow-lg p-4 z-30">
        <div className="container max-w-2xl mx-auto space-y-3">
          <Button 
            size="lg" 
            className="w-full h-14 text-base font-bold bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat with Abubakar Fashion
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="w-full h-14 text-base"
            onClick={() => toast.info("Support options coming soon")}
          >
            <Phone className="h-5 w-5 mr-2" />
            <div className="flex flex-col items-start">
              <span className="font-semibold">Need Help?</span>
              <span className="text-xs text-muted-foreground">Contact Support</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
