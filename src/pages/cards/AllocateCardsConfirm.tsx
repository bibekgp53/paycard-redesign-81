
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StepIndicator } from "@/components/ui/step-indicator";

export default function AllocateCardsConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, cardNumber } = location.state || {};

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    navigate("/cards/allocate/complete");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Confirm Allocation</h1>
        <StepIndicator currentStep={4} totalSteps={4} />
      </div>

      <Card>
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-bold text-paycard-navy mb-6 text-center">
            Confirm allocation
          </h2>
        </div>

        <div className="p-6">
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

          <div className="flex justify-end mt-8">
            <Button
              variant="default"
              onClick={handleConfirm}
            >
              CONFIRM
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
