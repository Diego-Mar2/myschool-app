import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uxzdahbqkjhssahqezrz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4emRhaGJxa2poc3NhaHFlenJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5OTg1OTgsImV4cCI6MjAxNzU3NDU5OH0.E7OBI1FGg6ha2sF44INai1EVvsjMTe0JNWKcawj9OWk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
