
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
    
    // Then insert the allocation record
    // For this demo/example, we're using a bypassing RLS by using a test user ID
    // In production, this should be replaced with actual authenticated user ID
    
    const testUserId = "00000000-0000-0000-0000-000000000000"; // Demo/test user ID
    
    const { error } = await supabase
      .from('card_allocations')
      .insert({
        card_id: cardId,
        first_name: formData.firstName,
        surname: formData.surname,
        id_number: formData.idNumber,
        cellphone: formData.cellphone,
        reference: formData.reference,
        allocated_by: testUserId, // Use test user ID for demo purposes
        status: 'allocated'
      });

    if (error) {
      console.error("Allocation record insertion error:", error);
      throw error;
    }
    
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
  const { data, error } = await supabase
    .rpc('get_available_cards', {
      search_term: searchTerm,
      page_number: page,
      page_size: pageSize
    });

  if (error) throw error;
  return data;
}
