import { useState, useEffect } from "react";
import { useCreateSocialLink, useUpdateSocialLink, SocialLink } from "@/hooks/useSocialLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface LinkFormProps {
  link: SocialLink | null;
  onClose: () => void;
}

const gradientPresets = [
  { name: "Verde", value: "linear-gradient(135deg, #25D366, #128C7E)" },
  { name: "Rosa", value: "linear-gradient(135deg, #E4405F, #833AB4)" },
  { name: "Azul", value: "linear-gradient(135deg, #0A66C2, #0077B5)" },
  { name: "Vermelho", value: "linear-gradient(135deg, #FF0000, #CC0000)" },
  { name: "Roxo", value: "linear-gradient(135deg, #6366F1, #4F46E5)" },
  { name: "Laranja", value: "linear-gradient(135deg, #F59E0B, #D97706)" },
  { name: "Cinza", value: "linear-gradient(135deg, #333333, #6e5494)" },
  { name: "Ciano", value: "linear-gradient(135deg, #06B6D4, #1D4ED8)" },
];

const LinkForm = ({ link, onClose }: LinkFormProps) => {
  const createLink = useCreateSocialLink();
  const updateLink = useUpdateSocialLink();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [htmlIcon, setHtmlIcon] = useState("");
  const [gradient, setGradient] = useState(gradientPresets[0].value);
  const [isActive, setIsActive] = useState(true);
  const [logoUrl, setLogoUrl] = useState("");
  const [iconType, setIconType] = useState<"fontawesome" | "logo">("fontawesome");

  useEffect(() => {
    if (link) {
      setName(link.name);
      setUrl(link.url);
      setIcon(link.icon || "");
      setHtmlIcon(link.html_icon || "");
      setGradient(link.gradient);
      setIsActive(link.is_active);
      
      if (link.html_icon?.includes("<img")) {
        setIconType("logo");
        const match = link.html_icon.match(/src="([^"]+)"/);
        if (match) setLogoUrl(match[1]);
      } else {
        setIconType("fontawesome");
      }
    }
  }, [link]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalHtmlIcon = iconType === "logo" && logoUrl
      ? `<img src="${logoUrl}" alt="${name}" class="w-8 h-8 rounded-sm">`
      : null;

    const data = {
      name,
      url,
      icon: iconType === "fontawesome" ? icon : null,
      html_icon: finalHtmlIcon,
      gradient,
      is_active: isActive,
      display_order: link?.display_order ?? 999,
    };

    try {
      if (link) {
        await updateLink.mutateAsync({ id: link.id, ...data });
        toast({
          title: "Sucesso!",
          description: "Link atualizado com sucesso.",
        });
      } else {
        await createLink.mutateAsync(data);
        toast({
          title: "Sucesso!",
          description: "Link criado com sucesso.",
        });
      }
      onClose();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o link.",
        variant: "destructive",
      });
    }
  };

  const isLoading = createLink.isPending || updateLink.isPending;

  return (
    <form onSubmit={handleSubmit} className="glass bg-white/5 p-6 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {link ? "Editar Link" : "Novo Link"}
        </h3>
        <Button type="button" variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Nome</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do link"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url" className="text-white">URL</Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Tipo de Ícone</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={iconType === "fontawesome"}
              onChange={() => setIconType("fontawesome")}
              className="accent-primary"
            />
            <span className="text-white/80">Font Awesome</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={iconType === "logo"}
              onChange={() => setIconType("logo")}
              className="accent-primary"
            />
            <span className="text-white/80">Logo/Imagem</span>
          </label>
        </div>
      </div>

      {iconType === "fontawesome" ? (
        <div className="space-y-2">
          <Label htmlFor="icon" className="text-white">
            Classe do Ícone (Font Awesome)
          </Label>
          <Input
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="fab fa-instagram"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <p className="text-xs text-white/50">
            Ex: fab fa-instagram, fab fa-github, fas fa-envelope
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Label className="text-white">Logo</Label>
          <ImageUpload
            currentUrl={logoUrl}
            onUpload={(url) => setLogoUrl(url)}
            bucket="link-logos"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-white">Cor de Fundo</Label>
        <div className="grid grid-cols-4 gap-2">
          {gradientPresets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => setGradient(preset.value)}
              className={`
                h-10 rounded-lg transition-all
                ${gradient === preset.value ? "ring-2 ring-white ring-offset-2 ring-offset-black/50" : ""}
              `}
              style={{ background: preset.value }}
              title={preset.name}
            />
          ))}
        </div>
        <Input
          value={gradient}
          onChange={(e) => setGradient(e.target.value)}
          placeholder="linear-gradient(135deg, #color1, #color2)"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="active"
          checked={isActive}
          onCheckedChange={setIsActive}
        />
        <Label htmlFor="active" className="text-white cursor-pointer">
          Link ativo
        </Label>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-xl" style={{ background: gradient }}>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center text-white">
            {iconType === "logo" && logoUrl ? (
              <img src={logoUrl} alt={name} className="w-8 h-8 rounded-sm" />
            ) : icon ? (
              <i className={icon} />
            ) : (
              <span className="text-white/50">?</span>
            )}
          </div>
          <span className="text-white font-semibold">{name || "Preview do Link"}</span>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default LinkForm;
