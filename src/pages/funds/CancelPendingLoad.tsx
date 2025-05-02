
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
import { RadioGroup } from "@/components/ui/radio-group";
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

export default function CancelPendingLoad() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("cardNumber");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
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
    <div className="space-y-6">
      {/* Centered title and subtitle */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-2xl font-bold text-paycard-navy">Cancel pending load</h1>
        <p className="text-gray-600">
          Search for pending loads to cancel.
        </p>
      </div>

      {/* Main card with improved design */}
      <Card className="p-8 max-w-4xl mx-auto shadow-md rounded-xl bg-white border-paycard-navy-150">
        {/* Search section with improved alignment */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Search input */}
            <div>
              <h3 className="text-sm font-semibold uppercase text-paycard-navy-500 mb-3">SEARCH</h3>
              <div className="relative">
                <Input
                  placeholder="Enter your search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-paycard-navy-100/30 border-paycard-navy-200 focus:ring-paycard-navy-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-paycard-navy-400" size={16} />
              </div>
            </div>
            
            {/* Search by options */}
            <div>
              <h3 className="text-sm font-semibold uppercase text-paycard-navy-500 mb-3">SEARCH BY</h3>
              <RadioGroup 
                name="searchType"
                options={searchTypeOptions}
                value={searchType} 
                onChange={setSearchType}
                inline
              />
            </div>
          </div>
        </div>

        {/* Date filter section with modern design */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase text-paycard-navy-500 mb-3">FILTER BY DATE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start date */}
            <div>
              <p className="text-xs font-medium text-paycard-navy-400 mb-2">START DATE</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal pl-10 relative bg-paycard-navy-100/30 border-paycard-navy-200 hover:bg-paycard-navy-100/50",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-paycard-navy-400" size={16} />
                    {startDate ? format(startDate, "PP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* End date */}
            <div>
              <p className="text-xs font-medium text-paycard-navy-400 mb-2">END DATE</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal pl-10 relative bg-paycard-navy-100/30 border-paycard-navy-200 hover:bg-paycard-navy-100/50",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-paycard-navy-400" size={16} />
                    {endDate ? format(endDate, "PP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        {/* Search button with improved design */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={handleSearch} 
            className="bg-paycard-navy hover:bg-paycard-navy-800 text-white font-semibold px-8 py-2 shadow-sm transition-all duration-200 ease-in-out"
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
