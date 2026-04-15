/* =============================================
   ABAIS Supabase Client
   ============================================= */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xckcepsallcbruluoovx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja2NlcHNhbGxjYnJ1bHVvb3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1OTc5MjQsImV4cCI6MjA5MTE3MzkyNH0.tx5r53L9PQsaxl23_kdvun3WnxfhzmQtNScv-S_GBdE';

let supabase;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (e) {
  console.warn('Supabase init warning:', e);
  supabase = null;
}

export { supabase, SUPABASE_URL };
export default supabase;
