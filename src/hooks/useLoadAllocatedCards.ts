
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccountCard } from "@/graphql/types";

export const useLoadAllocatedCards = (searchTerm: string) => {
  return useQuery({
    queryKey: ["loadAllocatedCards", searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('search_load_allocated', { search_term: searchTerm });
      
      if (error) throw error;
      
      return data.map((item) => ({
        id: item.id,
        accountCardId: item.accountcardid,
        accountCardMtd: item.accountcardmtd,
        balance: item.balance,
        cardholder: item.cardholder,
        cardNumber: item.cardnumber,  // This now contains the masked number from the database
        ficaValidation: item.ficavalidation
      })) as AccountCard[];
    }
  });
};
