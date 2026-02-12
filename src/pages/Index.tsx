import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import BackgroundEffects from "@/components/BackgroundEffects";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link2, Palette, Share2, Zap, Users, Globe, Download, Smartphone } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const { isInstallable, isInstalled, install } = usePWAInstall();

  return (
    <div className="min-h-screen relative font-inter">
      <BackgroundEffects />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">AllConnect</span>
          </div>
          <div className="flex items-center gap-3">
            {!isInstalled && (
              <Button
                size="sm"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
                onClick={isInstallable ? install : undefined}
                asChild={!isInstallable}
              >
                {isInstallable ? (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Instalar App
                  </>
                ) : (
                  <a href="/install">
                    <Download className="mr-2 h-4 w-4" />
                    Instalar App
                  </a>
                )}
              </Button>
            )}
            {user ? (
              <Link to="/my-page">
                <Button size="sm" className="gradient-primary border-0 text-white">
                  Minha Página
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    Entrar
                  </Button>
                </Link>
                <Link to="/auth?signup=true">
                  <Button size="sm" className="gradient-primary border-0 text-white">
                    Criar Página Grátis
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero */}
        <section className="container mx-auto px-4 pt-20 pb-32 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm text-white/80">
              <Zap className="w-4 h-4 text-yellow-400" />
              Crie sua página de links em segundos
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Todos os seus links
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                em um só lugar
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
              Crie sua página personalizada com seus links, redes sociais e portfólio.
              Compartilhe tudo com um único link.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={user ? "/my-page" : "/auth?signup=true"}>
                <Button size="lg" className="gradient-primary border-0 text-white text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform">
                  Criar Minha Página
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/adelsonelias">
                <Button variant="ghost" size="lg" className="text-white/70 hover:text-white text-lg px-8 py-6">
                  Ver Exemplo
                </Button>
              </Link>
            </div>

            {/* URL Preview */}
            <div className="mt-12 inline-flex items-center gap-2 glass rounded-full px-6 py-3">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-white/50 text-sm">allconnecthub.lovable.app/</span>
              <span className="text-white font-semibold text-sm">seuusername</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 pb-32">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Link2,
                title: "Links Ilimitados",
                description: "Adicione quantos links quiser. Redes sociais, portfólio, projetos e mais.",
              },
              {
                icon: Palette,
                title: "Temas Exclusivos",
                description: "8 temas incríveis para personalizar sua página. Galaxy, Ocean, Sunset e mais.",
              },
              {
                icon: Share2,
                title: "Compartilhe Fácil",
                description: "Um único link para compartilhar em qualquer lugar. Bio do Instagram, WhatsApp, etc.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-12">
            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comece agora, é grátis
            </h2>
            <p className="text-white/60 mb-8">
              Crie sua conta e tenha sua página de links pronta em menos de 1 minuto.
            </p>
            <Link to={user ? "/my-page" : "/auth?signup=true"}>
              <Button size="lg" className="gradient-primary border-0 text-white text-lg px-10 py-6 rounded-xl">
                Criar Minha Página Grátis
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-white/40 text-sm">
          <div className="glass rounded-full mx-auto w-fit px-6 py-3">
            © 2025 AllConnect Hub. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
