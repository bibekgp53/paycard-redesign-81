
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

type FormValues = {
  numberOfCards: number;
  receiverName: string;
  receiverId: string;
  contactNumber: string;
  alternativeContactNumber?: string;
  deliveryMethod: string;
  deliveryAddress: string;
  city: string;
  code: string;
};

export default function RequestCardsConfirm() {
  const [isCompleted, setIsCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData as FormValues;
  const cardCost = location.state?.cardCost;

  // If no formData is available, redirect back to the request form
  if (!formData) {
    navigate('/cards/request');
    return null;
  }

  const handleEdit = () => {
    navigate('/cards/request', { state: { formData } });
  };

  const handleConfirm = () => {
    setIsCompleted(true);
  };

  const handleFinished = () => {
    navigate('/cards/request');
  };

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-paycard-navy">Card Order Completed</h1>
        </div>
        
        <Card className="mb-8 py-12">
          <CardContent className="flex flex-col items-center justify-center">
            <CheckCircle2 size={80} className="text-green-500 mb-6" />
            <h2 className="text-2xl font-semibold text-paycard-navy mb-4">Card Order Completed</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your order for {formData.numberOfCards} cards has been successfully processed.
            </p>
            <Button onClick={handleFinished} className="w-full max-w-xs">
              I'M FINISHED
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Confirm Card Order</h1>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Please review your card order details below before confirming.
      </p>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-paycard-navy mb-6">Card Order Cost</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Number of Cards:</span>
              <span>{formData.numberOfCards}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Cost per Card:</span>
              <span>R {cardCost.perCardCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Card Cost:</span>
              <span>R {cardCost.totalCardCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Delivery Fee:</span>
              <span>R {cardCost.deliveryFee.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total Cost:</span>
              <span>R {cardCost.totalCostWithDelivery.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-paycard-navy mb-6">Delivery Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Receiver Details</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{formData.receiverName}</p>
                </div>
                <div>
                  <span className="text-gray-600">ID Number:</span>
                  <p className="font-medium">{formData.receiverId}</p>
                </div>
                <div>
                  <span className="text-gray-600">Contact Number:</span>
                  <p className="font-medium">{formData.contactNumber}</p>
                </div>
                {formData.alternativeContactNumber && (
                  <div>
                    <span className="text-gray-600">Alternative Contact Number:</span>
                    <p className="font-medium">{formData.alternativeContactNumber}</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Delivery Method</h3>
              <p className="font-medium">{formData.deliveryMethod}</p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Delivery Address</h3>
              <div className="space-y-1">
                <p className="font-medium">{formData.deliveryAddress}</p>
                <p className="font-medium">{formData.city}</p>
                <p className="font-medium">{formData.code}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={handleEdit}
          className="flex-1"
        >
          EDIT
        </Button>
        <Button
          onClick={handleConfirm}
          className="flex-1"
        >
          CONFIRM ORDER
        </Button>
      </div>
    </div>
  );
}
