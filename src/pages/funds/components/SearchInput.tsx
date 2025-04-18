
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchInput = ({ searchTerm, onSearchChange }: SearchInputProps) => {
  return (
    <Input
      type="text"
      placeholder="Search by cardholder name or card number"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="max-w-md"
    />
  );
};
