import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SocialLink {
  id: string;
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

export const useSocialLinks = (includeInactive = false) => {
  return useQuery({
    queryKey: ["social_links", includeInactive],
    queryFn: async () => {
      let query = supabase
        .from("social_links")
        .select("*")
        .order("display_order", { ascending: true });

      if (!includeInactive) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as SocialLink[];
    },
  });
};

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (link: Omit<SocialLink, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("social_links")
        .insert(link)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
    },
  });
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<SocialLink> & { id: string }) => {
      const { data, error } = await supabase
        .from("social_links")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
    },
  });
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("social_links")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
    },
  });
};

export const useReorderSocialLinks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (links: { id: string; display_order: number }[]) => {
      const promises = links.map(({ id, display_order }) =>
        supabase
          .from("social_links")
          .update({ display_order })
          .eq("id", id)
      );

      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
    },
  });
};
