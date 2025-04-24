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
import { CardsPagination } from "./components/CardsPagination";
import { FundsPageHeader } from "./components/FundsPageHeader"; // Import the new component

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
  const { results, metadata, loading, error, searchCards } = useSearchLoadTo();
  const [searchField, setSearchField] = useState<SearchField>('cardNumber');
  const [searchString, setSearchString] = useState('');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleSearch = () => {
    const offset = (currentPage - 1) * pageSize;
    searchCards({
      searchField,
      searchString,
      orderByField: searchField,
      offset,
      limit: pageSize
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const offset = (page - 1) * pageSize;
    searchCards({
      searchField,
      searchString,
      orderByField: searchField,
      offset,
      limit: pageSize
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

  const totalPages = metadata ? Math.ceil(metadata.filtered_count / pageSize) : 1;

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

      <FundsPageHeader /> {/* Use the new reusable component */}

      <Card className="mb-8 p-6">
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

        {metadata && (
          <div className="text-sm text-gray-600 mb-4">
            <p>Showing {metadata.filtered_count} results</p>
          </div>
        )}

        <div className="rounded-lg overflow-hidden">
          <Table borderless>
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

        {metadata && metadata.filtered_count > pageSize && (
          <div className="mt-6">
            <CardsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button 
          onClick={handleLoadFundsClick} 
          variant="outline"
        >
          Back
        </Button>
        <Button 
          disabled={selectedCards.length === 0} 
          variant="secondary"
        >
          Load Funds
        </Button>
      </div>
    </div>
  );
}
