import React, { useState } from 'react';
import { MessageSquare, Bell, ArrowRight, Check, Send, Users, Shield } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/audio';

export const CommunityUpdates: React.FC = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribeWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) return;
    playSuccessSound();
    setSubscribed(true);
    setTimeout(() => {
      setPhoneOrEmail('');
      setSubscribed(false);
    }, 4500);
  };

  return (
    <section id="community" className="py-16 bg-[#d12323] border-t-2 border-black grain-texture relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ LIVE BUILDER CHANNELS ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            GET UPDATES ON WHATSAPP & DISCORD
          </h2>

          <p className="text-base sm:text-lg text-white font-bold max-w-2xl leading-relaxed">
            Don&apos;t miss schedule drops, hardware slot releases, teammate matchmaking, or emergency announcements.
          </p>
        </div>

        {/* 2-Column Community Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: WhatsApp Instant Alerts */}
          <div className="bg-[#fffdf8] border-3 border-black p-6 sm:p-8 shadow-brutal-lg flex flex-col justify-between text-black">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-[#25D366] border-2 border-black flex items-center justify-center text-black font-black shadow-brutal-sm">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase leading-none">
                      WHATSAPP BROADCAST
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-slate-700">
                      OFFICIAL HACKATHON CHANNEL
                    </span>
                  </div>
                </div>

                <span className="font-mono font-black text-[10px] bg-[#25D366] text-black border border-black px-2 py-0.5">
                  INSTANT PUSH
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                Receive direct ping notifications when:
              </p>

              <ul className="space-y-2 text-xs font-mono font-bold text-slate-900">
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] text-sm">●</span>
                  <span>12H Sprint Kickoff & Code Freeze countdown alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] text-sm">●</span>
                  <span>Free 3D Print Farm queue availability notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] text-sm">●</span>
                  <span>Drone flight cage test schedule & food callouts</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t-2 border-black space-y-3">
              <form onSubmit={handleSubscribeWhatsApp} className="flex gap-2">
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="ENTER PHONE (+1 / +91...) OR EMAIL"
                  className="flex-1 px-3 py-2.5 text-xs font-mono font-bold bg-[#f6efe4] border-2 border-black focus:outline-none placeholder:text-slate-500 shadow-brutal-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black border-2 border-black font-mono font-black text-xs uppercase shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-transform flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SUBSCRIBE</span>
                </button>
              </form>

              {subscribed && (
                <div className="p-2.5 bg-[#25D366] border border-black font-mono font-bold text-xs text-black text-center">
                  ✓ Successfully subscribed to WhatsApp event broadcast!
                </div>
              )}

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-[#fffdf8] hover:bg-[#f6efe4] text-black border-2 border-black font-mono font-black text-xs uppercase flex items-center justify-center gap-2 shadow-brutal-sm cursor-pointer"
              >
                <span>OPEN OFFICIAL WHATSAPP COMMUNITY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Discord Hacker Hub */}
          <div className="bg-[#fffdf8] border-3 border-black p-6 sm:p-8 shadow-brutal-lg flex flex-col justify-between text-black">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-[#5865F2] border-2 border-black flex items-center justify-center text-white font-black shadow-brutal-sm">
                    <Users className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase leading-none">
                      DISCORD SERVER
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-slate-700">
                      BUILDERS & MENTORS ARENA
                    </span>
                  </div>
                </div>

                <span className="font-mono font-black text-[10px] bg-[#5865F2] text-white border border-black px-2 py-0.5">
                  480+ MEMBERS
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                Connect directly before and during the 12+12 hours:
              </p>

              <ul className="space-y-2 text-xs font-mono font-bold text-slate-900">
                <li className="flex items-center gap-2">
                  <span className="text-[#5865F2] text-sm">●</span>
                  <span>#find-a-team channel to recruit artists, web devs, & hardware hackers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#5865F2] text-sm">●</span>
                  <span>#ask-mentors voice rooms for ROS2, DualSense & WebGPU debugging</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#5865F2] text-sm">●</span>
                  <span>#hardware-desk channel to request spare filament & drone propellers</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t-2 border-black space-y-3">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="w-full py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white border-2 border-black font-mono font-black text-xs uppercase flex items-center justify-center gap-2 shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-pointer"
              >
                <span>JOIN DISCORD COMMUNITY (INSTANT ACCESS)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="text-[11px] font-mono font-bold text-slate-600 text-center">
                Moderated 24/7 by venue organizers & tech mentors
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
