export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      conversion_history: {
        Row: {
          created_at: string | null
          from_unit_id: string
          from_value: number
          id: string
          to_unit_id: string
          to_value: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          from_unit_id: string
          from_value: number
          id?: string
          to_unit_id: string
          to_value: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          from_unit_id?: string
          from_value?: number
          id?: string
          to_unit_id?: string
          to_value?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversion_history_from_unit_id_fkey"
            columns: ["from_unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversion_history_to_unit_id_fkey"
            columns: ["to_unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_jobs: {
        Row: {
          completed_at: string | null
          conversion_type: Database["public"]["Enums"]["conversion_type"]
          created_at: string | null
          error_message: string | null
          file_size_input: number | null
          file_size_output: number | null
          id: string
          input_data: Json | null
          input_file_url: string | null
          output_data: Json | null
          output_file_url: string | null
          processing_time_ms: number | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          conversion_type: Database["public"]["Enums"]["conversion_type"]
          created_at?: string | null
          error_message?: string | null
          file_size_input?: number | null
          file_size_output?: number | null
          id?: string
          input_data?: Json | null
          input_file_url?: string | null
          output_data?: Json | null
          output_file_url?: string | null
          processing_time_ms?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          conversion_type?: Database["public"]["Enums"]["conversion_type"]
          created_at?: string | null
          error_message?: string | null
          file_size_input?: number | null
          file_size_output?: number | null
          id?: string
          input_data?: Json | null
          input_file_url?: string | null
          output_data?: Json | null
          output_file_url?: string | null
          processing_time_ms?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      conversion_usage_stats: {
        Row: {
          conversion_type: Database["public"]["Enums"]["conversion_type"]
          count: number | null
          created_at: string | null
          date: string | null
          id: string
          total_input_size: number | null
          total_output_size: number | null
          total_processing_time_ms: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          conversion_type: Database["public"]["Enums"]["conversion_type"]
          count?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          total_input_size?: number | null
          total_output_size?: number | null
          total_processing_time_ms?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          conversion_type?: Database["public"]["Enums"]["conversion_type"]
          count?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          total_input_size?: number | null
          total_output_size?: number | null
          total_processing_time_ms?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      units: {
        Row: {
          base_factor: number
          category: Database["public"]["Enums"]["unit_category"]
          created_at: string | null
          id: string
          is_base_unit: boolean | null
          name: string
          symbol: string
          updated_at: string | null
        }
        Insert: {
          base_factor: number
          category: Database["public"]["Enums"]["unit_category"]
          created_at?: string | null
          id?: string
          is_base_unit?: boolean | null
          name: string
          symbol: string
          updated_at?: string | null
        }
        Update: {
          base_factor?: number
          category?: Database["public"]["Enums"]["unit_category"]
          created_at?: string | null
          id?: string
          is_base_unit?: boolean | null
          name?: string
          symbol?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_favorite_conversions: {
        Row: {
          created_at: string | null
          from_unit_id: string
          id: string
          to_unit_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          from_unit_id: string
          id?: string
          to_unit_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          from_unit_id?: string
          id?: string
          to_unit_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorite_conversions_from_unit_id_fkey"
            columns: ["from_unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorite_conversions_to_unit_id_fkey"
            columns: ["to_unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_conversions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      conversion_type:
        | "pdf_compress"
        | "pdf_merge"
        | "pdf_split"
        | "pdf_to_word"
        | "pdf_to_excel"
        | "pdf_to_powerpoint"
        | "pdf_to_image"
        | "word_to_pdf"
        | "excel_to_pdf"
        | "powerpoint_to_pdf"
        | "image_to_pdf"
        | "image_compress"
        | "image_resize"
        | "image_format"
        | "video_compress"
        | "audio_convert"
        | "text_case"
        | "text_count"
        | "base64_encode"
        | "url_encode"
        | "hash_generate"
        | "qr_generate"
        | "color_convert"
        | "unit_convert"
        | "currency_convert"
      unit_category:
        | "temperature"
        | "length"
        | "mass"
        | "time"
        | "volume"
        | "energy"
        | "power"
        | "speed"
        | "pressure"
        | "frequency"
        | "area"
        | "data"
        | "angle"
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
      conversion_type: [
        "pdf_compress",
        "pdf_merge",
        "pdf_split",
        "pdf_to_word",
        "pdf_to_excel",
        "pdf_to_powerpoint",
        "pdf_to_image",
        "word_to_pdf",
        "excel_to_pdf",
        "powerpoint_to_pdf",
        "image_to_pdf",
        "image_compress",
        "image_resize",
        "image_format",
        "video_compress",
        "audio_convert",
        "text_case",
        "text_count",
        "base64_encode",
        "url_encode",
        "hash_generate",
        "qr_generate",
        "color_convert",
        "unit_convert",
        "currency_convert",
      ],
      unit_category: [
        "temperature",
        "length",
        "mass",
        "time",
        "volume",
        "energy",
        "power",
        "speed",
        "pressure",
        "frequency",
        "area",
        "data",
        "angle",
      ],
    },
  },
} as const
