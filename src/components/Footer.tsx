import React from 'react';
import { Gamepad2, Navigation, Printer } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-3 border-black bg-[#18181b] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b-2 border-white/20">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 bg-[#ffe600] border-2 border-black text-black font-black text-sm shadow-brutal-sm">
                FS
              </span>
              <span className="font-display text-2xl font-black text-white tracking-wide uppercase">
                FALLING SUN 2026
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2 max-w-md uppercase">
              12H + 12H Dual-Day Hackathon · October 2026 · PS5, Drones & 3D Print Labs
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex-wrap">
            <a href="#manifesto" className="hover:text-[#ffe600]">Manifesto</a>
            <a href="#hardware" className="hover:text-[#ffe600]">Paid Zones</a>
            <a href="#tracks" className="hover:text-[#ffe600]">Tracks</a>
            <a href="#format" className="hover:text-[#ffe600]">12H+12H</a>
            <a href="#sponsors" className="hover:text-[#ffe600]">Sponsors</a>
            <a href="#community" className="hover:text-[#ffe600]">WhatsApp & Discord</a>
          </div>
        </div>

        {/* Hardware & Tracks Summary Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4 flex-wrap text-white font-bold">
            <span className="flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-[#ffe600]" /> Game Dev (PS5)
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#ffe600]" /> Web Dev (Realtime)
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-[#ffe600]" /> Robotics (Drones & 3D Print)
            </span>
          </div>

          <div className="text-[11px] text-slate-500">
            © 2026 FALLING SUN COMMITTEE · ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
