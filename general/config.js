const supabaseUrl = "https://wpxgbpauxlvdfgpcinjr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndweGdicGF1eGx2ZGZncGNpbmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzMDAyNTIsImV4cCI6MjAzODg3NjI1Mn0.s77-L3DW9CMA1HyUSPJ7HJpt_J1F2qScEFbWwtRr76c";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm";
 export const supabase = createClient(supabaseUrl, supabaseKey);
