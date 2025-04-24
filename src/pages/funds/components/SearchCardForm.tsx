
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/hooks/useSearchLoadTo";

const searchFields = [
  { value: 'cardNumber', label: 'Card Number' },
  { value: 'cardholder', label: 'Cardholder' },
  { value: 'idPassportNumber', label: 'ID/Passport Number' },
  { value: 'expiryDate', label: 'Card Expiry Date' },
  { value: 'referenceNumber', label: 'Reference Number' },
];

interface SearchCardFormProps {
  searchField: SearchField;
  searchString: string;
  onSearchFieldChange: (value: SearchField) => void;
  onSearchStringChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchCardForm = ({
  searchField,
  searchString,
  onSearchFieldChange,
  onSearchStringChange,
  onSearch
}: SearchCardFormProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <Select value={searchField} onValueChange={onSearchFieldChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {searchFields.map((field) => (
            <SelectItem key={field.value} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search..."
          className="pl-10"
          value={searchString}
          onChange={(e) => onSearchStringChange(e.target.value)}
        />
      </div>
      <Button 
        onClick={onSearch} 
        variant="secondary"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
};
