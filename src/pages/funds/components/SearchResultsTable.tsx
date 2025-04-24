
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchResult } from "@/hooks/useSearchLoadTo";

interface SearchResultsTableProps {
  results: SearchResult[];
  selectedCards: number[];
  onToggleCard: (cardId: number) => void;
  onSelectAll: (checked: boolean) => void;
}

export const SearchResultsTable = ({
  results,
  selectedCards,
  onToggleCard,
  onSelectAll
}: SearchResultsTableProps) => {
  return (
    <div className="rounded-lg overflow-hidden mb-6">
      <Table borderless>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <div className="flex items-center justify-center h-4">
                <Checkbox
                  checked={selectedCards.length === results.length && results.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </div>
            </TableHead>
            <TableHead>Card Number</TableHead>
            <TableHead>Card Holder</TableHead>
            <TableHead>ID/Passport Number</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Reference Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((card) => (
            <TableRow key={card.account_card_id}>
              <TableCell>
                <div className="flex items-center justify-center h-4">
                  <Checkbox
                    checked={selectedCards.includes(card.account_card_id)}
                    onCheckedChange={() => onToggleCard(card.account_card_id)}
                  />
                </div>
              </TableCell>
              <TableCell>{card.cardnumber}</TableCell>
              <TableCell>{card.cardholder}</TableCell>
              <TableCell>{card.id_passport_number}</TableCell>
              <TableCell>{card.expiry_date}</TableCell>
              <TableCell>{card.reference_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
