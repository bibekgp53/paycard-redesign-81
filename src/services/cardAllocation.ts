
import { supabase } from "@/integrations/supabase/client";

export interface CardAllocationForm {
  firstName: string;
  surname: string;
  idNumber: string;
  cellphone: string;
  reference?: string;
}

export interface AvailableCard {
  id: string;
  card_number: string;
  sequence_number: string;
  tracking_number: string;
  status: string;
  cardholder_name?: string;
}

export async function allocateCard(cardId: string, formData: CardAllocationForm) {
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
