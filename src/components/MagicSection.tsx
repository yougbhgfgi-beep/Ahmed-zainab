import { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { magicContent } from '../config/content';

export default function MagicSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  return (
    <section className="relative z-10 py-20 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-black text-emerald-300 mb-3">{magicContent.title}</h2>
        <p className="text-emerald-400 mb-10 text-lg">{magicContent.hint}</p>

        <button onClick={() => setOpen(true)}
          className="group relative px-12 py-5 rounded-full font-bold text-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #047857, #059669, #10b981)' }}>
          <span className="flex items-center gap-3">
            <Sparkles size={26} className="group-hover:rotate-12 transition-transform" />
            {magicContent.button}
            <Sparkles size={26} className="group-hover:-rotate-12 transition-transform" />
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(16, 185, 129, 0.08)', backdropFilter: 'blur(10px)' }}>
          <div className="glass-card rounded-3xl p-8 max-w-lg w-full shadow-2xl relative text-right max-h-[85vh] overflow-y-auto custom-scrollbar"
            style={{ boxShadow: '0 30px 70px rgba(16, 185, 129, 0.3)' }}>

            <button onClick={() => setOpen(false)}
              className="sticky top-0 float-left w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10">
              <X size={18} className="text-emerald-300" />
            </button>

            <div className="text-center mb-6 clear-both">
              <div className="text-5xl mb-3">💝</div>
              <h3 className="text-3xl font-black shimmer-text">{magicContent.popupTitle}</h3>
            </div>

            <div className="space-y-4 text-emerald-200 leading-relaxed">
              {magicContent.paragraphs.map((p, i) => (
                <p key={i} className="text-lg font-semibold">
                  {p}
                </p>
              ))}
              <p className="font-bold text-emerald-300 border-r-4 border-emerald-400/50 pr-4">
                {magicContent.highlight}
              </p>
            </div>

            <button onClick={() => setOpen(false)}
              className="mt-6 w-full py-3 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #047857, #10b981)' }}>
              {magicContent.close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}