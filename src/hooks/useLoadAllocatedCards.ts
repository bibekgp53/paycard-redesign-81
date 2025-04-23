
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccountCard } from "@/graphql/types";

export const useLoadAllocatedCards = () => {
  return useQuery({
    queryKey: ["loadAllocatedCards"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Unauthorized');
      }

      const { data, error } = await supabase
        .rpc('search_load_allocated', {
          account_from: "false",
          transfer_from_account_id: 0,
          limit: 100,
          offset: 0
        });
      
      if (error) {
        console.error("Error loading allocated cards:", error);
        throw error;
      }
      
      console.log("Received data from backend:", data);
      
      return (data ?? []).map((item) => ({
        id: String(item.id),
        accountCardId: item.account_card_id,
        accountCardMtd: Number(item.account_card_mtd),
        balance: Number(item.balance),
        cardholder: item.cardholder,
        cardNumber: item.cardnumber,
        ficaValidation: String(item.fica_validation)
      })) as AccountCard[];
    }
  });
};
