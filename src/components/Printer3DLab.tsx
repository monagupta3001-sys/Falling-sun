import React, { useState, useEffect } from 'react';
import { Printer, Play, Pause, RotateCcw, Cpu, Layers, Thermometer } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const Printer3DLab: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<'drone-arm' | 'robot-claw' | 'ps5-grip'>('drone-arm');
  const [isPrinting, setIsPrinting] = useState(true);
  const [progress, setProgress] = useState(42);
  const [nozzleTemp, setNozzleTemp] = useState(245);
  const [bedTemp, setBedTemp] = useState(65);

  const parts = {
    'drone-arm': {
      title: 'Quadcopter Motor Arm Chassis',
      filament: 'PLA-CF (Carbon Fiber)',
      printTime: '1h 14m',
      weight: '38g',
      color: '#f97316',
      layers: 340,
    },
    'robot-claw': {
      title: 'Bionic 3-Finger Robotic Gripper',
      filament: 'Tough PETG (High-Impact)',
      printTime: '2h 05m',
      weight: '62g',
      color: '#10b981',
      layers: 512,
    },
    'ps5-grip': {
      title: 'DualSense Ergonomic Palm Grip',
      filament: 'TPU 95A (Flexible Rubber)',
      printTime: '1h 38m',
      weight: '44g',
      color: '#a855f7',
      layers: 410,
    },
  };

  const activePartData = parts[selectedPart];

  // Print progress simulation loop
  useEffect(() => {
    if (!isPrinting) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return +(prev + 0.3).toFixed(1);
      });
      setNozzleTemp(245 + Math.floor(Math.sin(Date.now() / 600) * 2));
    }, 200);

    return () => clearInterval(interval);
  }, [isPrinting]);

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-[#0a0914] p-5 sm:p-6 shadow-2xl relative overflow-hidden glow-solar-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/60">
              <Printer className="w-4 h-4" />
            </span>
            <h3 className="font-display text-lg font-black text-white uppercase tracking-tight">
              Bambu Lab X1-Carbon Print Studio
            </h3>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60 font-bold">
              8 Printers Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rapid CoreXY 500 mm/s extrusion. Launch daytime prototypes or queue 8h overnight jobs.
          </p>
        </div>

        {/* Temperature & Speed Telemetry */}
        <div className="flex items-center gap-3 text-xs font-mono bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/10">
          <div className="flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-400">NOZZLE: </span>
            <span className="text-rose-400 font-bold">{nozzleTemp}°C</span>
          </div>
          <div>
            <span className="text-slate-400">BED: </span>
            <span className="text-amber-400 font-bold">{bedTemp}°C</span>
          </div>
          <div>
            <span className="text-slate-400">SPEED: </span>
            <span className="text-emerald-400 font-bold">480 mm/s</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Left 6 Columns: Interactive 3D Print Bed Graphic */}
        <div className="lg:col-span-6 bg-[#06060c] p-6 rounded-2xl border border-emerald-500/20 relative flex flex-col justify-between h-64 overflow-hidden">
          {/* Top Axis Rail */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full relative">
            {/* Toolhead Extruder Moving Left-Right */}
            <div
              className="absolute -top-2 w-7 h-5 bg-[#1e293b] border border-emerald-400 rounded-sm flex items-center justify-center transition-all duration-300 shadow-md"
              style={{
                left: `${(Math.sin(Date.now() / 300) * 0.45 + 0.5) * 88}%`,
              }}
            >
              <div className="w-1.5 h-2 bg-rose-500 rounded-full animate-ping" />
            </div>
          </div>

          {/* Sliced Layer Visualizer */}
          <div className="my-auto text-center space-y-2">
            <div className="relative mx-auto w-48 h-28 bg-[#0b0a16] border border-white/10 rounded-xl p-3 flex flex-col justify-end">
              {/* Stacked printed layers */}
              <div
                className="w-full rounded-b transition-all duration-300"
                style={{
                  height: `${progress}%`,
                  backgroundColor: `${activePartData.color}35`,
                  borderTop: `2px solid ${activePartData.color}`,
                  boxShadow: `0 0 14px ${activePartData.color}50`,
                }}
              />
              <div className="text-[10px] font-mono text-slate-300 absolute inset-0 flex items-center justify-center pointer-events-none">
                Layer {Math.round((progress / 100) * activePartData.layers)} / {activePartData.layers}
              </div>
            </div>

            <div className="text-xs font-bold text-white flex items-center justify-center gap-2">
              <span>{activePartData.title}</span>
              <span className="text-[10px] font-mono text-emerald-400">({progress}%)</span>
            </div>
          </div>

          {/* Print Bed Base */}
          <div className="w-full bg-slate-900 h-2 rounded-full border border-slate-700" />
        </div>

        {/* Right 6 Columns: Part Selector & Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Prototyping Preset Model
            </label>
            <div className="space-y-2">
              {(['drone-arm', 'robot-claw', 'ps5-grip'] as const).map((partKey) => {
                const isSelected = selectedPart === partKey;
                const p = parts[partKey];
                return (
                  <button
                    key={partKey}
                    onClick={() => {
                      playClickSound();
                      setSelectedPart(partKey);
                      setProgress(15);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-md'
                        : 'border-white/10 bg-black/40 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{p.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Material: <span className="text-emerald-400">{p.filament}</span> · Est: {p.printTime}
                      </div>
                    </div>
                    <div className="font-mono text-xs text-slate-400 font-bold">{p.weight}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                playClickSound();
                setIsPrinting(!isPrinting);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 flex items-center justify-center gap-2 cursor-pointer shadow-md glow-solar-sm"
            >
              {isPrinting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPrinting ? 'Pause Extruder' : 'Resume Extruder'}</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setProgress(0);
              }}
              className="p-2.5 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 cursor-pointer"
              title="Reset Layer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
