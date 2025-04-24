
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Users, Search, AlertTriangle } from "lucide-react";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLoadFundsToOptionStore } from "@/store/useLoadFundsToOptionStore";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function LoadFundsTo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const accountFrom = searchParams.get("accountFrom");

  const { selectedLoadFundsToCard } = useLoadFundsToOptionStore();

  const handleLoadFundsClick = () => {
    try {
      navigate(`/load-funds-from`);
    } catch (error) {
      setError("Could not navigate to the previous page");
    }
  };

  const handleCardLoadsClick = () => {
    try {
      navigate(`/load-funds-from/card-loads?accountFrom=${accountFrom || 'false'}`);
    } catch (error) {
      setError("Could not navigate to card loads");
    }
  };

  const handleSearchClick = () => {
    try {
      navigate(`/load-funds-from/search?accountFrom=${accountFrom || 'false'}`);
    } catch (error) {
      setError("Could not navigate to search");
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Navigation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleLoadFundsClick}>Load Funds From</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>To</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-paycard-navy">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your Profile or transfer funds from a stopped card.
        </p>
      </div>

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
                <Users className="h-8 w-8 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-paycard-navy mb-3">
                  Load to multiple cards
                </h3>
                <p className="text-gray-600 text-lg">
                  Load funds to multiple cards at once
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
                <Search className="h-8 w-8 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-paycard-navy mb-3">
                  Search for a card
                </h3>
                <p className="text-gray-600 text-lg">
                  Search and select a specific card to load funds
                </p>
              </div>
            </div>
          </Card>
        </button>
      </div>
    </div>
  );
}
