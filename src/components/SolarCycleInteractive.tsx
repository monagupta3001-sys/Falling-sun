import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Clock, Flame } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export const SolarCycleInteractive: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const stages = [
    {
      id: 'day1-am',
      tag: 'Day 1 · 09:00 AM',
      title: 'Solar Genesis Kickoff',
      sunPosition: '12%',
      arenaState: 'ACTIVE SPRINT 01',
      description: 'Hackers unpack laptops, pick up hardware credential passes, and claim initial flight cage & PS5 time slots. First repositories cloned.',
      hardwareState: 'Hardware Labs checkout open. Drone safety clearance ongoing.',
      hackerTip: 'Lock down your Git repo and spin up basic boilerplate within the first 60 minutes.',
    },
    {
      id: 'day1-pm',
      tag: 'Day 1 · 03:00 PM',
      title: 'High-Noon Flight & Print Sprints',
      sunPosition: '32%',
      arenaState: 'PEAK SPRINT VELOCITY',
      description: 'First autonomous hover trials in the 10x8m drone cage. Bambu Lab printers pop out initial motor mount brackets. Game devs test DualSense trigger rumble.',
      hardwareState: 'Flight cage 100% booked. 3D printers clearing batch 01.',
      hackerTip: 'Schedule 15 minutes with a mentor to validate your API architecture before deep coding.',
    },
    {
      id: 'day1-dusk',
      tag: 'Day 1 · 09:00 PM',
      title: 'Falling Sun Sprint Freeze',
      sunPosition: '50%',
      arenaState: '12H SPRINT FREEZE',
      description: 'The sun falls! Official sprint clock halts for Day 1. Hackers push commits to GitHub, submit long-run CAD files to the 8-hour overnight print queue, and transition to dinner.',
      hardwareState: 'Flight cage grounded. Overnight 3D print queue starts.',
      hackerTip: 'Do NOT stay up until 4 AM. Sleep restores 3x faster cognitive problem-solving for Day 2.',
    },
    {
      id: 'night-rest',
      tag: 'Overnight · 11:30 PM',
      title: 'Twilight Arcade & Unattended 3D Batch',
      sunPosition: '68%',
      arenaState: 'TWILIGHT RECHARGE BUFFER',
      description: 'Arena lights dim into night lounge mode. Quiet rest pods activate. Casual PS5 Tekken & Rocket League matches break out with warm midnight ramen.',
      hardwareState: 'Night technicians oversee 8 Bambu Lab printers running unattended drone chassis.',
      hackerTip: 'Take advantage of complimentary sleep pods or head to your room for uninterrupted rest.',
    },
    {
      id: 'day2-dawn',
      tag: 'Day 2 · 09:00 AM',
      title: 'Zenith Sunrise: The Final Push',
      sunPosition: '84%',
      arenaState: 'ACTIVE SPRINT 02',
      description: 'Hackers return refreshed. Collect finished overnight 3D prints from the print farm, assemble carbon fiber drone arms, and run full course trial flights.',
      hardwareState: 'Flight cage opens for scored obstacle trial runs. PS5 booths test final builds.',
      hackerTip: 'Mount hardware cleanly with zip ties and M3 bolts; physical build quality counts for 25%.',
    },
    {
      id: 'day2-finale',
      tag: 'Day 2 · 08:30 PM',
      title: 'Grand Sunset Gala & $15K Awards',
      sunPosition: '96%',
      arenaState: 'GRAND FINALE & AWARDS',
      description: 'Top 6 finalist stage showdown. Live obstacle cage drone flights in front of judges. Awarding PS5 consoles, DJI drones, 3D printers, and $5,000 Grand Prize.',
      hardwareState: 'Championship celebration & sponsor networking.',
      hackerTip: 'Celebrate your working prototype — you shipped real hardware in 12+12 hours!',
    },
  ];

  const currentStage = stages[activeStageIdx];

  return (
    <div className="bg-[#fffdf8] border-2 border-black p-6 sm:p-8 shadow-brutal-lg text-black space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-black">
        <div>
          <span className="font-mono text-xs font-black uppercase bg-[#ffe600] border border-black px-2 py-0.5">
            INTERACTIVE 12H+12H TIMELINE SCRUBBER
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-black text-black mt-1 uppercase">
            SCRUB THE TWO-DAY CYCLE
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-black bg-[#f6efe4] border-2 border-black px-3.5 py-1.5 shadow-brutal-sm">
          <Clock className="w-4 h-4 text-[#d12323]" />
          <span>{currentStage.tag}</span>
        </div>
      </div>

      {/* Scrub Bar */}
      <div className="space-y-4 pt-2">
        <div className="relative h-3 bg-black rounded-none border border-black">
          <div
            className="h-full bg-[#ffe600] transition-all duration-300"
            style={{ width: `${((activeStageIdx + 1) / stages.length) * 100}%` }}
          />

          <div
            className="absolute -top-3 w-8 h-8 bg-[#ffe600] border-2 border-black flex items-center justify-center shadow-brutal-sm transition-all duration-300"
            style={{ left: `calc(${currentStage.sunPosition} - 16px)` }}
          >
            <Sun className="w-4 h-4 text-black stroke-[3]" />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIdx;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  playClickSound();
                  setActiveStageIdx(idx);
                }}
                className={`p-2.5 border-2 border-black text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ffe600] text-black shadow-brutal font-black -translate-y-0.5'
                    : 'bg-[#f6efe4] text-black hover:bg-white'
                }`}
              >
                <div className="text-[10px] font-mono font-black text-[#d12323]">{stage.tag.split('·')[1]}</div>
                <div className="text-xs font-mono font-bold truncate mt-0.5">{stage.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Box */}
      <div className="p-5 bg-[#f6efe4] border-2 border-black space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black pb-2">
          <div>
            <span className="text-[10px] font-mono font-black text-[#d12323] uppercase">
              {currentStage.tag}
            </span>
            <h4 className="font-display text-2xl font-black uppercase text-black">
              {currentStage.title}
            </h4>
          </div>

          <span className="text-xs font-mono font-black bg-black text-[#ffe600] px-3 py-1">
            ARENA: {currentStage.arenaState}
          </span>
        </div>

        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
          {currentStage.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 bg-white border border-black shadow-brutal-sm">
            <span className="font-black text-[#d12323] block mb-0.5 uppercase">HARDWARE LAB STATE:</span>
            <span className="text-slate-800 font-bold">{currentStage.hardwareState}</span>
          </div>

          <div className="p-3 bg-white border border-black shadow-brutal-sm">
            <span className="font-black text-black block mb-0.5 uppercase">BUILDER TACTICAL TIP:</span>
            <span className="text-slate-800 font-bold">{currentStage.hackerTip}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
