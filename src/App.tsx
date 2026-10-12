import { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import FloatingBackground from './components/FloatingBackground';
import LoginPage from './components/LoginPage';
import EnvelopeModal from './components/EnvelopeModal';
import WishScreen from './components/WishScreen';
import HeroSection from './components/HeroSection';
import CountersSection from './components/CountersSection';
import MagicSection from './components/MagicSection';
import CakeSection from './components/CakeSection';
import SweetWords from './components/SweetWords';
import GallerySection from './components/GallerySection';
import VideoSection from './components/VideoSection';
import OutroSection from './components/OutroSection';

type Stage = 'login' | 'wish' | 'envelope' | 'main';

/** 🎵 الأغنية الوحيدة في الموقع — حطّها في public/music.mp3 */
const MUSIC_SRC = './music.mp3';

export default function App() {
  const [stage, setStage] = useState<Stage>('login');
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicOnRef = useRef(false);
  const videoActiveRef = useRef(false);

  // متابعة حالة الموسيقى في مرجع عشان نقدر نرد عليها من أي لمسة
  useEffect(() => { musicOnRef.current = musicOn; }, [musicOn]);

  // تشغيل الأغنية (بتشتغل أول ما المستخدم يبدأ يكتب كلمة السر)
  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setMusicOn(true)).catch(() => {});
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      setMusicOn(false);
    }
  }, [playMusic]);

  const handleLogin = useCallback(() => {
    setStage('wish');
    playMusic();
  }, [playMusic]);

  const handleCloseEnvelope = useCallback(() => {
    setStage('main');
    playMusic();
  }, [playMusic]);

  // بعد لحظة الأمنية → الرسالة
  const handleGoToEnvelope = useCallback(() => {
    setStage('envelope');
  }, []);

  // 🎬 أثناء الفيديو → الأغنية بتكمل بصمت (كتم)، ولما يتوقف/يخلص → ترجع تلقائيًا
  // بتغطي كل الحالات: لو المتصفح كمّلها بصمت بنرجّع صوتها، ولو أوقفها خالص بنشغّلها تاني
  useEffect(() => {
    const onVideoStart = () => {
      const audio = audioRef.current;
      if (!audio) return;
      // سجّل إن الأغنية كانت شغالة عشان نرجّعها بعدين
      audio.dataset.wasPlaying = audio.paused ? '0' : '1';
      videoActiveRef.current = true; // الفيديو شغال — نحافظ على الكتم
      if (!audio.paused) audio.volume = 0;
    };

    let resumeAttempts = 0;
    const resumeMusic = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.dataset.wasPlaying !== '1') return; // كانت مطفية من قبل — منشغلهاش غصب
      audio.dataset.wasPlaying = '0';
      audio.volume = 1;
      if (audio.paused) {
        audio.play()
          .then(() => setMusicOn(true))
          .catch(() => {
            // لو المتصفح كان لسه ماسك جلسة الفيديو → جرّب تاني كام مرة
            audio.dataset.wasPlaying = '1';
            if (resumeAttempts < 10) {
              resumeAttempts += 1;
              setTimeout(resumeMusic, 400);
            } else {
              audio.dataset.wasPlaying = '0';
            }
          });
      } else {
        setMusicOn(true);
      }
    };

    const onVideoStop = () => {
      videoActiveRef.current = false; // الفيديو وقف — الأغنية تكمّل
      resumeAttempts = 0;
      resumeMusic();
    };

    // 📲 أول ما المستخدم يلمس أي جزء في الشاشة (والموسيقى كانت شغالة لكن المتصفح وقفها)
    // → الأغنية تكمّل لوحدها من نفس المكان من غير ما يدوس على زر الأغنية
    const resumeOnTouch = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!musicOnRef.current) return; // كانت مقفولة بإيده — منفتحهاش غصب
      if (videoActiveRef.current) return; // الفيديو لسه شغال — نحافظ على الكتم
      if (audio.paused) {
        audio.volume = 1;
        audio.play().then(() => setMusicOn(true)).catch(() => {});
      } else if (audio.volume === 0) {
        audio.volume = 1;
        setMusicOn(true);
      }
    };

    window.addEventListener('birthday-video-start', onVideoStart);
    window.addEventListener('birthday-video-stop', onVideoStop);
    window.addEventListener('pointerdown', resumeOnTouch);
    window.addEventListener('touchstart', resumeOnTouch);
    return () => {
      window.removeEventListener('birthday-video-start', onVideoStart);
      window.removeEventListener('birthday-video-stop', onVideoStop);
      window.removeEventListener('pointerdown', resumeOnTouch);
      window.removeEventListener('touchstart', resumeOnTouch);
    };
  }, []);

  const Divider = ({ emoji }: { emoji: string }) => (
    <div className="flex items-center justify-center gap-4 px-4">
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-emerald-300" />
      <span className="text-2xl">{emoji}</span>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-emerald-300" />
    </div>
  );

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, #04120a 0%, #0a2416 30%, #071b10 60%, #030f09 100%)' }}>

      {/* 🎵 الأغنية */}
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      {/* زر التحكم في الأغنية */}
      <div className="fixed top-6 left-6 z-[60]">
        <button onClick={toggleMusic} aria-label="تشغيل/إيقاف الأغنية"
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-90"
          style={{ background: 'linear-gradient(135deg, #047857, #10b981)' }}>
          {musicOn ? <Volume2 size={22} className="text-white" /> : <VolumeX size={22} className="text-white" />}
        </button>
      </div>

      {stage === 'login' ? (
        <LoginPage onLogin={handleLogin} onStartTyping={playMusic} />
      ) : (
        <>
          {/* Chic Fixed Border */}
          <div className="fixed inset-2 md:inset-4 border-[3px] md:border-[6px] border-emerald-400/20 rounded-2xl md:rounded-3xl pointer-events-none z-50 shadow-[inset_0_0_20px_rgba(16,185,129,0.12)]" />

          <FloatingBackground />

          {stage === 'wish' && (
            <WishScreen onNext={handleGoToEnvelope} />
          )}

          {stage === 'envelope' && (
            <EnvelopeModal onClose={handleCloseEnvelope} />
          )}

          {/* Page content — always rendered so it's behind the envelope modal */}
          <main>
            <HeroSection />
            <Divider emoji="⏳" />
            <CountersSection />
            <Divider emoji="💙" />
            <MagicSection />
            <Divider emoji="❤️" />
            <CakeSection />
            <Divider emoji="✨" />
            <SweetWords />
            <Divider emoji="📸" />
            <GallerySection />
            <Divider emoji="🎬" />
            <VideoSection />
            <Divider emoji="🌟" />
            <OutroSection />
          </main>
        </>
      )}
    </div>
  );
}
