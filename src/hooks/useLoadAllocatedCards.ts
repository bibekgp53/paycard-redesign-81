
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccountCard } from "@/graphql/types";

export const useLoadAllocatedCards = () => {
  return useQuery({
    queryKey: ["loadAllocatedCards"],
    queryFn: async () => {
      console.log("Fetching allocated cards");
      const { data: session } = await supabase.auth.getSession();
      
      console.log("Making RPC request to search_load_allocated");
      const { data, error } = await supabase
        .rpc('search_load_allocated', {
          p_account_from: false,
          p_transfer_from_account_id: 0,
          p_limit: 100,
          p_offset: 0
        });
      
      if (error) {
        console.error("Error loading allocated cards:", error);
        throw error;
      }
      
      console.log("Received data from backend:", data);
      
      if (!Array.isArray(data)) {
        console.error("Expected array response but received:", typeof data);
        return [];
      }
      
      // Transform the data to match the expected AccountCard type
      const cards = data.map((item: any) => {
        const card: AccountCard = {
          id: item.id || '',
          accountCardId: Number(item.account_card_id || 0),
          accountCardMtd: Number(item.account_card_mtd || 0),
          balance: Number(item.balance || 0),
          cardholder: item.cardholder || '',
          cardNumber: item.cardnumber || '',
          ficaValidation: item.fica_validation || ''
        };
        return card;
      });
      
      return cards;
    },
    retry: 1,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false
  });
};
