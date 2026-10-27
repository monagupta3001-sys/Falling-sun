import React, { useState } from 'react';
import { TrackId } from '../types/hackathon';
import { X, Gamepad2, Globe, Bot, ArrowRight, RotateCcw } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface TrackQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrackAndRegister: (trackId: TrackId) => void;
}

export const TrackQuizModal: React.FC<TrackQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectTrackAndRegister,
}) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({
    'game-dev': 0,
    'web-dev': 0,
    robotics: 0,
  });

  if (!isOpen) return null;

  const questions = [
    {
      title: 'When you are given a fresh challenge topic, what do you want to build first?',
      options: [
        {
          label: 'A playable 2D or 3D game with fun physics, responsive controls, and sound design.',
          track: 'game-dev' as TrackId,
        },
        {
          label: 'A high-speed website or interactive web app with clean UI and real-time connectivity.',
          track: 'web-dev' as TrackId,
        },
        {
          label: 'A functional physical robot using microcontrollers, sensors, and motor drivers.',
          track: 'robotics' as TrackId,
        },
      ],
    },
    {
      title: 'What developer toolkit do you feel most at home with?',
      options: [
        {
          label: 'Godot, Unity, Unreal Engine, Pygame, or WebGL game engines.',
          track: 'game-dev' as TrackId,
        },
        {
          label: 'React, Next.js, Node.js, WebSockets, Tailwind CSS, and APIs.',
          track: 'web-dev' as TrackId,
        },
        {
          label: 'ESP32, Arduino, Raspberry Pi, Python, C++, and hardware wiring.',
          track: 'robotics' as TrackId,
        },
      ],
    },
    {
      title: 'What would you feel proudest demonstrating on the main stage on Day 2?',
      options: [
        {
          label: 'A live game demo where judges and attendees pick up a controller to play.',
          track: 'game-dev' as TrackId,
        },
        {
          label: 'A live website walkthrough showing snappy interactions, data flows, and design polish.',
          track: 'web-dev' as TrackId,
        },
        {
          label: 'A real physical robot moving, sensing its environment, and performing its task.',
          track: 'robotics' as TrackId,
        },
      ],
    },
  ];

  const handleSelectOption = (track: TrackId) => {
    playClickSound();
    const newScores = { ...scores, [track]: scores[track] + 1 };
    setScores(newScores);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setCurrentQ(questions.length); // Results screen
    }
  };

  const getWinnerTrack = (): TrackId => {
    const { 'game-dev': g, 'web-dev': w, robotics: r } = scores;
    if (g >= w && g >= r) return 'game-dev';
    if (r >= g && r >= w) return 'robotics';
    return 'web-dev';
  };

  const winner = getWinnerTrack();

  const winnerData = {
    'game-dev': {
      name: 'Game Development Track',
      icon: <Gamepad2 className="w-8 h-8 text-white" />,
      tagline: 'You belong in Game Development!',
      desc: 'Build a playable game based on the revealed topic using Godot, Unity, Unreal, or WebGL. (The PS5 lounge is also ready for you to play games during breaks!)',
      color: 'bg-[#d12323]',
    },
    'web-dev': {
      name: 'Web Development Track',
      icon: <Globe className="w-8 h-8 text-white" />,
      tagline: 'You belong in Web Development!',
      desc: 'Build an interactive website or web application addressing the competition topic with modern UI, reactive states, and seamless APIs.',
      color: 'bg-[#0284c7]',
    },
    'robotics': {
      name: 'Robotics Track',
      icon: <Bot className="w-8 h-8 text-white" />,
      tagline: 'You belong in Robotics!',
      desc: 'Build a functional robot using the hardware resource kit (microcontroller, sensors, motors) handed to your squad at kickoff.',
      color: 'bg-[#059669]',
    },
  }[winner];

  const resetQuiz = () => {
    playClickSound();
    setCurrentQ(0);
    setScores({ 'game-dev': 0, 'web-dev': 0, robotics: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#fffdf8] border-3 border-black shadow-brutal-lg p-6 sm:p-7 text-black">
        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black uppercase bg-[#ffe600] border border-black px-2 py-0.5">
              DIAGNOSTIC
            </span>
            <h3 className="font-display text-2xl font-black text-black uppercase">TRACK MATCHER</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-black text-white hover:bg-slate-800 border border-black cursor-pointer shadow-brutal-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentQ < questions.length ? (
          <div className="my-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-black text-[#d12323]">
              <span>QUESTION {currentQ + 1} OF {questions.length}</span>
              <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
            </div>

            <h4 className="font-display text-2xl font-black text-black leading-tight uppercase">
              {questions[currentQ].title}
            </h4>

            <div className="space-y-2.5 pt-2">
              {questions[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.track)}
                  className="w-full text-left p-4 border-2 border-black bg-white hover:bg-[#ffe600] text-black font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 shadow-brutal-sm hover:translate-x-0.5"
                >
                  <span className="font-mono font-black text-[#d12323] shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="my-6 text-center space-y-4">
            <div className={`w-16 h-16 mx-auto ${winnerData.color} border-2 border-black flex items-center justify-center shadow-brutal`}>
              {winnerData.icon}
            </div>

            <div>
              <div className="text-xs font-mono font-black uppercase text-[#d12323]">
                RECOMMENDED TRACK FIT:
              </div>
              <h4 className="font-display text-3xl font-black text-black uppercase mt-1">
                {winnerData.name}
              </h4>
              <p className="text-xs font-semibold text-slate-800 mt-2 max-w-sm mx-auto leading-relaxed">
                {winnerData.desc}
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => onSelectTrackAndRegister(winner)}
                className="w-full py-3.5 bg-[#ffe600] hover:bg-[#ffd900] text-black border-2 border-black font-mono font-black text-xs sm:text-sm uppercase shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REGISTER FOR {winnerData.name.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={resetQuiz}
                className="py-2 text-xs font-mono font-bold text-slate-600 hover:text-black flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RETAKE DIAGNOSTIC</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
