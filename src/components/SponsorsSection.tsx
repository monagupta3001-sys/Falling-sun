import { FC } from 'react';
import { ExternalLink, Sparkles, Cpu, Award } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Sponsor {
  name: string;
  tier: 'Title Partner' | 'Hardware Partner' | 'Platform Partner' | 'Energy & Fuel';
  tag: string;
  perk: string;
  badgeColor: string;
  logoText: string;
  accentBg: string;
}

const SPONSORS: Sponsor[] = [
  {
    name: 'SONY PLAYSTATION',
    tier: 'Hardware Partner',
    tag: 'DUALSENSE & PS5 SDK LAB',
    perk: '6x PS5 Dev Rigs + 24x DualSense Haptic controllers on-site for Game Dev track.',
    badgeColor: 'bg-[#1e40af] text-white',
    logoText: 'PS5',
    accentBg: 'bg-blue-50',
  },
  {
    name: 'BAMBU LAB',
    tier: 'Hardware Partner',
    tag: 'RAPID PROTOTYPING SPONSOR',
    perk: '8x Bambu X1-Carbon 3D printers + unlimited PLA/PETG filament for chassis builds.',
    badgeColor: 'bg-[#00897b] text-white',
    logoText: 'BAMBU',
    accentBg: 'bg-emerald-50',
  },
  {
    name: 'DJI ENTERPRISE',
    tier: 'Hardware Partner',
    tag: 'AERIAL ROBOTICS PROVIDER',
    perk: '12x Programmable Tello & Matrice drone kits + obstacle field for Robotics track.',
    badgeColor: 'bg-black text-[#ffe600]',
    logoText: 'DJI',
    accentBg: 'bg-amber-50',
  },
  {
    name: 'GITHUB CAMPUS',
    tier: 'Platform Partner',
    tag: 'DEV INFRASTRUCTURE',
    perk: 'Free GitHub Copilot access for all 24H hackers + GitHub swag bags & vouchers.',
    badgeColor: 'bg-purple-700 text-white',
    logoText: 'GITHUB',
    accentBg: 'bg-purple-50',
  },
  {
    name: 'VERCEL',
    tier: 'Platform Partner',
    tag: 'DEPLOYMENT & CLOUD HOSTING',
    perk: 'Instant edge deployments, zero-cold-start hosting, and high-performance serverless functions.',
    badgeColor: 'bg-black text-white',
    logoText: 'VERCEL',
    accentBg: 'bg-zinc-100',
  },
  {
    name: 'RED BULL ENERGY',
    tier: 'Energy & Fuel',
    tag: 'OFFICIAL 24H FUEL',
    perk: 'Cold beverage stations, midnight gaming energy drops, & barista roast bar.',
    badgeColor: 'bg-[#b91c1c] text-[#ffe600]',
    logoText: 'RED BULL',
    accentBg: 'bg-rose-50',
  },
];

interface SponsorsSectionProps {
  onOpenRegister: () => void;
}

export const SponsorsSection: FC<SponsorsSectionProps> = ({ onOpenRegister }) => {
  return (
    <section id="sponsors" className="relative py-16 bg-[#d12323] text-black border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#ffe600] px-3 py-1 font-mono text-xs uppercase font-black tracking-widest text-black border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL 2026 PARTNERS & HARDWARE LABS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase drop-shadow-[3px_3px_0px_#000]">
              POWERED BY INDUSTRY LEADERS
            </h2>
            <p className="font-mono text-xs sm:text-sm text-white/90 max-w-2xl mt-2 font-medium">
              Top industry partners powering our event venue with PS5 consoles, flight arena equipment, Bambu Lab 3D printers, and cloud development infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                onOpenRegister();
              }}
              className="bg-[#ffe600] hover:bg-white text-black font-display font-black tracking-wider text-sm uppercase px-5 py-3 border-3 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all"
            >
              APPLY AS HACKER
            </button>
          </div>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPONSORS.map((sp) => (
            <div
              key={sp.name}
              className="bg-[#fffdf8] border-3 border-black p-5 shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top bar with tier badge and brand mark */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                  <span className={`px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider border border-black ${sp.badgeColor}`}>
                    {sp.tier}
                  </span>
                  <div className="font-display font-black text-xl tracking-wider text-black bg-[#ffe600] px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                    {sp.logoText}
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <h3 className="font-display font-black text-2xl tracking-tight text-black uppercase">
                    {sp.name}
                  </h3>
                  <div className="font-mono text-[11px] font-bold text-[#d12323] tracking-wide">
                    {sp.tag}
                  </div>
                </div>

                <p className="font-mono text-xs text-neutral-800 leading-relaxed font-medium bg-[#fbf6ea] p-3 border border-neutral-300">
                  {sp.perk}
                </p>
              </div>

              {/* Bottom hardware tag */}
              <div className="pt-4 mt-4 border-t-2 border-black flex items-center justify-between font-mono text-[11px] font-black text-black">
                <span className="flex items-center gap-1.5 text-neutral-600">
                  <Cpu className="w-3.5 h-3.5 text-[#d12323]" />
                  <span>ON-SITE HARDWARE POOL</span>
                </span>
                <span className="text-[#d12323] uppercase font-bold flex items-center gap-1">
                  VERIFIED <Award className="w-3.5 h-3.5 text-black" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsor Banner & Inquiries */}
        <div className="mt-8 bg-black text-white p-5 border-3 border-white shadow-[6px_6px_0px_#ffe600] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ffe600] text-black font-black font-display text-2xl flex items-center justify-center border-2 border-white shrink-0">
              FS
            </div>
            <div>
              <div className="font-display font-black text-lg tracking-wider text-[#ffe600] uppercase">
                WANT TO SPONSOR OR MENTOR AT FALLING SUN 2026?
              </div>
              <div className="font-mono text-xs text-neutral-300">
                Put your company SDKs, hardware, and hiring team in front of 300+ elite engineers and developers.
              </div>
            </div>
          </div>
          <a
            href="mailto:partners@fallingsun2026.dev?subject=Sponsorship%20Inquiry%20-%20Falling%20Sun%202026"
            onClick={playClickSound}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#ffe600] text-black font-mono font-black text-xs uppercase px-4 py-2.5 border-2 border-black transition-colors whitespace-nowrap"
          >
            <span>BECOME A SPONSOR</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
