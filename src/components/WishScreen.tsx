import { Sparkles, Mail } from 'lucide-react';

interface Props {
  onNext: () => void;
}

export default function WishScreen({ onNext }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #04120a 0%, #0a2416 50%, #030f09 100%)' }}>

      {/* نجوم متلألئة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(26)].map((_, i) => (
          <span key={i} className="absolute text-emerald-300/40 animate-twinkle select-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${8 + Math.random() * 14}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}>✦</span>
        ))}
      </div>

      {/* قلوب ونجوم عايمة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-[15%] right-[12%] text-3xl animate-float-bounce" style={{ animationDelay: '0s' }}>💫</span>
        <span className="absolute top-[25%] left-[10%] text-2xl animate-float-bounce" style={{ animationDelay: '0.7s' }}>✨</span>
        <span className="absolute bottom-[20%] right-[18%] text-2xl animate-float-bounce" style={{ animationDelay: '1.3s' }}>💚</span>
        <span className="absolute bottom-[28%] left-[15%] text-3xl animate-float-bounce" style={{ animationDelay: '0.4s' }}>⭐</span>
        <span className="absolute top-[55%] left-[6%] text-xl animate-float-bounce" style={{ animationDelay: '1.8s' }}>💫</span>
        <span className="absolute top-[60%] right-[7%] text-xl animate-float-bounce" style={{ animationDelay: '1s' }}>✨</span>
      </div>

      <div className="relative z-10 max-w-lg w-full text-center animate-fade-in-scale">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8 shadow-2xl animate-pulse-glow"
          style={{ background: 'linear-gradient(135deg, #047857, #10b981)' }}>
          <Sparkles size={30} className="text-white" />
        </div>

        <p className="text-2xl md:text-3xl font-black shimmer-text mb-6">
          قبل ما تفتح الرسالة...
        </p>

        <p className="text-xl md:text-2xl font-bold text-emerald-200 leading-relaxed mb-4">
          أغمض عنيك كده... 😌
        </p>
        <p className="text-lg text-emerald-300 leading-relaxed mb-8">
          وتمنى أمنية من قلبك 💫
        </p>
        <p className="text-sm text-emerald-400/80 leading-relaxed mb-10">
          بس افتحها وقلبك متمني — محدش هياخد باله 😉
        </p>

        <button onClick={onNext}
          className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold text-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          style={{ background: 'linear-gradient(135deg, #047857, #10b981)' }}>
          <Mail size={22} className="group-hover:-translate-y-0.5 transition-transform" />
          جاهز؟ افتح الرسالة 💌
        </button>
      </div>
    </div>
  );
}