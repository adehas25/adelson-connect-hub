-- Fix Instagram URL
UPDATE user_social_links SET url = 'https://www.instagram.com/adelson.declarafacil' WHERE id = '44819bf6-1286-4576-80f8-97096620e747';

-- Add Biliologia link
INSERT INTO user_social_links (user_profile_id, name, url, icon, gradient, display_order, is_active)
VALUES ('d7f02fad-7534-42f3-ad60-68105cd22389', 'Biliologia', 'https://1drv.ms/f/c/d7f729cbda9c8f34/IgDLRfiqvFUuQqaU-V9IrlSAAZUonVELTo8I3WlwFpKpBWg', 'fas fa-book-bible', 'linear-gradient(135deg, #8B5CF6, #6D28D9)', 7, true);