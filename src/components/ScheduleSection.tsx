import React, { useState } from 'react';
import { SCHEDULE_DAYS } from '../data/hackathonData';
import { ScheduleItem } from '../types/hackathon';
import { Clock, MapPin, Sun, Moon, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export const ScheduleSection: React.FC = () => {
  const [selectedDayTab, setSelectedDayTab] = useState<'day1' | 'overnight' | 'day2'>('day1');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getDaySchedule = () => {
    if (selectedDayTab === 'day1') return SCHEDULE_DAYS[0];
    if (selectedDayTab === 'day2') return SCHEDULE_DAYS[1];
    return null;
  };

  const currentSchedule = getDaySchedule();

  const overnightEvents: ScheduleItem[] = [
    {
      time: '09:00 PM',
      title: 'Day 1 Solar Sprint Freeze & Checkpoint',
      description: 'First 12 hours complete! Save files, sync repos, and submit long-run CAD files to 3D print queue.',
      category: 'sprint',
      location: 'Hacker Arena Desks',
    },
    {
      time: '09:30 PM',
      title: 'Warm Late-Night Ramen & Taco Bar',
      description: 'Refuel with gourmet comfort food, specialty drinks, and snacks. Zero code pressure.',
      category: 'break',
      location: 'Cafeteria & Lounge',
    },
    {
      time: '10:00 PM',
      title: 'Tekken 8 & Rocket League PS5 Casual Cup',
      description: 'Friendly tournament on the PlayStation 5 booths with swag prizes and bragging rights.',
      category: 'hardware',
      location: 'PS5 Gaming Rig',
    },
    {
      time: '11:00 PM',
      title: 'Arena Quiet Hours & Sleep Pod Activation',
      description: 'Main lights dim. Hackers are free to head to home/hotels or recharge in our sleeping zones.',
      category: 'break',
      location: 'Quiet Sleep Pods & Rest Area',
    },
    {
      time: '02:00 AM',
      title: 'Overnight 3D Print Farm Autonomous Batching',
      description: 'Certified night marshals oversee active Bambu Lab prints for overnight drone chassis and arms.',
      category: 'hardware',
      location: '3D Prototyping Lab',
    },
    {
      time: '08:00 AM',
      title: 'Day 2 Alarm & Specialty Espresso Bar Opens',
      description: 'Wake up fresh! Shower amenities, artisan breakfast burritos, and craft espresso.',
      category: 'break',
      location: 'Main Atrium',
    },
  ];

  const rawItems = selectedDayTab === 'overnight' ? overnightEvents : currentSchedule?.items || [];

  const filteredItems = rawItems.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <section id="schedule" className="py-20 bg-[#d12323] border-t-2 border-black grain-texture relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ 04. 12H + 12H MASTER TIMELINE ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            TWO-DAY MASTER SCHEDULE
          </h2>

          <p className="text-base sm:text-lg text-white font-bold max-w-2xl leading-relaxed">
            Every minute calibrated for peak productivity, hardware access in the cage, and deep physical recovery.
          </p>
        </div>

        {/* 3 Day/Buffer Selector Tabs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              playClickSound();
              setSelectedDayTab('day1');
            }}
            className={`w-full sm:w-auto px-6 py-3.5 border-2 border-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedDayTab === 'day1'
                ? 'bg-[#ffe600] text-black shadow-brutal -translate-y-1'
                : 'bg-[#fffdf8] text-black hover:bg-[#fff9e6]'
            }`}
          >
            <Sun className="w-4 h-4 stroke-[3]" />
            <span>DAY 1: SPRINT 01 (12H)</span>
            <span className="text-[10px] bg-black text-[#ffe600] px-1.5 py-0.5">09:00 - 21:00</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setSelectedDayTab('overnight');
            }}
            className={`w-full sm:w-auto px-6 py-3.5 border-2 border-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedDayTab === 'overnight'
                ? 'bg-[#ffe600] text-black shadow-brutal -translate-y-1'
                : 'bg-[#fffdf8] text-black hover:bg-[#fff9e6]'
            }`}
          >
            <Moon className="w-4 h-4 stroke-[3]" />
            <span>TWILIGHT RECHARGE (12H)</span>
            <span className="text-[10px] bg-black text-[#ffe600] px-1.5 py-0.5">21:00 - 09:00</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setSelectedDayTab('day2');
            }}
            className={`w-full sm:w-auto px-6 py-3.5 border-2 border-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              selectedDayTab === 'day2'
                ? 'bg-[#ffe600] text-black shadow-brutal -translate-y-1'
                : 'bg-[#fffdf8] text-black hover:bg-[#fff9e6]'
            }`}
          >
            <Sparkles className="w-4 h-4 stroke-[3]" />
            <span>DAY 2: FINALE (12H)</span>
            <span className="text-[10px] bg-black text-[#ffe600] px-1.5 py-0.5">09:00 - 21:00</span>
          </button>
        </div>

        {/* Schedule Timeline Display */}
        <div className="space-y-3">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-[#fffdf8] border-2 border-black shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-black"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="font-mono text-xs sm:text-sm font-black bg-[#ffe600] border-2 border-black px-3 py-1.5 shadow-brutal-sm shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-display text-lg font-black uppercase text-black">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono font-black uppercase bg-black text-white px-2 py-0.5">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 shrink-0 self-start sm:self-auto">
                <MapPin className="w-3.5 h-3.5 text-[#d12323]" />
                <span>{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
