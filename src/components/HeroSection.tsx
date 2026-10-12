import { Heart, Star } from 'lucide-react';
import { heroContent, recipient, getAge } from '../config/content';

export default function HeroSection() {
  const age = getAge(recipient.birthDate);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative z-10 text-center px-4 pt-16">
      {/* Stars row */}
      <div className="flex gap-3 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} className="text-yellow-400 fill-yellow-400 animate-twinkle"
            style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </div>

      {/* Main title */}
      <div className="mb-4">
        <p className="text-pink-400 font-semibold text-xl mb-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          ✨ {recipient.birthDateShort} ✨
        </p>
        <h1 className="font-black leading-tight shimmer-text"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 6.5rem)' }}>
          {recipient.name} ⭐ {recipient.nameLatin}
        </h1>
        <p className="text-2xl font-bold text-pink-500 mt-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {heroContent.birthdayLabel}
        </p>
      </div>

      {/* Subtitle */}
      <p className="text-pink-400 text-lg max-w-md leading-relaxed animate-fade-in-up font-medium"
        style={{ animationDelay: '0.5s' }}>
        {heroContent.subtitle}
      </p>

      {/* Heart divider */}
      <div className="flex items-center gap-4 my-10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-pink-300" />
        <Heart size={28} className="text-pink-400 fill-pink-300 animate-heartbeat" />
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-pink-300" />
      </div>

      {/* Floating badge */}
      <div className="glass-card rounded-full px-8 py-4 shadow-lg animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}>
        <p className="text-pink-600 font-bold text-lg">
          ⭐ {age} سنة من التألق والنجاح ⭐
        </p>
      </div>

      {/* Mega greeting line */}
      <p className="mt-8 text-pink-500 font-semibold text-base md:text-lg max-w-lg leading-relaxed animate-fade-in-up px-2"
        style={{ animationDelay: '0.9s' }}>
        {heroContent.megaGreeting}
      </p>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2"
        style={{ animationDelay: '1s' }}>
        <p className="text-pink-300 text-sm font-medium">{heroContent.scrollHint}</p>
        <div className="w-6 h-10 rounded-full border-2 border-pink-300 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-pink-400" />
        </div>
      </div>
    </section>
  );
}
