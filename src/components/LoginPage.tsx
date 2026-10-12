import { useState, useRef } from 'react';
import { Heart, Sparkles, Cake } from 'lucide-react';
import { loginContent, passwords, sender } from '../config/content';

interface Props {
  onLogin: () => void;
  onStartTyping?: () => void;
}

export default function LoginPage({ onLogin, onStartTyping }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const musicStarted = useRef(false);

  const handleChange = (value: string) => {
    setPassword(value);
    // 🎵 أول ما تبدأ تكتب كلمة السر، الأغنية تشتغل
    if (!musicStarted.current && value.length > 0) {
      musicStarted.current = true;
      onStartTyping?.();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = password.trim().toLowerCase();
    const ok = passwords.some((p) => p.trim().toLowerCase() === entered);

    if (ok) {
      setLoading(true);
      setTimeout(() => onLogin(), 800);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ffe4f0 0%, #fff0f5 40%, #ffd6e8 100%)' }}>

      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ff69b4, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ff1493, transparent)' }} />

      {/* Stars */}
      {[...Array(8)].map((_, i) => (
        <span key={i} className="absolute animate-twinkle text-pink-300 text-xl select-none"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + i * 12}%`,
            animationDelay: `${i * 0.3}s`,
          }}>✦</span>
      ))}

      <div className={`glass-card rounded-3xl p-10 w-full max-w-md mx-4 shadow-2xl text-center animate-fade-in-scale relative z-10 ${shaking ? 'animate-[wiggle_0.3s_ease-in-out_2]' : ''}`}
        style={{ boxShadow: '0 25px 60px rgba(255, 105, 180, 0.25)' }}>

        {/* Top decoration */}
        <div className="flex justify-center mb-6 gap-2">
          {['❤️', '⭐', '💖', '⭐', '❤️'].map((e, i) => (
            <span key={i} className="text-2xl">{e}</span>
          ))}
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)', boxShadow: '0 0 30px rgba(255,105,180,0.5)' }}>
            <Cake size={44} className="text-white" />
            <span className="absolute -top-1 -right-1 text-lg">🎂</span>
            <span className="absolute -bottom-1 -left-1 text-sm">✨</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black mb-2 shimmer-text">{loginContent.title}</h1>
        <p className="text-pink-500 font-semibold text-lg mb-1">{loginContent.greeting}</p>
        <p className="text-pink-400 text-sm mb-8">{loginContent.prompt}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={loginContent.placeholder}
              className="pink-input w-full px-5 py-4 rounded-2xl border-2 border-pink-200 bg-white/70 text-center text-pink-700 text-lg font-semibold placeholder-pink-300 transition-all"
              style={{ direction: 'rtl', letterSpacing: '0.15em' }}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-medium animate-fade-in-up">
              {loginContent.error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-xl text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={20} className="animate-spin" />
                {loginContent.loading}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Heart size={20} />
                {loginContent.button}
              </span>
            )}
          </button>
        </form>

        <p className="mt-6 text-pink-300 text-xs">{loginContent.footer}</p>
        <p className="mt-2 text-pink-200 text-[11px]">من {sender.name} 💗</p>
      </div>
    </div>
  );
}
