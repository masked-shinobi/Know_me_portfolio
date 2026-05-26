import React, { useState, useCallback } from 'react';
import useStageDrag from './hooks/useStageDrag';
import useGridReveal from './hooks/useGridReveal';

// Components
import GridOverlay from './components/GridOverlay';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import FloatingMenu from './components/FloatingMenu';
import RecenterButton from './components/RecenterButton';
import DragHint from './components/DragHint';
import FloatingSticker from './components/FloatingSticker';
import Modal from './components/Modal';
import IntroContent from './components/IntroContent';
import ProjectsContent from './components/ProjectsContent';
import EducationContent from './components/EducationContent';

// Cards
import StackCard from './components/cards/StackCard';
import CharacterCard from './components/cards/CharacterCard';
import JourneyCard from './components/cards/JourneyCard';
import ChatCard from './components/cards/ChatCard';
import SocialCard from './components/cards/SocialCard';

export default function App() {
  const { viewportRef, stageRef, scrollToPosition, recenter } = useStageDrag();
  useGridReveal(viewportRef);

  // Modal state
  const [introOpen, setIntroOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);

  // Handle redirect communication from Education Modal to Projects Modal
  React.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.action === 'openProjects') {
        setEducationOpen(false);
        setTimeout(() => setProjectsOpen(true), 300);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Navigation handler — exact coordinates from original script.js
  const handleNavigate = useCallback((target) => {
    switch (target) {
      case 'home':
        scrollToPosition(2000, 1500);
        break;
      case 'work':
        scrollToPosition(1450, 1350);
        break;
      case 'about':
        scrollToPosition(2000, 1500);
        setTimeout(() => setIntroOpen(true), 400);
        break;
      case 'contact':
        scrollToPosition(1700, 2000);
        break;
      default:
        break;
    }
  }, [scrollToPosition]);

  return (
    <>
      {/* Fixed Viewport (Window) */}
      <div id="viewport" ref={viewportRef}>
        <GridOverlay />

        {/* Draggable Stage (World) */}
        <div id="stage" ref={stageRef}>
          {/* Hero Content */}
          <HeroSection onStickerClick={() => setIntroOpen(true)} />

          {/* Pinned Content Cards */}
          <StackCard />
          <CharacterCard />
          <JourneyCard
            onProjectsClick={() => setProjectsOpen(true)}
            onEducationClick={() => setEducationOpen(true)}
          />
          <ChatCard />
          <SocialCard />

          {/* Floating Stickers */}
          <FloatingSticker
            id="sticker-1"
            src="/images/floating-stickers/sticker-1.png"
            alt="Floating Sticker 1"
            style={{ left: 'calc(50% + 580px)', top: '48%' }}
          />
          <FloatingSticker
            id="sticker-2"
            src="/images/floating-stickers/sticker-2.png"
            alt="Floating Sticker 2"
            style={{ left: 'calc(50% - 550px)', top: '55%' }}
          />
          <FloatingSticker
            id="sticker-3"
            src="/images/floating-stickers/sticker-3.png"
            alt="Floating Sticker 3"
            style={{ left: '1950px', top: '1950px' }}
          />
        </div>

        {/* Fixed UI */}
        <Navbar onNavigate={handleNavigate} />
        <DragHint />
        <FloatingMenu onNavigate={handleNavigate} />
        <RecenterButton onRecenter={recenter} />
      </div>

      {/* Intro Modal */}
      <Modal isOpen={introOpen} onClose={() => setIntroOpen(false)}>
        <IntroContent />
      </Modal>

      {/* Projects Modal */}
      <Modal
        isOpen={projectsOpen}
        onClose={() => setProjectsOpen(false)}
        maxWidth="1200px"
        width="95vw"
        height="80vh"
      >
        <ProjectsContent />
      </Modal>

      {/* Education Modal */}
      <Modal
        isOpen={educationOpen}
        onClose={() => setEducationOpen(false)}
        maxWidth="1200px"
        width="95vw"
        height="85vh"
      >
        <EducationContent />
      </Modal>
    </>
  );
}
