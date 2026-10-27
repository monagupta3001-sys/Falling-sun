import React, { useState } from 'react';
import { HARDWARE_STATIONS } from '../data/hackathonData';
import { HardwareStation } from '../types/hackathon';
import { DroneFlightSimulator } from './DroneFlightSimulator';
import { PS5HapticLab } from './PS5HapticLab';
import { Printer3DLab } from './Printer3DLab';
import { Gamepad2, Navigation, Printer, CheckCircle2, AlertTriangle, Cpu, Play } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface HardwareLabProps {
  onOpenRegister: () => void;
}

export const HardwareLab: React.FC<HardwareLabProps> = ({ onOpenRegister }) => {
  const [selectedStationId, setSelectedStationId] = useState<'3d-printers' | 'drones' | 'ps5'>('3d-printers');
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('Day 1: 02:00 PM - 03:00 PM');
  const [simulatedReserveSuccess, setSimulatedReserveSuccess] = useState<boolean>(false);

  const activeStation: HardwareStation =
    HARDWARE_STATIONS.find((s) => s.id === selectedStationId) || HARDWARE_STATIONS[2];

  const handleSimulateReservation = () => {
    playClickSound();
    setSimulatedReserveSuccess(true);
    setTimeout(() => {
      setSimulatedReserveSuccess(false);
    }, 4000);
  };

  return (
    <section id="hardware" className="py-20 bg-[#c51c1c] border-t-2 border-black grain-texture relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header matching screenshot */}
        <div className="space-y-3">
          <div className="inline-block">
            <span className="bg-[#ffe600] text-black border-2 border-black font-mono font-black text-xs uppercase px-2.5 py-0.5 shadow-brutal-sm">
              [ BRINGING TO THE HACKATHON ]
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#fffdf8] drop-shadow-brutal uppercase tracking-tight">
            TECH YOU NEED TO EXPERIENCE
          </h2>

          <p className="text-base sm:text-lg text-white/95 max-w-2xl font-bold leading-relaxed">
            Hackathons should not live on laptops alone. We are bringing hardware you can touch, fly, and play with.
          </p>
        </div>

        {/* 3 Postage-Stamp Hardware Cards matching the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card NO. 01: 3D Printers */}
          <div
            onClick={() => {
              playClickSound();
              setSelectedStationId('3d-printers');
            }}
            onMouseEnter={playHoverSound}
            className={`stamp-card p-4 transition-transform cursor-pointer hover:-translate-y-1 ${
              selectedStationId === '3d-printers' ? 'ring-4 ring-[#ffe600]' : ''
            }`}
          >
            {/* Top Stamp Number */}
            <div className="flex items-center justify-between pb-2 border-b border-black text-black">
              <span className="font-mono font-black text-xs tracking-wider">NO. 01</span>
              <span className="font-mono font-bold text-[10px] bg-[#ffe600] border border-black px-1.5">
                8 MACHINES
              </span>
            </div>

            {/* Hardware Mock Photo Container (with authentic 3D printer illustration/mock) */}
            <div className="my-3 h-48 bg-[#18181b] border-2 border-black overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              {/* Graphic representation of 3D printer */}
              <div className="text-center z-10 space-y-2">
                <div className="w-16 h-16 mx-auto bg-[#27272a] border-2 border-[#ffe600] flex items-center justify-center text-[#ffe600] shadow-brutal-sm">
                  <Printer className="w-8 h-8" />
                </div>
                <div className="font-display text-xl font-black text-white tracking-wider">
                  BAMBU LAB X1-CARBON
                </div>
                <div className="text-[10px] font-mono text-[#ffe600]">
                  500 mm/s · PLA-CF & PETG
                </div>
              </div>
            </div>

            <div className="pt-2 text-black space-y-1">
              <h3 className="font-display text-xl font-black uppercase">
                3D PRINT FARM
              </h3>
              <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                Turn your CAD models into drone arms, robot claws, and controller shells within hours.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-[#c51c1c]">
                <span>{selectedStationId === '3d-printers' ? '● SIMULATOR ACTIVE' : 'CLICK TO TEST'}</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Card NO. 02: Drones */}
          <div
            onClick={() => {
              playClickSound();
              setSelectedStationId('drones');
            }}
            onMouseEnter={playHoverSound}
            className={`stamp-card p-4 transition-transform cursor-pointer hover:-translate-y-1 ${
              selectedStationId === 'drones' ? 'ring-4 ring-[#ffe600]' : ''
            }`}
          >
            {/* Top Stamp Number */}
            <div className="flex items-center justify-between pb-2 border-b border-black text-black">
              <span className="font-mono font-black text-xs tracking-wider">NO. 02</span>
              <span className="font-mono font-bold text-[10px] bg-[#ffe600] border border-black px-1.5">
                10x8m CAGE
              </span>
            </div>

            {/* Hardware Mock Photo Container */}
            <div className="my-3 h-48 bg-[#18181b] border-2 border-black overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="text-center z-10 space-y-2">
                <div className="w-16 h-16 mx-auto bg-[#27272a] border-2 border-[#ffe600] flex items-center justify-center text-[#ffe600] shadow-brutal-sm">
                  <Navigation className="w-8 h-8" />
                </div>
                <div className="font-display text-xl font-black text-white tracking-wider">
                  AUTONOMOUS QUADCOPTERS
                </div>
                <div className="text-[10px] font-mono text-[#ffe600]">
                  PX4 / Tello · Optical Flow
                </div>
              </div>
            </div>

            <div className="pt-2 text-black space-y-1">
              <h3 className="font-display text-xl font-black uppercase">
                DRONE FLIGHT CAGE
              </h3>
              <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                Indoor netted obstacle arena with neon gates and telemetry receivers.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-[#c51c1c]">
                <span>{selectedStationId === 'drones' ? '● SIMULATOR ACTIVE' : 'CLICK TO TEST'}</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Card NO. 03: PlayStation 5 */}
          <div
            onClick={() => {
              playClickSound();
              setSelectedStationId('ps5');
            }}
            onMouseEnter={playHoverSound}
            className={`stamp-card p-4 transition-transform cursor-pointer hover:-translate-y-1 ${
              selectedStationId === 'ps5' ? 'ring-4 ring-[#ffe600]' : ''
            }`}
          >
            {/* Top Stamp Number */}
            <div className="flex items-center justify-between pb-2 border-b border-black text-black">
              <span className="font-mono font-black text-xs tracking-wider">NO. 03</span>
              <span className="font-mono font-bold text-[10px] bg-[#ffe600] border border-black px-1.5">
                6 BOOTHS
              </span>
            </div>

            {/* Hardware Mock Photo Container */}
            <div className="my-3 h-48 bg-[#18181b] border-2 border-black overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="text-center z-10 space-y-2">
                <div className="w-16 h-16 mx-auto bg-[#27272a] border-2 border-[#ffe600] flex items-center justify-center text-[#ffe600] shadow-brutal-sm">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <div className="font-display text-xl font-black text-white tracking-wider">
                  PLAYSTATION 5 RIGS
                </div>
                <div className="text-[10px] font-mono text-[#ffe600]">
                  DualSense Haptics · 4K 144Hz
                </div>
              </div>
            </div>

            <div className="pt-2 text-black space-y-1">
              <h3 className="font-display text-xl font-black uppercase">
                PLAYSTATION 5 DEV BOOTHS
              </h3>
              <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                Next-gen console hardware, DualSense triggers, and overnight casual arcade cup.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-[#c51c1c]">
                <span>{selectedStationId === 'ps5' ? '● SIMULATOR ACTIVE' : 'CLICK TO TEST'}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE LIVE SIMULATOR FOR SELECTED HARDWARE */}
        <div className="p-2 sm:p-4 bg-[#fffdf8] border-2 border-black shadow-brutal-lg">
          <div className="p-3 bg-[#ffe600] border-2 border-black mb-4 flex items-center justify-between font-mono font-black text-xs text-black">
            <span>● LIVE TESTBENCH: {activeStation.name.toUpperCase()}</span>
            <span>PRESS OR CLICK CONTROLS BELOW</span>
          </div>

          {selectedStationId === 'drones' && <DroneFlightSimulator />}
          {selectedStationId === 'ps5' && <PS5HapticLab />}
          {selectedStationId === '3d-printers' && <Printer3DLab />}
        </div>

        {/* Hardware Slot Reservation Simulator */}
        <div className="p-6 sm:p-8 bg-[#fffdf8] border-2 border-black shadow-brutal-lg text-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block bg-black text-[#ffe600] font-mono font-bold text-xs px-2 py-0.5">
                STATION SPECS & PROVISIONING
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
                {activeStation.name}
              </h3>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {activeStation.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {activeStation.specs.map((spec, i) => (
                  <div key={i} className="p-3 bg-[#f6efe4] border border-black">
                    <div className="text-[10px] font-mono text-slate-600 uppercase font-bold">{spec.label}</div>
                    <div className="text-xs sm:text-sm font-mono font-black text-black mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#f6efe4] border-2 border-black p-5 space-y-4">
              <div className="font-mono font-black text-xs uppercase flex items-center justify-between border-b border-black pb-2">
                <span>LAB RESERVATION DESK</span>
                <span className="text-[#c51c1c]">FREE HOLD</span>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold mb-1">CHOOSE SPRINT TIME SLOT:</label>
                <select
                  value={selectedSlotTime}
                  onChange={(e) => setSelectedSlotTime(e.target.value)}
                  className="w-full text-xs font-mono font-bold bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                >
                  <option value="Day 1: 10:30 AM - 11:30 AM">Day 1: 10:30 AM – 11:30 AM (Solar Sprint 1 Kickoff)</option>
                  <option value="Day 1: 02:00 PM - 03:00 PM">Day 1: 02:00 PM – 03:00 PM (Midday Testing)</option>
                  <option value="Overnight: 08:30 PM Queue">Overnight: 08:30 PM Queue (8h Unattended 3D Batch)</option>
                  <option value="Day 2: 10:00 AM - 11:00 AM">Day 2: 10:00 AM – 11:00 AM (Final Obstacle Trials)</option>
                </select>
              </div>

              {simulatedReserveSuccess ? (
                <div className="p-3 bg-black text-[#ffe600] font-mono font-bold text-xs text-center border-2 border-black">
                  ✓ Slot hold confirmed! Complete registration to lock in your official pass.
                </div>
              ) : (
                <button
                  onClick={handleSimulateReservation}
                  className="w-full py-3 bg-[#ffe600] hover:bg-[#ffd900] text-black border-2 border-black font-mono font-black text-xs uppercase shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-pointer"
                >
                  SIMULATE SLOT HOLD
                </button>
              )}

              <button
                onClick={onOpenRegister}
                className="w-full py-3 bg-black text-white hover:bg-slate-900 border-2 border-black font-mono font-black text-xs uppercase shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-pointer"
              >
                REGISTER SQUAD TO CLAIM GEAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
