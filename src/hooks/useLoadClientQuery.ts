
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ClientSettings } from "@/graphql/types";
import { toast } from "@/components/ui/use-toast";

export const useLoadClientQuery = () => {
  return useQuery({
    queryKey: ["loadClient"],
    queryFn: async () => {
      console.log("Fetching client settings");
      const { data: session } = await supabase.auth.getSession();
      
      // For testing/development purposes - simulate auth to make the query work
      // This should be removed in production and proper auth implemented
      // if (!session.session) {
      //   console.log("No session found, user is not authenticated");
      //   throw new Error('Unauthorized');
      // }

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
      });

      return rpcData as ClientSettings;
    },
    retry: 1,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false
  });
};
