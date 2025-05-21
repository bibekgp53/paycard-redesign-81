
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wallet, CreditCard, AlertTriangle } from "lucide-react";
import { useLoadFundsToOptionStore } from "@/store/useLoadFundsToOptionStore";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FundsPageHeader } from "./components/FundsPageHeader";
import useAuthentication from "@/hooks/useAuthentication.tsx";

export default function LoadFundsFrom() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    selectedLoadFundsToCard,
    setSelectedLoadFundsToCard,
    setSelectedLoadFundsFrom
  } = useLoadFundsToOptionStore();

  const pagePermission = 'read:load-cards'
  const { getTokenSilently, hasPermission } = useAuthentication('payportal');

  useEffect(() => {
    getTokenSilently()
  }, []);

  const handleCardLoadsClick = () => {
    try {
      setSelectedLoadFundsToCard("card-loads");
      setSelectedLoadFundsFrom("profile");
      navigate("/load-funds-from/to?accountFrom=false");
    } catch (error) {
      setError("Could not navigate to the selected page");
    }
  };

  const handleSearchClick = () => {
    try {
      setSelectedLoadFundsToCard("search");
      setSelectedLoadFundsFrom("card");
      // No navigation - store selection in state only
    } catch (error) {
      setError("Could not process the selection");
    }
  };

  return hasPermission(pagePermission) ? (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Navigation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <FundsPageHeader /> {/* Use the new reusable component */}

      <div className="flex flex-col gap-6">
        <button
          onClick={handleCardLoadsClick}
          className="text-left transition-all hover:scale-[1.01] focus:outline-none"
        >
          <Card className={`p-8 h-full border-2 ${
            selectedLoadFundsToCard === "card-loads"
              ? "border-paycard-salmon"
              : "border-paycard-navy-200 hover:border-paycard-salmon"
          }`}>
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-full bg-paycard-navy-100">
                <Wallet className="h-8 w-8 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-paycard-navy mb-3">
                  Load funds from your profile
                </h3>
                <p className="text-gray-600 text-lg">
                  Transfer funds directly from your profile balance to cards
                </p>
              </div>
            </div>
          </Card>
        </button>

        <button
          onClick={handleSearchClick}
          className="text-left transition-all hover:scale-[1.01] focus:outline-none"
        >
          <Card className={`p-8 h-full border-2 ${
            selectedLoadFundsToCard === "search"
              ? "border-paycard-salmon"
              : "border-paycard-navy-200 hover:border-paycard-salmon"
          }`}>
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-full bg-paycard-navy-100">
                <CreditCard className="h-8 w-8 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-paycard-navy mb-3">
                  Load funds from another card
                </h3>
                <p className="text-gray-600 text-lg">
                  Transfer remaining balance from a stopped card
                </p>
              </div>
            </div>
          </Card>
        </button>
      </div>
    </div>
  ) : (<span>No Permission</span>);
}
