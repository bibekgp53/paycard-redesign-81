
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
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-paycard-navy">Cancel pending load</h1>
        <p className="text-gray-600">
          Search for pending loads to cancel.
        </p>
      </div>

      <Card className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h3 className="text-sm uppercase text-gray-500 mb-2">SEARCH</h3>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Enter your search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button 
                variant="ghost" 
                className="absolute right-0 top-0 h-full aspect-square p-0" 
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-sm uppercase text-gray-500">SEARCH BY</h3>
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

        <div className="mb-6">
          <h3 className="text-lg font-medium text-paycard-navy mb-4">FILTER BY DATE</h3>
          <div className="flex space-x-4">
            <div className="flex-1">
              <p className="text-sm uppercase text-gray-500 mb-2">START DATE</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal pl-10 relative",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
            <div className="flex-1">
              <p className="text-sm uppercase text-gray-500 mb-2">END DATE</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal pl-10 relative",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
        
        <Button 
          onClick={handleSearch} 
          className="bg-paycard-navy hover:bg-paycard-navy-800 text-white w-[200px] mb-8"
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
                  <TableRow 
                    key={index}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(load)}
                  >
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

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl text-paycard-navy">Cancel Pending Load</DialogTitle>
            <DialogDescription className="py-2">
              Are you sure you want to cancel the following pending load?
            </DialogDescription>
          </DialogHeader>
          
          {selectedLoad && (
            <div className="py-4 space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Card Number:</span>
                <span>{selectedLoad.cardNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Amount:</span>
                <span>{selectedLoad.amount}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Requested On:</span>
                <span>{selectedLoad.requestedOn}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Frequency:</span>
                <span>{selectedLoad.frequency}</span>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setConfirmDialogOpen(false)}
              className="border-gray-300"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmCancel} 
              className="bg-paycard-navy hover:bg-paycard-navy-800"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
