import { useRef, useCallback, useEffect } from 'react';

const STAGE_WIDTH = 4000;
const STAGE_HEIGHT = 3000;

export default function useStageDrag() {
  const viewportRef = useRef(null);
  const stageRef = useRef(null);

  // Mutable state refs — never trigger re-renders
  const state = useRef({
    isDragging: false,
    currentX: 0,
    currentY: 0,
    startX: 0,
    startY: 0,
  });

  const updateStagePosition = useCallback((x, y) => {
    const maxX = 0;
    const minX = window.innerWidth - STAGE_WIDTH;
    const maxY = 0;
    const minY = window.innerHeight - STAGE_HEIGHT;

    state.current.currentX = Math.max(minX, Math.min(maxX, x));
    state.current.currentY = Math.max(minY, Math.min(maxY, y));

    if (stageRef.current) {
      stageRef.current.style.transform = `translate(${state.current.currentX}px, ${state.current.currentY}px)`;
    }
  }, []);

  const initPosition = useCallback(() => {
    const centerX = (window.innerWidth - STAGE_WIDTH) / 2;
    const centerY = (window.innerHeight - STAGE_HEIGHT) / 2;
    updateStagePosition(centerX, centerY);
  }, [updateStagePosition]);

  const scrollToPosition = useCallback((x, y) => {
    if (stageRef.current) {
      stageRef.current.classList.add('smooth-reset');

      const targetX = (window.innerWidth / 2) - x;
      const targetY = (window.innerHeight / 2) - y;
      updateStagePosition(targetX, targetY);

      if (viewportRef.current) {
        viewportRef.current.style.setProperty('--mouseX', `${window.innerWidth / 2}px`);
        viewportRef.current.style.setProperty('--mouseY', `${window.innerHeight / 2}px`);
      }

      setTimeout(() => {
        if (stageRef.current) {
          stageRef.current.classList.remove('smooth-reset');
        }
      }, 800);
    }
  }, [updateStagePosition]);

  const recenter = useCallback(() => {
    if (stageRef.current) {
      stageRef.current.classList.add('smooth-reset');
      initPosition();

      if (viewportRef.current) {
        viewportRef.current.style.setProperty('--mouseX', '50%');
        viewportRef.current.style.setProperty('--mouseY', '50%');
      }

      setTimeout(() => {
        if (stageRef.current) {
          stageRef.current.classList.remove('smooth-reset');
        }
      }, 800);
    }
  }, [initPosition]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const startDrag = (e) => {
      state.current.isDragging = true;
      viewport.classList.add('dragging');

      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

      state.current.startX = clientX - state.current.currentX;
      state.current.startY = clientY - state.current.currentY;
    };

    const onDrag = (e) => {
      if (!state.current.isDragging) return;

      if (e.type === 'touchmove') {
        e.preventDefault();
      }

      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

      const newX = clientX - state.current.startX;
      const newY = clientY - state.current.startY;

      updateStagePosition(newX, newY);
    };

    const endDrag = () => {
      state.current.isDragging = false;
      viewport.classList.remove('dragging');
    };

    viewport.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', endDrag);

    viewport.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('touchend', endDrag, { passive: true });

    const handleResize = () => {
      updateStagePosition(state.current.currentX, state.current.currentY);
    };
    window.addEventListener('resize', handleResize);

    // Initialize position
    initPosition();

    return () => {
      viewport.removeEventListener('mousedown', startDrag);
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', endDrag);
      viewport.removeEventListener('touchstart', startDrag);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', endDrag);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateStagePosition, initPosition]);

  return { viewportRef, stageRef, scrollToPosition, recenter };
}
