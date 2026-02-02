import { useState, useEffect } from "react";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Palette } from "lucide-react";
import ImageUpload from "./ImageUpload";
import ThemeSelector from "./ThemeSelector";
import { applyTheme, getThemeById } from "@/lib/themes";

const ProfileEditor = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [footerText, setFooterText] = useState("");
  const [theme, setTheme] = useState("galaxy");

  useEffect(() => {
    if (settings) {
      setName(settings.profile_name || "");
      setDescription(settings.profile_description || "");
      setImageUrl(settings.profile_image_url || "");
      setFooterText(settings.footer_text || "");
      setTheme(settings.theme || "galaxy");
    }
  }, [settings]);

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    // Apply theme immediately for preview
    applyTheme(getThemeById(themeId));
  };

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        profile_name: name,
        profile_description: description,
        profile_image_url: imageUrl,
        footer_text: footerText,
        theme: theme,
      });
      toast({
        title: "Sucesso!",
        description: "Configurações do perfil atualizadas.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="glass p-6 rounded-2xl flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Settings Card */}
      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Configurações do Perfil</h2>
          <Button 
            onClick={handleSave} 
            disabled={updateSettings.isPending}
            className="bg-primary hover:bg-primary/90"
          >
            {updateSettings.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Salvar
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left column - Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Uma breve descrição sobre você"
                rows={3}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="footer" className="text-white">Texto do Rodapé</Label>
              <Input
                id="footer"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="© 2025 Seu Nome..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Foto de Perfil</Label>
              <ImageUpload
                currentUrl={imageUrl}
                onUpload={(url) => setImageUrl(url)}
                bucket="avatars"
              />
            </div>
          </div>

          {/* Right column - Preview */}
          <div className="space-y-4">
            <Label className="text-white">Preview</Label>
            <div className="glass bg-white/5 p-6 rounded-xl text-center">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white/30"
                />
              )}
              <h3 className="text-2xl font-bold text-white">{name || "Seu Nome"}</h3>
              <p className="text-white/70 mt-2">{description || "Sua descrição aqui..."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Settings Card */}
      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Palette className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-white">Tema do Site</h2>
        </div>
        <p className="text-white/60 text-sm">
          Escolha um tema para personalizar as cores do seu site. A mudança será aplicada imediatamente para preview.
        </p>
        <ThemeSelector currentTheme={theme} onSelectTheme={handleThemeChange} />
      </div>
    </div>
  );
};

export default ProfileEditor;
