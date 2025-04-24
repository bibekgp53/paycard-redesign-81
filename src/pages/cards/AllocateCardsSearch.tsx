
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StepIndicator } from "@/components/ui/step-indicator";
import { Checkbox } from "@/components/ui/checkbox";

const mockData = [
  { id: "1", cardNumber: "161******631", cardholder: "Michael Parker", expirationDate: "2030-03-17", status: "EXPIRED" },
  { id: "2", cardNumber: "941******708", cardholder: "Susan Bryant", expirationDate: "2029-10-04", status: "INACTIVE" },
  { id: "3", cardNumber: "844******000", cardholder: "Maria Harris", expirationDate: "2029-02-17", status: "INACTIVE" },
  { id: "4", cardNumber: "189******092", cardholder: "Michele Glass", expirationDate: "2026-11-30", status: "INACTIVE" },
  { id: "5", cardNumber: "998******380", cardholder: "Brent Warren", expirationDate: "2028-03-20", status: "EXPIRED" },
  { id: "6", cardNumber: "615******370", cardholder: "Lisa Martinez", expirationDate: "2029-03-30", status: "ACTIVE" },
  { id: "7", cardNumber: "671******984", cardholder: "Tyler Murphy", expirationDate: "2028-06-03", status: "INACTIVE" },
];

export default function AllocateCardsSearch() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedCard) {
      navigate("/cards/allocate/details");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
        <StepIndicator currentStep={2} totalSteps={3} />
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

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Card Number</TableHead>
                  <TableHead>Card Holder Name</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((card) => (
                  <TableRow 
                    key={card.id} 
                    className={selectedCard === card.id ? 'bg-blue-50' : undefined}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedCard === card.id}
                        onCheckedChange={() => setSelectedCard(card.id)}
                      />
                    </TableCell>
                    <TableCell>{card.cardNumber}</TableCell>
                    <TableCell>{card.cardholder}</TableCell>
                    <TableCell>{card.expirationDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        card.status === 'INACTIVE' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : card.status === 'EXPIRED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {card.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
