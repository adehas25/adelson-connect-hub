import { useEffect } from "react";
import ProfileSection from "@/components/ProfileSection";
import PortfolioCard from "@/components/PortfolioCard";
import BackgroundEffects from "@/components/BackgroundEffects";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: settings, isLoading: settingsLoading } = useSiteSettings();
  const { data: links, isLoading: linksLoading } = useSocialLinks();

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

  const isLoading = settingsLoading || linksLoading;

  // Default values while loading
  const profileName = settings?.profile_name || "Adelson Elias";
  const profileDescription = settings?.profile_description || "Bem-vindo ao meu espaço profissional. Aqui você encontra todos os meus projetos e redes sociais.";
  const profileImage = settings?.profile_image_url || "https://live.staticflickr.com/65535/54752232034_59e044dcdc_n.jpg";
  const footerText = settings?.footer_text || "© 2025 Adelson Elias. Todos os direitos reservados.";

  return (
    <div className="min-h-screen relative font-inter">
      {/* Background Effects */}
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
          <ProfileSection
            imageUrl={profileImage}
            name={profileName}
            description={profileDescription}
          />

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
                delay={index + 5} // Start after profile animations
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-white/60 text-sm">
        <div className="glass rounded-full mx-auto w-fit px-6 py-3">
          {footerText}
        </div>
      </footer>
    </div>
  );
};

export default Index;
