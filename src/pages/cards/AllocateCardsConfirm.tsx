
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton as Button } from "@/components/ui/custom-button";
import { ArrowLeft } from "lucide-react";

export default function AllocateCardsConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    navigate("/cards/allocate/complete");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <button 
          onClick={handleBack}
          className="mb-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} className="text-paycard-navy" />
        </button>

        <h1 className="text-2xl font-bold text-paycard-navy mb-8 text-center">
          Confirm allocation
        </h1>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 text-gray-600 font-medium">CARD NUMBER</th>
                <th className="text-left p-4 text-gray-600 font-medium">FIRST NAME</th>
                <th className="text-left p-4 text-gray-600 font-medium">SURNAME</th>
                <th className="text-left p-4 text-gray-600 font-medium">ID/PASSPORT NUMBER</th>
                <th className="text-left p-4 text-gray-600 font-medium">CELLPHONE NUMBER</th>
                <th className="text-left p-4 text-gray-600 font-medium">REFERENCE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">53*****5311</td>
                <td className="p-4">{formData?.firstName || '-'}</td>
                <td className="p-4">{formData?.surname || '-'}</td>
                <td className="p-4">{formData?.idNumber || '-'}</td>
                <td className="p-4">{formData?.cellphone || '-'}</td>
                <td className="p-4">{formData?.reference || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            variant="primary"
            onClick={handleConfirm}
          >
            CONFIRM
          </Button>
        </div>
      </div>
    </div>
  );
}
