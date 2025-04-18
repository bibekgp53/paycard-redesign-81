
import { Card } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Users, Search } from "lucide-react";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function LoadFundsTo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountFrom = searchParams.get("accountFrom");

  const handleLoadFundsClick = () => {
    navigate(`/load-funds-from`);
  };

  return (
    <div className="space-y-6">
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

      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate(`/load-funds-from/card-loads?accountFrom=${accountFrom}`)}
          className="text-left transition-all hover:scale-[1.02] focus:outline-none"
        >
          <Card className="p-6 h-full border-2 hover:border-paycard-salmon">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-paycard-navy-100">
                <Users className="h-6 w-6 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-paycard-navy mb-2">
                  Load to multiple cards
                </h3>
                <p className="text-gray-600">
                  Load funds to multiple cards at once
                </p>
              </div>
            </div>
          </Card>
        </button>

        <button
          onClick={() => navigate(`/load-funds-from/search?accountFrom=${accountFrom}`)}
          className="text-left transition-all hover:scale-[1.02] focus:outline-none"
        >
          <Card className="p-6 h-full border-2 hover:border-paycard-salmon">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-paycard-navy-100">
                <Search className="h-6 w-6 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-paycard-navy mb-2">
                  Search for a card
                </h3>
                <p className="text-gray-600">
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
