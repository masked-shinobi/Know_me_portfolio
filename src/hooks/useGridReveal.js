import { useEffect } from 'react';

export default function useGridReveal(viewportRef) {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleMouseMove = (e) => {
      const rect = viewport.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      viewport.style.setProperty('--mouseX', `${x}px`);
      viewport.style.setProperty('--mouseY', `${y}px`);
    };

    viewport.addEventListener('mousemove', handleMouseMove);

    return () => {
      viewport.removeEventListener('mousemove', handleMouseMove);
    };
  }, [viewportRef]);
}
