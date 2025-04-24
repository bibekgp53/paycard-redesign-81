
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccountCard } from "@/graphql/types";

interface LoadAllocatedCardsParams {
  accountFrom: boolean;
  transferFromAccountId?: number;
  cardsToLoad?: number[];
}

export const useLoadAllocatedCards = ({ 
  accountFrom, 
  transferFromAccountId = 0, 
  cardsToLoad = [] 
}: LoadAllocatedCardsParams) => {
  return useQuery({
    queryKey: ["loadAllocatedCards", accountFrom, transferFromAccountId, cardsToLoad],
    queryFn: async () => {
      console.log("Fetching allocated cards with params:", { accountFrom, transferFromAccountId, cardsToLoad });
      
      console.log("Making RPC request to search_load_allocated");
      const { data, error } = await supabase
        .rpc('search_load_allocated', {
          p_account_from: accountFrom,
          p_transfer_from_account_id: transferFromAccountId,
          p_cards_to_load: cardsToLoad,
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

