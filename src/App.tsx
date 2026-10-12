import { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import FloatingBackground from './components/FloatingBackground';
import LoginPage from './components/LoginPage';
import EnvelopeModal from './components/EnvelopeModal';
import HeroSection from './components/HeroSection';
import CountersSection from './components/CountersSection';
import MagicSection from './components/MagicSection';
import CakeSection from './components/CakeSection';
import SweetWords from './components/SweetWords';
import GallerySection from './components/GallerySection';
import VideoSection from './components/VideoSection';
import OutroSection from './components/OutroSection';

type Stage = 'login' | 'envelope' | 'main';

/** 🎵 الأغنية الوحيدة في الموقع — حطّها في public/music.mp3 */
const MUSIC_SRC = './music.mp3';

export default function App() {
  const [stage, setStage] = useState<Stage>('login');
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    setStage('envelope');
    playMusic();
  }, [playMusic]);

  const handleCloseEnvelope = useCallback(() => {
    setStage('main');
    playMusic();
  }, [playMusic]);

  // 🎬 لما الفيديو يشتغل → وقّف الأغنية. ولما يتوقف/يخلص → كمّلها زي ما كانت
  useEffect(() => {
    const onVideoStart = () => {
      const audio = audioRef.current;
      if (!audio) return;
      // سجّل إن الأغنية كانت شغالة عشان نرجّعها بعدين
      audio.dataset.wasPlaying = audio.paused ? '0' : '1';
      if (!audio.paused) audio.pause();
    };
    const onVideoStop = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.dataset.wasPlaying === '1') {
        audio.play().then(() => setMusicOn(true)).catch(() => {});
        audio.dataset.wasPlaying = '0';
      }
    };
    window.addEventListener('birthday-video-start', onVideoStart);
    window.addEventListener('birthday-video-stop', onVideoStop);
    return () => {
      window.removeEventListener('birthday-video-start', onVideoStart);
      window.removeEventListener('birthday-video-stop', onVideoStop);
    };
  }, []);

  const Divider = ({ emoji }: { emoji: string }) => (
    <div className="flex items-center justify-center gap-4 px-4">
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-pink-200" />
      <span className="text-2xl">{emoji}</span>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-pink-200" />
    </div>
  );

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f5 0%, #ffe4f0 30%, #fff0f5 60%, #ffd6e8 100%)' }}>

      {/* 🎵 الأغنية */}
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      {/* زر التحكم في الأغنية */}
      <div className="fixed top-6 left-6 z-[60]">
        <button onClick={toggleMusic} aria-label="تشغيل/إيقاف الأغنية"
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-90"
          style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
          {musicOn ? <Volume2 size={22} className="text-white" /> : <VolumeX size={22} className="text-white" />}
        </button>
      </div>

      {stage === 'login' ? (
        <LoginPage onLogin={handleLogin} onStartTyping={playMusic} />
      ) : (
        <>
          {/* Chic Fixed Border */}
          <div className="fixed inset-2 md:inset-4 border-[3px] md:border-[6px] border-pink-400/30 rounded-2xl md:rounded-3xl pointer-events-none z-50 shadow-[inset_0_0_20px_rgba(255,105,180,0.15)]" />

          <FloatingBackground />

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
