import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProfileSection from "@/components/ProfileSection";
import PortfolioCard from "@/components/PortfolioCard";
import BackgroundEffects from "@/components/BackgroundEffects";
import { useUserProfileByUsername, useUserSocialLinks } from "@/hooks/useUserProfile";
import { applyTheme, getThemeById } from "@/lib/themes";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading: profileLoading, error } = useUserProfileByUsername(username);
  const { data: links, isLoading: linksLoading } = useUserSocialLinks(profile?.id);

  useEffect(() => {
    // Add Font Awesome for icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Apply theme when profile loads
  useEffect(() => {
    if (profile?.theme) {
      applyTheme(getThemeById(profile.theme));
    }
  }, [profile?.theme]);

  const isLoading = profileLoading || linksLoading;

  // Profile not found
  if (!isLoading && !profile) {
    return (
      <div className="min-h-screen relative font-inter flex items-center justify-center">
        <BackgroundEffects />
        <div className="relative z-10 text-center glass rounded-2xl p-8 max-w-md mx-4">
          <h1 className="text-3xl font-bold text-white mb-4">
            Perfil não encontrado
          </h1>
          <p className="text-white/70 mb-6">
            O usuário <span className="font-semibold">@{username}</span> não existe ou ainda não criou sua página.
          </p>
          <div className="space-y-3">
            <Link to="/">
              <Button variant="outline" className="w-full">
                Ir para página inicial
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="w-full">
                Criar sua página
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-inter">
      <BackgroundEffects />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          {profile && (
            <ProfileSection
              imageUrl={profile.profile_image_url || "https://via.placeholder.com/150"}
              name={profile.display_name}
              description={profile.description || ""}
            />
          )}

          {/* Social Links */}
          <div className="space-y-4">
            {links?.map((link, index) => (
              <PortfolioCard
                key={link.id}
                name={link.name}
                url={link.url}
                icon={link.icon || undefined}
                htmlIcon={link.html_icon || undefined}
                gradient={link.gradient}
                delay={index + 5}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-white/60 text-sm">
        <div className="glass rounded-full mx-auto w-fit px-6 py-3">
          @{profile?.username}
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;
