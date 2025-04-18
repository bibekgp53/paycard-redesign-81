
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccountCard } from "@/graphql/types";

/**
 * Helper function to mask a card number
 * Displays only first 2 and last 4 digits
 */
const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber || cardNumber.length < 7) return cardNumber;
  
  const firstPart = cardNumber.substring(0, 2);
  const lastPart = cardNumber.substring(cardNumber.length - 4);
  const maskedPart = '*'.repeat(cardNumber.length - 6);
  
  return `${firstPart}${maskedPart}${lastPart}`;
};

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
        cardNumber: maskCardNumber(item.cardnumber), // Apply masking in the frontend
        ficaValidation: item.ficavalidation
      })) as AccountCard[];
    }
  });
};
