import ArcadeHeader from "@/components/ArcadeHeader";
import GameGrid from "@/components/GameGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-arcade">
      {/* Retro CRT scanlines overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-10" />
      
      <main className="relative z-20">
        <ArcadeHeader />
        <GameGrid />
        
        {/* Footer */}
        <footer className="py-8 text-center border-t border-neon-cyan/20">
          <p className="font-cyber text-foreground/60">
            Built with ❤️ for retro gaming enthusiasts
          </p>
          <p className="font-cyber text-sm text-foreground/40 mt-2">
            Connect to Supabase for leaderboards and user accounts
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
