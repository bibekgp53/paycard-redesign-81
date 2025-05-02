
import React, { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function CancelPendingLoad() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("cardNumber");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Mock data for demonstration
  const mockPendingLoads = [
    { cardNumber: "53*****0772", amount: "R 50.00", requestedOn: "2025-04-15 03:24:29", frequency: "Once" },
    { cardNumber: "53*****0772", amount: "R 56.00", requestedOn: "2025-01-22 11:14:2", frequency: "Once" },
    { cardNumber: "53*****0772", amount: "R 50.00", requestedOn: "2025-01-15 09:05:3", frequency: "Once" },
    { cardNumber: "53*****4479", amount: "R 50.00", requestedOn: "2025-01-15 09:05:3", frequency: "Once" },
  ];
  
  const [results, setResults] = useState(mockPendingLoads);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = () => {
    setHasSearched(true);
    // In a real app, this would filter based on actual criteria
    if (searchQuery.trim() !== "") {
      setResults(mockPendingLoads.filter(load => 
        load.cardNumber.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setResults(mockPendingLoads);
    }
  };
  
  const breadcrumbItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Cancel pending load", isCurrentPage: true }
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());
  
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-paycard-navy">Find a pending load</h1>
        <p className="text-gray-600">
          Search for pending loads to cancel.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-sm uppercase text-gray-500 mb-2">FIND</h3>
            <div className="relative">
              <Input
                placeholder="Enter your search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[400px] pr-10"
              />
              <Button 
                variant="ghost" 
                className="absolute right-0 top-0 h-full aspect-square p-0" 
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">(LEAVE BLANK TO SHOW ALL)</p>
          </div>
          
          <div>
            <h3 className="text-sm uppercase text-gray-500 mb-2">FILTER BY YEAR</h3>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm uppercase text-gray-500 mb-2">SEARCH BY</h3>
          <RadioGroup 
            value={searchType} 
            onValueChange={setSearchType} 
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cardNumber" id="cardNumber" />
              <Label htmlFor="cardNumber">Card Number</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cardHolder" id="cardHolder" />
              <Label htmlFor="cardHolder">Card Holder</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="referenceNumber" id="referenceNumber" />
              <Label htmlFor="referenceNumber">Reference Number</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-paycard-navy mb-4">FILTER ALLOCATED CARD DATES</h3>
          <div className="flex space-x-4">
            <div className="flex-1">
              <p className="text-sm uppercase text-gray-500 mb-2">START DATE</p>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase text-gray-500 mb-2">END DATE</p>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleSearch} 
          className="bg-blue-500 hover:bg-blue-600 text-white w-[200px] mb-8"
        >
          SEARCH
        </Button>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CARD NUMBER</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>REQUESTED ON</TableHead>
                <TableHead>FREQUENCY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length > 0 ? (
                results.map((load, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-blue-500">{load.cardNumber}</TableCell>
                    <TableCell>{load.amount}</TableCell>
                    <TableCell>{load.requestedOn}</TableCell>
                    <TableCell>{load.frequency}</TableCell>
                  </TableRow>
                ))
              ) : hasSearched ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">No results found.</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
