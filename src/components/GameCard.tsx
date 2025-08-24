import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GameCardProps {
  title: string;
  description: string;
  highScore?: number;
  isAvailable: boolean;
  icon: string;
  color: 'cyan' | 'magenta' | 'yellow' | 'green';
  onPlay: () => void;
}

const GameCard = ({ 
  title, 
  description, 
  highScore, 
  isAvailable, 
  icon, 
  color,
  onPlay 
}: GameCardProps) => {
  const colorClasses = {
    cyan: 'border-neon-cyan glow-cyan text-neon-cyan',
    magenta: 'border-neon-magenta glow-magenta text-neon-magenta',
    yellow: 'border-neon-yellow glow-yellow text-neon-yellow',
    green: 'border-neon-green text-neon-green',
  };

  return (
    <Card className={`
      relative group p-6 bg-card/50 backdrop-blur-sm border-2 transition-all duration-300
      hover:scale-105 hover:rotate-1 crt-monitor
      ${colorClasses[color]}
      ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}>
      {/* Scanlines effect */}
      <div className="absolute inset-0 scanlines pointer-events-none rounded-lg" />
      
      <div className="relative z-10 text-center">
        {/* Game Icon */}
        <div className="text-6xl mb-4 animate-arcade-float">
          {icon}
        </div>
        
        {/* Game Title */}
        <h3 className="font-arcade text-xl mb-3 text-glow">
          {title}
        </h3>
        
        {/* Description */}
        <p className="font-cyber text-sm text-foreground/70 mb-4">
          {description}
        </p>
        
        {/* High Score */}
        {highScore !== undefined && (
          <div className="mb-4">
            <span className="font-cyber text-xs text-foreground/60">HIGH SCORE</span>
            <div className="font-arcade text-lg text-accent text-glow">
              {highScore.toLocaleString()}
            </div>
          </div>
        )}
        
        {/* Play Button */}
        <Button 
          variant={isAvailable ? "neon" : "ghost"}
          size="sm"
          className="font-cyber w-full"
          onClick={onPlay}
          disabled={!isAvailable}
        >
          {isAvailable ? "PLAY NOW" : "COMING SOON"}
        </Button>
        
        {/* Difficulty Indicator */}
        <div className="mt-3 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                level <= 3 ? `bg-${color === 'cyan' ? 'neon-cyan' : color === 'magenta' ? 'neon-magenta' : color === 'yellow' ? 'neon-yellow' : 'neon-green'}` : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GameCard;