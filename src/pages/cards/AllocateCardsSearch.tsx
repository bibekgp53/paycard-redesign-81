
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StepIndicator } from "@/components/ui/step-indicator";
import { RadioGroupBase, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchAvailableCards, getCardCounts } from "@/services/cardAllocation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

export default function AllocateCardsSearch() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Force refresh card data when component mounts
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['availableCards'] });
    queryClient.invalidateQueries({ queryKey: ['cardCounts'] });
  }, [queryClient]);

  const { data: cards, isLoading: cardsLoading, error: cardsError } = useQuery({
    queryKey: ['availableCards', searchTerm, currentPage],
    queryFn: () => searchAvailableCards(searchTerm, currentPage, itemsPerPage),
    staleTime: 0, // Always refetch when requested
    retry: 1
  });

  const { data: cardCounts, isLoading: countsLoading, error: countsError } = useQuery({
    queryKey: ['cardCounts'],
    queryFn: getCardCounts,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0 // Always refetch when requested
  });

  // Handle errors
  useEffect(() => {
    if (cardsError) {
      toast({
        title: "Error loading cards",
        description: "There was a problem loading the available cards. Please try again.",
        variant: "destructive"
      });
      console.error("Cards error:", cardsError);
    }

    if (countsError) {
      toast({
        title: "Error loading card counts",
        description: "There was a problem loading the card counts. Please try again.",
        variant: "destructive"
      });
      console.error("Card counts error:", countsError);
    }
  }, [cardsError, countsError]);

  const handleContinue = () => {
    if (selectedCard) {
      const card = cards?.find(c => c.id === selectedCard);
      navigate("/cards/allocate/details", { 
        state: { 
          id: card?.id,
          cardNumber: card?.card_number,
          sequenceNumber: card?.sequence_number,
          trackingNumber: card?.tracking_number,
          allocationType: "search"
        } 
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
        <StepIndicator currentStep={1} totalSteps={4} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-paycard-navy text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">{countsLoading ? "..." : cardCounts?.total}</div>
            <div className="text-sm">Total Cards</div>
          </CardContent>
        </Card>
        <Card className="bg-paycard-salmon text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">{countsLoading ? "..." : cardCounts?.unallocated}</div>
            <div className="text-sm">Unallocated Cards</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2 text-paycard-navy">{countsLoading ? "..." : cardCounts?.allocated}</div>
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
                placeholder="Search by card number or tracking number..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-paycard-navy-150">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="w-[50px] text-paycard-navy-900 font-semibold">Select</TableHead>
                  <TableHead className="text-paycard-navy-900 font-semibold">Card Number</TableHead>
                  <TableHead className="text-paycard-navy-900 font-semibold">Sequence Number</TableHead>
                  <TableHead className="text-paycard-navy-900 font-semibold">Tracking Number</TableHead>
                  <TableHead className="text-paycard-navy-900 font-semibold">Cardholder Name</TableHead>
                  <TableHead className="text-paycard-navy-900 font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cardsLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    </TableRow>
                  ))
                ) : cards?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No cards found
                    </TableCell>
                  </TableRow>
                ) : (
                  cards?.map((card) => (
                    <TableRow 
                      key={card.id}
                      className={`border-none hover:bg-paycard-navy-100 ${selectedCard === card.id ? 'bg-paycard-navy-150' : ''}`}
                    >
                      <TableCell>
                        <RadioGroupBase 
                          value={selectedCard || ""}
                          onValueChange={setSelectedCard}
                          className="flex items-center"
                        >
                          <RadioGroupItem value={card.id} id={`card-${card.id}`} />
                        </RadioGroupBase>
                      </TableCell>
                      <TableCell>{card.card_number}</TableCell>
                      <TableCell>{card.sequence_number}</TableCell>
                      <TableCell>{card.tracking_number}</TableCell>
                      <TableCell>{card.cardholder_name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          card.status === 'active' 
                            ? 'bg-pcard-status-green-light text-pcard-status-green-dark'
                            : card.status === 'inactive'
                            ? 'bg-pcard-status-orange-light text-pcard-status-orange-dark'
                            : 'bg-pcard-status-red-light text-pcard-status-red-dark'
                        }`}>
                          {card.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between px-2">
            <div className="text-sm text-gray-500">
              Showing {cards?.length || 0} unallocated cards
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!cards || cards.length < itemsPerPage}
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
