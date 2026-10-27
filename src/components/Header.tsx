import React, { useState } from 'react';
import { Menu, X, Flame, Volume2, VolumeX } from 'lucide-react';
import { setSoundMuted, getSoundMuted, playClickSound } from '../utils/audio';

interface HeaderProps {
  onOpenRegister: () => void;
  registeredCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRegister, registeredCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(getSoundMuted());

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    setSoundMuted(nextState);
    if (!nextState) {
      playClickSound();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#c51c1c] border-b-2 border-black shadow-[0_2px_0px_#000]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-3">
        {/* Brand Lockup */}
        <a href="#" className="flex items-center gap-2.5 group whitespace-nowrap shrink-0">
          <span className="flex items-center justify-center w-8 h-8 bg-[#ffe600] border-2 border-black text-black font-black text-sm shadow-brutal-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            FS
          </span>
          <span className="font-display text-2xl font-black tracking-wide text-[#fffdf8] drop-shadow-[2px_2px_0px_#000000] uppercase">
            FALLING SUN
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono font-bold bg-[#fffdf8] text-black border-2 border-black px-1.5 py-0.5 shadow-brutal-sm">
            12H+12H · 2026
          </span>
        </a>

        {/* Clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-mono font-bold text-white tracking-wider">
          <a href="#manifesto" className="hover:text-[#ffe600] hover:underline decoration-2 underline-offset-4 transition-colors">
            Manifesto
          </a>
          <a href="#hardware" className="hover:text-[#ffe600] hover:underline decoration-2 underline-offset-4 transition-colors">
            Hardware Zones
          </a>
          <a href="#tracks" className="hover:text-[#ffe600] hover:underline decoration-2 underline-offset-4 transition-colors">
            Tracks
          </a>
          <a href="#format" className="hover:text-[#ffe600] hover:underline decoration-2 underline-offset-4 transition-colors">
            12H+12H Schedule
          </a>
          <a href="#sponsors" className="hover:text-[#ffe600] hover:underline decoration-2 underline-offset-4 transition-colors">
            Sponsors
          </a>
          <a href="#community" className="hover:text-[#ffe600] hover:underline decoration-2 underline-offset-4 transition-colors">
            WhatsApp & Discord
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            className="p-1.5 bg-[#fffdf8] text-black border-2 border-black shadow-brutal-sm hover:bg-[#ffe600] transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-700" /> : <Volume2 className="w-4 h-4 text-black" />}
          </button>

          <button
            onClick={onOpenRegister}
            className="px-4 py-2 text-xs sm:text-sm font-display font-black tracking-wider uppercase text-black bg-[#ffe600] hover:bg-[#ffd900] border-2 border-black shadow-brutal active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>REGISTER FREE</span>
            <span className="hidden lg:inline text-[10px] font-mono bg-black text-[#ffe600] px-1.5 py-0.2 rounded font-bold">
              {48 - registeredCount} LEFT
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 bg-[#fffdf8] text-black border-2 border-black shadow-brutal-sm cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#b71717] border-b-2 border-black p-4 space-y-3 font-mono text-xs font-bold uppercase tracking-wider">
          <a
            href="#manifesto"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-white hover:text-[#ffe600]"
          >
            Manifesto & Philosophy
          </a>
          <a
            href="#hardware"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-white hover:text-[#ffe600]"
          >
            Hardware (PS5 · Drones · 3D Printers)
          </a>
          <a
            href="#tracks"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-white hover:text-[#ffe600]"
          >
            Tracks (Game Dev, Web Dev, Robotics)
          </a>
          <a
            href="#format"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-white hover:text-[#ffe600]"
          >
            12H+12H Schedule
          </a>
          <a
            href="#sponsors"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-white hover:text-[#ffe600]"
          >
            Official Sponsors
          </a>
          <a
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-white hover:text-[#ffe600]"
          >
            WhatsApp & Discord Updates
          </a>
        </div>
      )}
    </header>
  );
};
