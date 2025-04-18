
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClientSettings } from "@/graphql/types";

interface LoadClientResponse {
  details: {
    clientMinCardLoad: number;
    clientMaxBalance: number;
    clientTransferFee: number;
  };
  profile: {
    fromBalance: number;
    fromAccount: number;
  };
}

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
      
      // Transform the data into the expected format
      // The Supabase function returns an array with one object, so we access it and transform it
      if (Array.isArray(data)) {
        // Handle the case where the function returns an array
        const clientData = data[0];
        return {
          details: {
            clientMinCardLoad: clientData.clientmincardload,
            clientMaxBalance: clientData.clientmaxbalance,
            clientTransferFee: clientData.clienttransferfee
          },
          profile: {
            fromBalance: 5000, // Using fixed value as per database function
            fromAccount: 8784274989 // Using fixed value as per database function
          }
        } as LoadClientResponse;
      } else {
        // The function appears to be returning the expected object directly
        return data as LoadClientResponse;
      }
    }
  });
};
