
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
      
      // Using the actual account data instead of hardcoded values
      return {
        details: {
          clientMinCardLoad: clientData.clientmincardload,
          clientMaxBalance: clientData.clientmaxbalance,
          clientTransferFee: clientData.clienttransferfee
        },
        profile: {
          fromBalance: clientData.frombalance || 0, // We'll fetch this from the database
          fromAccount: Number(clientData.id) || 0
        }
      } as ClientSettings;
    }
  });
};
