
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  numberOfCards: z.number().min(0).max(100),
  reference: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RequestCards() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfCards: 0,
      reference: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log("Form values:", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3">
        <FormField
          control={form.control}
          name="numberOfCards"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Cards</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Number of Cards" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference</FormLabel>
              <FormControl>
                <Input placeholder="Reference" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

