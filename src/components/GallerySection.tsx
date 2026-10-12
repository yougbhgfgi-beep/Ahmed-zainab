import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { galleryImages, galleryContent } from '../config/content';

export default function GallerySection() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (selected) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-pink-600 mb-3">{galleryContent.title}</h2>
          <p className="text-pink-400 text-lg">{galleryContent.subtitle}</p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
            <span className="text-pink-400 text-xl">📷</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((src, i) => (
            <div key={i} className="gallery-item rounded-3xl overflow-hidden shadow-xl cursor-pointer relative group border-4 border-white aspect-square"
              onClick={() => setSelected(src)}>
              <img src={src} alt={`ذكرى ${i + 1}`}
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors" />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
          onClick={() => setSelected(null)}>
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)}
              className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl z-10 hover:bg-pink-50 transition-colors">
              <X size={24} className="text-pink-500" />
            </button>
            <img src={selected} alt="صورة" className="w-full rounded-3xl shadow-[0_0_40px_rgba(255,105,180,0.4)] object-contain max-h-[80vh] bg-black/20" />
          </div>
        </div>
      )}
    </section>
  );
}
