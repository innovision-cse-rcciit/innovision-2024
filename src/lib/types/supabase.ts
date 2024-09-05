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
      defined_roles: {
        Row: {
          role: string
        }
        Insert: {
          role: string
        }
        Update: {
          role?: string
        }
        Relationships: []
      }
      event_categories: {
        Row: {
          id: string
          image: string | null
          title: string | null
        }
        Insert: {
          id?: string
          image?: string | null
          title?: string | null
        }
        Update: {
          id?: string
          image?: string | null
          title?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          banner_url: string | null
          description: string | null
          event_category_id: string | null
          event_mode: string | null
          event_name: string | null
          id: string
          is_open: boolean | null
          max_team_size: number | null
          min_team_size: number | null
          rules: string | null
          schedule: string | null
        }
        Insert: {
          banner_url?: string | null
          description?: string | null
          event_category_id?: string | null
          event_mode?: string | null
          event_name?: string | null
          id?: string
          is_open?: boolean | null
          max_team_size?: number | null
          min_team_size?: number | null
          rules?: string | null
          schedule?: string | null
        }
        Update: {
          banner_url?: string | null
          description?: string | null
          event_category_id?: string | null
          event_mode?: string | null
          event_name?: string | null
          id?: string
          is_open?: boolean | null
          max_team_size?: number | null
          min_team_size?: number | null
          rules?: string | null
          schedule?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_event_category_id_fkey"
            columns: ["event_category_id"]
            isOneToOne: false
            referencedRelation: "event_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          attendance: Json | null
          college_roll: string
          email: string
          event_id: string
          id: string
          name: string
          phone: string
          team_id: string
        }
        Insert: {
          attendance?: Json | null
          college_roll: string
          email: string
          event_id?: string
          id?: string
          name: string
          phone: string
          team_id?: string
        }
        Update: {
          attendance?: Json | null
          college_roll?: string
          email?: string
          event_id?: string
          id?: string
          name?: string
          phone?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participants_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id: string
          role: string
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "defined_roles"
            referencedColumns: ["role"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          team_lead_id: string
          team_name: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string
          id?: string
          team_lead_id?: string
          team_name?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          team_lead_id?: string
          team_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_team_lead_id_fkey"
            columns: ["team_lead_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          college_roll: string | null
          department: string | null
          email: string
          id: string
          name: string | null
          phone: string | null
          year: string | null
        }
        Insert: {
          college_roll?: string | null
          department?: string | null
          email: string
          id?: string
          name?: string | null
          phone?: string | null
          year?: string | null
        }
        Update: {
          college_roll?: string | null
          department?: string | null
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      winners: {
        Row: {
          event_id: string
          id: string
          position: string
          team_id: string
        }
        Insert: {
          event_id?: string
          id?: string
          position: string
          team_id?: string
        }
        Update: {
          event_id?: string
          id?: string
          position?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "winners_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "winners_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
