
import { supabase } from "@/integrations/supabase/client";
import { CardAllocationFormData } from "@/lib/validations/card-allocation";

export type { CardAllocationFormData };

export interface AvailableCard {
  id: string;
  card_number: string;
  sequence_number: string;
  tracking_number: string;
  status: string;
  cardholder_name?: string;
}

export interface CardCounts {
  total: number;
  allocated: number;
  unallocated: number;
}

export async function allocateCard(cardId: string, formData: CardAllocationFormData) {
  try {
    console.log("Allocating card with ID:", cardId);
    console.log("Form data:", formData);
    
    if (!cardId) {
      throw new Error("Card ID is required for allocation");
    }
    
    // First update the card status to 'active'
    const { error: cardUpdateError } = await supabase
      .from('cards')
      .update({ 
        status: 'active',
        cardholder_name: `${formData.firstName} ${formData.surname}`
      })
      .eq('id', cardId);
      
    if (cardUpdateError) {
      console.error("Card update error:", cardUpdateError);
      throw cardUpdateError;
    }
    
    console.log("Card updated successfully, now creating allocation record");
    
    // Insert the allocation record with the new permissive policy
    const { error } = await supabase
      .from('card_allocations')
      .insert({
        card_id: cardId,
        first_name: formData.firstName,
        surname: formData.surname,
        id_number: formData.idNumber,
        cellphone: formData.cellphone,
        reference: formData.reference,
        status: 'allocated'
      });

    if (error) {
      console.error("Allocation record insertion error:", error);
      throw error;
    }
    
    // After successful allocation, invalidate the cache to force fresh counts on next fetch
    cardCountsCache.clear();
    
    console.log("Allocation completed successfully");
    return { success: true };
  } catch (error) {
    console.error("Allocation error details:", error);
    throw error;
  }
}

export async function searchAvailableCards(
  searchTerm?: string, 
  page: number = 1, 
  pageSize: number = 10
): Promise<AvailableCard[]> {
  console.log("Searching available cards with:", { searchTerm, page, pageSize });
  
  try {
    const { data, error } = await supabase
      .rpc('get_available_cards', {
        search_term: searchTerm || '',
        page_number: page,
        page_size: pageSize
      });

    if (error) {
      console.error("Error searching available cards:", error);
      throw error;
    }
    
    console.log("Available cards search result:", data);
    return data || [];
  } catch (error) {
    console.error("Failed to search available cards:", error);
    throw error;
  }
}

// Define a singleton pattern to cache card counts
const cardCountsCache = {
  data: null as CardCounts | null,
  timestamp: 0,
  TTL: 5000, // 5 seconds cache
  
  isValid() {
    return this.data !== null && (Date.now() - this.timestamp < this.TTL);
  },
  
  set(counts: CardCounts) {
    this.data = counts;
    this.timestamp = Date.now();
  },
  
  clear() {
    this.data = null;
  }
};

export async function getCardCounts(): Promise<CardCounts> {
  try {
    console.log("Fetching card counts from database");
    
    // Use cached value if valid
    if (cardCountsCache.isValid()) {
      console.log("Using cached card counts:", cardCountsCache.data);
      return cardCountsCache.data!;
    }
    
    // Query the database for total cards count
    const { count: totalCount, error: totalError } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true });
    
    if (totalError) {
      console.error("Error counting total cards:", totalError);
      throw totalError;
    }
    
    // Query the database for cards with 'active' status
    const { count: allocatedCount, error: allocatedError } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');
    
    if (allocatedError) {
      console.error("Error counting allocated cards:", allocatedError);
      throw allocatedError;
    }
    
    // Query the database for cards with 'inactive' status
    const { count: unallocatedCount, error: unallocatedError } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'inactive');
      
    if (unallocatedError) {
      console.error("Error counting unallocated cards:", unallocatedError);
      throw unallocatedError;
    }
    
    // Get the actual counts or default to 0 if null
    const total = totalCount || 0;
    const allocated = allocatedCount || 0;
    const unallocated = unallocatedCount || 0;
    
    console.log("Card counts calculated:", { total, allocated, unallocated });
    
    const counts = {
      total,
      allocated,
      unallocated
    };
    
    // Cache the results
    cardCountsCache.set(counts);
    
    return counts;
  } catch (error) {
    console.error("Error fetching card counts:", error);
    
    // If we have valid cached data, return that instead of default values
    if (cardCountsCache.isValid() && cardCountsCache.data) {
      console.log("Error occurred but returning cached counts:", cardCountsCache.data);
      return cardCountsCache.data;
    }
    
    throw error;
  }
}
