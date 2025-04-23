
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UserHeader {
  accountNumber: string;
  balanceAccount: number;
  fullName: string;
}

export const useUserHeaderQuery = () => {
  return useQuery({
    queryKey: ["userHeader"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Unauthorized');
      }

      const { data: rpcData, error: rpcError } = await supabase.rpc("get_user_header", {});
      
      if (rpcError) {
        console.error("Error fetching user header:", rpcError);
        throw rpcError;
      }
      
      return rpcData as unknown as UserHeader;
    }
  });
};
