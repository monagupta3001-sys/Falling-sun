import React, { useState } from 'react';
import { Printer, Navigation, Gamepad2, Check, ArrowRight, ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface HardwareShowcaseProps {
  onOpenRegister: () => void;
}

export const HardwareShowcase: React.FC<HardwareShowcaseProps> = ({ onOpenRegister }) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const hardwareItems = [
    {
      number: 'NO. 01',
      title: '3D PRINTERS (BAMBU LAB)',
      badge: 'FABRICATION LAB',
      track: 'ROBOTICS & PROTOTYPING',
      specs: 'High-speed CoreXY & Extruder Rigs · 500 mm/s · PLA, PETG & TPU',
      description: 'Rapid on-site fabrication stations for building robot chassis, drone propeller mounts, sensor brackets, and physical prototype enclosures directly at the event.',
      features: [
        'Dedicated slicer workstations with technicians ready',
        'Multi-color & high-tensile filament rolls on-site',
        'Support for direct STL/CAD file uploads and prints',
        'Assembly tools, deburring kits, and fasteners provided',
      ],
      imageSrc: '/assets/aistudio/61F8aqmSb9L_b3a373e4.jpg',
      alt: '3D Printer Fabrication Rig',
    },
    {
      number: 'NO. 02',
      title: 'AUTONOMOUS DRONES',
      badge: 'INDOOR FLIGHT ARENA',
      track: 'ROBOTICS & COMPUTER VISION',
      specs: '10x8m Netted Indoor Arena · Tello EDU & PX4 Quadcopters',
      description: 'Fully netted indoor flight cage equipped with obstacle gates and telemetry receivers for autonomous drone navigation, computer vision trials, and flight controller testing.',
      features: [
        'Safe enclosed netting arena with optical obstacle hoops',
        'Pre-calibrated vision sensors, optical flow, and WiFi telemetry',
        'Multi-station fast battery charging hub',
        'Ground safety kill-switch controls & flight marshals',
      ],
      imageSrc: '/assets/aistudio/images__1__738db23f.jpeg',
      alt: 'Autonomous Drone Flight Kit',
    },
    {
      number: 'NO. 03',
      title: 'PLAYSTATION 5 RIGS',
      badge: 'DUALSENSE 4K RIGS',
      track: 'GAME DEV & TOURNAMENTS',
      specs: 'PS5 Consoles · DualSense Haptics · Low-Latency 4K 144Hz',
      description: 'Dedicated console gaming and dev testing setups featuring 4K high-refresh displays, DualSense wireless controllers, and direct test harnesses for game development builds.',
      features: [
        'Ultra low-latency 4K 144Hz tournament-grade gaming displays',
        'DualSense controllers with adaptive triggers & haptic feedback',
        'Gamepad dev testing harnesses & controller WebHID compatibility',
        'Console multiplayer showcase station',
      ],
      imageSrc: '/assets/aistudio/images_2a3a6cef.jpeg',
      alt: 'PlayStation 5 Console and DualSense Setup',
    },
  ];

  return (
    <section id="hardware" className="py-16 bg-[#c51c1c] border-t-2 border-black grain-texture relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header matching screenshot */}
        <div className="space-y-3">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ BRINGING TO THE HACKATHON ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            TECH YOU NEED TO EXPERIENCE
          </h2>

          <p className="text-base sm:text-lg text-white font-bold max-w-2xl leading-relaxed">
            Hackathons should not live on laptops alone. We are bringing real hardware you can touch, fly, and test with on-site: <strong>3D printers, autonomous drones, and PlayStation 5 rigs</strong>.
          </p>
        </div>

        {/* 3 Postage-Stamp Hardware Cards with User's Exact Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hardwareItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                playClickSound();
                setSelectedItem(idx);
              }}
              onMouseEnter={playHoverSound}
              className={`stamp-card p-4 transition-all cursor-pointer hover:-translate-y-1.5 ${
                selectedItem === idx ? 'ring-4 ring-[#ffe600] bg-[#fffdf8]' : 'bg-[#fffdf8]'
              }`}
            >
              {/* Top Stamp Number */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-black text-black">
                <span className="font-mono font-black text-xs tracking-wider">{item.number}</span>
                <span className="font-mono font-black text-[10px] bg-[#ffe600] border border-black px-2 py-0.5">
                  {item.badge}
                </span>
              </div>

              {/* Hardware Photo Container with User Image */}
              <div className="my-3 h-52 border-2 border-black overflow-hidden relative shadow-inner bg-black group">
                <img
                  src={item.imageSrc}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-black/80 text-[#ffe600] font-mono text-[10px] font-bold px-1.5 py-0.5 border border-black">
                  LIVE AT VENUE
                </div>
              </div>

              <div className="pt-2 text-black space-y-1.5">
                <div className="text-[10px] font-mono font-bold text-[#c51c1c] uppercase">
                  {item.track}
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-black leading-none">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-slate-800 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-black flex items-center justify-between text-xs font-mono font-black">
                  <span className="text-[#c51c1c]">
                    {selectedItem === idx ? '● SELECTED GEAR' : 'EXPLORE SPECS'}
                  </span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Hardware Details Container */}
        <div className="p-6 sm:p-8 bg-[#fffdf8] border-3 border-black shadow-brutal text-black space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
            <div>
              <span className="font-mono font-black text-xs text-[#c51c1c] uppercase">
                ACTIVE LAB EQUIPMENT ({hardwareItems[selectedItem].number})
              </span>
              <h4 className="font-display text-3xl sm:text-4xl font-black uppercase text-black">
                {hardwareItems[selectedItem].title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-xs bg-[#ffe600] border-2 border-black px-3 py-1 shadow-brutal-sm">
                {hardwareItems[selectedItem].badge}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Specs & Features */}
            <div className="space-y-4">
              <p className="font-mono text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed">
                {hardwareItems[selectedItem].description}
              </p>

              <div className="space-y-2">
                <div className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#c51c1c]" />
                  <span>ON-SITE GEAR & WORKBENCH CAPABILITIES:</span>
                </div>
                <ul className="space-y-1.5 text-xs font-mono font-bold text-neutral-800">
                  {hardwareItems[selectedItem].features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#c51c1c]">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#f6efe4] border border-black font-mono text-xs font-bold text-neutral-800">
                <span className="text-[#c51c1c]">HARDWARE SPECIFICATION:</span> {hardwareItems[selectedItem].specs}
              </div>
            </div>

            {/* Right: Clean Visual Snapshot */}
            <div className="border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden bg-black h-64 relative">
              <img
                src={hardwareItems[selectedItem].imageSrc}
                alt={hardwareItems[selectedItem].alt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-black/85 text-white font-mono text-xs font-bold px-3 py-1 border border-white">
                {hardwareItems[selectedItem].title}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono font-bold text-neutral-700">
              Free participant registration includes open access to all hardware zones during the 24H event.
            </div>
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-6 py-3 bg-[#ffe600] hover:bg-black hover:text-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase tracking-wider shadow-brutal transition-colors cursor-pointer whitespace-nowrap"
            >
              REGISTER FREE FOR THE HACKATHON →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
