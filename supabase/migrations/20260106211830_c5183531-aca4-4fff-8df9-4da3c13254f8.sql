-- Tabela de configurações do site (perfil principal)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_name TEXT NOT NULL DEFAULT 'Adelson Elias',
  profile_description TEXT DEFAULT 'Bem-vindo ao meu espaço profissional. Aqui você encontra todos os meus projetos e redes sociais.',
  profile_image_url TEXT DEFAULT 'https://live.staticflickr.com/65535/54752232034_59e044dcdc_n.jpg',
  footer_text TEXT DEFAULT '© 2025 Adelson Elias. Todos os direitos reservados.',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de links sociais
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  html_icon TEXT,
  gradient TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de roles de usuários
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública
CREATE POLICY "Anyone can read site settings" 
ON public.site_settings FOR SELECT 
USING (true);

CREATE POLICY "Anyone can read active social links" 
ON public.social_links FOR SELECT 
USING (is_active = true);

-- Políticas para usuários autenticados com roles
CREATE POLICY "Admins can manage site settings" 
ON public.site_settings FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Admins can read all social links" 
ON public.social_links FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Admins can manage social links" 
ON public.social_links FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Admins can read user roles" 
ON public.user_roles FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage user roles" 
ON public.user_roles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
BEFORE UPDATE ON public.social_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir configurações padrão
INSERT INTO public.site_settings (profile_name, profile_description, profile_image_url)
VALUES ('Adelson Elias', 'Bem-vindo ao meu espaço profissional. Aqui você encontra todos os meus projetos e redes sociais.', 'https://live.staticflickr.com/65535/54752232034_59e044dcdc_n.jpg');

-- Inserir links sociais existentes
INSERT INTO public.social_links (name, url, icon, gradient, display_order) VALUES
('WhatsApp', 'https://wa.me/5591988830533', 'fab fa-whatsapp', 'linear-gradient(135deg, #25D366, #128C7E)', 1),
('Instagram', 'https://instagram.com/adelson_elias', 'fab fa-instagram', 'linear-gradient(135deg, #E4405F, #833AB4)', 2),
('GitHub', 'https://github.com/AdelsonJ', 'fab fa-github', 'linear-gradient(135deg, #333333, #6e5494)', 3),
('YouTube', 'https://www.youtube.com/@adelsonelias8085', 'fab fa-youtube', 'linear-gradient(135deg, #FF0000, #CC0000)', 4),
('LinkedIn', 'https://linkedin.com/in/adelson-elias', 'fab fa-linkedin', 'linear-gradient(135deg, #0A66C2, #0077B5)', 5);

INSERT INTO public.social_links (name, url, html_icon, gradient, display_order) VALUES
('Retiro Ebenezer', 'https://retiroebenezer.lovable.app/', '<img src="/images/retiro-ebenezer-logo.png" alt="Logo Retiro Ebenezer" class="w-8 h-8 rounded-sm">', 'linear-gradient(135deg, #10B981, #047857)', 6);

INSERT INTO public.social_links (name, url, icon, gradient, display_order) VALUES
('Portfólio', 'https://adelsonj.github.io/', 'fas fa-briefcase', 'linear-gradient(135deg, #6366F1, #4F46E5)', 7),
('Email', 'mailto:adelsonelias234@gmail.com', 'fas fa-envelope', 'linear-gradient(135deg, #F59E0B, #D97706)', 8);

-- Criar buckets de storage
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('link-logos', 'link-logos', true);

-- Políticas de storage para avatars
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'avatars' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Authenticated users can update avatars" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'avatars' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Authenticated users can delete avatars" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'avatars' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

-- Políticas de storage para link-logos
CREATE POLICY "Link logos are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'link-logos');

CREATE POLICY "Authenticated users can upload link logos" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'link-logos' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Authenticated users can update link logos" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'link-logos' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Authenticated users can delete link logos" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'link-logos' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);