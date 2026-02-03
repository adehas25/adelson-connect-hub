import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  description: string | null;
  profile_image_url: string | null;
  theme: string;
  created_at: string;
  updated_at: string;
}

export interface UserSocialLink {
  id: string;
  user_profile_id: string;
  name: string;
  url: string;
  icon: string | null;
  html_icon: string | null;
  gradient: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Buscar perfil por username (público)
export const useUserProfileByUsername = (username: string | undefined) => {
  return useQuery({
    queryKey: ["user-profile", username],
    queryFn: async () => {
      if (!username) return null;
      
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("username", username.toLowerCase())
        .maybeSingle();

      if (error) throw error;
      return data as UserProfile | null;
    },
    enabled: !!username,
  });
};

// Buscar links de um perfil (público)
export const useUserSocialLinks = (profileId: string | undefined) => {
  return useQuery({
    queryKey: ["user-social-links", profileId],
    queryFn: async () => {
      if (!profileId) return [];
      
      const { data, error } = await supabase
        .from("user_social_links")
        .select("*")
        .eq("user_profile_id", profileId)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as UserSocialLink[];
    },
    enabled: !!profileId,
  });
};

// Buscar perfil do usuário logado
export const useCurrentUserProfile = () => {
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data as UserProfile | null;
    },
  });
};

// Buscar links do usuário logado (incluindo inativos)
export const useCurrentUserLinks = (profileId: string | undefined) => {
  return useQuery({
    queryKey: ["current-user-links", profileId],
    queryFn: async () => {
      if (!profileId) return [];
      
      const { data, error } = await supabase
        .from("user_social_links")
        .select("*")
        .eq("user_profile_id", profileId)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as UserSocialLink[];
    },
    enabled: !!profileId,
  });
};

// Criar perfil
export const useCreateUserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { username: string; display_name: string; description?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: profile, error } = await supabase
        .from("user_profiles")
        .insert({
          user_id: user.id,
          username: data.username.toLowerCase(),
          display_name: data.display_name,
          description: data.description || null,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          throw new Error("Este username já está em uso");
        }
        throw error;
      }
      return profile as UserProfile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
      toast({ title: "Perfil criado com sucesso!" });
    },
    onError: (error: Error) => {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    },
  });
};

// Atualizar perfil
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<UserProfile> & { id: string }) => {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          ...data,
          username: data.username?.toLowerCase(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        if (error.code === "23505") {
          throw new Error("Este username já está em uso");
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
      toast({ title: "Perfil atualizado!" });
    },
    onError: (error: Error) => {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    },
  });
};

// CRUD de links do usuário
export const useCreateUserLink = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Omit<UserSocialLink, "id" | "created_at" | "updated_at">) => {
      const { error } = await supabase
        .from("user_social_links")
        .insert(data);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["current-user-links", variables.user_profile_id] });
      toast({ title: "Link adicionado!" });
    },
    onError: () => {
      toast({ title: "Erro ao adicionar link", variant: "destructive" });
    },
  });
};

export const useUpdateUserLink = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, profileId, ...data }: Partial<UserSocialLink> & { id: string; profileId: string }) => {
      const { error } = await supabase
        .from("user_social_links")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      return profileId;
    },
    onSuccess: (profileId) => {
      queryClient.invalidateQueries({ queryKey: ["current-user-links", profileId] });
      toast({ title: "Link atualizado!" });
    },
    onError: () => {
      toast({ title: "Erro ao atualizar link", variant: "destructive" });
    },
  });
};

export const useDeleteUserLink = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, profileId }: { id: string; profileId: string }) => {
      const { error } = await supabase
        .from("user_social_links")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return profileId;
    },
    onSuccess: (profileId) => {
      queryClient.invalidateQueries({ queryKey: ["current-user-links", profileId] });
      toast({ title: "Link removido!" });
    },
    onError: () => {
      toast({ title: "Erro ao remover link", variant: "destructive" });
    },
  });
};

// Verificar disponibilidade do username
export const useCheckUsername = () => {
  return useMutation({
    mutationFn: async (username: string) => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("username", username.toLowerCase())
        .maybeSingle();

      if (error) throw error;
      return !data; // true se disponível
    },
  });
};
