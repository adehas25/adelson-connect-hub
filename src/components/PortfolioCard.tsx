import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  name: string;
  url: string;
  icon?: string;
  htmlIcon?: string;
  gradient: string;
  delay?: number;
}

const PortfolioCard = ({ name, url, icon, htmlIcon, gradient, delay = 0 }: PortfolioCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-2xl",
        "bg-white/[0.08] backdrop-blur-xl border border-white/[0.12]",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.03] hover:-translate-y-1 hover:bg-white/[0.14] hover:border-white/[0.2]",
        "hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]",
        "active:scale-[0.98]",
        "opacity-0 animate-scale-in",
        "focus:outline-none focus:ring-2 focus:ring-primary/50"
      )}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      {/* Icon with gradient */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: gradient }}
      >
        {htmlIcon ? (
          <div
            dangerouslySetInnerHTML={{ __html: htmlIcon }}
            className="w-7 h-7 flex items-center justify-center text-white"
          />
        ) : icon ? (
          <i className={cn(icon, "text-xl text-white")} />
        ) : (
          <span className="text-white text-xl">🔗</span>
        )}
      </div>

      {/* Text */}
      <span className="text-base font-semibold text-white/90 group-hover:text-white transition-colors duration-300 truncate">
        {name}
      </span>

      {/* Arrow */}
      <div className="ml-auto flex-shrink-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-70 group-hover:translate-x-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
};

export default PortfolioCard;
