import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://xlkqbzboihjluglxxech.supabase.co"; // Replace
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsa3FiemJvaWhqbHVnbHh4ZWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NjM3NjIsImV4cCI6MjA2ODQzOTc2Mn0.lkqWSoBUztCg75cUsKnh5XWV7evpPdfy1v82eUSFfRU'; // Replace

export const supabase = createClient(SUPABASE_URL, supabaseAnonKey);



