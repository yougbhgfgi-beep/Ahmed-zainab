import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { recipient, getDisplayAge } from '../config/content';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateElapsed(startDate: Date): TimeElapsed {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, minutes, seconds };
}

const START_DATE = new Date(`${recipient.birthDate}T00:00:00`);

/** اللحظة اللي بيتم فيها السن اللي ظاهر في الموقع (سنة، كده، كده) */
function getTargetDate(): Date {
  return new Date(
    START_DATE.getFullYear() + getDisplayAge(),
    START_DATE.getMonth(),
    START_DATE.getDate(),
  );
}

function diffParts(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function CountersSection() {
  const [elapsed, setElapsed] = useState<TimeElapsed>(calculateElapsed(START_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateElapsed(START_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // عداد صغير تحت "سنة": بيعد بالثواني لحد ما السن يبقى 25، وبعدها يختفي
  const now = new Date();
  const target = getTargetDate();
  const countingTo25 = target.getTime() - now.getTime() > 0;
  const until = diffParts(target.getTime() - now.getTime());

  const CounterBox = ({ label, value, children }: {
    label: string;
    value: number;
    children?: React.ReactNode;
  }) => (
    <div className="flex flex-col items-center p-2 md:p-3 bg-white/40 rounded-xl shadow-[inset_0_2px_10px_rgba(255,105,180,0.1)] border border-pink-200/50 hover:bg-white/60 transition-colors">
      <span className="text-2xl md:text-3xl font-black text-pink-600 font-mono tracking-tight">{value}</span>
      <span className="text-[10px] md:text-sm font-bold text-pink-400 mt-1">{label}</span>
      {children}
    </div>
  );

  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-xl mx-auto">
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl text-center relative overflow-hidden group border-2 border-white/50 hover:border-pink-300 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-pink-600 mb-2">منذ أن نوّرت الدنيا ✨</h3>
          <p className="text-sm text-pink-400 mb-6 font-semibold">{recipient.birthDateLabel}</p>

          <div className="grid grid-cols-3 gap-2 md:gap-3" dir="rtl">
            <CounterBox label="سنة" value={countingTo25 ? elapsed.years : getDisplayAge()}>
              {countingTo25 && (
                <span className="mt-1.5 text-[9px] md:text-[11px] font-bold text-white whitespace-nowrap rounded-full px-2 py-0.5 animate-pulse"
                  style={{ background: 'linear-gradient(135deg, #ff69b4, #ff1493)' }}>
                  ⏳ حتى 25: {until.days > 0 ? `${until.days} يوم ` : ''}{pad(until.hours)}:{pad(until.minutes)}:{pad(until.seconds)}
                </span>
              )}
            </CounterBox>
            <CounterBox label="شهر" value={elapsed.months} />
            <CounterBox label="يوم" value={elapsed.days} />
            <CounterBox label="ساعة" value={elapsed.hours} />
            <CounterBox label="دقيقة" value={elapsed.minutes} />
            <CounterBox label="ثانية" value={elapsed.seconds} />
          </div>
        </div>
      </div>
    </section>
  );
}