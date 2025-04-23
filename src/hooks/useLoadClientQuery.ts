
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ClientSettings } from "@/graphql/types";
import { toast } from "@/components/ui/use-toast";

export const useLoadClientQuery = () => {
  return useQuery({
    queryKey: ["loadClient"],
    queryFn: async () => {
      console.log("Calling get_load_client with parameters:", {
        account_from: false,
        transfer_from_account_id: 0,
      });
      
      const { data: rpcData, error: rpcError } = await supabase.rpc("get_load_client", {
        account_from: false,
        transfer_from_account_id: 0,
      });
      
      console.log("Supabase get_load_client raw result:", rpcData);
      
      if (rpcError) {
        console.error("RPC error:", rpcError);
        toast({
          title: "Error loading client data",
          description: rpcError.message,
          variant: "destructive",
        });
        throw rpcError;
      }
      
      if (!rpcData) {
        console.error("No data returned from get_load_client");
        throw new Error("No data returned from get_load_client");
      }

      // Log each top-level property of the response
      console.log("Response properties:");
      Object.keys(rpcData).forEach(key => {
        console.log(`- ${key}:`, rpcData[key], typeof rpcData[key]);
        
        // For nested objects, log their contents too
        if (typeof rpcData[key] === 'object' && rpcData[key] !== null) {
          console.log(`  ${key} properties:`, Object.keys(rpcData[key]));
          Object.entries(rpcData[key]).forEach(([subKey, subValue]) => {
            console.log(`    - ${subKey}:`, subValue);
          });
        }
      });

      // Check if we have any non-null values in the response
      const hasData = Object.keys(rpcData).some(key => {
        if (typeof rpcData[key] === 'object' && rpcData[key] !== null) {
          return Object.values(rpcData[key]).some(val => val !== null);
        }
        return rpcData[key] !== null;
      });
      
      console.log("Response has non-null values:", hasData);
      
      if (!hasData) {
        console.warn("RPC function returned only null values. This may be due to RLS restrictions.");
      }
      
      return rpcData as unknown as ClientSettings;
    }
  });
};
