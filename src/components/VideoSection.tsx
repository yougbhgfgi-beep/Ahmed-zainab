import { videoContent } from '../config/content';

export default function VideoSection() {
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
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={videoContent.src}
              controls
              playsInline
              preload="metadata"
              title="Birthday Video"
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
