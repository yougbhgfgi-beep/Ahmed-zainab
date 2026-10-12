import { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { outroContent, recipient, avatarSrc } from '../config/content';

export default function OutroSection() {
  const [playing, setPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);

  const LINES = outroContent.lines;

  useEffect(() => {
    if (playing) {
      let step = 0;
      setCurrentLine(0);
      const interval = setInterval(() => {
        step++;
        setCurrentLine(step);
        if (step > LINES.length) {
          clearInterval(interval);
        }
      }, 3800); // كل جملة بتظهر كل 3.8 ثانية
      return () => clearInterval(interval);
    } else {
      setCurrentLine(-1);
    }
  }, [playing, LINES.length]);

  const done = currentLine >= LINES.length;

  return (
    <section className="relative z-10 py-24 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-3xl font-black text-emerald-300 mb-3">{outroContent.title}</h2>
          <p className="text-emerald-400 text-lg">{outroContent.subtitle}</p>
        </div>

        <button onClick={() => setPlaying(true)}
          className="group relative px-12 py-5 rounded-full font-bold text-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #047857, #059669, #10b981)' }}>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="flex items-center gap-3 relative z-10">
            <Heart size={26} className="fill-white group-hover:scale-110 transition-transform" />
            {outroContent.button}
            <Heart size={26} className="fill-white group-hover:scale-110 transition-transform" />
          </span>
        </button>

        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-28 bg-gradient-to-r from-transparent to-emerald-300" />
          <span className="text-emerald-300 text-2xl animate-spin-slow">✨</span>
          <div className="h-px w-28 bg-gradient-to-l from-transparent to-emerald-300" />
        </div>
        <p className="mt-4 text-emerald-300 text-sm font-semibold">{outroContent.footer}</p>
      </div>

      {playing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #020d07, #082315, #020d07)' }}>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <span key={i} className="absolute text-emerald-300/40 animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  fontSize: `${6 + Math.random() * 10}px`,
                  animationDelay: `${Math.random() * 4}s`,
                }}>✦</span>
            ))}
          </div>

          <div className="relative z-10 max-w-2xl w-full px-6 flex flex-col items-center justify-center h-full">

            {/* Cinematic Text Animation */}
            {!done ? (
              <div className="w-full text-center flex flex-col items-center justify-center h-[50vh] relative">
                {LINES.map((line, i) => (
                  <p key={i}
                    className={`text-2xl md:text-4xl font-bold leading-relaxed transition-all duration-1000 transform absolute w-full px-4
                      ${currentLine === i ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}
                    `}
                    style={{
                      fontFamily: 'Cairo',
                      color: i === LINES.length - 1 ? '#6ee7b7' : '#d1fae5',
                      textShadow: '0 2px 20px rgba(16, 185, 129, 0.5)'
                    }}>
                    {line}
                  </p>
                ))}

                {/* Skip button during animation */}
                <button onClick={() => setCurrentLine(LINES.length)}
                  className="absolute -bottom-20 text-emerald-400/60 hover:text-emerald-300 text-sm font-medium transition-colors">
                  تخطي &gt;&gt;
                </button>
              </div>
            ) : (
              /* Final Scene Card */
              <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(16,185,129,0.25)] animate-fade-in-scale text-center relative border border-emerald-400/25 bg-black/40 backdrop-blur-md mt-10">

                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-emerald-300 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.5)] z-20 flex items-center justify-center bg-white">
                  <img src={avatarSrc} alt={recipient.name} className="w-full h-full object-cover" />
                </div>

                <div className="mt-16 mb-8">
                  <p className="text-white text-4xl font-black shimmer-text mb-3">{recipient.name} ❤️</p>
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <Sparkles className="text-emerald-300" size={18} />
                    <p className="text-emerald-200 font-semibold text-lg tracking-wide">{outroContent.badge}</p>
                    <Sparkles className="text-emerald-300" size={18} />
                  </div>
                </div>

                <button onClick={() => { setPlaying(false); setCurrentLine(-1); }}
                  className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.35)] relative overflow-hidden group"
                  style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10 flex items-center gap-2">
                    {outroContent.back} <ArrowRight size={22} className="group-hover:-translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}