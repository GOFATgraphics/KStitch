import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, HelpCircle, Check, X, Upload, Edit2, Phone, MapPin, Ruler, Camera, FileText, Sparkles, ShieldCheck, TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DELIVERY_FEE } from "@/lib/mockData";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { outfit, fabric, tailor } = location.state || {};

  // Form state
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [measurementMethod, setMeasurementMethod] = useState<"photo" | "manual" | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Manual measurements
  const [measurements, setMeasurements] = useState({
    chest: "",
    shoulder: "",
    sleeve: "",
    bodyLength: "",
    neck: "",
    waist: ""
  });

  if (!outfit || !fabric || !tailor) {
    navigate("/");
    return null;
  }

  const total = fabric.price + tailor.price + DELIVERY_FEE;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!address.trim()) {
      newErrors.address = "Please enter your delivery address";
    }
    
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter your phone number";
    } else if (phoneNumber.replace(/\s/g, "").length !== 10) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    
    if (!measurementMethod) {
      newErrors.measurement = "Please choose a measurement method";
    } else if (measurementMethod === "photo" && !uploadedPhoto) {
      newErrors.measurement = "Please upload a photo";
    } else if (measurementMethod === "manual" && 
      (!measurements.chest || !measurements.shoulder || !measurements.sleeve || !measurements.bodyLength)) {
      newErrors.measurement = "Please complete all required measurements";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setUploadedPhoto(file);
      setMeasurementMethod("photo");
      setErrors(prev => ({ ...prev, measurement: "" }));
    }
  };

  const handleSaveMeasurements = () => {
    const allFieldsFilled = measurements.chest && measurements.shoulder && 
                           measurements.sleeve && measurements.bodyLength;
    
    if (!allFieldsFilled) {
      toast.error("Please fill in all required measurements");
      return;
    }
    
    const allValid = Object.values(measurements)
      .filter(v => v)
      .every(v => {
        const num = parseInt(v);
        return num >= 20 && num <= 200;
      });
    
    if (!allValid) {
      toast.error("All measurements must be between 20 and 200cm");
      return;
    }
    
    setShowMeasurementModal(false);
    setMeasurementMethod("manual");
    setErrors(prev => ({ ...prev, measurement: "" }));
    toast.success("Measurements saved successfully!");
  };

  const handlePlaceOrder = () => {
    setTouched({
      address: true,
      phoneNumber: true,
      measurement: true
    });
    
    if (!validateForm()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Please complete all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-4">
        <div className="text-center animate-fade-in space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
              <Check className="w-12 h-12 text-primary animate-fade-in" />
            </div>
            <div className="absolute inset-0 animate-ping opacity-20">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Order Placed Successfully! 🎉</h1>
            <p className="text-lg font-semibold text-primary">#KN-{Math.floor(Math.random() * 10000).toString().padStart(5, '0')}</p>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your order is being processed. We'll send you updates via WhatsApp.
            </p>
          </div>

          <Card className="p-4 max-w-sm mx-auto">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Outfit:</span>
                <span className="font-medium">{outfit.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold text-primary">₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Delivery:</span>
                <span className="font-medium">{tailor.time}</span>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Button size="lg" className="w-full max-w-sm" onClick={() => navigate("/")}>
              Track Your Order
            </Button>
            <p className="text-xs text-muted-foreground">Redirecting in 5 seconds...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-32">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-lg border-b shadow-sm">
        <div className="container max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-all hover:scale-95 active:scale-90"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <div className="text-center flex-1">
              <h1 className="font-bold text-lg flex items-center justify-center gap-1">
                Review Your Order <Sparkles className="h-4 w-4 text-primary" />
              </h1>
              <p className="text-xs text-muted-foreground">Step 3 of 3</p>
            </div>
            
            <button 
              className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              onClick={() => toast.info("Your payment is protected by escrow. The tailor only gets paid after delivery.")}
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step < 3 ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground animate-pulse"
                )}>
                  {step < 3 ? <Check className="h-3 w-3" /> : step}
                </div>
                {step < 3 && (
                  <div className={cn(
                    "w-12 h-1 rounded mx-1",
                    "bg-primary"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-2xl mx-auto px-5 py-6 space-y-4">
        {/* Order Summary Card */}
        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                🛍️
              </div>
              <h2 className="font-bold text-lg">Order Details</h2>
            </div>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              <Edit2 className="h-3 w-3" /> Edit
            </button>
          </div>
          
          <div className="border-t pt-4 space-y-4">
            {/* Outfit */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                👔
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Outfit Style</p>
                <p className="font-semibold">{outfit.name}</p>
              </div>
            </div>

            {/* Fabric */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-xl flex-shrink-0">
                🧵
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Fabric</p>
                <p className="font-semibold">{fabric.name}</p>
                <p className="text-xs text-muted-foreground">by {fabric.seller}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₦{fabric.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Tailor */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {tailor.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Tailoring</p>
                <p className="font-semibold truncate">{tailor.name}</p>
                <p className="text-xs text-muted-foreground">⭐ {tailor.rating} • 📍 {tailor.location} • ⏱️ {tailor.time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₦{tailor.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                <TruckIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Delivery</p>
                <p className="font-semibold">Standard Delivery</p>
                <p className="text-xs text-muted-foreground">Hub pickup → Your doorstep</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₦{DELIVERY_FEE.toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t border-dashed pt-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">Total Amount</span>
                  <span className="text-3xl font-extrabold text-primary">₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Delivery Information */}
        <Card className="p-6 shadow-md" data-error={touched.address && (errors.address || errors.phoneNumber) ? "true" : undefined}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-bold text-lg">Delivery Information</h2>
            <span className="ml-auto text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full font-medium">
              Required
            </span>
          </div>

          <div className="space-y-5">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Delivery Address <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, address: true }))}
                placeholder="Enter your complete address (street, building, area)"
                className={cn(
                  "min-h-20 transition-all",
                  touched.address && errors.address && "border-destructive animate-shake"
                )}
                maxLength={500}
              />
              <div className="flex items-start justify-between mt-2">
                <p className="text-xs text-muted-foreground flex items-start gap-1">
                  💡 <span>Include landmarks for easier delivery (e.g., 'Near Kwari Market, blue gate')</span>
                </p>
                <span className="text-xs text-muted-foreground">{address.length}/500</span>
              </div>
              {touched.address && errors.address && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  ⚠️ {errors.address}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 rounded-lg border bg-muted text-muted-foreground font-medium text-sm">
                  +234
                </div>
                <div className="flex-1 relative">
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhoneNumber(value);
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, phoneNumber: true }))}
                    placeholder="801 234 5678"
                    className={cn(
                      "transition-all",
                      touched.phoneNumber && errors.phoneNumber && "border-destructive animate-shake",
                      phoneNumber.length === 10 && "border-primary"
                    )}
                  />
                  {phoneNumber.length === 10 && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  )}
                </div>
              </div>
              {touched.phoneNumber && errors.phoneNumber && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  ⚠️ {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                Additional Instructions
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Optional</span>
              </label>
              <Input
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g., Call when you arrive, Gate code: 1234"
                maxLength={200}
              />
            </div>
          </div>
        </Card>

        {/* Measurements */}
        <Card className="p-6 shadow-md" data-error={touched.measurement && errors.measurement ? "true" : undefined}>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-6 w-6 text-primary" />
              <h2 className="font-bold text-lg">Your Measurements</h2>
              <span className="ml-auto text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                Required
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Help us create the perfect fit for you ✨</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Photo Upload Option */}
            <label className={cn(
              "relative h-44 border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all group",
              measurementMethod === "photo" 
                ? "border-primary bg-primary/5" 
                : "border-primary/30 bg-gradient-to-br from-primary/5 to-background hover:border-primary hover:shadow-lg hover:-translate-y-1"
            )}>
              <input
                type="file"
                accept="image/jpeg,image/png,image/heic"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              
              {uploadedPhoto ? (
                <div className="h-full flex flex-col items-center justify-center gap-2">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-center">{uploadedPhoto.name}</p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setUploadedPhoto(null);
                      setMeasurementMethod(null);
                    }}
                    className="text-xs text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-2 text-center">
                  <Camera className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold">Upload Photo</p>
                    <p className="text-sm text-muted-foreground">Full body picture</p>
                    <p className="text-xs text-primary mt-1">Recommended for best fit</p>
                  </div>
                </div>
              )}
              
              {measurementMethod === "photo" && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </label>

            {/* Manual Entry Option */}
            <button
              onClick={() => setShowMeasurementModal(true)}
              className={cn(
                "relative h-44 border-2 border-dashed rounded-2xl p-6 transition-all group text-center",
                measurementMethod === "manual"
                  ? "border-blue-500 bg-blue-500/5"
                  : "border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-background hover:border-blue-500 hover:shadow-lg hover:-translate-y-1"
              )}
            >
              <div className="h-full flex flex-col items-center justify-center gap-2">
                <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-bold">Enter Manually</p>
                  <p className="text-sm text-muted-foreground">Fill measurement form</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Takes about 2 minutes</p>
                </div>
              </div>
              
              {measurementMethod === "manual" && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </button>
          </div>

          {touched.measurement && errors.measurement && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 animate-shake">
              <p className="text-sm text-destructive text-center">⚠️ {errors.measurement}</p>
            </div>
          )}
        </Card>

        {/* Trust & Security */}
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-900">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-background shadow-sm flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">Your Money is Protected</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Your ₦{total.toLocaleString()} is held safely in escrow. The tailor only gets paid after you confirm delivery. 
                If anything goes wrong, you get a full refund.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">✓ Secure Payment</span>
                <span className="flex items-center gap-1">✓ Money-back Guarantee</span>
                <span className="flex items-center gap-1">✓ Quality Assured</span>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Measurement Modal */}
      <Dialog open={showMeasurementModal} onOpenChange={setShowMeasurementModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Enter Your Measurements</DialogTitle>
            <p className="text-sm text-muted-foreground">All measurements in centimeters (cm)</p>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {[
              { key: "chest", label: "Chest", icon: "👔" },
              { key: "shoulder", label: "Shoulder Width", icon: "📐" },
              { key: "sleeve", label: "Sleeve Length", icon: "📏" },
              { key: "bodyLength", label: "Body Length", icon: "📏" },
              { key: "neck", label: "Neck", icon: "⭕" },
              { key: "waist", label: "Waist", icon: "⭕" }
            ].map(({ key, label, icon }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <span>{icon}</span>
                  {label}
                  {["chest", "shoulder", "sleeve", "bodyLength"].includes(key) && (
                    <span className="text-destructive">*</span>
                  )}
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min="20"
                    max="200"
                    value={measurements[key as keyof typeof measurements]}
                    onChange={(e) => setMeasurements(prev => ({ ...prev, [key]: e.target.value }))}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    cm
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3 mt-4">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Average measurements for reference:</strong><br />
              Chest: 95-105cm | Shoulder: 42-48cm | Length: 100-110cm
            </p>
          </div>

          <Button onClick={handleSaveMeasurements} className="w-full mt-4" size="lg">
            Save Measurements
          </Button>
        </DialogContent>
      </Dialog>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t shadow-lg p-4 z-30">
        <div className="container max-w-2xl mx-auto">
          <Button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            size="lg"
            className={cn(
              "w-full h-14 text-lg font-bold transition-all",
              "bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl hover:-translate-y-0.5",
              "disabled:opacity-70 disabled:cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-background border-t-transparent mr-2" />
                Processing Your Order...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Place Order • ₦{total.toLocaleString()}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
