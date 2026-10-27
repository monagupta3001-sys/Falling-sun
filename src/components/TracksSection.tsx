import React, { useState } from 'react';
import { HACKATHON_TRACKS } from '../data/hackathonData';
import { TrackId, TrackInfo } from '../types/hackathon';
import { Gamepad2, Globe, Bot, ArrowRight, CheckCircle2, Wrench, Sparkles, Smile } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface TracksSectionProps {
  onRegisterWithTrack: (trackId: TrackId) => void;
  selectedTrackId?: TrackId;
}

export const TracksSection: React.FC<TracksSectionProps> = ({
  onRegisterWithTrack,
  selectedTrackId = 'game-dev',
}) => {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>(selectedTrackId);

  const getTrackIcon = (id: TrackId) => {
    switch (id) {
      case 'game-dev':
        return <Gamepad2 className="w-6 h-6 text-white" />;
      case 'web-dev':
        return <Globe className="w-6 h-6 text-white" />;
      case 'robotics':
        return <Bot className="w-6 h-6 text-white" />;
    }
  };

  const activeTrack: TrackInfo =
    HACKATHON_TRACKS.find((t) => t.id === activeTrackId) || HACKATHON_TRACKS[0];

  return (
    <section id="tracks" className="py-20 bg-[#d12323] border-t-2 border-black grain-texture relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ 02. COMPETITION TRACKS ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            THREE SPECIALIZED ARENAS
          </h2>

          <p className="text-base sm:text-lg text-white font-bold max-w-3xl leading-relaxed">
            At kickoff, you will be provided with an official <strong>Topic</strong> and <strong>Hardware Resources</strong>. Choose your track and build a <strong>Website</strong>, a <strong>Game</strong>, or a <strong>Robot</strong>.
          </p>
        </div>

        {/* Core Concept Banner */}
        <div className="p-4 bg-[#fffdf8] border-2 border-black shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-3 text-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ffe600] border border-black flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div className="text-xs font-mono font-bold leading-relaxed">
              <strong className="text-[#c51c1c] uppercase">Core Rule:</strong> Every team is evaluated on the Website, Game, or Robot they engineer for the announced topic. PS5, Drones, and 3D printers are strictly just for fun and break-time recreation!
            </div>
          </div>
          <span className="font-mono font-black text-[11px] bg-black text-[#ffe600] px-3 py-1 border border-black uppercase shrink-0">
            TOPIC + HARDWARE AT KICKOFF
          </span>
        </div>

        {/* 3 Tracks Switcher Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {HACKATHON_TRACKS.map((track, idx) => {
            const isActive = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                onClick={() => {
                  playClickSound();
                  setActiveTrackId(track.id);
                }}
                onMouseEnter={playHoverSound}
                className={`p-4 border-2 border-black text-left transition-all cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-[#ffe600] text-black shadow-brutal-lg -translate-y-1 font-black'
                    : 'bg-[#fffdf8] text-black shadow-brutal hover:bg-[#fff9e6]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#c51c1c] border-2 border-black flex items-center justify-center shadow-brutal-sm">
                    {getTrackIcon(track.id)}
                  </div>
                  <div>
                    <div className="font-display text-xl uppercase tracking-wide">
                      {track.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-700 font-bold">
                      {idx === 0 ? 'BUILD A GAME' : idx === 1 ? 'BUILD A WEBSITE' : 'BUILD A ROBOT'}
                    </div>
                  </div>
                </div>

                <span className="font-mono font-black text-xs bg-black text-white px-2 py-0.5">
                  {isActive ? 'ACTIVE' : 'SELECT'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Track Detailed Deep Dive */}
        <div className="p-6 sm:p-10 bg-[#fffdf8] border-2 border-black shadow-brutal-lg text-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#c51c1c] border-2 border-black flex items-center justify-center shadow-brutal-sm">
                  {getTrackIcon(activeTrack.id)}
                </div>
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-black">
                    {activeTrack.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono font-bold text-[#c51c1c] uppercase">
                    {activeTrack.tagline}
                  </p>
                </div>
              </div>

              <p className="text-base text-slate-800 font-semibold leading-relaxed">
                {activeTrack.description}
              </p>

              {/* Hardware & Resources Highlight */}
              <div className="p-4 bg-[#f6efe4] border-2 border-black flex items-start gap-3">
                <Wrench className="w-5 h-5 text-[#c51c1c] shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono font-black text-xs uppercase text-black">
                    PROVIDED HARDWARE & SQUAD RESOURCES:
                  </div>
                  <div className="text-xs font-semibold text-slate-800 mt-1">
                    {activeTrack.hardwareHighlight}
                  </div>
                </div>
              </div>

              {/* Sample Challenges */}
              <div className="space-y-2">
                <div className="font-mono font-black text-xs uppercase text-black">
                  CHALLENGE OBJECTIVES (TO BE ADAPTED TO ANNOUNCED TOPIC):
                </div>
                {activeTrack.sampleChallenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white border border-black flex items-start gap-2.5 text-xs font-semibold text-slate-900 shadow-brutal-sm"
                  >
                    <span className="font-mono font-black text-[#c51c1c]">0{i + 1}.</span>
                    <span>{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Columns */}
            <div className="lg:col-span-5 bg-[#f6efe4] border-2 border-black p-6 space-y-6">
              {/* Toolchains */}
              <div>
                <div className="font-mono font-black text-xs uppercase text-black mb-2">
                  RECOMMENDED TOOLS & STACKS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeTrack.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white border border-black font-mono font-bold text-xs text-black shadow-brutal-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rubric */}
              <div>
                <div className="font-mono font-black text-xs uppercase text-black mb-2">
                  EVALUATION CRITERIA:
                </div>
                <div className="space-y-1.5">
                  {activeTrack.judgingFocus.map((crit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#c51c1c] shrink-0" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun reminder */}
              <div className="p-3 bg-[#ffe600] border border-black flex items-center gap-2 text-xs font-mono font-bold text-black">
                <Smile className="w-4 h-4 text-black shrink-0" />
                <span>PS5 lounge, drone arena & 3D prints are available anytime for fun!</span>
              </div>

              {/* Register Action */}
              <div className="pt-2 border-t-2 border-black">
                <button
                  onClick={() => onRegisterWithTrack(activeTrack.id)}
                  className="w-full py-3.5 bg-[#ffe600] hover:bg-[#ffd900] text-black border-2 border-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-transform flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>REGISTER TO BUILD A {activeTrack.id === 'game-dev' ? 'GAME' : activeTrack.id === 'web-dev' ? 'WEBSITE' : 'ROBOT'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
