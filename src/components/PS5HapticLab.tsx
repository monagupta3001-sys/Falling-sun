import React, { useState } from 'react';
import { Gamepad2, Sliders, Activity, Sparkles, Volume2 } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const PS5HapticLab: React.FC = () => {
  const [triggerResistance, setTriggerResistance] = useState(75);
  const [activeProfile, setActiveProfile] = useState<'weapon' | 'racing' | 'bow' | 'custom'>('racing');
  const [lightbarColor, setLightbarColor] = useState('#f97316'); // Solar orange
  const [lastButtonPressed, setLastButtonPressed] = useState<string | null>('R2 Trigger');
  const [isRumbling, setIsRumbling] = useState(false);

  const handlePressButton = (name: string) => {
    playClickSound();
    setLastButtonPressed(name);
    setIsRumbling(true);
    setTimeout(() => setIsRumbling(false), 300);
  };

  const handleProfileChange = (profile: 'weapon' | 'racing' | 'bow' | 'custom') => {
    playClickSound();
    setActiveProfile(profile);
    if (profile === 'weapon') {
      setTriggerResistance(90);
      setLightbarColor('#ef4444');
    } else if (profile === 'racing') {
      setTriggerResistance(65);
      setLightbarColor('#f97316');
    } else if (profile === 'bow') {
      setTriggerResistance(85);
      setLightbarColor('#10b981');
    }
  };

  return (
    <div className="rounded-2xl border border-purple-500/30 bg-[#0a0914] p-5 sm:p-6 shadow-2xl relative overflow-hidden glow-solar-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-purple-950/80 text-purple-400 border border-purple-700/60">
              <Gamepad2 className="w-4 h-4" />
            </span>
            <h3 className="font-display text-lg font-black text-white uppercase tracking-tight">
              DualSense™ Haptic & 4K Lab Rig
            </h3>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-700/60 font-bold">
              6 PS5 Booths Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate adaptive trigger kickback, haptic actuator rumble, and 144Hz frame pacing.
          </p>
        </div>

        {/* 144Hz FPS Telemetry Badge */}
        <div className="flex items-center gap-3 text-xs font-mono bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/10">
          <div>
            <span className="text-slate-400">FRAMERATE: </span>
            <span className="text-emerald-400 font-bold">144.0 FPS</span>
          </div>
          <div>
            <span className="text-slate-400">INPUT LATENCY: </span>
            <span className="text-cyan-400 font-bold">1.2ms</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Left 6 Columns: Interactive DualSense Graphic */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-[#06060c] rounded-2xl border border-purple-500/20 relative">
          {/* Rumble Ring Effect */}
          {isRumbling && (
            <div
              className="absolute inset-4 rounded-3xl border-2 pointer-events-none animate-ping opacity-30"
              style={{ borderColor: lightbarColor }}
            />
          )}

          {/* Controller Top Triggers L1/R1/L2/R2 */}
          <div className="flex items-center justify-between w-64 px-4 mb-2">
            <button
              onClick={() => handlePressButton('L2 Trigger')}
              className="px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-[#141224] text-slate-300 hover:text-white border border-white/10 active:scale-90 transition-transform cursor-pointer"
            >
              L2 (Brake)
            </button>
            <div
              className="h-2 w-28 rounded-full transition-colors shadow-md"
              style={{ backgroundColor: lightbarColor, boxShadow: `0 0 12px ${lightbarColor}` }}
            />
            <button
              onClick={() => handlePressButton('R2 Trigger')}
              className="px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-orange-950 text-orange-300 border border-orange-700 active:scale-90 transition-transform cursor-pointer"
            >
              R2 ({triggerResistance}% Lock)
            </button>
          </div>

          {/* Controller Chassis Mock */}
          <div className="relative w-64 h-36 bg-[#0f0e1e] border-2 border-white/10 rounded-[38px] p-4 flex flex-col justify-between shadow-2xl">
            {/* Upper row: D-Pad & Action Buttons */}
            <div className="flex items-center justify-between px-2">
              {/* D-Pad */}
              <div className="grid grid-cols-3 gap-0.5 w-14 h-14">
                <div />
                <button
                  onClick={() => handlePressButton('D-Pad UP')}
                  className="bg-black/80 hover:bg-slate-800 text-[10px] text-white rounded flex items-center justify-center font-bold cursor-pointer"
                >
                  ▲
                </button>
                <div />
                <button
                  onClick={() => handlePressButton('D-Pad LEFT')}
                  className="bg-black/80 hover:bg-slate-800 text-[10px] text-white rounded flex items-center justify-center font-bold cursor-pointer"
                >
                  ◀
                </button>
                <div className="bg-black/90" />
                <button
                  onClick={() => handlePressButton('D-Pad RIGHT')}
                  className="bg-black/80 hover:bg-slate-800 text-[10px] text-white rounded flex items-center justify-center font-bold cursor-pointer"
                >
                  ▶
                </button>
                <div />
                <button
                  onClick={() => handlePressButton('D-Pad DOWN')}
                  className="bg-black/80 hover:bg-slate-800 text-[10px] text-white rounded flex items-center justify-center font-bold cursor-pointer"
                >
                  ▼
                </button>
                <div />
              </div>

              {/* Touchpad in center */}
              <button
                onClick={() => handlePressButton('Touchpad Click')}
                className="w-16 h-10 rounded-lg bg-black/60 border border-white/10 text-[9px] font-mono text-slate-400 hover:text-white flex items-center justify-center cursor-pointer active:scale-95"
              >
                TOUCHPAD
              </button>

              {/* Action Buttons: Triangle, Circle, Cross, Square */}
              <div className="grid grid-cols-3 gap-0.5 w-14 h-14">
                <div />
                <button
                  onClick={() => handlePressButton('▲ Triangle')}
                  className="bg-black/80 hover:bg-emerald-950 text-emerald-400 text-xs rounded flex items-center justify-center font-bold cursor-pointer"
                >
                  ▲
                </button>
                <div />
                <button
                  onClick={() => handlePressButton('■ Square')}
                  className="bg-black/80 hover:bg-purple-950 text-purple-400 text-xs rounded flex items-center justify-center font-bold cursor-pointer"
                >
                  ■
                </button>
                <div className="bg-black/90" />
                <button
                  onClick={() => handlePressButton('● Circle')}
                  className="bg-black/80 hover:bg-rose-950 text-rose-400 text-xs rounded flex items-center justify-center font-bold cursor-pointer"
                >
                  ●
                </button>
                <div />
                <button
                  onClick={() => handlePressButton('✖ Cross')}
                  className="bg-black/80 hover:bg-blue-950 text-blue-400 text-xs rounded flex items-center justify-center font-bold cursor-pointer"
                >
                  ✖
                </button>
                <div />
              </div>
            </div>

            {/* Lower row: Dual Thumbsticks */}
            <div className="flex items-center justify-around px-4">
              <button
                onClick={() => handlePressButton('L3 Stick')}
                className="w-9 h-9 rounded-full bg-black/80 border border-slate-700 shadow-inner flex items-center justify-center text-[8px] font-mono text-slate-400 cursor-pointer hover:border-purple-400"
              >
                L3
              </button>
              <button
                onClick={() => handlePressButton('PS Button')}
                className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[8px] text-white font-bold"
              >
                P
              </button>
              <button
                onClick={() => handlePressButton('R3 Stick')}
                className="w-9 h-9 rounded-full bg-black/80 border border-slate-700 shadow-inner flex items-center justify-center text-[8px] font-mono text-slate-400 cursor-pointer hover:border-purple-400"
              >
                R3
              </button>
            </div>
          </div>

          <div className="mt-3 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <span>Last Actuated:</span>
            <span className="text-amber-400 font-bold">{lastButtonPressed}</span>
          </div>
        </div>

        {/* Right 6 Columns: Interactive Controls & Profiles */}
        <div className="lg:col-span-6 space-y-5">
          {/* Preset Profiles */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Haptic Simulation Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'racing', label: 'GT7 Anti-Lock', desc: '65% Progressive' },
                { id: 'weapon', label: 'Tactical Trigger', desc: '90% Breakpoint' },
                { id: 'bow', label: 'Tension Draw', desc: '85% Dynamic' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProfileChange(p.id as 'weapon' | 'racing' | 'bow')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeProfile === p.id
                      ? 'border-purple-500 bg-purple-950/60 text-white shadow-md'
                      : 'border-white/10 bg-black/40 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{p.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Resistance Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Adaptive Trigger Resistance</span>
              <span className="font-mono text-purple-400 font-bold">{triggerResistance}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={triggerResistance}
              onChange={(e) => {
                setTriggerResistance(Number(e.target.value));
                setActiveProfile('custom');
              }}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>0% (Hair-Trigger)</span>
              <span>50% (Resistance)</span>
              <span>100% (Hard Lock)</span>
            </div>
          </div>

          {/* Lightbar Color Swatches */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              DualSense Lightbar RGB Tint
            </label>
            <div className="flex items-center gap-2">
              {[
                { hex: '#f97316', label: 'Solar Orange' },
                { hex: '#a855f7', label: 'Laser Violet' },
                { hex: '#06b6d4', label: 'Cyber Cyan' },
                { hex: '#10b981', label: 'Matrix Emerald' },
                { hex: '#ef4444', label: 'Crimson Flare' },
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => {
                    playHoverSound();
                    setLightbarColor(c.hex);
                  }}
                  className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                    lightbarColor === c.hex ? 'scale-125 border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
