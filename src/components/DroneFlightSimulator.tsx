import React, { useState, useEffect, useRef } from 'react';
import { Navigation, Play, RotateCcw, ShieldCheck, Zap, Crosshair } from 'lucide-react';
import { playClickSound, playTelemetryBeep } from '../utils/audio';

export const DroneFlightSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [dronePos, setDronePos] = useState({ x: 60, y: 150 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });
  const [isAutoFlying, setIsAutoFlying] = useState(false);
  const [gatesCleared, setGatesCleared] = useState(0);
  const [battery, setBattery] = useState(94);
  const [altitude, setAltitude] = useState(2.4);

  // Flight cage obstacle hoops
  const gates = [
    { x: 180, y: 100, height: 70, passed: false },
    { x: 320, y: 170, height: 70, passed: false },
    { x: 460, y: 90, height: 70, passed: false },
    { x: 580, y: 140, height: 70, passed: false },
  ];

  const resetFlight = () => {
    playClickSound();
    setDronePos({ x: 60, y: 150 });
    setVelocity({ vx: 0, vy: 0 });
    setIsAutoFlying(false);
    setGatesCleared(0);
    setBattery(98);
    setAltitude(2.4);
  };

  const startAutonomousRun = () => {
    playClickSound();
    setIsAutoFlying(true);
    setDronePos({ x: 60, y: 150 });
    setGatesCleared(0);
  };

  // Autonomous waypoint pathing loop
  useEffect(() => {
    if (!isAutoFlying) return;

    let frameId: number;
    const waypoints = [
      { x: 180, y: 135 },
      { x: 320, y: 205 },
      { x: 460, y: 125 },
      { x: 580, y: 175 },
      { x: 660, y: 150 },
    ];

    let currentWaypointIdx = 0;

    const runAutoStep = () => {
      setDronePos((prev) => {
        const target = waypoints[currentWaypointIdx];
        if (!target) {
          setIsAutoFlying(false);
          return prev;
        }

        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 8) {
          currentWaypointIdx++;
          setGatesCleared((g) => Math.min(4, g + 1));
          playTelemetryBeep();
          if (currentWaypointIdx >= waypoints.length) {
            setIsAutoFlying(false);
            return prev;
          }
        }

        const speed = 2.2;
        const vx = (dx / (dist || 1)) * speed;
        const vy = (dy / (dist || 1)) * speed;

        return {
          x: prev.x + vx,
          y: prev.y + vy,
        };
      });

      setBattery((b) => Math.max(10, b - 0.03));
      setAltitude((prev) => +(2.2 + Math.sin(Date.now() / 400) * 0.3).toFixed(2));

      frameId = requestAnimationFrame(runAutoStep);
    };

    frameId = requestAnimationFrame(runAutoStep);
    return () => cancelAnimationFrame(frameId);
  }, [isAutoFlying]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 720);
    const height = (canvas.height = 280);

    ctx.clearRect(0, 0, width, height);

    // Draw Flight Cage Mesh Grid Floor
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Safety Netting Perimeter Boundary
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(10, 10, width - 20, height - 20);
    ctx.setLineDash([]);

    // Draw Neon Obstacle Gates
    gates.forEach((gate, idx) => {
      const isCleared = idx < gatesCleared;
      ctx.save();

      // Gate posts
      ctx.strokeStyle = isCleared ? '#10b981' : '#f97316';
      ctx.shadowBlur = 12;
      ctx.shadowColor = isCleared ? 'rgba(16, 185, 129, 0.8)' : 'rgba(249, 115, 22, 0.8)';
      ctx.lineWidth = 3;

      // Gate ring
      ctx.beginPath();
      ctx.ellipse(gate.x, gate.y + gate.height / 2, 14, gate.height / 2, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Gate Top Marker
      ctx.fillStyle = isCleared ? '#10b981' : '#f97316';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(`GATE 0${idx + 1}`, gate.x - 18, gate.y - 8);

      ctx.restore();
    });

    // Draw Landing Pad at Start
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(60, 150, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '9px monospace';
    ctx.fillText('HELIPAD', 42, 154);

    // Draw Drone Quadcopter at dronePos
    ctx.save();
    ctx.translate(dronePos.x, dronePos.y);

    // Drone shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Drone Arms (X configuration)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-14, -14);
    ctx.lineTo(14, 14);
    ctx.moveTo(-14, 14);
    ctx.lineTo(14, -14);
    ctx.stroke();

    // Drone Central Body
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Animated Rotors
    const rotorAngle = (Date.now() / 25) % (Math.PI * 2);
    const rotorOffsets = [
      [-14, -14],
      [14, -14],
      [-14, 14],
      [14, 14],
    ];

    rotorOffsets.forEach(([rx, ry], idx) => {
      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(rotorAngle + (idx * Math.PI) / 2);
      ctx.strokeStyle = idx < 2 ? '#38bdf8' : '#f97316'; // front cyan, back orange
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-9, 0);
      ctx.lineTo(9, 0);
      ctx.stroke();
      ctx.restore();
    });

    // Optical Flow Sensor Ray downward
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 16);
    ctx.stroke();

    ctx.restore();
  }, [dronePos, gatesCleared]);

  const moveDrone = (dx: number, dy: number) => {
    playTelemetryBeep();
    setDronePos((prev) => ({
      x: Math.max(30, Math.min(680, prev.x + dx)),
      y: Math.max(30, Math.min(250, prev.y + dy)),
    }));
  };

  return (
    <div className="rounded-2xl border border-orange-500/30 bg-[#0a0914] p-5 sm:p-6 shadow-2xl relative overflow-hidden glow-solar-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-orange-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-orange-950/80 text-orange-400 border border-orange-700/60">
              <Navigation className="w-4 h-4" />
            </span>
            <h3 className="font-display text-lg font-black text-white uppercase tracking-tight">
              Indoor Flight Cage Mini-Sim
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60 font-bold">
              10x8m Arena Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Test autonomous waypoint PID algorithms through lighted obstacle hoops in real-time.
          </p>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="flex items-center gap-4 text-xs font-mono bg-black/60 px-3.5 py-1.5 rounded-xl border border-white/10">
          <div>
            <span className="text-slate-400">ALT: </span>
            <span className="text-amber-400 font-bold">{altitude}m</span>
          </div>
          <div>
            <span className="text-slate-400">GATES: </span>
            <span className="text-emerald-400 font-bold">{gatesCleared}/4</span>
          </div>
          <div>
            <span className="text-slate-400">BATT: </span>
            <span className="text-cyan-400 font-bold">{Math.round(battery)}%</span>
          </div>
        </div>
      </div>

      {/* Interactive Canvas Viewport */}
      <div className="relative mt-4 rounded-xl overflow-hidden bg-[#06060c] border border-orange-500/20 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full max-w-[720px] h-[280px] block cursor-crosshair"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = ((e.clientX - rect.left) / rect.width) * 720;
            const clickY = ((e.clientY - rect.top) / rect.height) * 280;
            setDronePos({ x: clickX, y: clickY });
            playTelemetryBeep();
          }}
        />

        {/* Overlay Helper Text */}
        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-400 pointer-events-none">
          Click arena or use controls to pilot · Optical Flow Locked
        </div>
      </div>

      {/* Flight Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={startAutonomousRun}
            disabled={isAutoFlying}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              isAutoFlying
                ? 'bg-orange-950 text-orange-400 border border-orange-800 opacity-60'
                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-300 hover:to-orange-400 shadow-md glow-solar-sm'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isAutoFlying ? 'Autonomous Run In Progress...' : 'Run Autonomous Course'}</span>
          </button>

          <button
            onClick={resetFlight}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
            title="Reset Drone Position"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Directional Pad */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => moveDrone(-25, 0)}
            className="px-2.5 py-1 text-xs font-mono font-bold bg-[#141224] text-slate-300 hover:text-white border border-white/10 rounded-lg hover:border-orange-500 cursor-pointer"
          >
            ← Left
          </button>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => moveDrone(0, -25)}
              className="px-2 py-0.5 text-xs font-mono font-bold bg-[#141224] text-slate-300 hover:text-white border border-white/10 rounded-lg hover:border-orange-500 cursor-pointer"
            >
              ↑ Up
            </button>
            <button
              onClick={() => moveDrone(0, 25)}
              className="px-2 py-0.5 text-xs font-mono font-bold bg-[#141224] text-slate-300 hover:text-white border border-white/10 rounded-lg hover:border-orange-500 cursor-pointer"
            >
              ↓ Down
            </button>
          </div>
          <button
            onClick={() => moveDrone(25, 0)}
            className="px-2.5 py-1 text-xs font-mono font-bold bg-[#141224] text-slate-300 hover:text-white border border-white/10 rounded-lg hover:border-orange-500 cursor-pointer"
          >
            Right →
          </button>
        </div>
      </div>
    </div>
  );
};
