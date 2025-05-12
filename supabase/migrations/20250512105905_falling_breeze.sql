/*
  # Add basket items table

  1. New Tables
    - `basket_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `phone_id` (uuid, references phones)
      - `color_name` (text)
      - `capacity_size` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on basket_items table
    - Add policies for authenticated users to manage their own basket items
*/

CREATE TABLE IF NOT EXISTS basket_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  phone_id uuid REFERENCES phones NOT NULL,
  color_name text NOT NULL,
  capacity_size text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE basket_items ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own basket items
CREATE POLICY "Users can view own basket items"
  ON basket_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own basket items
CREATE POLICY "Users can add items to their basket"
  ON basket_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own basket items
CREATE POLICY "Users can remove items from their basket"
  ON basket_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);