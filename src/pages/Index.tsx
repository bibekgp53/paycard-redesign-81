import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the dashboard page
    navigate("/dashboard", { replace: true });
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
