import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Settings, Link, Users, Home } from "lucide-react";
import BackgroundEffects from "@/components/BackgroundEffects";
import ProfileEditor from "@/components/admin/ProfileEditor";
import LinkManager from "@/components/admin/LinkManager";

const Admin = () => {
  const { user, loading, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const hasAccess = userRole === "admin" || userRole === "editor";

  if (!hasAccess) {
    return (
      <div className="min-h-screen relative font-inter flex items-center justify-center p-4">
        <BackgroundEffects />
        <div className="relative z-10 text-center glass p-8 rounded-2xl max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>
          <p className="text-white/70 mb-6">
            Você não tem permissão para acessar o painel administrativo.
            Entre em contato com um administrador.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Site
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-inter">
      <BackgroundEffects />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
            <p className="text-white/70 mt-1">
              Logado como: {user.email} ({userRole})
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Ver Site
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass bg-white/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary">
              <Settings className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="links" className="data-[state=active]:bg-primary">
              <Link className="h-4 w-4 mr-2" />
              Links
            </TabsTrigger>
            {userRole === "admin" && (
              <TabsTrigger value="users" className="data-[state=active]:bg-primary">
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="profile">
            <ProfileEditor />
          </TabsContent>

          <TabsContent value="links">
            <LinkManager />
          </TabsContent>

          {userRole === "admin" && (
            <TabsContent value="users">
              <div className="glass p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Gerenciar Usuários
                </h2>
                <p className="text-white/70">
                  Para adicionar novos usuários, peça para eles se cadastrarem na página de login.
                  Depois, você pode adicionar o role de admin ou editor diretamente no banco de dados
                  através do Supabase Dashboard.
                </p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
