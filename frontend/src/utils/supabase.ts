export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      sp_songs: {
        Row: {
          beginnerDifficulty: number | null;
          challengeDifficulty: number | null;
          created_at: string | null;
          heavyDifficulty: number | null;
          id: number;
          lightDifficulty: number | null;
          name: string | null;
          standardDifficulty: number | null;
        };
        Insert: {
          beginnerDifficulty?: number | null;
          challengeDifficulty?: number | null;
          created_at?: string | null;
          heavyDifficulty?: number | null;
          id?: number;
          lightDifficulty?: number | null;
          name?: string | null;
          standardDifficulty?: number | null;
        };
        Update: {
          beginnerDifficulty?: number | null;
          challengeDifficulty?: number | null;
          created_at?: string | null;
          heavyDifficulty?: number | null;
          id?: number;
          lightDifficulty?: number | null;
          name?: string | null;
          standardDifficulty?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
