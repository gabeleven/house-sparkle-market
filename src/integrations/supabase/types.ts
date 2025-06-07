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
      chat_messages: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          image_url: string | null
          is_read: boolean | null
          message_content: string | null
          message_type: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          message_content?: string | null
          message_type?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          message_content?: string | null
          message_type?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cleaner_profiles: {
        Row: {
          brief_description: string | null
          business_name: string | null
          created_at: string | null
          id: string
          is_profile_complete: boolean | null
          latitude: number | null
          longitude: number | null
          profile_photo_url: string | null
          service_area_city: string | null
          service_area_postal_code: string | null
          service_radius_km: number | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          brief_description?: string | null
          business_name?: string | null
          created_at?: string | null
          id: string
          is_profile_complete?: boolean | null
          latitude?: number | null
          longitude?: number | null
          profile_photo_url?: string | null
          service_area_city?: string | null
          service_area_postal_code?: string | null
          service_radius_km?: number | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          brief_description?: string | null
          business_name?: string | null
          created_at?: string | null
          id?: string
          is_profile_complete?: boolean | null
          latitude?: number | null
          longitude?: number | null
          profile_photo_url?: string | null
          service_area_city?: string | null
          service_area_postal_code?: string | null
          service_radius_km?: number | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cleaner_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaner_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cleaner_services: {
        Row: {
          cleaner_id: string | null
          created_at: string | null
          id: string
          service_type: Database["public"]["Enums"]["service_type"]
        }
        Insert: {
          cleaner_id?: string | null
          created_at?: string | null
          id?: string
          service_type: Database["public"]["Enums"]["service_type"]
        }
        Update: {
          cleaner_id?: string | null
          created_at?: string | null
          id?: string
          service_type?: Database["public"]["Enums"]["service_type"]
        }
        Relationships: [
          {
            foreignKeyName: "cleaner_services_cleaner_id_fkey"
            columns: ["cleaner_id"]
            isOneToOne: false
            referencedRelation: "cleaner_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          cleaner_id: string
          created_at: string
          customer_id: string
          id: string
          last_message_at: string | null
          updated_at: string
        }
        Insert: {
          cleaner_id: string
          created_at?: string
          customer_id: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Update: {
          cleaner_id?: string
          created_at?: string
          customer_id?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_cleaner_id_fkey"
            columns: ["cleaner_id"]
            isOneToOne: false
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_cleaner_id_fkey"
            columns: ["cleaner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_profiles: {
        Row: {
          created_at: string | null
          id: string
          latitude: number | null
          location_permission_granted: boolean | null
          longitude: number | null
          postal_code_fallback: string | null
          preferred_contact_method:
            | Database["public"]["Enums"]["contact_method"]
            | null
          service_location_address: string | null
          service_location_postal_code: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          latitude?: number | null
          location_permission_granted?: boolean | null
          longitude?: number | null
          postal_code_fallback?: string | null
          preferred_contact_method?:
            | Database["public"]["Enums"]["contact_method"]
            | null
          service_location_address?: string | null
          service_location_postal_code?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          latitude?: number | null
          location_permission_granted?: boolean | null
          longitude?: number | null
          postal_code_fallback?: string | null
          preferred_contact_method?:
            | Database["public"]["Enums"]["contact_method"]
            | null
          service_location_address?: string | null
          service_location_postal_code?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      masked_communications: {
        Row: {
          cleaner_id: string
          created_at: string | null
          customer_id: string
          expires_at: string
          id: string
          is_active: boolean | null
          proxy_phone_number: string
          updated_at: string | null
        }
        Insert: {
          cleaner_id: string
          created_at?: string | null
          customer_id: string
          expires_at?: string
          id?: string
          is_active?: boolean | null
          proxy_phone_number: string
          updated_at?: string | null
        }
        Update: {
          cleaner_id?: string
          created_at?: string | null
          customer_id?: string
          expires_at?: string
          id?: string
          is_active?: boolean | null
          proxy_phone_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masked_communications_cleaner_id_fkey"
            columns: ["cleaner_id"]
            isOneToOne: false
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masked_communications_cleaner_id_fkey"
            columns: ["cleaner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masked_communications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masked_communications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_read: boolean | null
          masked_communication_id: string | null
          message_content: string | null
          proxy_number: string | null
          recipient_id: string | null
          sender_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          masked_communication_id?: string | null
          message_content?: string | null
          proxy_number?: string | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          masked_communication_id?: string | null
          message_content?: string | null
          proxy_number?: string | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_masked_communication_id_fkey"
            columns: ["masked_communication_id"]
            isOneToOne: false
            referencedRelation: "masked_communications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          brief_description: string | null
          business_name: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_email_verified: boolean | null
          latitude: number | null
          longitude: number | null
          phone_number: string | null
          profile_photo_url: string | null
          service_area_city: string | null
          service_radius_km: number | null
          updated_at: string | null
          user_role: Database["public"]["Enums"]["user_role"]
          years_experience: number | null
        }
        Insert: {
          brief_description?: string | null
          business_name?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          is_email_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone_number?: string | null
          profile_photo_url?: string | null
          service_area_city?: string | null
          service_radius_km?: number | null
          updated_at?: string | null
          user_role: Database["public"]["Enums"]["user_role"]
          years_experience?: number | null
        }
        Update: {
          brief_description?: string | null
          business_name?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_email_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone_number?: string | null
          profile_photo_url?: string | null
          service_area_city?: string | null
          service_radius_km?: number | null
          updated_at?: string | null
          user_role?: Database["public"]["Enums"]["user_role"]
          years_experience?: number | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          started_at: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          started_at?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          started_at?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_presence: {
        Row: {
          is_online: boolean | null
          last_seen: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          is_online?: boolean | null
          last_seen?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          is_online?: boolean | null
          last_seen?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_presence_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "cleaners_with_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_presence_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      cleaners_with_profiles: {
        Row: {
          brief_description: string | null
          business_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
          is_profile_complete: boolean | null
          latitude: number | null
          longitude: number | null
          phone_number: string | null
          profile_photo_url: string | null
          service_area_city: string | null
          service_area_postal_code: string | null
          service_radius_km: number | null
          services: Database["public"]["Enums"]["service_type"][] | null
          updated_at: string | null
          years_experience: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_distance: {
        Args: { lat1: number; lon1: number; lat2: number; lon2: number }
        Returns: number
      }
    }
    Enums: {
      contact_method: "email" | "phone" | "app_messaging"
      service_type:
        | "regular_cleaning"
        | "deep_cleaning"
        | "move_in_out"
        | "post_construction"
        | "commercial"
      subscription_plan: "starter" | "professional" | "premium" | "client_plus"
      user_role: "customer" | "cleaner"
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
      contact_method: ["email", "phone", "app_messaging"],
      service_type: [
        "regular_cleaning",
        "deep_cleaning",
        "move_in_out",
        "post_construction",
        "commercial",
      ],
      subscription_plan: ["starter", "professional", "premium", "client_plus"],
      user_role: ["customer", "cleaner"],
    },
  },
} as const
