
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      // Redirect to the dashboard page with error handling
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Navigation error:", error);
      toast({
        title: "Navigation error",
        description: "Could not navigate to dashboard. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-paycard-navy-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-paycard-navy">Welcome to PayCard</h1>
        <p className="text-xl text-paycard-navy-600">Loading dashboard....</p>
      </div>
    </div>
  );
};

export default Index;
