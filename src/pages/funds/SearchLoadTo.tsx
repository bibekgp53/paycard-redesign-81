import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { SearchField, useSearchLoadTo } from "@/hooks/useSearchLoadTo";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const searchFields = [
  { value: 'cardNumber', label: 'Card Number' },
  { value: 'cardholder', label: 'Cardholder' },
  { value: 'idPassportNumber', label: 'ID/Passport Number' },
  { value: 'expiryDate', label: 'Card Expiry Date' },
  { value: 'referenceNumber', label: 'Reference Number' },
];

export default function SearchLoadTo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { results, loading, error, searchCards } = useSearchLoadTo();
  const [searchField, setSearchField] = useState<SearchField>('cardNumber');
  const [searchString, setSearchString] = useState('');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleSearch = () => {
    searchCards({
      searchField,
      searchString,
      orderByField: searchField,
      offset: 0,
      limit: 10
    });
  };

  const handleLoadFundsClick = () => {
    navigate("/load-funds-from");
  };

  const handleToClick = () => {
    navigate("/load-funds-from/to");
  };

  const toggleCardSelection = (cardId: number) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedCards(checked ? results.map(card => card.account_card_id) : []);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleLoadFundsClick}>Load Funds From</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleToClick}>To</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search Card</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-paycard-navy mb-6">Search Card</h2>
          
          <div className="flex gap-4 mb-6">
            <Select value={searchField} onValueChange={(value) => setSearchField(value as SearchField)}>
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
                onChange={(e) => setSearchString(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCards.length === results.length && results.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
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
                      <Checkbox
                        checked={selectedCards.includes(card.account_card_id)}
                        onCheckedChange={() => toggleCardSelection(card.account_card_id)}
                      />
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
        </div>
      </Card>

      <div className="flex justify-between">
        <Button onClick={handleLoadFundsClick}>Back</Button>
        <Button disabled={selectedCards.length === 0}>Load Funds</Button>
      </div>
    </div>
  );
}
