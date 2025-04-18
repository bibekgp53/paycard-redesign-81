
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccountCard } from "@/graphql/types";

export const useLoadAllocatedCards = () => {
  return useQuery({
    queryKey: ["loadAllocatedCards"],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('search_load_allocated', {
          account_from: false,
          transfer_from_account_id: 0,
          limit: 100,
          offset: 0
        });
      
      if (error) throw error;
      
      return data.map((item) => ({
        id: item.id,
        accountCardId: item.accountcardid,
        accountCardMtd: item.accountcardmtd,
        balance: item.balance,
        cardholder: item.cardholder,
        cardNumber: item.cardnumber, // Using the masked number from the database
        ficaValidation: item.ficavalidation
      })) as AccountCard[];
    }
  });
};
