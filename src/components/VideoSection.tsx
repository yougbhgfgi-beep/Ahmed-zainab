import { useEffect, useRef, useState } from 'react';
import { videoContent } from '../config/content';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [aspect, setAspect] = useState<string | null>(null);

  // 🎬 بلّغ الأغنية إن الفيديو اشتغل/وقف
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleStart = () => window.dispatchEvent(new Event('birthday-video-start'));
    const handleStop = () => window.dispatchEvent(new Event('birthday-video-stop'));

    video.addEventListener('play', handleStart);
    video.addEventListener('pause', handleStop);
    video.addEventListener('ended', handleStop);

    return () => {
      video.removeEventListener('play', handleStart);
      video.removeEventListener('pause', handleStop);
      video.removeEventListener('ended', handleStop);
    };
  }, []);

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-pink-600 mb-3">{videoContent.title}</h2>
          <p className="text-pink-400 text-lg">{videoContent.subtitle}</p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
            <span className="text-pink-400 text-xl">🎥</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
          </div>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 25px 60px rgba(255, 105, 180, 0.2)' }}>
          <div className="relative w-full bg-black"
            style={{ aspectRatio: aspect ?? '16 / 9', maxHeight: '75vh' }}>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain"
              src={videoContent.src}
              controls
              playsInline
              preload="metadata"
              title="Birthday Video"
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                if (v.videoWidth && v.videoHeight) setAspect(`${v.videoWidth} / ${v.videoHeight}`);
              }}
            />
          </div>
          <div className="p-6 text-center">
            <p className="text-pink-500 font-semibold">{videoContent.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}