import { themes, Theme } from "@/lib/themes";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
}

const ThemeSelector = ({ currentTheme, onSelectTheme }: ThemeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelectTheme(theme.id)}
          className={cn(
            "relative group p-4 rounded-xl transition-all duration-300",
            "border-2 hover:scale-105",
            currentTheme === theme.id
              ? "border-primary ring-2 ring-primary/30"
              : "border-white/10 hover:border-white/30"
          )}
          style={{ background: theme.gradients.background }}
        >
          {/* Theme preview circles */}
          <div className="flex justify-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-full ring-2 ring-white/20"
              style={{ background: theme.preview.primary }}
            />
            <div
              className="w-6 h-6 rounded-full ring-2 ring-white/20"
              style={{ background: theme.preview.secondary }}
            />
          </div>
          
          {/* Theme name */}
          <h3 className="text-sm font-semibold text-white text-center">
            {theme.name}
          </h3>
          <p className="text-xs text-white/60 text-center mt-1">
            {theme.description}
          </p>
          
          {/* Selected indicator */}
          {currentTheme === theme.id && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
