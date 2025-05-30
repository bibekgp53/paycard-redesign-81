export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_cards: {
        Row: {
          account_card_id: number
          account_card_mtd: number
          account_from: boolean | null
          balance: number
          card_number: string
          cardholder: string
          created_at: string
          expiry_date: string | null
          fica_validation: string
          id: string
          id_passport_number: string | null
          reference_number: string | null
          transfer_from_account_id: number | null
          updated_at: string
        }
        Insert: {
          account_card_id: number
          account_card_mtd: number
          account_from?: boolean | null
          balance: number
          card_number: string
          cardholder: string
          created_at?: string
          expiry_date?: string | null
          fica_validation: string
          id?: string
          id_passport_number?: string | null
          reference_number?: string | null
          transfer_from_account_id?: number | null
          updated_at?: string
        }
        Update: {
          account_card_id?: number
          account_card_mtd?: number
          account_from?: boolean | null
          balance?: number
          card_number?: string
          cardholder?: string
          created_at?: string
          expiry_date?: string | null
          fica_validation?: string
          id?: string
          id_passport_number?: string | null
          reference_number?: string | null
          transfer_from_account_id?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      card_allocations: {
        Row: {
          allocated_by: string | null
          card_id: string
          cellphone: string
          created_at: string | null
          first_name: string
          id: string
          id_number: string
          reference: string | null
          status: Database["public"]["Enums"]["allocation_status"] | null
          surname: string
          updated_at: string | null
        }
        Insert: {
          allocated_by?: string | null
          card_id: string
          cellphone: string
          created_at?: string | null
          first_name: string
          id?: string
          id_number: string
          reference?: string | null
          status?: Database["public"]["Enums"]["allocation_status"] | null
          surname: string
          updated_at?: string | null
        }
        Update: {
          allocated_by?: string | null
          card_id?: string
          cellphone?: string
          created_at?: string | null
          first_name?: string
          id?: string
          id_number?: string
          reference?: string | null
          status?: Database["public"]["Enums"]["allocation_status"] | null
          surname?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_allocations_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_links: {
        Row: {
          card_id: string
          created_at: string
          id: string
          invoice_number: string | null
          processed_by: string | null
          profile_number: string
          updated_at: string
        }
        Insert: {
          card_id: string
          created_at?: string
          id?: string
          invoice_number?: string | null
          processed_by?: string | null
          profile_number: string
          updated_at?: string
        }
        Update: {
          card_id?: string
          created_at?: string
          id?: string
          invoice_number?: string | null
          processed_by?: string | null
          profile_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_links_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_requests: {
        Row: {
          created_at: string
          delivery_address: string
          delivery_method: string
          employee_id: string
          id: string
          number_of_cards: number
          processed_by: string | null
          recipient_name: string
          status: string | null
          total_cost: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivery_address: string
          delivery_method: string
          employee_id: string
          id?: string
          number_of_cards: number
          processed_by?: string | null
          recipient_name: string
          status?: string | null
          total_cost: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivery_address?: string
          delivery_method?: string
          employee_id?: string
          id?: string
          number_of_cards?: number
          processed_by?: string | null
          recipient_name?: string
          status?: string | null
          total_cost?: number
          updated_at?: string
        }
        Relationships: []
      }
      cards: {
        Row: {
          card_number: string
          cardholder_name: string | null
          created_at: string
          id: string
          processed_by: string | null
          sequence_number: string | null
          status: Database["public"]["Enums"]["card_status"]
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          card_number: string
          cardholder_name?: string | null
          created_at?: string
          id?: string
          processed_by?: string | null
          sequence_number?: string | null
          status?: Database["public"]["Enums"]["card_status"]
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          card_number?: string
          cardholder_name?: string | null
          created_at?: string
          id?: string
          processed_by?: string | null
          sequence_number?: string | null
          status?: Database["public"]["Enums"]["card_status"]
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      client_settings: {
        Row: {
          client_allows_sms_notifications: boolean | null
          client_max_balance: number
          client_maximum_mtd: number | null
          client_merchant_number: string | null
          client_merchant_transfers: string | null
          client_min_card_load: number
          client_previous_transfers: number | null
          client_sms_cost: number
          client_terminal_id: string | null
          client_transfer_fee: number
          created_at: string
          effective_date: string | null
          effective_stop_date: string | null
          id: string
          transfer_uuid: string | null
          updated_at: string
        }
        Insert: {
          client_allows_sms_notifications?: boolean | null
          client_max_balance: number
          client_maximum_mtd?: number | null
          client_merchant_number?: string | null
          client_merchant_transfers?: string | null
          client_min_card_load: number
          client_previous_transfers?: number | null
          client_sms_cost?: number
          client_terminal_id?: string | null
          client_transfer_fee: number
          created_at?: string
          effective_date?: string | null
          effective_stop_date?: string | null
          id?: string
          transfer_uuid?: string | null
          updated_at?: string
        }
        Update: {
          client_allows_sms_notifications?: boolean | null
          client_max_balance?: number
          client_maximum_mtd?: number | null
          client_merchant_number?: string | null
          client_merchant_transfers?: string | null
          client_min_card_load?: number
          client_previous_transfers?: number | null
          client_sms_cost?: number
          client_terminal_id?: string | null
          client_transfer_fee?: number
          created_at?: string
          effective_date?: string | null
          effective_stop_date?: string | null
          id?: string
          transfer_uuid?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      load_funds: {
        Row: {
          account_from: boolean
          cards: Json
          cards_to_load: number[]
          created_at: string
          end_date: string
          id: string
          process_delay: number
          process_type: number
          start_date: string
          transfer_from_account_id: number
          transfer_uuid: string
        }
        Insert: {
          account_from: boolean
          cards: Json
          cards_to_load: number[]
          created_at?: string
          end_date: string
          id?: string
          process_delay: number
          process_type: number
          start_date: string
          transfer_from_account_id: number
          transfer_uuid: string
        }
        Update: {
          account_from?: boolean
          cards?: Json
          cards_to_load?: number[]
          created_at?: string
          end_date?: string
          id?: string
          process_delay?: number
          process_type?: number
          start_date?: string
          transfer_from_account_id?: number
          transfer_uuid?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          business_name: string | null
          created_at: string
          email: string | null
          from_account: string | null
          from_balance: number | null
          id: string
          name: string | null
          phone: string | null
          profile_number: string
          updated_at: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string
          email?: string | null
          from_account?: string | null
          from_balance?: number | null
          id?: string
          name?: string | null
          phone?: string | null
          profile_number: string
          updated_at?: string
        }
        Update: {
          business_name?: string | null
          created_at?: string
          email?: string | null
          from_account?: string | null
          from_balance?: number | null
          id?: string
          name?: string | null
          phone?: string | null
          profile_number?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_cards_from_request: {
        Args: { request_id: string; card_count: number }
        Returns: string[]
      }
      get_available_cards: {
        Args:
          | Record<PropertyKey, never>
          | { search_term?: string; page_number?: number; page_size?: number }
        Returns: {
          id: string
          card_number: string
          sequence_number: string
          tracking_number: string
          status: string
          cardholder_name: string
          total_count: number
        }[]
      }
      get_load_client: {
        Args: { account_from: boolean; transfer_from_account_id: number }
        Returns: Json
      }
      get_user_header: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      insert_card_requests: {
        Args: { objects: Json }
        Returns: {
          id: string
          number_of_cards: number
          recipient_name: string
          status: string
          created_at: string
        }[]
      }
      mask_card_number: {
        Args: { card_number: string }
        Returns: string
      }
      search_load_allocated: {
        Args: {
          p_account_from: boolean
          p_transfer_from_account_id: number
          p_cards_to_load: number[]
          p_limit: number
          p_offset: number
        }
        Returns: {
          id: string
          account_card_id: number
          account_card_mtd: string
          balance: number
          cardholder: string
          cardnumber: string
          fica_validation: string
          created_at: string
          updated_at: string
        }[]
      }
      search_load_to: {
        Args: {
          p_search_field: string
          p_search_string: string
          p_order_by_field: string
          p_offset: number
          p_limit: number
        }
        Returns: Json
      }
    }
    Enums: {
      allocation_status: "pending" | "allocated" | "cancelled"
      card_status: "inactive" | "active" | "suspended" | "linked"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      allocation_status: ["pending", "allocated", "cancelled"],
      card_status: ["inactive", "active", "suspended", "linked"],
    },
  },
} as const
