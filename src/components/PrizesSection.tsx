import React from 'react';
import { PRIZES_DATA } from '../data/hackathonData';
import { Trophy, Award } from 'lucide-react';

export const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="py-20 bg-[#d12323] border-t-2 border-black grain-texture relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ 06. $15,000+ PRIZE POOL ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            HARDWARE, CASH & TROPHIES
          </h2>

          <p className="text-base sm:text-lg text-white font-bold max-w-2xl leading-relaxed">
            Every track features standalone cash prizes alongside high-performance hardware including PS5 consoles, autonomous DJI drones, and Bambu Lab 3D printers.
          </p>
        </div>

        {/* Grand Champion Highlight Box */}
        <div className="p-8 sm:p-10 bg-[#ffe600] border-3 border-black shadow-brutal-lg text-black">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-black text-[#ffe600] border-2 border-black flex items-center justify-center font-black shrink-0 shadow-brutal-sm">
                <Trophy className="w-9 h-9 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs font-mono font-black uppercase bg-black text-white px-2 py-0.5">
                  HIGHEST SCORE ACROSS BOTH 12H SPRINTS
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-black uppercase mt-1">
                  OVERALL GRAND CHAMPION
                </h3>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  $5,000 Pure Cash + PS5 Slim Consoles + Custom 3D Machined Falling Sun Trophy
                </p>
              </div>
            </div>

            <div className="font-display text-5xl sm:text-6xl font-black text-black shrink-0 drop-shadow-[2px_2px_0px_#fff]">
              $5,000
            </div>
          </div>
        </div>

        {/* 5 Secondary Track & Bounty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRIZES_DATA.slice(1).map((prize, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#fffdf8] border-2 border-black shadow-brutal flex flex-col justify-between text-black hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-black">
                  <span className="font-mono font-black text-xs">AWARD 0{idx + 1}</span>
                  <Award className="w-4 h-4 text-[#c51c1c]" />
                </div>
                <h4 className="font-display text-2xl font-black uppercase">
                  {prize.rank}
                </h4>
                <div className="font-mono text-xl font-black text-[#c51c1c]">
                  {prize.amount}
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                  {prize.perks}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
