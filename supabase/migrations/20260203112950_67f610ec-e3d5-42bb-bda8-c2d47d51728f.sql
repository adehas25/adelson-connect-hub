-- Tabela de perfis de usuário com username único
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  profile_image_url TEXT,
  theme TEXT NOT NULL DEFAULT 'galaxy',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT username_format CHECK (username ~ '^[a-z0-9_-]{3,30}$')
);

-- Tabela de links sociais por usuário
CREATE TABLE public.user_social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_profile_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
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

-- Habilitar RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_social_links ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
CREATE POLICY "Perfis públicos são visíveis por todos"
ON public.user_profiles FOR SELECT
USING (true);

CREATE POLICY "Usuários podem criar próprio perfil"
ON public.user_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar próprio perfil"
ON public.user_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar próprio perfil"
ON public.user_profiles FOR DELETE
USING (auth.uid() = user_id);

-- Políticas para user_social_links
CREATE POLICY "Links ativos são públicos"
ON public.user_social_links FOR SELECT
USING (is_active = true);

CREATE POLICY "Donos podem ver todos seus links"
ON public.user_social_links FOR SELECT
USING (
  user_profile_id IN (
    SELECT id FROM public.user_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Donos podem gerenciar seus links"
ON public.user_social_links FOR ALL
USING (
  user_profile_id IN (
    SELECT id FROM public.user_profiles WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  user_profile_id IN (
    SELECT id FROM public.user_profiles WHERE user_id = auth.uid()
  )
);

-- Trigger para updated_at
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_social_links_updated_at
BEFORE UPDATE ON public.user_social_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX idx_user_social_links_profile_id ON public.user_social_links(user_profile_id);