
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// The get_user_header RPC returns a JSON object
interface UserHeader {
  accountNumber: string;
  balanceAccount: number;
  fullName: string;
}

export const useUserHeaderQuery = () => {
  const [data, setData] = useState<UserHeader | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    supabase
      .rpc("get_user_header", {})
      .then(({ data: rpcData, error: rpcError }) => {
        if (!isMounted) return;
        if (rpcError) {
          setError(rpcError);
          setData(null);
        } else {
          setData(rpcData as unknown as UserHeader);
        }
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
};
