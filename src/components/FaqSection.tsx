import React, { useState } from 'react';
import { FAQ_DATA } from '../data/hackathonData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    playClickSound();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#c51c1c] border-t-2 border-black grain-texture relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ 07. RULES & FAQ ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="text-base text-white font-bold leading-relaxed">
            Everything you need to know about safety, schedule, overnight rest, and equipment availability.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#fffdf8] border-2 border-black shadow-brutal overflow-hidden text-black transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#fff9e6] transition-colors cursor-pointer"
                >
                  <span className="font-mono text-xs sm:text-sm font-black text-black flex items-center gap-3 uppercase">
                    <HelpCircle className="w-4 h-4 text-[#c51c1c] shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-black transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed border-t border-black bg-[#f6efe4]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
