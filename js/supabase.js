/* =============================================
   ABAIS Supabase Client
   ============================================= */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ftyajgzvzccxfdzulvot.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0eWFqZ3p2emNjeGZkenVsdm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5OTcxNjcsImV4cCI6MjA5MTU3MzE2N30.3kGYr-6IWZXsEsBb5jKeWkZ97jpkmUeN7zQf04a9KAc';

let supabase;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (e) {
  console.warn('Supabase init warning:', e);
  supabase = null;
}

export { supabase, SUPABASE_URL };
export default supabase;
