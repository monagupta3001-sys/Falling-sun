import React, { useState } from 'react';
import { RegisteredTeam, TrackId } from '../types/hackathon';
import { Search, Users, Gamepad2, Globe, Bot, PlusCircle } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface TeamsRosterProps {
  teams: RegisteredTeam[];
  onOpenRegister: () => void;
}

export const TeamsRoster: React.FC<TeamsRosterProps> = ({ teams, onOpenRegister }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState<'all' | TrackId>('all');

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.projectConcept.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack = trackFilter === 'all' || team.track === trackFilter;

    return matchesSearch && matchesTrack;
  });

  const getTrackBadge = (track: TrackId) => {
    switch (track) {
      case 'game-dev':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-black bg-[#ffe600] border border-black px-2 py-0.5">
            <Gamepad2 className="w-3 h-3 text-black" />
            <span>GAME DEV</span>
          </span>
        );
      case 'web-dev':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-black bg-[#ffe600] border border-black px-2 py-0.5">
            <Globe className="w-3 h-3 text-black" />
            <span>WEB DEV</span>
          </span>
        );
      case 'robotics':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-black bg-[#ffe600] border border-black px-2 py-0.5">
            <Bot className="w-3 h-3 text-black" />
            <span>ROBOTICS</span>
          </span>
        );
    }
  };

  return (
    <section id="teams" className="py-20 bg-[#c51c1c] border-t-2 border-black grain-texture relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-block">
              <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
                [ 05. REGISTERED SQUADS ]
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
              LIVE HACKER ROSTER
            </h2>

            <p className="text-base text-white font-bold max-w-xl leading-relaxed">
              Meet the high-agency engineering squads competing across the two 12-hour sprints with PS5, autonomous drones, and 3D printing equipment.
            </p>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onOpenRegister();
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#ffe600] hover:bg-[#ffd900] text-black border-2 border-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-transform self-start md:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>REGISTER YOUR SQUAD</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#fffdf8] border-2 border-black shadow-brutal">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH SQUAD OR CONCEPT..."
              className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold text-black bg-[#f6efe4] border-2 border-black focus:outline-none placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'game-dev', 'web-dev', 'robotics'] as const).map((trk) => (
              <button
                key={trk}
                onClick={() => {
                  playClickSound();
                  setTrackFilter(trk);
                }}
                className={`px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-black ${
                  trackFilter === trk
                    ? 'bg-[#ffe600] text-black shadow-brutal-sm'
                    : 'bg-white text-slate-800 hover:bg-[#fff9e6]'
                }`}
              >
                {trk === 'all' ? 'ALL SQUADS' : trk.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Squad Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-[#fffdf8] border-2 border-black p-5 shadow-brutal flex flex-col justify-between text-black hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-black">
                  {getTrackBadge(team.track)}
                  <div className="flex items-center gap-1 font-mono text-xs font-black text-black">
                    <Users className="w-3.5 h-3.5" />
                    <span>{team.teamSize} HACKERS</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-xl font-black text-black uppercase">
                    {team.teamName}
                  </h4>
                  <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                    LEAD: <span className="text-black">{team.leadName}</span> ·{' '}
                    <span className="text-[#c51c1c]">{team.experienceLevel}</span>
                  </div>
                </div>

                <p className="text-xs font-semibold text-slate-800 leading-relaxed line-clamp-3">
                  {team.projectConcept}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-black space-y-1.5">
                <div className="text-[9px] font-mono font-bold text-slate-600 uppercase">
                  RESERVED GEAR:
                </div>
                <div className="flex flex-wrap gap-1">
                  {team.hardwareRequested.map((hw, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#f6efe4] border border-black text-black"
                    >
                      {hw.replace('PlayStation 5', 'PS5').replace(' (PLA-CF)', '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
