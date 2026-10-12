import { useMemo } from 'react';

const EMOJIS = ['❤️', '⭐', '💙', '✨', '🌹', '🎈', '💫', '🎁', '🌟', '💛'];

interface Particle {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingBackground() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: Math.random() * 100,
      size: 18 + Math.random() * 22,
      duration: 10 + Math.random() * 14,
      delay: Math.random() * 12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-float-up select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            bottom: '-60px',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
