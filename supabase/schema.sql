-- Supabase schema for links table
CREATE TABLE IF NOT EXISTS links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Allow public read access to links by slug (for redirection)
CREATE POLICY "Allow public read access" ON links
  FOR SELECT USING (true);

-- Allow public insert access to create new links
CREATE POLICY "Allow public insert access" ON links
  FOR INSERT WITH CHECK (true);
