import React, { useState } from 'react';
import { Gamepad2, Navigation, Printer, Sparkles, Coffee, Heart, Smile } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface HardwareShowcaseProps {
  onOpenRegister: () => void;
}

export const HardwareShowcase: React.FC<HardwareShowcaseProps> = ({ onOpenRegister }) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const hardwareItems = [
    {
      number: 'NO. 01',
      title: '3D PRINTERS (JUST FOR FUN)',
      badge: 'SOUVENIRS & TOYS',
      tagline: 'PRINT COOL TRINKETS & KEYCHAINS',
      specs: 'Bambu Lab High-Speed CoreXY Printers · Free Rainbow Filaments',
      description: 'Strictly just for fun! Take a quick break from your computer to print cool souvenir keychains, desk figurines, custom fidget toys, or event badges to take home.',
      features: [
        'Free fun prints for all registered participants during breaks',
        'Pre-sliced library of cool toys, logos, and custom keychains',
        'Helpful technicians on-site to queue and handle your prints',
        'Strictly for entertainment and souvenirs — zero competition pressure',
      ],
      imageSrc: '/assets/aistudio/61F8aqmSb9L_b3a373e4.jpg',
      alt: '3D Printer Rig for Souvenirs and Fun',
      icon: <Printer className="w-5 h-5 text-[#c51c1c]" />,
    },
    {
      number: 'NO. 02',
      title: 'DRONES (JUST FOR FUN)',
      badge: 'FLIGHT ARENA',
      tagline: 'PILOT QUADCOPTERS IN SAFETY CAGE',
      specs: '10x8m Enclosed Indoor Netted Arena · Agile Quadcopters',
      description: 'Strictly just for fun! Step inside the netted arena, pick up a wireless flight controller, and pilot drones through obstacle hoops for pure adrenaline and laughs between coding sprints.',
      features: [
        '100% safe netted indoor flight zone with neon obstacle hoops',
        'Intuitive dual-stick flight controllers with auto-hover assist',
        'Friendly flight marshals to guide you if it is your first time flying',
        'Strictly for downtime thrills — not required for your hackathon submission',
      ],
      imageSrc: '/assets/aistudio/images__1__738db23f.jpeg',
      alt: 'Drone in Netted Arena Just for Fun',
      icon: <Navigation className="w-5 h-5 text-[#c51c1c]" />,
    },
    {
      number: 'NO. 03',
      title: 'PLAYSTATION 5 (JUST FOR FUN)',
      badge: 'GAMING LOUNGE',
      tagline: 'CHILL & PLAY WITH YOUR FRIENDS',
      specs: 'PS5 Consoles · DualSense Haptics · 4K 144Hz Gaming Screens',
      description: 'Strictly just for fun! Relax on comfy couches in front of high-refresh 4K gaming screens. Play FIFA, Tekken 8, Rocket League, and Gran Turismo with fellow hackers during your break.',
      features: [
        'Tournament-grade low-latency 4K 144Hz displays with DualSense controllers',
        'Loaded with top multiplayer party, fighting, and racing games',
        'Open casual gaming lounge to unwind, destress, and challenge friends',
        'Strictly for relaxation and entertainment throughout the 2-day event',
      ],
      imageSrc: '/assets/aistudio/images_2a3a6cef.jpeg',
      alt: 'PlayStation 5 Console and DualSense Setup Just for Fun',
      icon: <Gamepad2 className="w-5 h-5 text-[#c51c1c]" />,
    },
  ];

  return (
    <section id="hardware" className="py-16 bg-[#c51c1c] border-t-2 border-black grain-texture relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header matching screenshot styling */}
        <div className="space-y-3">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ JUST FOR FUN · VENUE ATTRACTIONS ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            PS5, DRONES & 3D PRINTERS (JUST FOR FUN)
          </h2>

          <p className="text-base sm:text-lg text-white font-bold max-w-3xl leading-relaxed">
            The main competition is strictly about building a <strong>Website</strong>, a <strong>Game</strong>, or a <strong>Robot</strong> using your provided topic & dev hardware resources. These 3 zones are on-site strictly for fun, relaxation, and entertainment during breaks!
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

              {/* Hardware Photo Container with User's Local Image */}
              <div className="my-3 h-52 border-2 border-black overflow-hidden relative shadow-inner bg-black group">
                <img
                  src={item.imageSrc}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-[#ffe600] text-black font-mono text-[10px] font-black px-2 py-0.5 border border-black shadow-brutal-sm">
                  JUST FOR FUN
                </div>
              </div>

              <div className="pt-2 text-black space-y-1.5">
                <div className="text-[10px] font-mono font-black text-[#c51c1c] uppercase flex items-center gap-1">
                  <Smile className="w-3.5 h-3.5" />
                  <span>{item.tagline}</span>
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-black leading-none">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-slate-800 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-black flex items-center justify-between text-xs font-mono font-black">
                  <span className="text-[#c51c1c]">
                    {selectedItem === idx ? '● SELECTED ZONE' : 'EXPLORE DETAILS'}
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
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-black text-xs text-[#c51c1c] uppercase">
                  ENTERTAINMENT & RELAXATION ZONE ({hardwareItems[selectedItem].number})
                </span>
                <span className="bg-[#ffe600] text-black font-mono font-black text-[10px] px-2 py-0.5 border border-black">
                  100% FOR FUN
                </span>
              </div>
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
            {/* Left: Purpose & Highlights */}
            <div className="space-y-4">
              <p className="font-mono text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed">
                {hardwareItems[selectedItem].description}
              </p>

              <div className="space-y-2">
                <div className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-[#c51c1c]" />
                  <span>WHAT TO EXPECT AT THIS FUN STATION:</span>
                </div>
                <ul className="space-y-1.5 text-xs font-mono font-bold text-neutral-800">
                  {hardwareItems[selectedItem].features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#c51c1c] font-black">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#f6efe4] border border-black font-mono text-xs font-bold text-neutral-800">
                <span className="text-[#c51c1c]">SPECIFICATION:</span> {hardwareItems[selectedItem].specs}
              </div>
            </div>

            {/* Right: Visual Snapshot */}
            <div className="border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden bg-black h-64 relative">
              <img
                src={hardwareItems[selectedItem].imageSrc}
                alt={hardwareItems[selectedItem].alt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-black/90 text-white font-mono text-xs font-bold px-3 py-1 border border-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#ffe600]" />
                <span>{hardwareItems[selectedItem].title}</span>
              </div>
            </div>
          </div>

          {/* Clear Disclaimer Strip */}
          <div className="p-4 bg-[#ffe600] border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono font-black text-black">
              NOTE: PS5, Drones, and 3D Printers are 100% just for fun! Your competition project is strictly a Website, Game, or Robot built from your provided kickoff topic & dev resources.
            </div>
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-neutral-800 text-[#ffe600] border-2 border-black font-mono font-black text-xs uppercase tracking-wider shadow-brutal transition-colors cursor-pointer whitespace-nowrap"
            >
              REGISTER SQUAD FREE →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
