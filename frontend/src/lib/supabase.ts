import { createClient } from '@supabase/supabase-js';

// Default values from your Supabase project (these are public keys, safe to hardcode)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pwzjfrwpwksgtpxuooqd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3empmcndwd2tzZ3RweHVvb3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzUxNTksImV4cCI6MjA3NjExMTE1OX0.T2Hgz7LVFO-a1Q_TNkUiFg5dJTRPFTnvuySL6gTF4Zs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
