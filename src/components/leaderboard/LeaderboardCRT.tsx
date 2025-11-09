import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

type ScoreItem = {
  _id: string;
  username: string;
  game: string;
  score: number;
  createdAt: string;
};

export default function LeaderboardCRT() {
  const [scores, setScores] = useState<ScoreItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/leaderboard/snake');
        if (!res.ok) throw new Error('Failed to load leaderboard');
        const data: ScoreItem[] = await res.json();
        setScores(data);
      } catch (e: any) {
        setErr(e.message || 'Error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 bg-card/90 backdrop-blur-sm border-2 border-neon-cyan crt-monitor">
        <div className="text-center mb-6">
          <h2 className="font-arcade text-3xl text-neon-cyan text-glow">LEADERBOARD</h2>
          <div className="font-cyber text-neon-magenta">SNAKE — TOP 10</div>
        </div>

        {loading && (
          <div className="text-center font-cyber text-foreground/70">Loading…</div>
        )}
        {err && (
          <div className="text-center font-cyber text-red-400">{err}</div>
        )}

        {!loading && !err && (
          <div className="overflow-hidden rounded-xl border border-neon-cyan/40">
            <table className="w-full font-cyber">
              <thead className="bg-black/50">
                <tr className="[&>th]:py-3 [&>th]:px-4 text-neon-cyan">
                  <th className="text-left">RANK</th>
                  <th className="text-left">PLAYER</th>
                  <th className="text-right">SCORE</th>
                  <th className="text-right">WHEN</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(odd)]:bg-black/30">
                {(scores ?? []).map((s, i) => (
                  <tr key={s._id} className="border-t border-neon-cyan/20 hover:bg-neon-cyan/5 transition">
                    <td className="py-3 px-4 text-neon-yellow">{String(i + 1).padStart(2, '0')}</td>
                    <td className="py-3 px-4 text-foreground">{s.username}</td>
                    <td className="py-3 px-4 text-right text-neon-magenta">{s.score}</td>
                    <td className="py-3 px-4 text-right text-foreground/70">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {scores?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-foreground/70">No scores yet. Be the first!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
