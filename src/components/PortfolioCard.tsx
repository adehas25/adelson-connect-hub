import { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center justify-center p-6 rounded-2xl",
        "glass glass-hover transition-all duration-500 ease-out",
        "hover:scale-105 hover:-translate-y-2",
        "opacity-0 animate-scale-in",
        "focus:outline-none focus:ring-2 focus:ring-primary/50"
      )}
      style={{ 
        animationDelay: `${delay * 100}ms`,
        background: isHovered ? gradient : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient overlay */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
          "group-hover:opacity-100"
        )}
        style={{ background: gradient }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {htmlIcon ? (
              <div 
                dangerouslySetInnerHTML={{ __html: htmlIcon }} 
                className="w-8 h-8 flex items-center justify-center"
              />
            ) : (
              <i className={cn(icon, "text-2xl")} />
            )}
          </div>
          
          {/* Text */}
          <span className="text-lg font-semibold text-white group-hover:text-white transition-colors duration-300">
            {name}
          </span>
        </div>
        
        {/* Arrow icon */}
        <div className={cn(
          "ml-auto opacity-0 translate-x-4 transition-all duration-300",
          "group-hover:opacity-100 group-hover:translate-x-0"
        )}>
          <svg 
            className="w-5 h-5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </div>
      </div>
      
      {/* Ripple effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl bg-white/20 scale-0 transition-transform duration-500",
        "group-active:scale-100 group-active:transition-none"
      )} />
    </a>
  );
};

export default PortfolioCard;