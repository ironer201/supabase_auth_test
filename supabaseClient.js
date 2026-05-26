import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://"; // Replace
const supabaseAnonKey = 'U'; // Replace

export const supabase = createClient(SUPABASE_URL, supabaseAnonKey);



