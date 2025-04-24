import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StepIndicator } from "@/components/ui/step-indicator";
import { RadioGroupBase, RadioGroupItem } from "@/components/ui/radio-group";

// Generate more complete mock data
const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  cardNumber: Math.random().toString().slice(2, 14),
  sequenceNumber: Math.floor(Math.random() * 900000) + 100000,
  trackingNumber: Math.floor(Math.random() * 900000) + 100000,
  cardHolderName: `User ${i + 1}`,
  expirationDate: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 5) + 24}`,
  status: ["INACTIVE", "EXPIRED", "ACTIVE"][Math.floor(Math.random() * 3)]
}));

export default function AllocateCardsSearch() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleContinue = () => {
    if (selectedCard) {
      const card = mockData.find(c => c.id === selectedCard);
      navigate("/cards/allocate/details", { 
        state: { 
          cardNumber: card?.cardNumber,
          sequenceNumber: card?.sequenceNumber,
          trackingNumber: card?.trackingNumber
        } 
      });
    }
  };

  const paginatedData = mockData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
        <StepIndicator currentStep={2} totalSteps={5} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-paycard-navy text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">40</div>
            <div className="text-sm">Total Cards</div>
          </CardContent>
        </Card>
        <Card className="bg-paycard-salmon text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">20</div>
            <div className="text-sm">Unallocated Cards</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2 text-paycard-navy">10</div>
            <div className="text-sm text-gray-600">Allocated Cards</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-paycard-navy mb-6">Search Card</h2>
          
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search cards..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="border-0 bg-paycard-navy-100">
                  <TableHead className="w-[50px] border-0 text-left pl-4"></TableHead>
                  <TableHead className="border-0 text-paycard-navy font-semibold text-left pl-0">Card Number</TableHead>
                  <TableHead className="border-0 text-paycard-navy font-semibold text-left pl-0">Card Holder Name</TableHead>
                  <TableHead className="border-0 text-paycard-navy font-semibold text-left pl-0">Expiration Date</TableHead>
                  <TableHead className="border-0 text-paycard-navy font-semibold text-left pl-0">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <RadioGroupBase 
                  value={selectedCard || undefined}
                  onValueChange={setSelectedCard}
                >
                  {paginatedData.map((card) => (
                    <TableRow 
                      key={card.id}
                      className={`border-0 hover:bg-paycard-navy-100 transition-colors ${
                        selectedCard === card.id ? 'bg-paycard-navy-150' : ''
                      }`}
                    >
                      <TableCell className="border-0 pl-4">
                        <RadioGroupItem 
                          value={card.id} 
                          id={`card-${card.id}`} 
                        />
                      </TableCell>
                      <TableCell className="border-0 pl-0">{card.cardNumber}</TableCell>
                      <TableCell className="border-0 pl-0">{card.cardHolderName}</TableCell>
                      <TableCell className="border-0 pl-0">{card.expirationDate}</TableCell>
                      <TableCell className="border-0 pl-0">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          card.status === 'ACTIVE' 
                            ? 'bg-pcard-status-green-light text-pcard-status-green-dark'
                            : card.status === 'EXPIRED'
                            ? 'bg-pcard-status-red-light text-pcard-status-red-dark'
                            : 'bg-pcard-status-orange-light text-pcard-status-orange-dark'
                        }`}>
                          {card.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </RadioGroupBase>
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between px-2">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate("/cards/allocate")}
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedCard}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
