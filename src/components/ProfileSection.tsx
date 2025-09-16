import { cn } from "@/lib/utils";

interface ProfileSectionProps {
  imageUrl: string;
  name: string;
  description: string;
}

const ProfileSection = ({ imageUrl, name, description }: ProfileSectionProps) => {
  return (
    <div className="text-center mb-12">
      {/* Profile Image */}
      <div className="relative mb-8 inline-block">
        <div className="relative w-36 h-36 mx-auto">
          <img
            src={imageUrl}
            alt={`Foto de perfil de ${name}`}
            className={cn(
              "w-full h-full rounded-full object-cover",
              "border-4 border-white/30 shadow-2xl",
              "animate-float opacity-0 animate-slide-up"
            )}
            style={{ animationDelay: "200ms" }}
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-transparent animate-pulse" />
          
          {/* Ring decoration */}
          <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      </div>

      {/* Name */}
      <h1 className={cn(
        "text-5xl md:text-6xl font-bold mb-4 text-white",
        "opacity-0 animate-slide-up"
      )}
      style={{ animationDelay: "400ms" }}
      >
        {name}
      </h1>

      {/* Description */}
      <p className={cn(
        "text-lg md:text-xl text-white/80 leading-relaxed max-w-md mx-auto",
        "opacity-0 animate-slide-up"
      )}
      style={{ animationDelay: "600ms" }}
      >
        {description}
      </p>
      
      {/* Decorative line */}
      <div className={cn(
        "w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-8 rounded-full",
        "opacity-0 animate-scale-in"
      )}
      style={{ animationDelay: "800ms" }}
      />
    </div>
  );
};

export default ProfileSection;