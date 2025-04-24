
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle, CheckCircle2 } from "lucide-react";

export type AlertType = null | { type: "success" | "error"; message: string };

interface LoadAlertProps {
  alert: AlertType;
  onClose: () => void;
}

export const LoadAlert = ({ alert, onClose }: LoadAlertProps) => {
  if (!alert) return null;

  return (
    <Alert
      variant={alert.type === "error" ? "destructive" : "default"}
      className={`mb-4 ${
        alert.type === "error"
          ? "bg-pcard-status-red-light border-pcard-status-red text-pcard-status-red"
          : "bg-pcard-status-green-light border-pcard-status-green text-pcard-status-green"
      }`}
    >
      {alert.type === "error" ? (
        <XCircle className="w-5 h-5 text-pcard-status-red mr-2" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-pcard-status-green mr-2" />
      )}
      <div>
        <AlertTitle>{alert.type === "error" ? "Error" : "Success"}</AlertTitle>
        <AlertDescription>{alert.message}</AlertDescription>
      </div>
      <button
        className="ml-auto text-gray-400 hover:text-gray-700 flex items-center"
        onClick={onClose}
        aria-label="Close"
        type="button"
      >
        <XCircle className="h-5 w-5" />
      </button>
    </Alert>
  );
};
