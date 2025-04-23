
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ClientSettings } from "@/graphql/types";
import { toast } from "@/components/ui/use-toast";

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
        
        // Call the RPC function with the current user context
        const { data: rpcData, error: rpcError } = await supabase.rpc("get_load_client", {
          account_from: false,
          transfer_from_account_id: 0,
        });

        if (!isMounted) return;
        
        // Always log raw result for debugging
        console.log("Supabase get_load_client raw result:", rpcData);
        console.log("Result type:", typeof rpcData);
        
        // Log each top-level property of the response
        if (rpcData) {
          console.log("Response properties:");
          Object.keys(rpcData).forEach(key => {
            console.log(`- ${key}:`, rpcData[key], typeof rpcData[key]);
            
            // For nested objects, log their contents too
            if (typeof rpcData[key] === 'object' && rpcData[key] !== null) {
              console.log(`  ${key} properties:`, Object.keys(rpcData[key]));
              Object.entries(rpcData[key]).forEach(([subKey, subValue]) => {
                console.log(`    - ${subKey}:`, subValue);
              });
            }
          });
        }

        if (rpcError) {
          console.error("RPC error:", rpcError);
          setError(rpcError);
          setData(null);
          
          // Show toast notification for better UX
          toast({
            title: "Error loading client data",
            description: rpcError.message,
            variant: "destructive",
          });
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
          
          if (!hasData) {
            console.warn("RPC function returned only null values. This may be due to RLS restrictions.");
          }
          
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
