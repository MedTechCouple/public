import { useEffect, useState } from "react"; import { motion } from "framer-motion"; import confetti from "canvas-confetti"; import { Heart, Pill, Syringe, Stethoscope } from "lucide-react";

// Cute floating balloons const Balloon = ({ delay, color }) => ( <motion.div className={w-10 h-14 rounded-full shadow-md ${color} relative before:content-[''] before:absolute before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-8 before:bg-gray-300} initial={{ y: 200, opacity: 0 }} animate={{ y: -240, opacity: 1 }} transition={{ repeat: Infinity, duration: 6.5, delay, repeatType: "reverse" }} /> );

// Cute floating medical icons const FloatingIcon = ({ Icon, delay }) => ( <motion.div className="absolute text-rose-400/70" initial={{ y: 100, opacity: 0 }} animate={{ y: -120, opacity: 1 }} transition={{ repeat: Infinity, duration: 5 + delay, repeatType: "reverse" }}

> 

<Icon className="w-8 h-8" />

</motion.div> );

export default function BirthdaySite() { const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

// figure out the next 31st (if today is after 31, move to next month) const getTargetDate = () => { const now = new Date(); let target = new Date(now.getFullYear(), now.getMonth(), 31, 0, 0, 0); if (now.getDate() > 31) { target = new Date(now.getFullYear(), now.getMonth() + 1, 31, 0, 0, 0); } return target; };

useEffect(() => { confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });

const target = getTargetDate();
const timer = setInterval(() => {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }
  setTimeLeft({
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  });
}, 1000);

return () => clearInterval(timer);

}, []);

const popConfetti = () => { confetti({ particleCount: 220, spread: 120, startVelocity: 40, origin: { y: 0.6 } }); };

return ( <div className="min-h-screen bg-gradient-to-b from-sky-50 via-pink-50 to-rose-50 flex flex-col items-center justify-center relative overflow-hidden p-6"> {/* Balloons */} <div className="absolute inset-x-0 top-10 pointer-events-none flex justify-around"> <Balloon delay={0} color="bg-pink-300" /> <Balloon delay={1} color="bg-sky-300" /> <Balloon delay={2} color="bg-violet-300" /> </div>

{/* Floating icons */}
  <div className="pointer-events-none">
    <FloatingIcon Icon={Heart} delay={1} />
    <FloatingIcon Icon={Syringe} delay={2} />
    <FloatingIcon Icon={Pill} delay={3} />
  </div>

  {/* Card */}
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-3xl p-8 max-w-xl text-center space-y-5"
  >
    <div className="flex items-center justify-center gap-3 text-3xl font-bold text-pink-500">
      <Heart className="w-8 h-8" />
      <span>Happy Birthday, Doctor! 🎉</span>
    </div>

    {/* Countdown */}
    <div className="bg-white/70 rounded-2xl p-4 shadow-inner">
      <p className="text-gray-600 text-sm mb-2">Countdown to the 31st</p>
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-pink-100 py-3">
            <p className="text-2xl font-bold text-pink-600">{value}</p>
            <p className="text-xs uppercase tracking-wide text-pink-600">{label}</p>
          </div>
        ))}
      </div>
    </div>

    <p className="text-gray-700 text-lg leading-relaxed">
      You heal people every day with your knowledge, kindness, and smile —
      today is your day to feel just as cared for. Wishing you loads of joy,
      laughter, and magical surprises!
    </p>

    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="bg-sky-100 rounded-2xl p-4 flex flex-col items-center shadow">
        <Stethoscope className="w-6 h-6 mb-2" />
        <p className="text-sm font-medium">Doctor Vibes</p>
      </div>
      <div className="bg-pink-100 rounded-2xl p-4 flex flex-col items-center shadow">
        <Heart className="w-6 h-6 mb-2" />
        <p className="text-sm font-medium">Lots of Love</p>
      </div>
      <div className="bg-emerald-100 rounded-2xl p-4 flex flex-col items-center shadow">
        <Syringe className="w-6 h-6 mb-2" />
        <p className="text-sm font-medium">Dose of Fun</p>
      </div>
    </div>

    <button
      onClick={popConfetti}
      className="mt-6 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow hover:shadow-lg active:scale-95 transition"
    >
      Celebrate Again 🎈
    </button>

    <p className="text-sm text-gray-500 mt-4">
      Made with ❤️ just for your birthday on the 31st
    </p>
  </motion.div>
</div>

); }