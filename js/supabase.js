/* =============================================
   ABAIS Supabase Client
   ============================================= */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ftyajgzvzccxfdzulvot.supabase.co';
const SUPABASE_KEY = 'sb_publishable_t0BrrACQAukimhfg5C6Lxw_iWdcKTPA';

let supabase;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (e) {
  console.warn('Supabase init warning:', e);
  supabase = null;
}

export { supabase, SUPABASE_URL };
export default supabase;
