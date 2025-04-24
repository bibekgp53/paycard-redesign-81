
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
    // First update the card status to 'active'
    const { error: cardUpdateError } = await supabase
      .from('cards')
      .update({ 
        status: 'active',
        cardholder_name: `${formData.firstName} ${formData.surname}`
      })
      .eq('id', cardId);
      
    if (cardUpdateError) throw cardUpdateError;
    
    // Then insert the allocation record with public RLS
    const { error } = await supabase
      .from('card_allocations')
      .insert({
        card_id: cardId,
        first_name: formData.firstName,
        surname: formData.surname,
        id_number: formData.idNumber,
        cellphone: formData.cellphone,
        reference: formData.reference,
        allocated_by: (await supabase.auth.getUser()).data.user?.id,
        status: 'allocated'
      });

    if (error) throw error;
    
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
