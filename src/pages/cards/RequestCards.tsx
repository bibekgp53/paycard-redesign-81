
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  numberOfCards: z.number().min(1, "Number of cards is required").max(1000, "Maximum 1000 cards per order"),
  receiverName: z.string().min(2, "Receiver name is required"),
  receiverId: z.string().min(6, "ID number must be at least 6 characters"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  alternativeContactNumber: z.string().optional(),
  deliveryMethod: z.string().default("courier"),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
  code: z.string().min(4, "Postal code is required")
});

type FormValues = z.infer<typeof formSchema>;

export default function RequestCards() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardCost, setCardCost] = useState({
    perCardCost: 16.00,
    deliveryFee: 70.00,
    totalCardCost: 0,
    totalCostWithDelivery: 0
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfCards: 0,
      receiverName: "",
      receiverId: "",
      contactNumber: "",
      alternativeContactNumber: "",
      deliveryMethod: "courier",
      deliveryAddress: "",
      city: "",
      code: ""
    },
  });

  // Watch for changes in number of cards to update cost calculations
  const numberOfCards = form.watch("numberOfCards");

  useEffect(() => {
    const numCards = Number(numberOfCards) || 0;
    const totalCardCost = numCards * cardCost.perCardCost;
    const totalCostWithDelivery = totalCardCost + cardCost.deliveryFee;
    
    setCardCost(prev => ({
      ...prev,
      totalCardCost,
      totalCostWithDelivery
    }));
  }, [numberOfCards, cardCost.perCardCost, cardCost.deliveryFee]);

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    console.log("Form values:", values);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Order submitted",
        description: `Order for ${values.numberOfCards} cards has been submitted.`,
      });
      form.reset();
    }, 1000);
  }

  const RequiredFieldIndicator = () => <span className="text-paycard-red ml-1">*</span>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Request Cards</h1>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Complete the form below to request new cards for your organization.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-paycard-navy mb-6">Card Order Cost</h2>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="numberOfCards"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-start">
                        <FormLabel>Number of Cards<RequiredFieldIndicator /></FormLabel>
                      </div>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter number of cards" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          error={!!form.formState.errors.numberOfCards}
                        />
                      </FormControl>
                      <FormMessage />
                      
                      {/* Cost calculation information */}
                      <div className="mt-3 text-sm text-gray-600">
                        <p>Total cost of cards at: R {cardCost.perCardCost.toFixed(2)} per card: R {cardCost.totalCardCost.toFixed(2)}</p>
                        <p>Cost including: R {cardCost.deliveryFee.toFixed(2)} delivery fee: R {cardCost.totalCostWithDelivery.toFixed(2)}</p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-paycard-navy mb-6">Delivery Information</h2>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="receiverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Name<RequiredFieldIndicator /></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter receiver's full name" 
                          {...field}
                          error={!!form.formState.errors.receiverName} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="receiverId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver ID Number<RequiredFieldIndicator /></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter receiver's ID number" 
                          {...field}
                          error={!!form.formState.errors.receiverId} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number<RequiredFieldIndicator /></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter primary contact number" 
                            {...field}
                            error={!!form.formState.errors.contactNumber} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="alternativeContactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternative Contact Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter alternative contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Delivery Method<RequiredFieldIndicator /></FormLabel>
                      <FormControl>
                        <RadioGroup
                          name="deliveryMethod"
                          options={[
                            { value: "courier", label: "Courier" },
                          ]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="my-4" />
                
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address<RequiredFieldIndicator /></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter street address" 
                          {...field}
                          error={!!form.formState.errors.deliveryAddress} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City<RequiredFieldIndicator /></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter city name" 
                            {...field}
                            error={!!form.formState.errors.city} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code<RequiredFieldIndicator /></FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter postal code" 
                            {...field}
                            error={!!form.formState.errors.code} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "SUBMIT ORDER"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
