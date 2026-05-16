export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          message: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          message: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      hire_requests: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          hear_about_us: string | null
          home_address: string | null
          id: string
          live_preference: string | null
          number_of_staff: number | null
          phone: string
          preferred_start_date: string | null
          requirements: string | null
          staff_type: string | null
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          hear_about_us?: string | null
          home_address?: string | null
          id?: string
          live_preference?: string | null
          number_of_staff?: number | null
          phone: string
          preferred_start_date?: string | null
          requirements?: string | null
          staff_type?: string | null
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          hear_about_us?: string | null
          home_address?: string | null
          id?: string
          live_preference?: string | null
          number_of_staff?: number | null
          phone?: string
          preferred_start_date?: string | null
          requirements?: string | null
          staff_type?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          age: number | null
          certifications: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string
          gender: string | null
          home_address: string | null
          id: string
          id_url: string | null
          job_category: string | null
          personal_statement: string | null
          phone: string
          photo_url: string | null
          state_of_origin: string | null
          work_history: string | null
          years_experience: number | null
        }
        Insert: {
          age?: number | null
          certifications?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          gender?: string | null
          home_address?: string | null
          id?: string
          id_url?: string | null
          job_category?: string | null
          personal_statement?: string | null
          phone: string
          photo_url?: string | null
          state_of_origin?: string | null
          work_history?: string | null
          years_experience?: number | null
        }
        Update: {
          age?: number | null
          certifications?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          gender?: string | null
          home_address?: string | null
          id?: string
          id_url?: string | null
          job_category?: string | null
          personal_statement?: string | null
          phone?: string
          photo_url?: string | null
          state_of_origin?: string | null
          work_history?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      staff_profiles: {
        Row: {
          age: number | null
          available: boolean
          bio: string | null
          created_at: string
          display_order: number
          duration_with_company: string | null
          full_name: string
          gender: string | null
          id: string
          job_role: string
          photo_url: string | null
          skills: string | null
          state_of_origin: string | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          age?: number | null
          available?: boolean
          bio?: string | null
          created_at?: string
          display_order?: number
          duration_with_company?: string | null
          full_name: string
          gender?: string | null
          id?: string
          job_role: string
          photo_url?: string | null
          skills?: string | null
          state_of_origin?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          age?: number | null
          available?: boolean
          bio?: string | null
          created_at?: string
          display_order?: number
          duration_with_company?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          job_role?: string
          photo_url?: string | null
          skills?: string | null
          state_of_origin?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
