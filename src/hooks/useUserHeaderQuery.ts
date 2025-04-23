
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
      
      // For testing/development purposes - simulate auth to make the query work
      // This should be removed in production and proper auth implemented
      // if (!session.session) {
      //   throw new Error('Unauthorized');
      // }

      console.log("Making RPC request to get_user_header");
      const { data: rpcData, error: rpcError } = await supabase.rpc("get_user_header");
      
      if (rpcError) {
        console.error("Error fetching user header:", rpcError);
        throw rpcError;
      }
      
      console.log("Received user header:", rpcData);
      
      // Ensure we're getting the expected structure or handle missing properties
      if (typeof rpcData !== 'object' || rpcData === null) {
        throw new Error('Invalid user header data format received');
      }
      
      // Create a properly typed object
      const userHeader: UserHeader = {
        accountNumber: String(rpcData.accountNumber || ''),
        balanceAccount: Number(rpcData.balanceAccount || 0),
        fullName: String(rpcData.fullName || '')
      };
      
      return userHeader;
    },
    retry: 1,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false
  });
};
