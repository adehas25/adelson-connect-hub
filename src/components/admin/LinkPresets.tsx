import { Upload } from "lucide-react";

export interface LinkPreset {
  name: string;
  icon: string;
  gradient: string;
  type: "preset" | "custom";
}

const presets: LinkPreset[] = [
  { name: "WhatsApp", icon: "fab fa-whatsapp", gradient: "linear-gradient(135deg, #25D366, #128C7E)", type: "preset" },
  { name: "Instagram", icon: "fab fa-instagram", gradient: "linear-gradient(135deg, #E4405F, #833AB4)", type: "preset" },
  { name: "Facebook", icon: "fab fa-facebook", gradient: "linear-gradient(135deg, #1877F2, #0C5DC7)", type: "preset" },
  { name: "TikTok", icon: "fab fa-tiktok", gradient: "linear-gradient(135deg, #000000, #25F4EE)", type: "preset" },
  { name: "YouTube", icon: "fab fa-youtube", gradient: "linear-gradient(135deg, #FF0000, #CC0000)", type: "preset" },
  { name: "X / Twitter", icon: "fab fa-x-twitter", gradient: "linear-gradient(135deg, #000000, #333333)", type: "preset" },
  { name: "LinkedIn", icon: "fab fa-linkedin", gradient: "linear-gradient(135deg, #0A66C2, #0077B5)", type: "preset" },
  { name: "GitHub", icon: "fab fa-github", gradient: "linear-gradient(135deg, #374151, #111827)", type: "preset" },
  { name: "Telegram", icon: "fab fa-telegram", gradient: "linear-gradient(135deg, #26A5E4, #0088CC)", type: "preset" },
  { name: "Spotify", icon: "fab fa-spotify", gradient: "linear-gradient(135deg, #1DB954, #158A3E)", type: "preset" },
  { name: "Pinterest", icon: "fab fa-pinterest", gradient: "linear-gradient(135deg, #E60023, #AD081B)", type: "preset" },
  { name: "Snapchat", icon: "fab fa-snapchat", gradient: "linear-gradient(135deg, #FFFC00, #F7D800)", type: "preset" },
  { name: "Discord", icon: "fab fa-discord", gradient: "linear-gradient(135deg, #5865F2, #4752C4)", type: "preset" },
  { name: "Twitch", icon: "fab fa-twitch", gradient: "linear-gradient(135deg, #9146FF, #6441A5)", type: "preset" },
  { name: "E-mail", icon: "fas fa-envelope", gradient: "linear-gradient(135deg, #EA4335, #C5221F)", type: "preset" },
  { name: "Telefone", icon: "fas fa-phone", gradient: "linear-gradient(135deg, #34D399, #059669)", type: "preset" },
  { name: "Website", icon: "fas fa-globe", gradient: "linear-gradient(135deg, #06B6D4, #1D4ED8)", type: "preset" },
  { name: "Notion", icon: "fas fa-n", gradient: "linear-gradient(135deg, #2D2D2D, #000000)", type: "preset" },
  { name: "OneDrive", icon: "fab fa-microsoft", gradient: "linear-gradient(135deg, #0078D4, #005A9E)", type: "preset" },
  { name: "Google Drive", icon: "fab fa-google-drive", gradient: "linear-gradient(135deg, #4285F4, #34A853)", type: "preset" },
  { name: "Currículo Lattes", icon: "fas fa-graduation-cap", gradient: "linear-gradient(135deg, #F59E0B, #D97706)", type: "preset" },
  { name: "E-book / Livro", icon: "fas fa-book-open", gradient: "linear-gradient(135deg, #6366F1, #4338CA)", type: "preset" },
  { name: "Biliologia", icon: "fas fa-book-bible", gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)", type: "preset" },
];

interface LinkPresetsProps {
  selectedPreset: string | null;
  onSelect: (preset: LinkPreset) => void;
  onSelectCustom: () => void;
  isCustomSelected: boolean;
}

const LinkPresets = ({ selectedPreset, onSelect, onSelectCustom, isCustomSelected }: LinkPresetsProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Tipo de Link</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onSelect(preset)}
            className={`
              flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl
              transition-all duration-200 min-h-[72px]
              bg-white/5 hover:bg-white/10 border border-white/10
              ${selectedPreset === preset.name && !isCustomSelected
                ? "ring-2 ring-primary scale-105 bg-white/15 border-primary/50"
                : ""}
            `}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-lg"
              style={{ background: preset.gradient }}
            >
              <i className={preset.icon} />
            </div>
            <span className="text-[11px] text-white/70 text-center leading-tight truncate w-full">
              {preset.name}
            </span>
          </button>
        ))}

        {/* Custom option */}
        <button
          type="button"
          onClick={onSelectCustom}
          className={`
            flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl
            transition-all duration-200 min-h-[72px]
            bg-white/5 hover:bg-white/10 border border-dashed border-white/20
            ${isCustomSelected
              ? "ring-2 ring-primary scale-105 bg-white/15 border-primary/50"
              : ""}
          `}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 bg-white/10">
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-[11px] text-white/70 text-center leading-tight">
            Personalizado
          </span>
        </button>
      </div>
    </div>
  );
};

export default LinkPresets;
export { presets };
