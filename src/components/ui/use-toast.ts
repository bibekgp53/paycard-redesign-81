
// Re-export toast components and functions
import { useToast as useInternalToast, toast as internalToast } from "@/hooks/use-toast";

export const useToast = useInternalToast;
export const toast = internalToast;

export default { useToast, toast };
