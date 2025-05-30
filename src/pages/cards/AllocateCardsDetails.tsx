
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StepIndicator } from "@/components/ui/step-indicator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardAllocationSchema, type CardAllocationFormData } from "@/lib/validations/card-allocation";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCardCounts } from "@/services/cardAllocation";

export default function AllocateCardsDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, cardNumber, sequenceNumber, trackingNumber, allocationType } = location.state || {};
  const queryClient = useQueryClient();

  // Ensure consistent card counts across steps
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['cardCounts'] });
  }, [queryClient]);
  
  // Reintroduce currentStep and totalSteps
  const currentStep = allocationType === "search" ? 2 : 1;
  const totalSteps = allocationType === "search" ? 4 : 3;
  
  // Get the latest card counts
  const { data: cardCounts, isLoading } = useQuery({
    queryKey: ['cardCounts'],
    queryFn: getCardCounts,
    staleTime: 0,
    refetchOnWindowFocus: false
  });

  const form = useForm<CardAllocationFormData>({
    resolver: zodResolver(cardAllocationSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      idNumber: "",
      cellphone: "",
      reference: "",
    },
  });

  const onSubmit = (data: CardAllocationFormData) => {
    navigate("/cards/allocate/confirm", { 
      state: { 
        formData: data,
        id,
        cardNumber,
        sequenceNumber,
        trackingNumber,
        allocationType
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-paycard-navy text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">{isLoading ? "..." : cardCounts?.total}</div>
            <div className="text-sm">Total Cards</div>
          </CardContent>
        </Card>
        <Card className="bg-paycard-salmon text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">{isLoading ? "..." : cardCounts?.unallocated}</div>
            <div className="text-sm">Unallocated Cards</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2 text-paycard-navy">{isLoading ? "..." : cardCounts?.allocated}</div>
            <div className="text-sm text-gray-600">Allocated Cards</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-paycard-navy mb-6">Card holder details</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-paycard-navy">FIRST NAME *</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-paycard-navy">SURNAME *</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-paycard-navy">ID/PASSPORT NUMBER *</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cellphone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-paycard-navy">CELLPHONE NUMBER *</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-paycard-navy">REFERENCE</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-6 text-sm text-gray-600 space-y-1">
                <p>Card Number: {cardNumber || '-'}</p>
                <p>Sequence Number: {sequenceNumber || '-'}</p>
                <p>Tracking Number: {trackingNumber || '-'}</p>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                <Button type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
