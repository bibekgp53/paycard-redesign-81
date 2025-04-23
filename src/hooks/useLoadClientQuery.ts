
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ClientSettings } from "@/graphql/types";

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
      .rpc("get_load_client", {
        account_from: false,
        transfer_from_account_id: 0,
      })
      .then(({ data: rpcData, error: rpcError }) => {
        if (!isMounted) return;
        console.log("Supabase get_load_client raw result:", rpcData);
        if (rpcError) {
          setError(rpcError);
          setData(null);
        } else {
          // Handle cases where data might be nested
          let extracted: any = rpcData;
          if (rpcData && typeof rpcData === "object" && "get_load_client" in rpcData) {
            extracted = (rpcData as any).get_load_client;
          }
          setData(extracted as unknown as ClientSettings);
        }
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
};
