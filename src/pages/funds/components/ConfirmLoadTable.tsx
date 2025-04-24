
import { SelectedLoad } from "@/store/useCardLoadsStore";

interface ConfirmLoadTableProps {
  loads: SelectedLoad[];
}

export const ConfirmLoadTable = ({ loads }: ConfirmLoadTableProps) => {
  if (loads.length === 0) {
    return <div className="text-sm text-paycard-red">No cards selected for load.</div>;
  }

  return (
    <table className="w-full text-left border mt-2 mb-4">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">NAME</th>
          <th className="py-2 px-4 border-b">CARD NUMBER</th>
          <th className="py-2 px-4 border-b">AMOUNT</th>
          <th className="py-2 px-4 border-b">FEE</th>
          <th className="py-2 px-4 border-b">SMS NOTIFICATION FEE</th>
        </tr>
      </thead>
      <tbody>
        {loads.map((item, idx) => (
          <tr key={idx}>
            <td className="py-2 px-4 border-b">{item.cardholderName}</td>
            <td className="py-2 px-4 border-b">{item.cardNumber}</td>
            <td className="py-2 px-4 border-b">R {item.transferAmount.toFixed(2)}</td>
            <td className="py-2 px-4 border-b">R {item.transferFee.toFixed(2)}</td>
            <td className="py-2 px-4 border-b">R {item.transferSMSNotificationFee.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
