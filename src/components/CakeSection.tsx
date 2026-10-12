import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cakeContent, getDisplayAge } from '../config/content';

interface Confetti {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: string;
}

const COLORS = ['#ff69b4', '#ff1493', '#ffd700', '#ff6eb4', '#ffb6c1', '#ff85a1', '#ffc0cb'];

export default function CakeSection() {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showWish, setShowWish] = useState(false);

  const ageDigits = String(getDisplayAge()).split('');

  useEffect(() => {
    if (showWish) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showWish]);

  const blowCandles = () => {
    if (blown) return;
    setBlown(true);
    const pieces: Confetti[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 8 + Math.random() * 10,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.8,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));
    setConfetti(pieces);
    setTimeout(() => setShowWish(true), 800);
    setTimeout(() => setConfetti([]), 4000);
  };

  useEffect(() => {
    if (blown) {
      const t = setTimeout(() => setConfetti([]), 4500);
      return () => clearTimeout(t);
    }
  }, [blown]);

  const NumberCandle = ({ digit }: { digit: string }) => (
    <div className="relative flex flex-col items-center">
      {/* Flame */}
      {!blown ? (
        <div className="candle-flame mb-1 z-10">
          <div className="w-3 h-4 rounded-full" style={{ background: 'radial-gradient(ellipse, #fff9c4, #ffd700 40%, #ff6b00)', boxShadow: '0 0 10px #ff6b00, 0 0 20px #ffd700' }} />
        </div>
      ) : (
        <div className="w-2 h-2 rounded-full bg-gray-400 opacity-50 mb-2" />
      )}
      {/* Wick */}
      <div className="w-0.5 h-2 bg-gray-700 -mb-1 z-0" />
      {/* Number Shape */}
      <div className="text-6xl font-black relative" style={{
        color: '#ff69b4',
        WebkitTextStroke: '2px white',
        filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.2))'
      }}>
        {digit}
      </div>
    </div>
  );

  return (
    <section className="relative z-10 py-20 px-4 text-center">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {confetti.map((c) => (
          <div key={c.id} className="absolute confetti-piece"
            style={{
              left: `${c.left}%`,
              top: '-20px',
              width: c.shape === 'circle' ? c.size : c.size * 0.7,
              height: c.shape === 'circle' ? c.size : c.size * 1.4,
              borderRadius: c.shape === 'circle' ? '50%' : '2px',
              background: c.color,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-pink-600 mb-2">{cakeContent.title}</h2>
        <p className="text-pink-400 mb-10">
          {blown ? cakeContent.afterBlow : cakeContent.beforeBlow}
        </p>

        {/* Cake */}
        <div className="flex flex-col items-center cursor-pointer group" onClick={blowCandles}>
          {/* Candles row */}
          <div className="flex gap-2 items-end mb-1 transition-transform group-hover:scale-105 z-20" dir="ltr">
            {ageDigits.map((d, i) => (
              <NumberCandle key={i} digit={d} />
            ))}
          </div>

          {/* Top tier */}
          <div className="relative w-52 h-16 rounded-t-full shadow-lg overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #ff69b4, #ff85a1)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">⭐ Happy Birthday ⭐</span>
            </div>
          </div>

          {/* Middle tier */}
          <div className="relative w-72 h-20 shadow-lg overflow-hidden -mt-1"
            style={{ background: 'linear-gradient(135deg, #ffc0cb, #ffb6c1)' }}>
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              {['❤️', '⭐', '❤️', '⭐', '❤️'].map((e, i) => (
                <span key={i} className="text-lg">{e}</span>
              ))}
            </div>
            {/* Drip effect */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute top-0 rounded-b-full"
                style={{
                  left: `${8 + i * 12}%`,
                  width: 14,
                  height: 10 + Math.random() * 12,
                  background: '#ff69b4',
                }} />
            ))}
          </div>

          {/* Bottom tier */}
          <div className="relative w-80 h-24 rounded-b-3xl shadow-xl overflow-hidden -mt-1"
            style={{ background: 'linear-gradient(135deg, #ff85a1, #ff69b4)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl">{cakeContent.cakeName}</span>
            </div>
            {/* Bottom decoration */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {['⭐', '❤️', '⭐', '❤️', '⭐'].map((e, i) => (
                <span key={i} className="text-sm">{e}</span>
              ))}
            </div>
          </div>

          {/* Plate */}
          <div className="w-96 h-4 rounded-full -mt-1 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #ffd6e8, #ffc0cb)' }} />
        </div>

        {!blown && (
          <p className="mt-6 text-pink-400 text-sm">
            دوس على التورتة عشان تنطفّ الشمع! ✨
          </p>
        )}
      </div>

      {/* Wish Modal */}
      {showWish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(255, 20, 147, 0.1)', backdropFilter: 'blur(10px)' }}>
          <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center max-h-[85vh] overflow-y-auto custom-scrollbar"
            style={{ boxShadow: '0 30px 70px rgba(255, 105, 180, 0.35)' }}>

            <button onClick={() => setShowWish(false)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors">
              <X size={18} className="text-pink-500" />
            </button>

            <div className="text-6xl mb-4">🎊</div>
            <h3 className="text-3xl font-black shimmer-text mb-4">
              {cakeContent.wishTitle}
            </h3>
            <div className="space-y-3 text-pink-700 leading-relaxed text-lg text-right">
              {cakeContent.wishParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4 text-3xl">
              {['🎉', '🎊', '🌟', '🎈', '💝'].map((e, i) => (
                <span key={i}>{e}</span>
              ))}
            </div>
            <button onClick={() => setShowWish(false)}
              className="mt-6 w-full py-3 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
              {cakeContent.close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
