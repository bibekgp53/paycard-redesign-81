import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function AllocateCards() {
  const navigate = useNavigate();
  const [allocationType, setAllocationType] = useState("all");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleContinue = () => {
    if (!agreedToTerms) {
      return;
    }
    if (allocationType === "search") {
      navigate("/cards/allocate/search");
    } else {
      navigate("/cards/allocate/details", { state: { allocationType: "all" } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Select your preferred allocation method and review card availability before proceeding.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-paycard-navy text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">40</div>
            <div className="text-sm">Total Cards</div>
          </CardContent>
        </Card>
        <Card className="bg-paycard-salmon text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">20</div>
            <div className="text-sm">Unallocated Cards</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2 text-paycard-navy">10</div>
            <div className="text-sm text-gray-600">Allocated Cards</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-paycard-navy mb-6">Choose Allocation Method</h2>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-paycard-navy transition-colors">
              <input
                type="radio"
                name="allocationType"
                value="all"
                checked={allocationType === "all"}
                onChange={(e) => setAllocationType(e.target.value)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-paycard-navy">Allocate all cards</div>
                <div className="text-sm text-gray-500">Quickly allocate all available cards in a single process</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-paycard-navy transition-colors">
              <input
                type="radio"
                name="allocationType"
                value="search"
                checked={allocationType === "search"}
                onChange={(e) => setAllocationType(e.target.value)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-paycard-navy">Search for cards</div>
                <div className="text-sm text-gray-500">Search and select specific cards to allocate</div>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 mb-8">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I have read {" "}
          <a
            href="#"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            the Standard Bank FICA requirements
          </a>
        </label>
      </div>

      <Button
        variant="default"
        className="w-full"
        onClick={handleContinue}
        disabled={!agreedToTerms}
      >
        CONTINUE
      </Button>
    </div>
  );
}
