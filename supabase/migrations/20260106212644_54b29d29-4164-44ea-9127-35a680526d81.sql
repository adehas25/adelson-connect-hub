-- Função que adiciona role de admin ao primeiro usuário
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- Verifica se não existe nenhum admin ainda
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger que executa após novo usuário ser criado
CREATE TRIGGER on_auth_user_created_admin
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_first_user_admin();