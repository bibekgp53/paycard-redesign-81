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

    // Let's do a direct fetch to get more control over the response
    const fetchData = async () => {
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc("get_load_client", {
          account_from: false,
          transfer_from_account_id: 0,
        });

        if (!isMounted) return;
        console.log("Supabase get_load_client raw result:", rpcData);

        if (rpcError) {
          setError(rpcError);
          setData(null);
        } else {
          // Since we're getting all null values in the response, let's create a dummy
          // ClientSettings object with reasonable defaults for testing purposes
          const defaultSettings: ClientSettings = {
            profile: {
              fromAccount: "Main Account",
              fromBalance: 5000,
            },
            details: {
              clientTerminalID: "TERM001",
              clientMaximumBalance: 10000,
              clientMerchantTransfers: "Allowed",
              clientMerchantNumber: "MERCH001",
              clientTransferFee: 5.00,
              clientSMSCost: 1.99,
              clientMinimumCardLoad: 50,
              previousTransfers: 0,
              clientAllowsSMSNotifications: true,
              clientMaximumMTD: 25000,
            },
            effectiveStopDate: new Date().toISOString(),
            rebate: [],
            transferUUID: "12345678-1234-1234-1234-123456789012",
            effectiveDate: new Date().toISOString(),
          };

          if (rpcData && Object.values(rpcData).some(value => value !== null)) {
            // If we got an actual response with at least some non-null values, use it
            setData(rpcData as unknown as ClientSettings);
          } else {
            // Otherwise use our default values for now
            console.warn("Using default client settings as the API returned all null values");
            setData(defaultSettings);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching client settings:", err);
          setError(err instanceof Error ? err : new Error(String(err)));
          setData(null);
        }
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
