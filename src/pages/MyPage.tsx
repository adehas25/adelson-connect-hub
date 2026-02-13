import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  useCurrentUserProfile,
  useCurrentUserLinks,
  useCreateUserProfile,
  useUpdateUserProfile,
  useCreateUserLink,
  useUpdateUserLink,
  useDeleteUserLink,
  useCheckUsername,
  UserSocialLink,
} from "@/hooks/useUserProfile";
import { applyTheme, getThemeById, themes } from "@/lib/themes";
import BackgroundEffects from "@/components/BackgroundEffects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Trash2, GripVertical, ExternalLink, Copy, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";
import LinkPresets, { LinkPreset } from "@/components/admin/LinkPresets";

const GRADIENT_OPTIONS = [
  { value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", label: "Roxo" },
  { value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", label: "Rosa" },
  { value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", label: "Azul" },
  { value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", label: "Verde" },
  { value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", label: "Laranja" },
  { value: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", label: "Pastel" },
  { value: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)", label: "Vermelho" },
  { value: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", label: "Indigo" },
];

const MyPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile, isLoading: profileLoading, refetch: refetchProfile } = useCurrentUserProfile();
  const { data: links, isLoading: linksLoading } = useCurrentUserLinks(profile?.id);

  const createProfile = useCreateUserProfile();
  const updateProfile = useUpdateUserProfile();
  const createLink = useCreateUserLink();
  const updateLink = useUpdateUserLink();
  const deleteLink = useDeleteUserLink();
  const checkUsername = useCheckUsername();

  // Form states
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("galaxy");
  
  // Link form
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<UserSocialLink | null>(null);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkIcon, setLinkIcon] = useState("");
  const [linkGradient, setLinkGradient] = useState(GRADIENT_OPTIONS[0].value);
  const [linkActive, setLinkActive] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isCustomIcon, setIsCustomIcon] = useState(false);
  const [customLogoUrl, setCustomLogoUrl] = useState("");

  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [copied, setCopied] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setDisplayName(profile.display_name);
      setDescription(profile.description || "");
      setProfileImageUrl(profile.profile_image_url || "");
      setSelectedTheme(profile.theme);
      applyTheme(getThemeById(profile.theme));
    }
  }, [profile]);

  // Check username availability
  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    // Don't check if it's the current username
    if (profile?.username === username.toLowerCase()) {
      setUsernameAvailable(true);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        const available = await checkUsername.mutateAsync(username);
        setUsernameAvailable(available);
      } catch {
        setUsernameAvailable(null);
      } finally {
        setCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, profile?.username]);

  const handleSaveProfile = async () => {
    if (!username || !displayName) {
      toast({ title: "Preencha username e nome", variant: "destructive" });
      return;
    }

    if (usernameAvailable === false) {
      toast({ title: "Username não disponível", variant: "destructive" });
      return;
    }

    try {
      if (profile) {
        await updateProfile.mutateAsync({
          id: profile.id,
          username,
          display_name: displayName,
          description: description || null,
          profile_image_url: profileImageUrl || null,
          theme: selectedTheme,
        });
      } else {
        await createProfile.mutateAsync({
          username,
          display_name: displayName,
          description: description || undefined,
        });
        refetchProfile();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUploaded = async (url: string) => {
    setProfileImageUrl(url);
    if (profile) {
      await updateProfile.mutateAsync({
        id: profile.id,
        profile_image_url: url,
      });
    }
  };

  const handleThemeChange = async (themeId: string) => {
    setSelectedTheme(themeId);
    applyTheme(getThemeById(themeId));
    if (profile) {
      await updateProfile.mutateAsync({
        id: profile.id,
        theme: themeId,
      });
    }
  };

  const handleOpenLinkDialog = (link?: UserSocialLink) => {
    if (link) {
      setEditingLink(link);
      setLinkName(link.name);
      setLinkUrl(link.url);
      setLinkIcon(link.icon || "");
      setLinkGradient(link.gradient);
      setLinkActive(link.is_active);
      setSelectedPreset(link.name);
      if (link.html_icon?.includes("<img")) {
        setIsCustomIcon(true);
        const match = link.html_icon.match(/src="([^"]+)"/);
        if (match) setCustomLogoUrl(match[1]);
      } else {
        setIsCustomIcon(false);
        setCustomLogoUrl("");
      }
    } else {
      setEditingLink(null);
      setLinkName("");
      setLinkUrl("");
      setLinkIcon("");
      setLinkGradient(GRADIENT_OPTIONS[0].value);
      setLinkActive(true);
      setSelectedPreset(null);
      setIsCustomIcon(false);
      setCustomLogoUrl("");
    }
    setLinkDialogOpen(true);
  };

  const handlePresetSelect = (preset: LinkPreset) => {
    setSelectedPreset(preset.name);
    setIsCustomIcon(false);
    setLinkIcon(preset.icon);
    setLinkGradient(preset.gradient);
    if (!editingLink) {
      setLinkName(preset.name);
    }
  };

  const handleCustomIconSelect = () => {
    setIsCustomIcon(true);
    setSelectedPreset(null);
    setLinkIcon("");
  };

  const handleSaveLink = async () => {
    if (!linkName || !linkUrl || !profile) return;

    const finalHtmlIcon = isCustomIcon && customLogoUrl
      ? `<img src="${customLogoUrl}" alt="${linkName}" class="w-8 h-8 rounded-sm">`
      : null;

    try {
      if (editingLink) {
        await updateLink.mutateAsync({
          id: editingLink.id,
          profileId: profile.id,
          name: linkName,
          url: linkUrl,
          icon: !isCustomIcon ? (linkIcon || null) : null,
          html_icon: finalHtmlIcon,
          gradient: linkGradient,
          is_active: linkActive,
        });
      } else {
        await createLink.mutateAsync({
          user_profile_id: profile.id,
          name: linkName,
          url: linkUrl,
          icon: !isCustomIcon ? (linkIcon || null) : null,
          html_icon: finalHtmlIcon,
          gradient: linkGradient,
          display_order: (links?.length || 0) + 1,
          is_active: linkActive,
        });
      }
      setLinkDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    if (!profile) return;
    await deleteLink.mutateAsync({ id: linkId, profileId: profile.id });
  };

  const copyProfileUrl = () => {
    if (!profile) return;
    const url = `https://allconnecthub.lovable.app/${profile.username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Link copiado!" });
  };

  const isLoading = authLoading || profileLoading;
  const isSaving = createProfile.isPending || updateProfile.isPending;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-inter">
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          
          {profile && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyProfileUrl}
                className="text-white/80"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copiar link
              </Button>
              <Link to={`/${profile.username}`} target="_blank">
                <Button variant="outline" size="sm" className="text-white/80">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver página
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              {profile ? "Editar sua página" : "Criar sua página"}
            </CardTitle>
            <CardDescription className="text-white/70">
              {profile
                ? `Sua página está em: https://allconnecthub.lovable.app/${profile.username}`
                : "Configure seu perfil e links"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="links" disabled={!profile}>Links</TabsTrigger>
                <TabsTrigger value="theme" disabled={!profile}>Tema</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">@</span>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                      placeholder="seuusername"
                      className="pl-8 bg-white/10 border-white/20 text-white"
                      maxLength={30}
                    />
                    {checkingUsername && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-white/50" />
                    )}
                  </div>
                  {username.length >= 3 && usernameAvailable !== null && !checkingUsername && (
                    <p className={`text-sm ${usernameAvailable ? "text-green-400" : "text-red-400"}`}>
                      {usernameAvailable ? "✓ Disponível" : "✗ Já está em uso"}
                    </p>
                  )}
                  {username.length > 0 && username.length < 3 && (
                    <p className="text-sm text-yellow-400">Mínimo 3 caracteres</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-white">Nome de exibição</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Seu Nome"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Uma breve descrição sobre você..."
                    className="bg-white/10 border-white/20 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Foto de perfil</Label>
                  <ImageUpload
                    currentUrl={profileImageUrl}
                    onUpload={handleImageUploaded}
                    bucket="avatars"
                  />
                </div>

                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving || usernameAvailable === false}
                  className="w-full"
                >
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {profile ? "Salvar alterações" : "Criar página"}
                </Button>
              </TabsContent>

              {/* Links Tab */}
              <TabsContent value="links" className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-white/70 text-sm">
                    {links?.length || 0} link(s)
                  </p>
                  <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => handleOpenLinkDialog()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass border-white/20">
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          {editingLink ? "Editar link" : "Novo link"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <LinkPresets
                          selectedPreset={selectedPreset}
                          onSelect={handlePresetSelect}
                          onSelectCustom={handleCustomIconSelect}
                          isCustomSelected={isCustomIcon}
                        />

                        {isCustomIcon && (
                          <div className="space-y-2">
                            <Label className="text-white">Logo personalizada</Label>
                            <ImageUpload
                              currentUrl={customLogoUrl}
                              onUpload={(url) => setCustomLogoUrl(url)}
                              bucket="link-logos"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label className="text-white">Nome</Label>
                          <Input
                            value={linkName}
                            onChange={(e) => setLinkName(e.target.value)}
                            placeholder="Nome do link"
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">URL</Label>
                          <Input
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://..."
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Cor</Label>
                          <div className="grid grid-cols-4 gap-2">
                            {GRADIENT_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setLinkGradient(opt.value)}
                                className={`h-10 rounded-lg transition-all ${linkGradient === opt.value ? "ring-2 ring-white ring-offset-2 ring-offset-black/50" : ""}`}
                                style={{ background: opt.value }}
                                title={opt.label}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-white">Ativo</Label>
                          <Switch checked={linkActive} onCheckedChange={setLinkActive} />
                        </div>

                        {/* Preview */}
                        <div className="p-3 rounded-xl" style={{ background: linkGradient }}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center text-white">
                              {isCustomIcon && customLogoUrl ? (
                                <img src={customLogoUrl} alt={linkName} className="w-8 h-8 rounded-sm" />
                              ) : linkIcon ? (
                                <i className={linkIcon} />
                              ) : (
                                <span className="text-white/50">?</span>
                              )}
                            </div>
                            <span className="text-white font-semibold">{linkName || "Preview"}</span>
                          </div>
                        </div>

                        <Button onClick={handleSaveLink} className="w-full">
                          {editingLink ? "Salvar" : "Adicionar"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-2">
                  {links?.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <GripVertical className="h-4 w-4 text-white/30 cursor-grab" />
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center"
                        style={{ background: link.gradient }}
                      >
                        {link.icon && <i className={`${link.icon} text-white text-sm`} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-white font-medium truncate ${!link.is_active ? "opacity-50" : ""}`}>
                          {link.name}
                        </p>
                        <p className="text-white/50 text-xs truncate">{link.url}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenLinkDialog(link)}
                        className="text-white/70 hover:text-white"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLink(link.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {links?.length === 0 && (
                    <p className="text-center text-white/50 py-8">
                      Nenhum link adicionado ainda
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Theme Tab */}
              <TabsContent value="theme" className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedTheme === theme.id
                          ? "border-white ring-2 ring-white/50"
                          : "border-white/20 hover:border-white/40"
                      }`}
                      style={{ background: theme.preview.background }}
                    >
                      <span className="text-white font-medium text-sm drop-shadow-md">
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyPage;
