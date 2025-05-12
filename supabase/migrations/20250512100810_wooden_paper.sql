/*
  # Seed initial phones data

  1. Data Population
    - Insert sample phones
    - Insert color options for each phone
    - Insert capacity options for each phone

  2. Notes
    - Uses DO block for transaction-like behavior
    - References existing phones via device name for color and capacity associations
*/

DO $$
DECLARE
  iphone_id uuid;
  galaxy_id uuid;
  pixel_id uuid;
BEGIN
  -- Insert iPhone
  INSERT INTO phones (device_name, brand, monthly_price, is_five_g, stock)
  VALUES ('iPhone 16 Pro', 'Apple', 37, true, 3)
  RETURNING id INTO iphone_id;

  -- Insert iPhone colors
  INSERT INTO phone_colors (phone_id, name, hex, image_url) VALUES
    (iphone_id, 'Desert Titanium', 'BFA48F', '/images/iphone-16-pro-desert.png'),
    (iphone_id, 'Black Titanium', '3C3C3D', '/images/iphone-16-pro-black.png'),
    (iphone_id, 'Natural Titanium', 'C2BCB2', '/images/iphone-16-pro-natural.png'),
    (iphone_id, 'White Titanium', 'F2F1ED', '/images/iphone-16-pro-white.png'),
    (iphone_id, 'Blue Titanium', '394E6E', '/images/iphone-16-pro-blue.png'),
    (iphone_id, 'Rose Gold', 'E6C7C2', '/images/iphone-16-pro-rose.png');

  -- Insert iPhone capacities
  INSERT INTO phone_capacities (phone_id, size, price) VALUES
    (iphone_id, '128GB', 904),
    (iphone_id, '256GB', 1004),
    (iphone_id, '512GB', 1258),
    (iphone_id, '1TB', 1460);

  -- Insert Galaxy S25
  INSERT INTO phones (device_name, brand, monthly_price, is_five_g, stock)
  VALUES ('Galaxy S25', 'Samsung', 33, true, 50)
  RETURNING id INTO galaxy_id;

  -- Insert Galaxy colors
  INSERT INTO phone_colors (phone_id, name, hex, image_url) VALUES
    (galaxy_id, 'Icyblue', 'C8D3DF', '/images/galaxy-s25-icyblue.png'),
    (galaxy_id, 'Mint', 'D3E8DD', '/images/galaxy-s25-mint.png'),
    (galaxy_id, 'Navy', '3C5BBA', '/images/galaxy-s25-navy.png'),
    (galaxy_id, 'Silver Shadow', '7F7F7E', '/images/galaxy-s25-silver.png'),
    (galaxy_id, 'Phantom Black', '1A1A1A', '/images/galaxy-s25-black.png'),
    (galaxy_id, 'Cream', 'F5E6D3', '/images/galaxy-s25-cream.png'),
    (galaxy_id, 'Lavender', 'E6E6FA', '/images/galaxy-s25-lavender.png'),
    (galaxy_id, 'Graphite', '414A4C', '/images/galaxy-s25-graphite.png');

  -- Insert Galaxy capacities
  INSERT INTO phone_capacities (phone_id, size, price) VALUES
    (galaxy_id, '128GB', 904),
    (galaxy_id, '256GB', 1004),
    (galaxy_id, '512GB', 1258),
    (galaxy_id, '1TB', 1460);

  -- Insert Pixel
  INSERT INTO phones (device_name, brand, monthly_price, is_five_g, stock)
  VALUES ('Pixel 9 Pro XL', 'Google', 30, true, 0)
  RETURNING id INTO pixel_id;

  -- Insert Pixel colors
  INSERT INTO phone_colors (phone_id, name, hex, image_url) VALUES
    (pixel_id, 'Obsidian', '2D2D2D', '/images/pixel-9-pro-xl-obsidian.png'),
    (pixel_id, 'Porcelain', 'EFEAE2', '/images/pixel-9-pro-xl-porcelain.png'),
    (pixel_id, 'Hazel', '878B87', '/images/pixel-9-pro-xl-hazel.png'),
    (pixel_id, 'Rose Quartz', 'F6D6E2', '/images/pixel-9-pro-xl-rose.png'),
    (pixel_id, 'Sky Blue', '87CEEB', '/images/pixel-9-pro-xl-sky.png'),
    (pixel_id, 'Coral', 'FF7F50', '/images/pixel-9-pro-xl-coral.png'),
    (pixel_id, 'Sage', '9CAF88', '/images/pixel-9-pro-xl-sage.png');

  -- Insert Pixel capacities
  INSERT INTO phone_capacities (phone_id, size, price) VALUES
    (pixel_id, '128GB', 904),
    (pixel_id, '256GB', 1004),
    (pixel_id, '512GB', 1258),
    (pixel_id, '1TB', 1460);
END $$;