import { useEffect, useRef } from 'react';

export default function useDraggableSticker(stickerRef) {
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    elementX: 0,
    elementY: 0,
  });

  useEffect(() => {
    const sticker = stickerRef.current;
    if (!sticker) return;

    const onStart = (e) => {
      e.stopPropagation(); // Prevent stage panning
      dragState.current.isDragging = true;

      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

      dragState.current.startX = clientX;
      dragState.current.startY = clientY;
      dragState.current.elementX = sticker.offsetLeft;
      dragState.current.elementY = sticker.offsetTop;

      sticker.style.transition = 'none';
    };

    const onMove = (e) => {
      if (!dragState.current.isDragging) return;

      if (e.type === 'touchmove') e.preventDefault();

      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragState.current.startX;
      const deltaY = clientY - dragState.current.startY;

      sticker.style.left = `${dragState.current.elementX + deltaX}px`;
      sticker.style.top = `${dragState.current.elementY + deltaY}px`;
    };

    const onEnd = () => {
      if (dragState.current.isDragging) {
        dragState.current.isDragging = false;
        sticker.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    };

    sticker.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    sticker.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);

    return () => {
      sticker.removeEventListener('mousedown', onStart);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      sticker.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [stickerRef]);
}
