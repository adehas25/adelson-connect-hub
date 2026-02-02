export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: {
    primary: string;
    secondary: string;
    background: string;
  };
  colors: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    card: string;
    cardForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    ring: string;
  };
  gradients: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    orb1: string;
    orb2: string;
    orb3: string;
  };
}

export const themes: Theme[] = [
  {
    id: "galaxy",
    name: "Galaxy",
    description: "Roxo cósmico e violeta",
    preview: {
      primary: "#8B5CF6",
      secondary: "#A78BFA",
      background: "#0A0A0F",
    },
    colors: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "263 70% 50%",
      primaryForeground: "0 0% 98%",
      card: "240 10% 3.9%",
      cardForeground: "0 0% 98%",
      accent: "280 100% 70%",
      accentForeground: "0 0% 98%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      border: "240 3.7% 15.9%",
      ring: "263 70% 50%",
    },
    gradients: {
      background: "linear-gradient(135deg, hsl(240, 10%, 3.9%), hsl(260, 15%, 8%), hsl(280, 20%, 12%))",
      primary: "linear-gradient(135deg, hsl(263, 70%, 50%), hsl(280, 100%, 70%))",
      secondary: "linear-gradient(135deg, hsl(320, 70%, 50%), hsl(340, 100%, 70%))",
      accent: "linear-gradient(135deg, hsl(200, 70%, 50%), hsl(220, 100%, 70%))",
      orb1: "hsl(263, 70%, 50%)",
      orb2: "hsl(280, 100%, 70%)",
      orb3: "hsl(320, 70%, 50%)",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Azul profundo e ciano",
    preview: {
      primary: "#0EA5E9",
      secondary: "#06B6D4",
      background: "#0A1628",
    },
    colors: {
      background: "215 50% 10%",
      foreground: "0 0% 98%",
      primary: "199 89% 48%",
      primaryForeground: "0 0% 98%",
      card: "215 50% 10%",
      cardForeground: "0 0% 98%",
      accent: "187 85% 43%",
      accentForeground: "0 0% 98%",
      muted: "215 20% 20%",
      mutedForeground: "215 20% 65%",
      border: "215 30% 20%",
      ring: "199 89% 48%",
    },
    gradients: {
      background: "linear-gradient(135deg, hsl(215, 50%, 10%), hsl(200, 60%, 12%), hsl(190, 70%, 15%))",
      primary: "linear-gradient(135deg, hsl(199, 89%, 48%), hsl(187, 85%, 43%))",
      secondary: "linear-gradient(135deg, hsl(210, 100%, 50%), hsl(230, 100%, 60%))",
      accent: "linear-gradient(135deg, hsl(170, 70%, 45%), hsl(190, 80%, 50%))",
      orb1: "hsl(199, 89%, 48%)",
      orb2: "hsl(187, 85%, 43%)",
      orb3: "hsl(210, 100%, 50%)",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Laranja quente e rosa",
    preview: {
      primary: "#F97316",
      secondary: "#EC4899",
      background: "#1A0F0A",
    },
    colors: {
      background: "20 40% 8%",
      foreground: "0 0% 98%",
      primary: "25 95% 53%",
      primaryForeground: "0 0% 98%",
      card: "20 40% 8%",
      cardForeground: "0 0% 98%",
      accent: "330 80% 60%",
      accentForeground: "0 0% 98%",
      muted: "20 20% 20%",
      mutedForeground: "20 20% 65%",
      border: "20 30% 18%",
      ring: "25 95% 53%",
    },
    gradients: {
      background: "linear-gradient(135deg, hsl(20, 40%, 8%), hsl(350, 50%, 10%), hsl(330, 60%, 12%))",
      primary: "linear-gradient(135deg, hsl(25, 95%, 53%), hsl(350, 90%, 55%))",
      secondary: "linear-gradient(135deg, hsl(330, 80%, 60%), hsl(350, 90%, 65%))",
      accent: "linear-gradient(135deg, hsl(40, 90%, 50%), hsl(25, 95%, 53%))",
      orb1: "hsl(25, 95%, 53%)",
      orb2: "hsl(350, 90%, 55%)",
      orb3: "hsl(330, 80%, 60%)",
    },
  },
  {
    id: "forest",
    name: "Forest",
    description: "Verde natural e esmeralda",
    preview: {
      primary: "#10B981",
      secondary: "#22C55E",
      background: "#0A150F",
    },
    colors: {
      background: "150 30% 6%",
      foreground: "0 0% 98%",
      primary: "160 84% 39%",
      primaryForeground: "0 0% 98%",
      card: "150 30% 6%",
      cardForeground: "0 0% 98%",
      accent: "142 71% 45%",
      accentForeground: "0 0% 98%",
      muted: "150 20% 18%",
      mutedForeground: "150 15% 60%",
      border: "150 25% 15%",
      ring: "160 84% 39%",
    },
    gradients: {
      background: "linear-gradient(135deg, hsl(150, 30%, 6%), hsl(160, 40%, 8%), hsl(140, 35%, 10%))",
      primary: "linear-gradient(135deg, hsl(160, 84%, 39%), hsl(142, 71%, 45%))",
      secondary: "linear-gradient(135deg, hsl(170, 70%, 40%), hsl(180, 60%, 45%))",
      accent: "linear-gradient(135deg, hsl(100, 60%, 40%), hsl(120, 70%, 45%))",
      orb1: "hsl(160, 84%, 39%)",
      orb2: "hsl(142, 71%, 45%)",
      orb3: "hsl(170, 70%, 40%)",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Azul escuro e índigo",
    preview: {
      primary: "#6366F1",
      secondary: "#818CF8",
      background: "#0F0F1A",
    },
    colors: {
      background: "240 20% 8%",
      foreground: "0 0% 98%",
      primary: "239 84% 67%",
      primaryForeground: "0 0% 98%",
      card: "240 20% 8%",
      cardForeground: "0 0% 98%",
      accent: "234 89% 73%",
      accentForeground: "0 0% 98%",
      muted: "240 15% 20%",
      mutedForeground: "240 10% 60%",
      border: "240 20% 18%",
      ring: "239 84% 67%",
    },
    gradients: {
      background: "linear-gradient(135deg, hsl(240, 20%, 8%), hsl(250, 30%, 12%), hsl(260, 25%, 15%))",
      primary: "linear-gradient(135deg, hsl(239, 84%, 67%), hsl(234, 89%, 73%))",
      secondary: "linear-gradient(135deg, hsl(250, 80%, 60%), hsl(270, 90%, 65%))",
      accent: "linear-gradient(135deg, hsl(220, 90%, 55%), hsl(240, 85%, 60%))",
      orb1: "hsl(239, 84%, 67%)",
      orb2: "hsl(234, 89%, 73%)",
      orb3: "hsl(250, 80%, 60%)",
    },
  },
  {
    id: "rose",
    name: "Rose",
    description: "Rosa elegante e magenta",
    preview: {
      primary: "#EC4899",
      secondary: "#F472B6",
      background: "#1A0A14",
    },
    colors: {
      background: "330 40% 7%",
      foreground: "0 0% 98%",
      primary: "330 81% 60%",
      primaryForeground: "0 0% 98%",
      card: "330 40% 7%",
      cardForeground: "0 0% 98%",
      accent: "330 86% 70%",
      accentForeground: "0 0% 98%",
      muted: "330 20% 18%",
      mutedForeground: "330 15% 60%",
      border: "330 25% 16%",
      ring: "330 81% 60%",
    },
    gradients: {
      background: "linear-gradient(135deg, hsl(330, 40%, 7%), hsl(340, 50%, 10%), hsl(350, 45%, 12%))",
      primary: "linear-gradient(135deg, hsl(330, 81%, 60%), hsl(340, 86%, 70%))",
      secondary: "linear-gradient(135deg, hsl(320, 70%, 55%), hsl(300, 80%, 60%))",
      accent: "linear-gradient(135deg, hsl(350, 80%, 60%), hsl(10, 90%, 65%))",
      orb1: "hsl(330, 81%, 60%)",
      orb2: "hsl(340, 86%, 70%)",
      orb3: "hsl(320, 70%, 55%)",
    },
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Preto e branco elegante",
    preview: {
      primary: "#FFFFFF",
      secondary: "#A1A1AA",
      background: "#09090B",
    },
    colors: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "0 0% 98%",
      primaryForeground: "240 10% 3.9%",
      card: "240 10% 3.9%",
      cardForeground: "0 0% 98%",
      accent: "240 5% 65%",
      accentForeground: "240 10% 3.9%",
      muted: "240 5% 20%",
      mutedForeground: "240 5% 55%",
      border: "240 5% 18%",
      ring: "0 0% 98%",
    },
    gradients: {
      background: "linear-gradient(135deg, hsl(240, 10%, 3.9%), hsl(240, 8%, 8%), hsl(240, 6%, 12%))",
      primary: "linear-gradient(135deg, hsl(0, 0%, 98%), hsl(0, 0%, 85%))",
      secondary: "linear-gradient(135deg, hsl(240, 5%, 50%), hsl(240, 5%, 65%))",
      accent: "linear-gradient(135deg, hsl(240, 5%, 30%), hsl(240, 5%, 45%))",
      orb1: "hsl(0, 0%, 25%)",
      orb2: "hsl(0, 0%, 20%)",
      orb3: "hsl(0, 0%, 15%)",
    },
  },
  {
    id: "amber",
    name: "Amber",
    description: "Dourado e bronze",
    preview: {
      primary: "#F59E0B",
      secondary: "#FBBF24",
      background: "#141008",
    },
    colors: {
      background: "40 40% 5%",
      foreground: "0 0% 98%",
      primary: "38 92% 50%",
      primaryForeground: "0 0% 10%",
      card: "40 40% 5%",
      cardForeground: "0 0% 98%",
      accent: "45 93% 58%",
      accentForeground: "0 0% 10%",
      muted: "40 20% 18%",
      mutedForeground: "40 15% 60%",
      border: "40 25% 15%",
      ring: "38 92% 50%",
    },
    gradients: {
      background: "linear-gradient(135deg, hsl(40, 40%, 5%), hsl(35, 50%, 8%), hsl(30, 45%, 10%))",
      primary: "linear-gradient(135deg, hsl(38, 92%, 50%), hsl(45, 93%, 58%))",
      secondary: "linear-gradient(135deg, hsl(30, 85%, 45%), hsl(20, 90%, 50%))",
      accent: "linear-gradient(135deg, hsl(50, 90%, 50%), hsl(55, 95%, 55%))",
      orb1: "hsl(38, 92%, 50%)",
      orb2: "hsl(45, 93%, 58%)",
      orb3: "hsl(30, 85%, 45%)",
    },
  },
];

export const getThemeById = (id: string): Theme => {
  return themes.find((t) => t.id === id) || themes[0];
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  
  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    root.style.setProperty(`--${cssKey}`, value);
  });
  
  // Apply background gradient
  document.body.style.background = theme.gradients.background;
  document.body.style.backgroundAttachment = "fixed";
  
  // Store theme orbs for BackgroundEffects
  root.style.setProperty("--theme-orb-1", theme.gradients.orb1);
  root.style.setProperty("--theme-orb-2", theme.gradients.orb2);
  root.style.setProperty("--theme-orb-3", theme.gradients.orb3);
};
