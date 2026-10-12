import { reasonsContent } from '../config/content';

export default function SweetWords() {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* Why I love you section */}
        <div>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-emerald-300 mb-3">{reasonsContent.title}</h2>
            <p className="text-emerald-400 text-lg">{reasonsContent.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasonsContent.reasons.map((r, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-right border border-emerald-300/25"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4 flex-row-reverse">
                  <div className="text-4xl" style={{ animationDelay: `${i * 0.3}s` }}>
                    {r.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-300">{r.title}</h3>
                </div>
                <p className="text-emerald-200 leading-relaxed font-medium text-lg">
                  {r.text}
                </p>
                <div className="mt-4 flex justify-end">
                  <div className="h-1 w-16 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #059669, #34d399)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 px-4">
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-emerald-300" />
          <span className="text-2xl">💫</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-emerald-300" />
        </div>

        {/* Moments section */}
        <div>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-emerald-300 mb-3">{reasonsContent.momentsTitle}</h2>
            <p className="text-emerald-400 text-lg">{reasonsContent.momentsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasonsContent.moments.map((m, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center flex flex-col items-center justify-center min-h-[160px]"
                style={{ background: 'linear-gradient(135deg, rgba(6, 30, 20, 0.85), rgba(4, 18, 12, 0.9))' }}>
                <div className="text-4xl mb-4" style={{ animationDelay: `${i * 0.2}s` }}>
                  {m.icon}
                </div>
                <p className="text-emerald-200 font-bold text-md leading-relaxed">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}