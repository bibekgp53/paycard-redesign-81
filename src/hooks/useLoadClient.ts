
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClientSettings } from "@/graphql/types";

export const useLoadClient = () => {
  return useQuery({
    queryKey: ["loadClient"],
    queryFn: async () => {
      // Call the function with explicit parameters to avoid ambiguity
      const { data, error } = await supabase.rpc('get_load_client', {
        account_from: false,
        transfer_from_account_id: 0
      });
      
      if (error) {
        console.error("Error loading client settings:", error);
        throw error;
      }
      
      console.log("Received client settings:", data);
      
      const clientData = Array.isArray(data) ? data[0] : data;
      
      return {
        details: {
          clientMinCardLoad: clientData.clientmincardload || clientData.details?.clientMinCardLoad,
          clientMaxBalance: clientData.clientmaxbalance || clientData.details?.clientMaxBalance,
          clientTransferFee: clientData.clienttransferfee || clientData.details?.clientTransferFee
        },
        profile: {
          // Use the fromBalance from the response or fallback to 1000
          fromBalance: clientData.profile?.fromBalance || 1000,
          // Generate an account number from the ID or use the one from response
          fromAccount: clientData.profile?.fromAccount || Number(clientData.id) || 0
        }
      } as ClientSettings;
    }
  });
};
