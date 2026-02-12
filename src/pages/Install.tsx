import { usePWAInstall } from "@/hooks/usePWAInstall";
import BackgroundEffects from "@/components/BackgroundEffects";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Share, ArrowDown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Install = () => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  return (
    <div className="min-h-screen relative font-inter">
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 overflow-hidden">
            <img src="/images/pwa-icon-192.png" alt="AllConnect" className="w-full h-full" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">Instalar AllConnect</h1>
          <p className="text-white/60 mb-8">
            Instale o AllConnect no seu dispositivo para acesso rápido, mesmo offline.
          </p>

          {isInstalled ? (
            <div className="glass rounded-2xl p-8 text-center">
              <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-white text-lg font-semibold">App já instalado!</p>
              <p className="text-white/60 mt-2">O AllConnect já está no seu dispositivo.</p>
            </div>
          ) : isInstallable ? (
            <Button
              size="lg"
              onClick={install}
              className="gradient-primary border-0 text-white text-lg px-10 py-6 rounded-xl hover:scale-105 transition-transform"
            >
              <Download className="mr-2 h-5 w-5" />
              Instalar Agora
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 text-left">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  No iPhone / Safari
                </h3>
                <ol className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    Toque no botão <Share className="w-4 h-4 inline" /> Compartilhar
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    Role para baixo e toque em "Adicionar à Tela de Início"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    Toque em "Adicionar"
                  </li>
                </ol>
              </div>

              <div className="glass rounded-2xl p-6 text-left">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  No Android / Chrome
                </h3>
                <ol className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    Toque no menu ⋮ (três pontos)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    Toque em "Instalar aplicativo" ou "Adicionar à tela inicial"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    Confirme a instalação
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Install;
