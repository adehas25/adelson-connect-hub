import { useEffect } from "react";
import ProfileSection from "@/components/ProfileSection";
import PortfolioCard from "@/components/PortfolioCard";
import BackgroundEffects from "@/components/BackgroundEffects";
import { socialLinks } from "@/data/socialLinks";

const Index = () => {
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

  return (
    <div className="min-h-screen relative font-inter">
      {/* Background Effects */}
      <BackgroundEffects />
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          <ProfileSection
            imageUrl="https://live.staticflickr.com/65535/54752232034_59e044dcdc_n.jpg"
            name="Adelson Elias"
            description="Bem-vindo ao meu espaço profissional. Aqui você encontra todos os meus projetos e redes sociais."
          />

          {/* Social Links */}
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <PortfolioCard
                key={link.name}
                name={link.name}
                url={link.url}
                icon={link.icon}
                htmlIcon={link.htmlIcon}
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
          © 2025 Adelson Elias. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;