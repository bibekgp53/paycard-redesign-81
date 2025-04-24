
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paycard-navy-100">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-4 text-paycard-navy">Welcome to PayCard</h1>
        <p className="text-xl text-paycard-navy-600">Loading dashboard....</p>
      </div>
      
      {error && (
        <div className="w-full max-w-md px-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Navigation Error</AlertTitle>
            <AlertDescription>
              Could not navigate to dashboard. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Index;
