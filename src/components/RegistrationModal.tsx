import React, { useState } from 'react';
import { TrackId, RegistrationFormData } from '../types/hackathon';
import { X, Check, ArrowRight, ArrowLeft, Gamepad2, Globe, Bot, Shield, AlertCircle, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessSound } from '../utils/audio';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: TrackId;
  onSubmitSuccess: (data: RegistrationFormData, passId: string) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialTrack = 'game-dev',
  onSubmitSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isTeamMode, setIsTeamMode] = useState<boolean>(true);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    teamName: '',
    teamSize: 4,
    track: initialTrack,
    hardwareRequests: ['PlayStation 5 Gaming Lounge (Just for Fun)'],
    experienceLevel: 'Intermediate',
    projectConcept: '',
    githubUrl: '',
    dietaryPreference: 'Standard',
    tshirtSize: 'L',
    acceptRules: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.track) newErrors.track = 'Please select a primary track';
    } else if (currentStep === 2) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) {
        newErrors.email = 'Please provide a valid email address';
      }
      if (isTeamMode && !formData.teamName.trim()) {
        newErrors.teamName = 'Squad name is required for team entry';
      }
    } else if (currentStep === 3) {
      if (formData.hardwareRequests.length === 0) {
        newErrors.hardware = 'Please select at least one fun zone preference or coding-only';
      }
      if (!formData.projectConcept.trim()) {
        newErrors.projectConcept = 'Please describe your preliminary focus or idea (1-2 sentences)';
      }
    } else if (currentStep === 4) {
      if (!formData.acceptRules) {
        newErrors.acceptRules = 'You must accept the 12H+12H format and competition rules';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const toggleHardware = (hw: string) => {
    setFormData((prev) => {
      const exists = prev.hardwareRequests.includes(hw);
      if (exists) {
        return { ...prev, hardwareRequests: prev.hardwareRequests.filter((item) => item !== hw) };
      } else {
        return { ...prev, hardwareRequests: [...prev.hardwareRequests, hw] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    playSuccessSound();

    // Trigger celebratory confetti
    confetti({
      particleCount: 150,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#ffe600', '#d12323', '#000000', '#ffffff'],
    });

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackCode = formData.track === 'game-dev' ? 'GD' : formData.track === 'web-dev' ? 'WD' : 'ROB';
    const passId = `FS-2026-${trackCode}-${randomSuffix}`;

    onSubmitSuccess(formData, passId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#fffdf8] border-3 border-black rounded-none shadow-brutal-lg overflow-hidden my-8 text-black">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black bg-[#ffe600]">
          <div>
            <h3 className="font-display text-2xl font-black text-black uppercase tracking-wide">
              FALLING SUN 2026 REGISTRATION
            </h3>
            <p className="font-mono text-xs font-bold text-slate-800 mt-0.5">
              STEP {step} OF 4: {step === 1 ? 'TRACK SELECTION' : step === 2 ? 'SQUAD DETAILS' : step === 3 ? 'FUN ZONES & PROJECT FOCUS' : 'CONFIRMATION & SIZES'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-black text-white hover:bg-slate-800 border border-black cursor-pointer shadow-brutal-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 border-b-2 border-black">
          <div
            className="h-full bg-[#d12323] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* STEP 1: TRACK & MODE */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                  PARTICIPATION MODE:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsTeamMode(true);
                      setFormData({ ...formData, teamSize: 4 });
                    }}
                    className={`p-4 border-2 border-black text-left transition-all cursor-pointer ${
                      isTeamMode
                        ? 'bg-[#ffe600] text-black shadow-brutal font-black'
                        : 'bg-white text-slate-700 hover:bg-[#fff9e6]'
                    }`}
                  >
                    <div className="font-display text-lg uppercase">SQUAD (2–4 BUILDERS)</div>
                    <div className="text-xs font-mono mt-0.5">Register with your crew</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsTeamMode(false);
                      setFormData({ ...formData, teamSize: 1, teamName: 'Solo Free Agent' });
                    }}
                    className={`p-4 border-2 border-black text-left transition-all cursor-pointer ${
                      !isTeamMode
                        ? 'bg-[#ffe600] text-black shadow-brutal font-black'
                        : 'bg-white text-slate-700 hover:bg-[#fff9e6]'
                    }`}
                  >
                    <div className="font-display text-lg uppercase">SOLO BUILDER</div>
                    <div className="text-xs font-mono mt-0.5">Day 1 morning matching mixer</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                  WHAT WILL YOUR SQUAD BUILD FOR THE TOPIC?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Game Dev */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, track: 'game-dev' })}
                    className={`p-3.5 border-2 border-black text-left transition-all cursor-pointer ${
                      formData.track === 'game-dev'
                        ? 'bg-[#ffe600] text-black shadow-brutal font-black'
                        : 'bg-white text-slate-700 hover:bg-[#fff9e6]'
                    }`}
                  >
                    <div className="w-8 h-8 bg-[#d12323] text-white flex items-center justify-center border border-black mb-2 shadow-brutal-sm">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <div className="font-display text-lg uppercase text-black">BUILD A GAME</div>
                    <div className="text-[10px] font-mono text-slate-800 font-bold">Godot, Unity, Unreal</div>
                  </button>

                  {/* Web Dev */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, track: 'web-dev' })}
                    className={`p-3.5 border-2 border-black text-left transition-all cursor-pointer ${
                      formData.track === 'web-dev'
                        ? 'bg-[#ffe600] text-black shadow-brutal font-black'
                        : 'bg-white text-slate-700 hover:bg-[#fff9e6]'
                    }`}
                  >
                    <div className="w-8 h-8 bg-[#d12323] text-white flex items-center justify-center border border-black mb-2 shadow-brutal-sm">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="font-display text-lg uppercase text-black">BUILD A WEBSITE</div>
                    <div className="text-[10px] font-mono text-slate-800 font-bold">React, Full-stack Web Apps</div>
                  </button>

                  {/* Robotics */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, track: 'robotics' })}
                    className={`p-3.5 border-2 border-black text-left transition-all cursor-pointer ${
                      formData.track === 'robotics'
                        ? 'bg-[#ffe600] text-black shadow-brutal font-black'
                        : 'bg-white text-slate-700 hover:bg-[#fff9e6]'
                    }`}
                  >
                    <div className="w-8 h-8 bg-[#d12323] text-white flex items-center justify-center border border-black mb-2 shadow-brutal-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="font-display text-lg uppercase text-black">BUILD A ROBOT</div>
                    <div className="text-[10px] font-mono text-slate-800 font-bold">Using provided hardware kit</div>
                  </button>
                </div>
                {errors.track && (
                  <p className="text-[#d12323] font-mono text-xs mt-1.5 font-bold">{errors.track}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: TEAM & CONTACT INFO */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-black mb-1">
                    YOUR FULL NAME (LEAD) *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Maya Patel"
                    className="w-full text-xs font-mono bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-[#d12323] font-mono text-xs mt-1 font-bold">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-black mb-1">
                    EMAIL ADDRESS (FOR PASS QR) *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maya@example.com"
                    className="w-full text-xs font-mono bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-[#d12323] font-mono text-xs mt-1 font-bold">{errors.email}</p>
                  )}
                </div>
              </div>

              {isTeamMode && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-black mb-1">
                      SQUAD / TEAM NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      placeholder="e.g. Apex Builders"
                      className="w-full text-xs font-mono bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                    />
                    {errors.teamName && (
                      <p className="text-[#d12323] font-mono text-xs mt-1 font-bold">{errors.teamName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-black mb-1">
                      TEAM SIZE (BUILDERS)
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) =>
                        setFormData({ ...formData, teamSize: parseInt(e.target.value) })
                      }
                      className="w-full text-xs font-mono font-bold bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                    >
                      <option value={2}>2 Builders</option>
                      <option value={3}>3 Builders</option>
                      <option value={4}>4 Builders (Full Squad)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-black mb-1">
                    EXPERIENCE LEVEL
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceLevel: e.target.value as RegistrationFormData['experienceLevel'],
                      })
                    }
                    className="w-full text-xs font-mono font-bold bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                  >
                    <option value="Beginner">Beginner (1st or 2nd Hackathon)</option>
                    <option value="Intermediate">Intermediate (Comfortable building)</option>
                    <option value="Advanced">Advanced (Shipped projects previously)</option>
                    <option value="Pro">Pro / Seasoned Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-black mb-1">
                    GITHUB / PORTFOLIO LINK (OPTIONAL)
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full text-xs font-mono bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: FUN ZONES & CONCEPT */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-1">
                  WHICH ON-SITE FUN ZONES DO YOU PLAN TO VISIT DURING BREAKS?
                </label>
                <p className="text-[11px] font-mono text-neutral-600 mb-2.5">
                  (Note: PS5, Drones, and 3D Printers are strictly just for fun and downtime!)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'PlayStation 5 Gaming Lounge (Just for Fun)',
                    'Indoor Drone Flying Arena (Just for Fun)',
                    '3D Printing Souvenirs Station (Just for Fun)',
                    'Straight to Building (Focus on Project)',
                  ].map((hw) => {
                    const isChecked = formData.hardwareRequests.includes(hw);
                    return (
                      <div
                        key={hw}
                        onClick={() => toggleHardware(hw)}
                        className={`p-3 border-2 border-black flex items-center gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#ffe600] text-black shadow-brutal font-black'
                            : 'bg-white text-slate-800 hover:bg-[#fff9e6]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 border-2 border-black flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-black text-[#ffe600]' : 'bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[4]" />}
                        </div>
                        <span className="text-xs font-mono font-bold">{hw}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.hardware && (
                  <p className="text-[#d12323] font-mono text-xs mt-1.5 font-bold">{errors.hardware}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black mb-1">
                  PRELIMINARY PROJECT CONCEPT / INTEREST *
                </label>
                <p className="text-[11px] font-mono text-neutral-600 mb-1.5">
                  Tell us what kind of website, game, or robot you love building (you will adapt this to the official topic announced at kickoff):
                </p>
                <textarea
                  rows={3}
                  value={formData.projectConcept}
                  onChange={(e) => setFormData({ ...formData, projectConcept: e.target.value })}
                  placeholder="e.g. We plan to build an interactive physics game in Godot, or an autonomous wheeled robot with obstacle avoidance..."
                  className="w-full text-xs font-mono bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                />
                {errors.projectConcept && (
                  <p className="text-[#d12323] font-mono text-xs mt-1 font-bold">{errors.projectConcept}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: PREFERENCES & RULES */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-black mb-1">
                    MEAL PREFERENCE (COMPLIMENTARY)
                  </label>
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) =>
                      setFormData({ ...formData, dietaryPreference: e.target.value })
                    }
                    className="w-full text-xs font-mono font-bold bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                  >
                    <option value="Standard">Standard / Omnivore</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Halal">Halal</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-black mb-1">
                    SWAG T-SHIRT / HOODIE SIZE
                  </label>
                  <select
                    value={formData.tshirtSize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tshirtSize: e.target.value as RegistrationFormData['tshirtSize'],
                      })
                    }
                    className="w-full text-xs font-mono font-bold bg-white text-black border-2 border-black p-2.5 shadow-brutal-sm focus:outline-none"
                  >
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                    <option value="XXL">Double Extra Large (XXL)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-[#f6efe4] border-2 border-black space-y-2 text-xs font-mono">
                <div className="font-black text-black uppercase">
                  12H + 12H DUAL-DAY CODE OF INTEGRITY:
                </div>
                <div className="text-slate-800 space-y-1">
                  <p>1. 12H Sprint on Day 1 (09:00 - 21:00) · Overnight Rest · 12H Sprint on Day 2 (09:00 - 21:00).</p>
                  <p>2. Topic and Hardware Resources will be provided at kickoff; squads build Websites, Games, or Robots.</p>
                  <p>3. PS5, Drones, and 3D Printers are strictly for fun and leisure during breaks.</p>
                </div>

                <label className="flex items-start gap-2.5 pt-2 border-t border-black cursor-pointer font-bold text-black">
                  <input
                    type="checkbox"
                    checked={formData.acceptRules}
                    onChange={(e) => setFormData({ ...formData, acceptRules: e.target.checked })}
                    className="mt-0.5 accent-black"
                  />
                  <span>I agree to the 12H+12H schedule, competition rules, and understand PS5/drones/3D printers are strictly just for fun.</span>
                </label>
                {errors.acceptRules && (
                  <p className="text-[#d12323] font-bold">{errors.acceptRules}</p>
                )}
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-black">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 text-xs font-mono font-black text-black bg-[#fffdf8] hover:bg-white border-2 border-black shadow-brutal-sm flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREV</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-mono font-black uppercase text-black bg-[#ffe600] hover:bg-[#ffd900] border-2 border-black shadow-brutal flex items-center gap-1.5 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-mono font-black uppercase text-black bg-[#ffe600] hover:bg-[#ffd900] border-2 border-black shadow-brutal flex items-center gap-2 cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
              >
                <span>SUBMIT & PRINT BADGE</span>
                <Check className="w-4 h-4 stroke-[4]" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
