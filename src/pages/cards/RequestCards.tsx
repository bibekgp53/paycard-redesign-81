
import { useState } from "react";
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
                      <FormLabel>Number of Cards</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter number of cards" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
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
                      <FormLabel>Receiver Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter receiver's full name" {...field} />
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
                      <FormLabel>Receiver ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter receiver's ID number" {...field} />
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
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter primary contact number" {...field} />
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
                      <FormLabel>Delivery Method</FormLabel>
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
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street address" {...field} />
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
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city name" {...field} />
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
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter postal code" {...field} />
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
