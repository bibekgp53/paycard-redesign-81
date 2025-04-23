
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
      console.log("Fetching user header data");
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Unauthorized');
      }

      console.log("Making RPC request to get_user_header");
      const { data: rpcData, error: rpcError } = await supabase.rpc("get_user_header", {});
      
      if (rpcError) {
        console.error("Error fetching user header:", rpcError);
        throw rpcError;
      }
      
      console.log("Received user header:", rpcData);
      return rpcData as unknown as UserHeader;
    },
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false
  });
};
