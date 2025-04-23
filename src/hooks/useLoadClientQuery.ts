
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

        // Check Supabase connection
        const { data: connectionTest, error: connectionError } = await supabase.from('client_settings').select('*').limit(1);
        console.log("Connection test to client_settings:", connectionTest ? "Succeeded" : "Failed", connectionError || '');
        
        // Check profiles table
        const { data: profilesTest, error: profilesError } = await supabase.from('profiles').select('*').limit(1);
        console.log("Connection test to profiles:", profilesTest ? "Succeeded" : "Failed", profilesError || '');
        
        // Call the RPC function
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
        } else if (!rpcData) {
          console.error("No data returned from get_load_client");
          setError(new Error("No data returned from get_load_client"));
          setData(null);
        } else {
          // Check if we have any non-null values in the response
          const hasData = Object.keys(rpcData).some(key => {
            if (typeof rpcData[key] === 'object' && rpcData[key] !== null) {
              return Object.values(rpcData[key]).some(val => val !== null);
            }
            return rpcData[key] !== null;
          });
          
          console.log("Response has non-null values:", hasData);
          
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
