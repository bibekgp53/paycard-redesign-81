
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

        // Check if the tables have RLS enabled
        const { data: rls_info_cs, error: rls_error_cs } = await supabase.rpc(
          "check_rls_enabled",
          { table_name: "client_settings" }
        ).maybeSingle();
        
        const { data: rls_info_p, error: rls_error_p } = await supabase.rpc(
          "check_rls_enabled", 
          { table_name: "profiles" }
        ).maybeSingle();
        
        console.log("RLS status for client_settings:", rls_info_cs || "Error checking RLS", rls_error_cs || '');
        console.log("RLS status for profiles:", rls_info_p || "Error checking RLS", rls_error_p || '');

        // Check Supabase connection and if data exists
        const { data: connectionTest, error: connectionError } = await supabase.from('client_settings').select('*').limit(1);
        console.log("Connection test to client_settings:", connectionTest ? "Succeeded" : "Failed", connectionError || '');
        console.log("Client settings data sample:", connectionTest);
        console.log("Does client_settings have data:", Array.isArray(connectionTest) && connectionTest.length > 0);
        
        // Check profiles table
        const { data: profilesTest, error: profilesError } = await supabase.from('profiles').select('*').limit(1);
        console.log("Connection test to profiles:", profilesTest ? "Succeeded" : "Failed", profilesError || '');
        console.log("Profiles data sample:", profilesTest);
        console.log("Do profiles have data:", Array.isArray(profilesTest) && profilesTest.length > 0);
        
        // Get the user's current session
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Current session:", sessionData?.session ? "User is logged in" : "No active session");
        
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
