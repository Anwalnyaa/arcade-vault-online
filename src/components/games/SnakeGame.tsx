import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

const SnakeGame = ({ onClose, onScore }: { onClose: () => void; onScore: (score: number) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE));
    const y = Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE));
    return { x, y };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameRunning(false);
  };

  const startGame = () => {
    resetGame();
    setGameRunning(true);
    setDirection({ x: 1, y: 0 });
  };

  const gameLoop = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      // Wall collision
      if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        onScore(score);
        return currentSnake;
      }

      // Self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        onScore(score);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, gameOver, score, onScore, generateFood]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 150);
    return () => clearInterval(interval);
  }, [gameLoop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'hsl(260, 20%, 8%)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid
    ctx.strokeStyle = 'hsl(180, 100%, 50%, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? 'hsl(180, 100%, 50%)' : 'hsl(180, 100%, 40%)';
      ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
      
      if (index === 0) {
        ctx.shadowColor = 'hsl(180, 100%, 50%)';
        ctx.shadowBlur = 10;
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
        ctx.shadowBlur = 0;
      }
    });

    // Draw food
    ctx.fillStyle = 'hsl(300, 100%, 50%)';
    ctx.shadowColor = 'hsl(300, 100%, 50%)';
    ctx.shadowBlur = 15;
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
    ctx.shadowBlur = 0;
  }, [snake, food]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameRunning]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-neon-cyan crt-monitor">
        <div className="text-center mb-4">
          <h2 className="font-arcade text-2xl text-neon-cyan text-glow mb-2">SNAKE</h2>
          <div className="font-cyber text-neon-yellow">SCORE: {score}</div>
        </div>

        <div className="relative mb-4">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="border-2 border-neon-cyan/50 bg-background/50 scanlines"
          />
          
          {!gameRunning && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="text-center">
                <div className="font-arcade text-neon-cyan text-glow mb-4">READY?</div>
                <Button variant="arcade" onClick={startGame} className="font-cyber">
                  START GAME
                </Button>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="text-center">
                <div className="font-arcade text-neon-magenta text-glow mb-2">GAME OVER</div>
                <div className="font-cyber text-neon-yellow mb-4">FINAL SCORE: {score}</div>
                <div className="flex gap-2">
                  <Button variant="arcade" onClick={startGame} className="font-cyber">
                    PLAY AGAIN
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-foreground/60 font-cyber mb-4">
          Use arrow keys to control the snake
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="ghost" onClick={onClose} className="font-cyber">
            BACK TO ARCADE
          </Button>
          {gameRunning && (
            <Button variant="destructive" onClick={() => { setGameRunning(false); setGameOver(true); }} className="font-cyber">
              PAUSE
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SnakeGame;