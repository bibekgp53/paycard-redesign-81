
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StepIndicator } from "@/components/ui/step-indicator";
import { allocateCard, getCardCounts } from "@/services/cardAllocation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { FlashMessage } from "@/components/ui/flash-message";

export default function AllocateCardsConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, id, cardNumber, allocationType } = location.state || {};
  const [isAllocating, setIsAllocating] = useState(false);
  const [allocationError, setAllocationError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Ensure consistent card counts across steps
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['cardCounts'] });
  }, [queryClient]);

  const currentStep = allocationType === "search" ? 3 : 2;
  const totalSteps = allocationType === "search" ? 4 : 3;

  const { data: cardCounts, isLoading: countsLoading } = useQuery({
    queryKey: ['cardCounts'],
    queryFn: getCardCounts,
    staleTime: 0,
    refetchOnWindowFocus: false
  });

  const { mutate: submitAllocation, isPending } = useMutation({
    mutationFn: () => {
      if (!id) {
        throw new Error("Card ID is missing or invalid");
      }
      setAllocationError(null);
      return allocateCard(id, formData);
    },
    onSuccess: () => {
      toast.success("Card allocated successfully!");
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['cardCounts'] });
      queryClient.invalidateQueries({ queryKey: ['availableCards'] });
      navigate("/cards/allocate/complete");
    },
    onError: (error) => {
      setIsAllocating(false);
      setAllocationError(error instanceof Error ? error.message : "Failed to allocate card. Please try again.");
      toast.error("Failed to allocate card. Please try again.");
      console.error("Allocation error:", error);
    }
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    setIsAllocating(true);
    submitAllocation();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-paycard-navy text-white">
          <div className="p-6">
            <div className="text-4xl font-bold mb-2">{countsLoading ? "..." : cardCounts?.total}</div>
            <div className="text-sm">Total Cards</div>
          </div>
        </Card>
        <Card className="bg-paycard-salmon text-white">
          <div className="p-6">
            <div className="text-4xl font-bold mb-2">{countsLoading ? "..." : cardCounts?.unallocated}</div>
            <div className="text-sm">Unallocated Cards</div>
          </div>
        </Card>
        <Card className="border border-gray-200">
          <div className="p-6">
            <div className="text-4xl font-bold mb-2 text-paycard-navy">{countsLoading ? "..." : cardCounts?.allocated}</div>
            <div className="text-sm text-gray-600">Allocated Cards</div>
          </div>
        </Card>
      </div>

      {allocationError && (
        <div className="mb-4">
          <FlashMessage 
            type="error"
            title="Allocation Error"
            message={allocationError}
            onClose={() => setAllocationError(null)}
          />
        </div>
      )}

      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-paycard-navy mb-6">
            Confirm allocation
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CARD NUMBER</TableHead>
                <TableHead>FIRST NAME</TableHead>
                <TableHead>SURNAME</TableHead>
                <TableHead>ID/PASSPORT NUMBER</TableHead>
                <TableHead>CELLPHONE NUMBER</TableHead>
                <TableHead>REFERENCE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{cardNumber || '-'}</TableCell>
                <TableCell>{formData?.firstName || '-'}</TableCell>
                <TableCell>{formData?.surname || '-'}</TableCell>
                <TableCell>{formData?.idNumber || '-'}</TableCell>
                <TableCell>{formData?.cellphone || '-'}</TableCell>
                <TableCell>{formData?.reference || '-'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isPending}
            >
              Back
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isPending || isAllocating}
            >
              {isPending || isAllocating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Allocating...
                </>
              ) : (
                "CONFIRM"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
