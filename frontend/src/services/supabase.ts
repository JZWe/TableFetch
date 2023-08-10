import { createClient } from '@supabase/supabase-js';
import { Database } from '../utils/supabase';

export const supabaseUrl = 'https://ppkpjtaakehzkmcmoipt.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
