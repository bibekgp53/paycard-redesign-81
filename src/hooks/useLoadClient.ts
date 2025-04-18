
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClientSettings } from "@/graphql/types";

export const useLoadClient = () => {
  return useQuery({
    queryKey: ["loadClient"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_load_client');
      if (error) throw error;
      
      const clientData = Array.isArray(data) ? data[0] : data;
      
      // The Supabase function returns clientmincardload, clientmaxbalance, clienttransferfee
      // Need to adapt these property names to match our ClientSettings type
      return {
        details: {
          clientMinCardLoad: clientData.clientmincardload,
          clientMaxBalance: clientData.clientmaxbalance,
          clientTransferFee: clientData.clienttransferfee
        },
        profile: {
          // The 'frombalance' property doesn't exist in the response
          // Using a default value of 1000 for now as requested
          fromBalance: 1000,
          // Generate an account number from the ID
          fromAccount: Number(clientData.id) || 0
        }
      } as ClientSettings;
    }
  });
};
