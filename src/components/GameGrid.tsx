import { useState } from 'react';
import GameCard from './GameCard';
import SnakeGame from './games/SnakeGame';

const GameGrid = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [highScores, setHighScores] = useState<Record<string, number>>({
    snake: 0,
    tetris: 0,
    flappybird: 0,
    pong: 0,
    pacman: 0,
    breakout: 0,
  });

  const games = [
    {
      id: 'snake',
      title: 'SNAKE',
      description: 'Classic snake game. Eat the food, grow longer, avoid walls and yourself.',
      icon: '🐍',
      color: 'cyan' as const,
      isAvailable: true,
    },
    {
      id: 'tetris',
      title: 'TETRIS',
      description: 'Stack falling blocks to clear lines. How long can you survive?',
      icon: '🧩',
      color: 'magenta' as const,
      isAvailable: false,
    },
    {
      id: 'flappybird',
      title: 'FLAPPY BIRD',
      description: 'Navigate through pipes by flapping. Simple controls, endless challenge.',
      icon: '🐦',
      color: 'yellow' as const,
      isAvailable: false,
    },
    {
      id: 'pong',
      title: 'PONG',
      description: 'The original video game. Control your paddle and beat the computer.',
      icon: '🏓',
      color: 'green' as const,
      isAvailable: false,
    },
    {
      id: 'pacman',
      title: 'PAC-MAN',
      description: 'Collect dots while avoiding ghosts in this maze-running classic.',
      icon: '👻',
      color: 'cyan' as const,
      isAvailable: false,
    },
    {
      id: 'breakout',
      title: 'BREAKOUT',
      description: 'Break all the blocks with your ball and paddle. Precision is key.',
      icon: '🧱',
      color: 'magenta' as const,
      isAvailable: false,
    },
  ];

  const handlePlayGame = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const handleScoreUpdate = (gameId: string, score: number) => {
    if (score > highScores[gameId]) {
      setHighScores(prev => ({ ...prev, [gameId]: score }));
    }
  };

  const handleCloseGame = () => {
    setCurrentGame(null);
  };

  return (
    <>
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <h2 className="font-arcade text-3xl md:text-4xl text-center text-accent text-glow mb-12">
            SELECT YOUR GAME
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {games.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                highScore={highScores[game.id]}
                isAvailable={game.isAvailable}
                icon={game.icon}
                color={game.color}
                onPlay={() => handlePlayGame(game.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Game Modals */}
      {currentGame === 'snake' && (
        <SnakeGame
          onClose={handleCloseGame}
          onScore={(score) => handleScoreUpdate('snake', score)}
        />
      )}
    </>
  );
};

export default GameGrid;