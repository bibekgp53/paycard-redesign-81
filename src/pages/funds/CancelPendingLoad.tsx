import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
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
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DateRange } from "./components/DateRange";
import useAuthentication from "@/hooks/useAuthentication.tsx";

export default function CancelPendingLoad() {
  const pagePermission = 'read:cancel-pending-loads';
  const { getTokenSilently, hasPermission } = useAuthentication('payportal');
  useEffect(() => {
    getTokenSilently();
  }, []);
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

  // Extended mock data for demonstration with 10+ rows
  const mockPendingLoads = [
    { cardNumber: "53*****0772", amount: "R 50.00", requestedOn: "2025-04-15 03:24:29", frequency: "Once" },
    { cardNumber: "53*****0772", amount: "R 56.00", requestedOn: "2025-01-22 11:14:22", frequency: "Once" },
    { cardNumber: "53*****0772", amount: "R 50.00", requestedOn: "2025-01-15 09:05:35", frequency: "Once" },
    { cardNumber: "53*****4479", amount: "R 50.00", requestedOn: "2025-01-15 09:05:30", frequency: "Once" },
    { cardNumber: "53*****1283", amount: "R 75.00", requestedOn: "2025-04-30 14:28:12", frequency: "Weekly" },
    { cardNumber: "53*****9821", amount: "R 100.00", requestedOn: "2025-04-28 09:17:45", frequency: "Monthly" },
    { cardNumber: "53*****6547", amount: "R 200.00", requestedOn: "2025-04-27 16:42:19", frequency: "Once" },
    { cardNumber: "53*****3390", amount: "R 45.00", requestedOn: "2025-04-25 10:33:08", frequency: "Monthly" },
    { cardNumber: "53*****5102", amount: "R 150.00", requestedOn: "2025-04-24 15:51:36", frequency: "Once" },
    { cardNumber: "53*****8274", amount: "R 65.00", requestedOn: "2025-04-23 11:09:22", frequency: "Weekly" },
    { cardNumber: "53*****1947", amount: "R 90.00", requestedOn: "2025-04-22 08:47:15", frequency: "Once" },
    { cardNumber: "53*****7623", amount: "R 120.00", requestedOn: "2025-04-21 13:22:40", frequency: "Monthly" },
    { cardNumber: "53*****4091", amount: "R 85.00", requestedOn: "2025-04-20 17:15:53", frequency: "Once" },
    { cardNumber: "53*****6358", amount: "R 30.00", requestedOn: "2025-04-19 12:38:27", frequency: "Weekly" }
  ];

  const [results, setResults] = useState(mockPendingLoads);
  const [hasSearched, setHasSearched] = useState(false);
  const [allLoads, setAllLoads] = useState(mockPendingLoads);

  useEffect(() => {
    // Initialize the results with all loads
    setResults(mockPendingLoads);
    setAllLoads(mockPendingLoads);
  }, []);

  const handleSearch = () => {
    setHasSearched(true);

    let filteredResults = [...allLoads];

    // Filter by search query if provided
    if (searchQuery.trim() !== "") {
      filteredResults = filteredResults.filter(load =>
        load.cardNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date range if provided
    if (dateRange.from || dateRange.to) {
      filteredResults = filteredResults.filter(load => {
        const loadDate = new Date(load.requestedOn);

        // Check if the load date is within the selected range
        const isAfterStartDate = dateRange.from ? loadDate >= dateRange.from : true;
        const isBeforeEndDate = dateRange.to ? loadDate <= dateRange.to : true;

        return isAfterStartDate && isBeforeEndDate;
      });
    }

    setResults(filteredResults);

    // Show a toast message with the number of results found
    if (filteredResults.length === 0) {
      toast.info("No pending loads found matching your search criteria.");
    } else {
      toast.success(`Found ${filteredResults.length} pending load(s).`);
    }
  };

  const handleDateRangeChange = (newDateRange: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    console.log("Date range changed:", newDateRange);
    setDateRange(newDateRange);
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
    // Also remove it from allLoads to keep the data consistent
    setAllLoads(allLoads.filter(load => load !== selectedLoad));
    setConfirmDialogOpen(false);
  };

  const searchTypeOptions = [
    { value: "cardNumber", label: "Card Number" },
    { value: "cardHolder", label: "Card Holder" },
    { value: "referenceNumber", label: "Reference Number" }
  ];

  return hasPermission(pagePermission) ? (
    <div>
      {/* Page title and subtitle positioned at the start of the card */}
      <Card className="p-8 max-w-4xl mx-auto shadow-md rounded-xl bg-white border-paycard-navy-150">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-paycard-navy">Cancel Pending Load</h1>
          <p className="text-gray-600 mt-2">
            Search for pending loads to cancel.
          </p>
        </div>

        {/* Search section - all elements in one line */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {/* Search field with icon */}
            <div className="relative flex-1">
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

            {/* Search by dropdown */}
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

            {/* Date range filter */}
            <div className="flex-1">
              <div className="text-sm font-medium mb-2">FILTER BY DATE RANGE</div>
              <DateRange
                dateRange={dateRange}
                onDateRangeChange={handleDateRangeChange}
              />
            </div>

            {/* Search button */}
            <div className="pt-8">
              <Button
                onClick={handleSearch}
                className="bg-paycard-navy hover:bg-paycard-navy-800 text-white font-medium shadow-sm transition-all duration-200 ease-in-out"
              >
                <Search className="h-4 w-4 mr-2" />
                SEARCH
              </Button>
            </div>
          </div>
        </div>

        {/* Results table with styling matching CardLoads */}
        <div className="bg-white rounded-lg overflow-hidden">
          <Table borderless>
            <TableHeader>
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
  ) : (
    <span>No Permission</span>
  );
}
