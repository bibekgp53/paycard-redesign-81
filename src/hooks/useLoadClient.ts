
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
      const { data, error } = await supabase.rpc('get_load_client', {
        account_from: false,
        transfer_from_account_id: 0
      });
      
      if (error) {
        console.error("Error loading client settings:", error);
        throw error;
      }
      
      console.log("Received client settings:", data);
      
      // The data from Supabase is already in the correct format,
      // but we need to make TypeScript recognize it
      return data as unknown as LoadClientResponse;
    }
  });
};
