
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ClientSettings } from "@/graphql/types"; // We assume the output matches ClientSettings shape

// This hook will call the Supabase RPC get_load_client
export const useLoadClientQuery = () => {
  const [data, setData] = useState<ClientSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    supabase
      .rpc("get_load_client", {})
      .then(({ data: rpcData, error: rpcError }) => {
        if (!isMounted) return;
        if (rpcError) {
          setError(rpcError);
          setData(null);
        } else {
          setData(rpcData as ClientSettings); // trusted, as the function returns jsonb in correct shape
        }
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
};
