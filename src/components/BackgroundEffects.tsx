const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-32 w-56 h-56 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-32 left-1/4 w-64 h-64 bg-secondary/25 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Subtle particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/5 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: "3s" }} />
    </div>
  );
};

export default BackgroundEffects;