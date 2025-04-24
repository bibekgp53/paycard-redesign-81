
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { SearchField, useSearchLoadTo } from "@/hooks/useSearchLoadTo";
import { CardsPagination } from "./components/CardsPagination";
import { FundsPageHeader } from "./components/FundsPageHeader";
import { SearchCardForm } from "./components/SearchCardForm";
import { SearchResultsTable } from "./components/SearchResultsTable";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";

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

  const breadcrumbItems = [
    { label: "Load Funds From", path: "/load-funds-from" },
    { label: "To", path: "/load-funds-from/to" },
    { label: "Search Card", isCurrentPage: true }
  ];

  const handleContinue = async () => {
    if (selectedCards.length === 1) {
      // Get the selected card's account_card_id
      const selectedCard = results.find(card => card.account_card_id === selectedCards[0]);
      
      if (selectedCard) {
        // Call search_load_allocated with the selected card's account_card_id and cards to load
        const { data, error } = await supabase
          .rpc('search_load_allocated', {
            p_account_from: false,
            p_transfer_from_account_id: 0, // Default to 0 since we're using p_cards_to_load
            p_cards_to_load: [selectedCard.account_card_id],
            p_limit: 100,
            p_offset: 0
          });

        if (error) {
          console.error("Error loading allocated cards:", error);
          return;
        }

        // Navigate to the card loads page with the accountFrom parameter
        navigate("/load-funds-from/card-loads?accountFrom=false");
      }
    }
  };

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
            disabled={selectedCards.length !== 1}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
