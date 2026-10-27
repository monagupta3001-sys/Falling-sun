import React, { useState, useEffect } from 'react';
import { ArrowRight, Gamepad2, Globe, Bot, Clock, Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenQuiz: () => void;
  onSelectTrack: (trackId: 'game-dev' | 'web-dev' | 'robotics') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onOpenQuiz, onSelectTrack }) => {
  // Live countdown to hackathon kickoff
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="manifesto" className="relative overflow-hidden bg-[#d12323] pt-12 pb-20 lg:pt-16 lg:pb-24 grain-texture">
      {/* Giant Watermark Typography matching screenshot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden opacity-15">
        <div className="font-display text-[16vw] font-black text-black leading-none whitespace-nowrap tracking-tighter text-center">
          PHILOSOPHY //
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag: [ 01. ] // MANIFESTO & PHILOSOPHY */}
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-[#fffdf8] text-black border-2 border-black font-mono font-bold text-xs px-2 py-0.5 shadow-brutal-sm">
            01.
          </span>
          <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
            // MANIFESTO & PHILOSOPHY
          </span>
        </div>

        {/* Marquee Headline Box matching screenshot */}
        <div className="space-y-1 sm:space-y-2 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block bg-[#fffdf8] text-[#c51c1c] font-display text-4xl sm:text-6xl lg:text-7xl font-black px-4 py-1 border-2 border-black shadow-brutal uppercase">
              FALLING SUN
            </span>
            <span className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#fffdf8] drop-shadow-brutal uppercase">
              IS WHERE CREATORS
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-[#fffdf8] drop-shadow-brutal-lg leading-[0.92] uppercase">
            BUILDERS TURN
            <br />
            IDEAS INTO REALITY.
          </h1>
        </div>

        {/* Horizontal Dividing Line matching screenshot */}
        <div className="w-full border-t border-white/40 my-8" />

        {/* Two-Column Split matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Prose & Yellow Action Button */}
          <div className="lg:col-span-7 space-y-5">
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              A two-day hackathon where ambitious builders assemble to engineer, experiment, tackle authentic engineering challenges, and ship working prototypes.
            </p>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
              No hollow slide decks or vaporware. Whether it&apos;s physics engines in Godot, real-time reactive websockets in React, or autonomous telemetry circuits on ESP32, Falling Sun celebrates the craft of shipping real systems.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#format"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#ffe600] hover:bg-[#ffd900] text-black border-2 border-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>THE 12H + 12H FORMAT</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>

              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#fffdf8] hover:bg-white text-black border-2 border-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>REGISTER SQUAD FREE</span>
              </button>

              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-1.5 px-4 py-3 bg-black text-[#ffe600] border-2 border-black font-mono font-bold text-xs uppercase tracking-wider shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Track Matcher (1m)</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: The 3 Stacked Track Cards matching screenshot */}
          <div className="lg:col-span-5 space-y-3">
            {/* Track 01: Game Development */}
            <div
              onClick={() => {
                playClickSound();
                onSelectTrack('game-dev');
              }}
              onMouseEnter={playHoverSound}
              className="bg-[#fffdf8] border-2 border-black shadow-brutal p-3.5 flex items-center justify-between cursor-pointer hover:translate-x-1 transition-transform group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#d12323] border border-black flex items-center justify-center text-white shrink-0 shadow-brutal-sm">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="font-display text-lg font-black tracking-wide text-black group-hover:text-[#d12323] uppercase">
                  GAME DEVELOPMENT
                </div>
              </div>

              <span className="bg-[#ffe600] border border-black text-black text-[11px] font-mono font-black px-2.5 py-0.5 shadow-brutal-sm">
                TRACK 01
              </span>
            </div>

            {/* Track 02: Web Development */}
            <div
              onClick={() => {
                playClickSound();
                onSelectTrack('web-dev');
              }}
              onMouseEnter={playHoverSound}
              className="bg-[#fffdf8] border-2 border-black shadow-brutal p-3.5 flex items-center justify-between cursor-pointer hover:translate-x-1 transition-transform group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#d12323] border border-black flex items-center justify-center text-white shrink-0 shadow-brutal-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="font-display text-lg font-black tracking-wide text-black group-hover:text-[#d12323] uppercase">
                  WEB DEVELOPMENT
                </div>
              </div>

              <span className="bg-[#ffe600] border border-black text-black text-[11px] font-mono font-black px-2.5 py-0.5 shadow-brutal-sm">
                TRACK 02
              </span>
            </div>

            {/* Track 03: Robotics */}
            <div
              onClick={() => {
                playClickSound();
                onSelectTrack('robotics');
              }}
              onMouseEnter={playHoverSound}
              className="bg-[#fffdf8] border-2 border-black shadow-brutal p-3.5 flex items-center justify-between cursor-pointer hover:translate-x-1 transition-transform group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#d12323] border border-black flex items-center justify-center text-white shrink-0 shadow-brutal-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="font-display text-lg font-black tracking-wide text-black group-hover:text-[#d12323] uppercase">
                  ROBOTICS
                </div>
              </div>

              <span className="bg-[#ffe600] border border-black text-black text-[11px] font-mono font-black px-2.5 py-0.5 shadow-brutal-sm">
                TRACK 03
              </span>
            </div>
          </div>
        </div>

        {/* Live Countdown Clock Bar */}
        <div className="mt-12 p-4 bg-[#fffdf8] border-2 border-black shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-black font-mono font-black text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4 text-[#d12323]" />
            <span>COUNTDOWN TO SOLAR PHASE 01 KICKOFF</span>
          </div>

          <div className="flex items-center gap-3 text-black">
            <div className="text-center px-3 py-1 bg-[#ffe600] border border-black font-mono font-black shadow-brutal-sm">
              <span className="text-xl font-black">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="block text-[9px] uppercase">DAYS</span>
            </div>
            <div className="text-center px-3 py-1 bg-[#ffe600] border border-black font-mono font-black shadow-brutal-sm">
              <span className="text-xl font-black">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="block text-[9px] uppercase">HOURS</span>
            </div>
            <div className="text-center px-3 py-1 bg-[#ffe600] border border-black font-mono font-black shadow-brutal-sm">
              <span className="text-xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="block text-[9px] uppercase">MINS</span>
            </div>
            <div className="text-center px-3 py-1 bg-black text-[#ffe600] border border-black font-mono font-black shadow-brutal-sm">
              <span className="text-xl font-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="block text-[9px] uppercase">SECS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
