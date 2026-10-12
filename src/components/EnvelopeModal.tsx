import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { envelopeContent } from '../config/content';

const TypewriterEffect = ({ paragraphs }: { paragraphs: string[] }) => {
  const [charIndex, setCharIndex] = useState(0);
  const fullText = paragraphs.join('\n\n');

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, 22);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText]);

  const visibleFullText = fullText.slice(0, charIndex);
  const visibleParagraphs = visibleFullText.split('\n\n');

  return (
    <div className="space-y-6">
      {visibleParagraphs.map((p, i) => (
        <p key={i} className={`text-emerald-300 ${i === paragraphs.length - 1 ? 'text-lg font-bold text-emerald-200' : 'text-base'}`}>
          {p}
        </p>
      ))}
    </div>
  );
};

interface Props {
  onClose: () => void;
}

export default function EnvelopeModal({ onClose }: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2, 12, 8, 0.72)', backdropFilter: 'blur(8px)' }}>

      <div className="relative w-full max-w-2xl animate-fade-in-scale">
        {!opened ? (
          /* ENVELOPE CLOSED */
          <div className="text-center">
            <p className="text-emerald-200 font-bold text-xl mb-8">
              {envelopeContent.prompt}
            </p>
            <button onClick={() => setOpened(true)}
              className="relative mx-auto block cursor-pointer group transition-transform hover:scale-105">
              {/* Envelope body */}
              <div className="w-72 h-48 mx-auto rounded-2xl shadow-2xl relative overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #0a2b1b, #052016)' }}>

                {/* Envelope flap */}
                <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
                  <div className="w-full h-full"
                    style={{
                      background: 'linear-gradient(145deg, #10b981, #047857)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }} />
                </div>

                {/* Center heart */}
                <div className="absolute inset-0 flex items-center justify-center mt-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                    <Heart size={24} className="text-white fill-white" />
                  </div>
                </div>

                {/* Bottom folds */}
                <div className="absolute bottom-0 left-0 right-0 h-16"
                  style={{
                    background: 'linear-gradient(to top, #10b981, transparent)',
                  }} />
              </div>
            </button>
          </div>
        ) : (
          /* LETTER OPENED */
          <div className="glass-card rounded-3xl p-6 md:p-10 shadow-2xl animate-letter-slide relative max-h-[85vh] overflow-y-auto custom-scrollbar"
            style={{ boxShadow: '0 30px 70px rgba(16, 185, 129, 0.25)' }}>

            <button onClick={onClose}
              className="sticky top-0 float-left w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10">
              <X size={20} className="text-emerald-300" />
            </button>

            <div className="text-center mb-8 clear-both">
              <div className="flex justify-center gap-1 text-2xl mb-3">
                {'💌 ❤️ 💌'.split(' ').map((e, i) => (
                  <span key={i}>{e}</span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-black shimmer-text">{envelopeContent.title}</h2>
            </div>

            <div className="text-right leading-relaxed" style={{ fontFamily: 'Cairo', color: '#d1fae5' }}>
              <TypewriterEffect paragraphs={envelopeContent.paragraphs} />

              <div className="my-8 flex items-center justify-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-300" />
                <Heart size={20} className="text-emerald-300 fill-emerald-400" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-300" />
              </div>
            </div>

            <button onClick={onClose}
              className="mt-6 w-full py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #047857, #10b981)' }}>
              {envelopeContent.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}