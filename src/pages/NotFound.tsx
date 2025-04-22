
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paycard-navy-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold mb-6 text-paycard-navy">404</h1>
        <p className="text-xl text-paycard-navy-600 mb-6">Oops! The page you're looking for cannot be found.</p>
        <Button 
          variant="default" 
          className="bg-paycard-navy text-white hover:bg-paycard-navy-800"
          onClick={() => window.location.href = "/dashboard"}
        >
          <Home size={18} className="mr-2" />
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
