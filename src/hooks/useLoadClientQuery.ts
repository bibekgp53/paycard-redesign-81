
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

    const fetchData = async () => {
      try {
        // Console log the parameters we're sending for debugging
        console.log("Calling get_load_client with parameters:", {
          account_from: false,
          transfer_from_account_id: 0,
        });

        const { data: rpcData, error: rpcError } = await supabase.rpc("get_load_client", {
          account_from: false,
          transfer_from_account_id: 0,
        });

        if (!isMounted) return;
        
        // Always log raw result for debugging
        console.log("Supabase get_load_client raw result:", rpcData);

        if (rpcError) {
          console.error("RPC error:", rpcError);
          setError(rpcError);
          setData(null);
        } else {
          // Set data directly from the response
          setData(rpcData as unknown as ClientSettings);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching client settings:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
};
