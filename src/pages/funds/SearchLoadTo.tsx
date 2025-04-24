import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { SearchField, useSearchLoadTo } from "@/hooks/useSearchLoadTo";
import { useLoadAllocatedCards } from "@/hooks/useLoadAllocatedCards";
import { CardsPagination } from "./components/CardsPagination";
import { FundsPageHeader } from "./components/FundsPageHeader";
import { SearchCardForm } from "./components/SearchCardForm";
import { SearchResultsTable } from "./components/SearchResultsTable";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useQueryClient } from "@tanstack/react-query";

export default function SearchLoadTo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { results, metadata, loading, error, searchCards } = useSearchLoadTo();
  const [searchField, setSearchField] = useState<SearchField>('cardNumber');
  const [searchString, setSearchString] = useState('');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [processingContinue, setProcessingContinue] = useState(false);
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

  const accountFrom = searchParams.get('accountFrom') === 'true';
  const { data: allocatedCards } = useLoadAllocatedCards({ 
    accountFrom,
    cardsToLoad: selectedCards
  });

  const handleContinue = async () => {
    if (selectedCards.length === 1) {
      try {
        setProcessingContinue(true);
        // Get the selected card's account_card_id
        const selectedCard = results.find(card => card.account_card_id === selectedCards[0]);
        
        if (selectedCard) {
          // Invalidate the loadAllocatedCards query to force a refetch with new parameters
          await queryClient.invalidateQueries({ queryKey: ["loadAllocatedCards"] });
          
          // Navigate to the card loads page
          navigate("/load-funds-from/card-loads?accountFrom=false");
        }
      } catch (err) {
        console.error("Error in continue process:", err);
      } finally {
        setProcessingContinue(false);
      }
    }
  };

  const breadcrumbItems = [
    { label: "Load Funds From", path: "/load-funds-from" },
    { label: "To", path: "/load-funds-from/to" },
    { label: "Search Card", isCurrentPage: true }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <FundsPageHeader />

      <Card className="mb-8 p-6">
        <h2 className="text-xl font-semibold text-paycard-navy mb-6">Search Card</h2>
        
        <SearchCardForm
          searchField={searchField}
          searchString={searchString}
          onSearchFieldChange={setSearchField}
          onSearchStringChange={setSearchString}
          onSearch={handleSearch}
        />

        {metadata && (
          <div className="text-sm text-gray-600 mb-4">
            <p>Showing {metadata.filtered_count} results</p>
          </div>
        )}

        <SearchResultsTable
          results={results}
          selectedCards={selectedCards}
          onToggleCard={toggleCardSelection}
          onSelectAll={handleSelectAll}
        />

        {metadata && metadata.filtered_count > pageSize && (
          <div className="mt-6">
            <CardsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handleLoadFundsClick}
          >
            Back
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={selectedCards.length !== 1 || processingContinue}
          >
            {processingContinue ? 'Processing...' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
