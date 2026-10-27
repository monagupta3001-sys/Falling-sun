import React, { useState } from 'react';
import { RegistrationFormData } from '../types/hackathon';
import { X, RotateCw, Copy, Check, QrCode, Wifi, Coffee, Calendar, ShieldCheck } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HackerBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  passId: string;
  registrationData: RegistrationFormData | null;
}

export const HackerBadgeModal: React.FC<HackerBadgeModalProps> = ({
  isOpen,
  onClose,
  passId,
  registrationData,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !registrationData) return null;

  const trackInfo = {
    'game-dev': {
      title: 'GAME DEV // BUILD A GAME',
      badgeNum: 'TRACK 01',
      color: '#d12323',
    },
    'web-dev': {
      title: 'WEB DEV // BUILD A WEBSITE',
      badgeNum: 'TRACK 02',
      color: '#0284c7',
    },
    'robotics': {
      title: 'ROBOTICS // BUILD A ROBOT',
      badgeNum: 'TRACK 03',
      color: '#059669',
    },
  }[registrationData.track];

  const handleCopyId = () => {
    playClickSound();
    navigator.clipboard.writeText(passId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#fffdf8] border-3 border-black p-6 shadow-brutal-lg space-y-6 text-black">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
          <div>
            <span className="text-[10px] font-mono font-black uppercase bg-[#ffe600] border border-black px-2 py-0.5">
              CONFIRMED BUILDER
            </span>
            <h3 className="font-display text-2xl font-black text-black mt-1 uppercase">
              FALLING SUN 2026 PASS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-black text-white hover:bg-slate-800 border border-black cursor-pointer shadow-brutal-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Badge Perspective Container */}
        <div className="perspective-1000 flex justify-center py-2">
          <div
            className={`w-full max-w-xs transition-transform duration-500 ease-in-out transform-style-3d cursor-pointer ${
              isFlipped ? '[transform:rotateY(180deg)]' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* FRONT OF TICKET BADGE */}
            {!isFlipped ? (
              <div className="relative bg-[#fffdf8] border-3 border-black p-6 shadow-brutal flex flex-col justify-between">
                {/* Lanyard Hole Mock */}
                <div className="w-12 h-2.5 mx-auto bg-black rounded-full mb-4 shadow-inner" />

                <div className="flex items-center justify-between font-mono text-xs font-black pb-2 border-b-2 border-black">
                  <span className="text-[#d12323] text-sm">FALLING SUN</span>
                  <span className="bg-[#ffe600] border border-black px-1.5 py-0.2">12H+12H</span>
                </div>

                {/* Hacker & Team Details */}
                <div className="my-5 space-y-1">
                  <div className="text-[10px] font-mono font-bold text-slate-600 uppercase">
                    CREDENTIAL HOLDER:
                  </div>
                  <div className="font-display text-3xl font-black leading-none text-black uppercase">
                    {registrationData.fullName}
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-1">
                    SQUAD: <span className="text-[#c51c1c] font-black">{registrationData.teamName || 'SOLO'}</span>
                  </div>
                </div>

                {/* Track Ribbon */}
                <div className="py-1.5 px-2 bg-black text-[#ffe600] font-mono text-xs font-black tracking-wider text-center border border-black mb-4 uppercase">
                  {trackInfo.title}
                </div>

                {/* Fun Zones & Gear */}
                <div className="space-y-1 mb-4">
                  <div className="text-[9px] font-mono uppercase font-bold text-slate-600">
                    APPROVED FUN ZONES & ACCESS:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {registrationData.hardwareRequests.slice(0, 3).map((hw, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#f6efe4] border border-black text-black"
                      >
                        ✓ {hw.replace(' (Just for Fun)', ' (Fun Zone)')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* QR Code & ID Barcode */}
                <div className="pt-3 border-t-2 border-black flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-mono font-bold text-slate-600">PASS ID</div>
                    <div className="font-mono text-xs font-black text-black">{passId}</div>
                    <div className="text-[9px] font-mono text-slate-500 mt-1">OCTOBER 2026</div>
                  </div>

                  <div className="w-12 h-12 bg-white border-2 border-black p-1 flex items-center justify-center shadow-brutal-sm">
                    <QrCode className="w-10 h-10 text-black" />
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[9px] font-mono font-bold text-slate-600">
                    CLICK TO FLIP BADGE ↻
                  </span>
                </div>
              </div>
            ) : (
              /* BACK OF BADGE */
              <div className="relative bg-[#ffe600] border-3 border-black p-6 shadow-brutal [transform:rotateY(180deg)] text-black">
                {/* Lanyard Hole Mock */}
                <div className="w-12 h-2.5 mx-auto bg-black rounded-full mb-4 shadow-inner" />

                <div className="text-center pb-3 border-b-2 border-black">
                  <div className="text-xs font-mono font-black uppercase text-black">
                    OFFICIAL PRIVILEGES & PASS PROTOCOL
                  </div>
                </div>

                <div className="my-4 space-y-3 text-xs font-mono font-bold">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <div>12H + 12H Dual-Day Pass</div>
                      <div className="text-[10px] text-slate-800 font-semibold">Day 1 (09-21h) · Overnight Pause · Day 2 (09-21h)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Wifi className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <div>Topic & Hardware Resource Kit</div>
                      <div className="text-[10px] text-slate-800 font-semibold">Handed out at Kickoff to build Website, Game, or Robot</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Coffee className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <div>All Catered Meals Included</div>
                      <div className="text-[10px] text-slate-800 font-semibold">Meal Pref: {registrationData.dietaryPreference}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <div>Fun Zones Open for Breaks</div>
                      <div className="text-[10px] text-slate-800 font-semibold">PS5 Lounge, Drone Netted Arena & 3D Souvenir Printers</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-black text-center text-[10px] font-mono font-bold">
                  CLICK TO FLIP FRONT ↻
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              playClickSound();
              setIsFlipped(!isFlipped);
            }}
            className="py-2.5 bg-[#f6efe4] hover:bg-white text-black border-2 border-black font-mono font-black text-xs uppercase shadow-brutal-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>FLIP BADGE</span>
          </button>

          <button
            onClick={handleCopyId}
            className="py-2.5 bg-[#f6efe4] hover:bg-white text-black border-2 border-black font-mono font-black text-xs uppercase shadow-brutal-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED' : 'COPY PASS ID'}</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#ffe600] hover:bg-[#ffd900] text-black border-2 border-black font-mono font-black text-xs uppercase tracking-wider shadow-brutal cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
        >
          CONFIRM BADGE & RETURN
        </button>
      </div>
    </div>
  );
};
