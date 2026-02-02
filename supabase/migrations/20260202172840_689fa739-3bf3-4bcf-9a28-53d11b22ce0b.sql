-- Atualiza a foto de perfil
UPDATE site_settings 
SET profile_image_url = '/images/profile-photo.png', updated_at = now()
WHERE id = '4adbfc07-37d3-4ba2-bce1-9631edbfb7e7';

-- Remove GitHub, Portfólio e LinkedIn
DELETE FROM social_links WHERE name IN ('GitHub', 'Portfólio', 'LinkedIn');