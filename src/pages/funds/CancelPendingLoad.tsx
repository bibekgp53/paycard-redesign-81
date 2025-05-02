
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search, X } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "sonner";
import { DateRange } from "./components/DateRange";

export default function CancelPendingLoad() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("cardNumber");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<any | null>(null);
  
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

  const handleRowClick = (load: any) => {
    setSelectedLoad(load);
    setConfirmDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    // In a real app, this would call an API to cancel the load
    toast.success(`Load of ${selectedLoad?.amount} for card ${selectedLoad?.cardNumber} has been cancelled.`);
    // Remove the cancelled load from the results
    setResults(results.filter(load => load !== selectedLoad));
    setConfirmDialogOpen(false);
  };
  
  const searchTypeOptions = [
    { value: "cardNumber", label: "Card Number" },
    { value: "cardHolder", label: "Card Holder" },
    { value: "referenceNumber", label: "Reference Number" }
  ];
  
  return (
    <div>
      {/* Page title and subtitle in center, matching design from image */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-paycard-navy text-center">Cancel Pending Load</h1>
        <p className="text-gray-600 text-center mt-2">
          Search for pending loads to cancel.
        </p>
      </div>

      {/* Main card with improved design */}
      <Card className="p-8 max-w-4xl mx-auto shadow-md rounded-xl bg-white border-paycard-navy-150">
        {/* Search section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-1">
                <div className="relative">
                  <div className="text-sm font-medium mb-2">SEARCH</div>
                  <div className="relative">
                    <Input
                      placeholder="Enter search query"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-paycard-navy-100/30 border-paycard-navy-200 focus:ring-paycard-navy-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-paycard-navy-400" size={16} />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">SEARCH BY</div>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-[180px] bg-paycard-navy-100/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {searchTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Date range filter - combined into a single component */}
        <div className="mb-8">
          <div className="text-sm font-medium mb-2">FILTER BY DATE RANGE</div>
          <DateRange dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>
        
        {/* Search button */}
        <div className="flex justify-end mb-8">
          <Button 
            onClick={handleSearch} 
            className="bg-paycard-navy hover:bg-paycard-navy-800 text-white font-medium shadow-sm transition-all duration-200 ease-in-out"
          >
            <Search className="h-4 w-4 mr-2" />
            SEARCH
          </Button>
        </div>

        {/* Results table with improved styling */}
        <div className="bg-white rounded-lg overflow-hidden border border-paycard-navy-150">
          <Table>
            <TableHeader className="bg-paycard-navy-100/40">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-paycard-navy-700 font-bold">CARD NUMBER</TableHead>
                <TableHead className="text-paycard-navy-700 font-bold">AMOUNT</TableHead>
                <TableHead className="text-paycard-navy-700 font-bold">REQUESTED ON</TableHead>
                <TableHead className="text-paycard-navy-700 font-bold">FREQUENCY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length > 0 ? (
                results.map((load, index) => (
                  <TableRow 
                    key={index}
                    className="cursor-pointer hover:bg-paycard-navy-100/30 transition-colors duration-150"
                    onClick={() => handleRowClick(load)}
                  >
                    <TableCell className="text-blue-600 font-medium">{load.cardNumber}</TableCell>
                    <TableCell>{load.amount}</TableCell>
                    <TableCell>{load.requestedOn}</TableCell>
                    <TableCell>{load.frequency}</TableCell>
                  </TableRow>
                ))
              ) : hasSearched ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-paycard-navy-400">No results found.</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Confirmation Dialog with modern design */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-paycard-navy">Cancel Pending Load</DialogTitle>
            <DialogDescription className="py-2 text-paycard-navy-500">
              Are you sure you want to cancel the following pending load?
            </DialogDescription>
          </DialogHeader>
          
          {selectedLoad && (
            <div className="py-4 space-y-3 bg-paycard-navy-100/30 rounded-lg p-4">
              <div className="flex justify-between border-b border-paycard-navy-200 pb-2">
                <span className="font-medium text-paycard-navy-700">Card Number:</span>
                <span className="text-blue-600 font-medium">{selectedLoad.cardNumber}</span>
              </div>
              <div className="flex justify-between border-b border-paycard-navy-200 pb-2">
                <span className="font-medium text-paycard-navy-700">Amount:</span>
                <span className="font-medium">{selectedLoad.amount}</span>
              </div>
              <div className="flex justify-between border-b border-paycard-navy-200 pb-2">
                <span className="font-medium text-paycard-navy-700">Requested On:</span>
                <span>{selectedLoad.requestedOn}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-paycard-navy-700">Frequency:</span>
                <span>{selectedLoad.frequency}</span>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={() => setConfirmDialogOpen(false)}
              className="border-paycard-navy-200 hover:bg-paycard-navy-100"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmCancel} 
              className="bg-paycard-navy hover:bg-paycard-navy-800 transition-colors"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
