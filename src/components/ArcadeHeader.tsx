import { Button } from "@/components/ui/button";

const ArcadeHeader = () => {
  return (
    <header className="relative py-8 px-6 text-center">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      <div className="relative z-10">
        <h1 className="font-arcade text-6xl md:text-8xl text-primary text-glow animate-neon-pulse mb-4">
          ARCADE
        </h1>
        <h2 className="font-arcade text-2xl md:text-4xl text-secondary text-glow mb-6">
          VAULT
        </h2>
        <p className="font-cyber text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
          Step into the neon-lit world of retro gaming. Challenge high scores, 
          unlock achievements, and dominate the leaderboards.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="arcade" size="lg" className="font-cyber">
            START PLAYING
          </Button>
          <Button variant="neon" size="lg" className="font-cyber">
            VIEW LEADERBOARD
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ArcadeHeader;