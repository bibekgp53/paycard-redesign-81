
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
          account_from: false,
          transfer_from_account_id: 0,
          limit: 100,
          offset: 0
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
          id: String(item.id || ''),
          accountCardId: Number(item.account_card_id || 0),
          accountCardMtd: Number(item.account_card_mtd || 0),
          balance: Number(item.balance || 0),
          cardholder: String(item.cardholder || ''),
          cardNumber: String(item.cardnumber || ''),
          ficaValidation: String(item.fica_validation || '')
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
