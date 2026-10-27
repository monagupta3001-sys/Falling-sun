/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HardwareShowcase } from './components/HardwareShowcase';
import { FormatExplainer } from './components/FormatExplainer';
import { TracksSection } from './components/TracksSection';
import { CommunityUpdates } from './components/CommunityUpdates';
import { SponsorsSection } from './components/SponsorsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { HackerBadgeModal } from './components/HackerBadgeModal';
import { TrackQuizModal } from './components/TrackQuizModal';
import { INITIAL_REGISTERED_TEAMS } from './data/hackathonData';
import { TrackId, RegisteredTeam, RegistrationFormData } from './types/hackathon';

export default function App() {
  const [teams, setTeams] = useState<RegisteredTeam[]>(() => {
    try {
      const stored = localStorage.getItem('fallingsun_teams');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_REGISTERED_TEAMS;
  });

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedTrackForRegister, setSelectedTrackForRegister] = useState<TrackId>('game-dev');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Badge modal state
  const [isBadgeOpen, setIsBadgeOpen] = useState(false);
  const [activePassId, setActivePassId] = useState<string>('FS-2026-GD-1024');
  const [activeRegistrationData, setActiveRegistrationData] = useState<RegistrationFormData | null>(null);

  // Persist teams to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fallingsun_teams', JSON.stringify(teams));
    } catch {
      // ignore
    }
  }, [teams]);

  const handleOpenRegister = (trackId: TrackId = 'game-dev') => {
    setSelectedTrackForRegister(trackId);
    setIsRegisterOpen(true);
  };

  const handleQuizSelectTrack = (trackId: TrackId) => {
    setIsQuizOpen(false);
    handleOpenRegister(trackId);
  };

  const handleRegistrationSuccess = (data: RegistrationFormData, passId: string) => {
    const newTeam: RegisteredTeam = {
      id: `team-${Date.now()}`,
      teamName: data.teamName || `${data.fullName}'s Squad`,
      leadName: data.fullName,
      track: data.track,
      teamSize: data.teamSize,
      hardwareRequested: data.hardwareRequests,
      projectConcept: data.projectConcept,
      registeredAt: 'Just now',
      experienceLevel: data.experienceLevel,
    };

    setTeams((prev) => [newTeam, ...prev]);
    setActivePassId(passId);
    setActiveRegistrationData(data);
    setIsRegisterOpen(false);
    setIsBadgeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#d12323] text-black flex flex-col selection:bg-[#ffe600] selection:text-black">
      {/* 1. Header with Crimson / Black brutalist navbar */}
      <Header
        onOpenRegister={() => handleOpenRegister('game-dev')}
        registeredCount={teams.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero: Exact match of screenshot top half:
            - [ 01. ] // MANIFESTO & PHILOSOPHY
            - Massive dark red background watermark PHILOSOPHY //
            - White badge FALLING SUN
            - Headline: IS WHERE CREATORS BUILDERS TURN IDEAS INTO REALITY.
            - 12+12 hours explanation & FIND OUT MORE button
            - 3 stacked track cards: Game Dev, Web Dev, Robotics */}
        <Hero
          onOpenRegister={() => handleOpenRegister('game-dev')}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onSelectTrack={(trk) => handleOpenRegister(trk)}
        />

        {/* 3. Hardware Showcase: Exact match of screenshot bottom half:
            - [ BRINGING TO THE HACKATHON ]
            - Headline: TECH YOU NEED TO EXPERIENCE
            - 3 Postage stamp cards with hardware photos:
                NO. 01 3D PRINTERS (BAMBU LAB)
                NO. 02 AUTONOMOUS DRONES
                NO. 03 PLAYSTATION 5 RIGS */}
        <HardwareShowcase
          onOpenRegister={() => handleOpenRegister('robotics')}
        />

        {/* 4. Format Explainer: Compact 12H + 12H two-day architecture */}
        <FormatExplainer />

        {/* 5. Three Tracks: Game Dev, Web Dev, Robotics with toolkits & criteria */}
        <TracksSection
          onRegisterWithTrack={(trk) => handleOpenRegister(trk)}
          selectedTrackId={selectedTrackForRegister}
        />

        {/* 6. Community Updates: WhatsApp & Discord direct alert subscriptions */}
        <CommunityUpdates />

        {/* 7. Official Sponsors & Hardware Partners: Sony PS5, Bambu Lab, DJI, GitHub, Vercel, Red Bull */}
        <SponsorsSection
          onOpenRegister={() => handleOpenRegister('game-dev')}
        />

        {/* 8. Rules & FAQ */}
        <FaqSection />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialTrack={selectedTrackForRegister}
        onSubmitSuccess={handleRegistrationSuccess}
      />

      {/* Interactive Hacker Credential Badge Modal */}
      <HackerBadgeModal
        isOpen={isBadgeOpen}
        onClose={() => setIsBadgeOpen(false)}
        passId={activePassId}
        registrationData={activeRegistrationData}
      />

      {/* Interactive Track Diagnostic Quiz Modal */}
      <TrackQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectTrackAndRegister={handleQuizSelectTrack}
      />
    </div>
  );
}
