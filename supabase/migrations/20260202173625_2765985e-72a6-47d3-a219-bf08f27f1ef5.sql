-- Adiciona coluna de tema nas configurações do site
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS theme TEXT NOT NULL DEFAULT 'galaxy';