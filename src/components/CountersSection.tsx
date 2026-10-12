import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { recipient } from '../config/content';

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

export default function CountersSection() {
  const [elapsed, setElapsed] = useState<TimeElapsed>(calculateElapsed(START_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateElapsed(START_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const CounterBox = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center p-2 md:p-3 bg-white/40 rounded-xl shadow-[inset_0_2px_10px_rgba(255,105,180,0.1)] border border-pink-200/50 hover:bg-white/60 transition-colors">
      <span className="text-2xl md:text-3xl font-black text-pink-600 font-mono tracking-tight">{value}</span>
      <span className="text-[10px] md:text-sm font-bold text-pink-400 mt-1">{label}</span>
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
            <CounterBox label="سنة" value={elapsed.years} />
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
