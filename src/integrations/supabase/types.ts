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
          balance: number
          card_number: string
          cardholder: string
          created_at: string
          fica_validation: string
          id: string
          updated_at: string
        }
        Insert: {
          account_card_id: number
          account_card_mtd: number
          balance: number
          card_number: string
          cardholder: string
          created_at?: string
          fica_validation: string
          id?: string
          updated_at?: string
        }
        Update: {
          account_card_id?: number
          account_card_mtd?: number
          balance?: number
          card_number?: string
          cardholder?: string
          created_at?: string
          fica_validation?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      cards: {
        Row: {
          card_number: string
          created_at: string
          id: string
          invoice_number: string | null
          processed_by: string | null
          profile_number: string | null
          sequence_number: string | null
          status: Database["public"]["Enums"]["card_status"]
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          card_number: string
          created_at?: string
          id?: string
          invoice_number?: string | null
          processed_by?: string | null
          profile_number?: string | null
          sequence_number?: string | null
          status?: Database["public"]["Enums"]["card_status"]
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          card_number?: string
          created_at?: string
          id?: string
          invoice_number?: string | null
          processed_by?: string | null
          profile_number?: string | null
          sequence_number?: string | null
          status?: Database["public"]["Enums"]["card_status"]
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_profile_number_fkey"
            columns: ["profile_number"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_number"]
          },
        ]
      }
      client_settings: {
        Row: {
          client_max_balance: number
          client_min_card_load: number
          client_transfer_fee: number
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          client_max_balance: number
          client_min_card_load: number
          client_transfer_fee: number
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          client_max_balance?: number
          client_min_card_load?: number
          client_transfer_fee?: number
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          business_name: string | null
          created_at: string
          email: string | null
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
      get_load_client: {
        Args:
          | Record<PropertyKey, never>
          | { account_from?: boolean; transfer_from_account_id?: number }
        Returns: {
          id: string
          clientmincardload: number
          clientmaxbalance: number
          clienttransferfee: number
          createdat: string
          updatedat: string
        }[]
      }
      search_load_allocated: {
        Args: {
          account_from?: boolean
          transfer_from_account_id?: number
          limit?: number
          offset?: number
        }
        Returns: {
          id: string
          accountcardid: number
          accountcardmtd: number
          balance: number
          cardholder: string
          cardnumber: string
          ficavalidation: string
          createdat: string
          updatedat: string
        }[]
      }
    }
    Enums: {
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
      card_status: ["inactive", "active", "suspended", "linked"],
    },
  },
} as const
