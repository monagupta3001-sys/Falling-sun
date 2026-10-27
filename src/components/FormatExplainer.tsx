import React from 'react';
import { Clock, Calendar, Moon, Sun, CheckCircle2 } from 'lucide-react';

export const FormatExplainer: React.FC = () => {
  return (
    <section id="format" className="py-16 bg-[#c51c1c] border-t-2 border-black grain-texture relative text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ EVENT STRUCTURE · 12H + 12H ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            24 HOURS TOTAL · SPLIT OVER TWO DAYS
          </h2>

          <p className="text-base sm:text-lg text-white font-bold max-w-2xl leading-relaxed">
            A realistic 2-day event structured as <strong>12 hours on Day 1</strong> and <strong>12 hours on Day 2</strong>. No exhausting all-nighters — code intensely during the day, rest at night, and come back fresh.
          </p>
        </div>

        {/* 2-Day Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Day 1: 12 Hours */}
          <div className="bg-[#fffdf8] border-3 border-black p-6 sm:p-8 shadow-brutal-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#ffe600] border-2 border-black flex items-center justify-center font-black">
                    <Sun className="w-5 h-5 text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-[#c51c1c]">DAY 01</span>
                    <h3 className="font-display text-2xl font-black uppercase text-black leading-none">
                      FIRST 12 HOURS
                    </h3>
                  </div>
                </div>

                <span className="font-mono font-black text-xs bg-black text-white px-2.5 py-1 border border-black">
                  09:00 AM – 09:00 PM
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-relaxed">
                Check-in, project brainstorming, team formation, and core software & robotics building. The PS5, Drone, and 3D printing zones open immediately.
              </p>

              <div className="bg-[#f6efe4] p-4 border-2 border-black space-y-2.5 text-xs font-mono font-bold">
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">09:00 AM</span>
                  <span className="text-neutral-900">Doors open & Participant Check-in</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">10:00 AM</span>
                  <span className="text-neutral-900">Official Kickoff & Coding Begins (Game Dev, Web Dev, Robotics)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">11:00 AM</span>
                  <span className="text-neutral-900">PS5, Drone flight arena & 3D printing paid zones open</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">01:30 PM</span>
                  <span className="text-neutral-900">Lunch Break & Networking</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">09:00 PM</span>
                  <span className="text-neutral-900">Day 1 Ends — Venue closes for the night so everyone can rest</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between font-mono text-xs font-black text-neutral-700">
              <span>DAY 1 RUNTIME:</span>
              <span className="bg-[#ffe600] text-black px-2 py-0.5 border border-black">12 CLOCK HOURS</span>
            </div>
          </div>

          {/* Day 2: 12 Hours */}
          <div className="bg-[#fffdf8] border-3 border-black p-6 sm:p-8 shadow-brutal-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#ffe600] border-2 border-black flex items-center justify-center font-black">
                    <Calendar className="w-5 h-5 text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-black uppercase text-[#c51c1c]">DAY 02</span>
                    <h3 className="font-display text-2xl font-black uppercase text-black leading-none">
                      SECOND 12 HOURS
                    </h3>
                  </div>
                </div>

                <span className="font-mono font-black text-xs bg-black text-white px-2.5 py-1 border border-black">
                  09:00 AM – 09:00 PM
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-relaxed">
                Resume development with clear minds. Finalize features, polish UI, test robotics and game builds, followed by live stage project demos and closing ceremony.
              </p>

              <div className="bg-[#f6efe4] p-4 border-2 border-black space-y-2.5 text-xs font-mono font-bold">
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">09:00 AM</span>
                  <span className="text-neutral-900">Day 2 Resumes — Morning tea & final build sprint starts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">01:00 PM</span>
                  <span className="text-neutral-900">Lunch Break</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">05:00 PM</span>
                  <span className="text-neutral-900">Code Freeze & Project Submission deadline</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">06:00 PM</span>
                  <span className="text-neutral-900">Live Project Demonstrations on Stage</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#c51c1c] font-black">08:30 PM</span>
                  <span className="text-neutral-900">Closing Ceremony & Certificate Distribution</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between font-mono text-xs font-black text-neutral-700">
              <span>DAY 2 RUNTIME:</span>
              <span className="bg-[#ffe600] text-black px-2 py-0.5 border border-black">12 CLOCK HOURS</span>
            </div>
          </div>
        </div>

        {/* Overnight Note Bar */}
        <div className="p-4 bg-black text-white border-2 border-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[4px_4px_0px_#ffe600]">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-[#ffe600] shrink-0" />
            <div className="font-mono text-xs text-neutral-200">
              <strong className="text-[#ffe600]">OVERNIGHT PAUSE (09:00 PM to 09:00 AM):</strong> Participants go home or to accommodations to sleep. The venue is closed overnight.
            </div>
          </div>
          <span className="font-mono font-black text-xs bg-[#ffe600] text-black px-3 py-1 border border-black whitespace-nowrap">
            TOTAL = 24 HOURS OF CODING
          </span>
        </div>
      </div>
    </section>
  );
};
