const viewport = document.getElementById('viewport');
const stage = document.getElementById('stage');
const hint = document.getElementById('hint');

// Configuration
const STAGE_WIDTH = 4000;
const STAGE_HEIGHT = 3000;

// State
let isDragging = false;
let currentX = 0;
let currentY = 0;
let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;

/**
 * Update the stage position with boundary clamping
 */
function updateStagePosition(x, y) {
    const maxX = 0;
    const minX = window.innerWidth - STAGE_WIDTH;
    const maxY = 0;
    const minY = window.innerHeight - STAGE_HEIGHT;

    // Clamp coordinates
    currentX = Math.max(minX, Math.min(maxX, x));
    currentY = Math.max(minY, Math.min(maxY, y));

    // Apply transform (no transition for zero-latency)
    stage.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

/**
 * Initialize stage position (Center it)
 */
function initPosition() {
    const centerX = (window.innerWidth - STAGE_WIDTH) / 2;
    const centerY = (window.innerHeight - STAGE_HEIGHT) / 2;
    updateStagePosition(centerX, centerY);
}

/**
 * Start Dragging (Mouse & Touch)
 */
function startDrag(e) {
    isDragging = true;
    viewport.classList.add('dragging');

    // Handle both Mouse and Touch events
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    startX = clientX - currentX;
    startY = clientY - currentY;
}

/**
 * Handle Dragging (Mouse & Touch)
 */
function onDrag(e) {
    if (!isDragging) return;

    // For touch events on mobile, prevent default scrolling
    if (e.type === 'touchmove') {
        e.preventDefault();
    }

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const newX = clientX - startX;
    const newY = clientY - startY;

    updateStagePosition(newX, newY);
}

/**
 * End Dragging
 */
function endDrag() {
    isDragging = false;
    viewport.classList.remove('dragging');
}

// Event Listeners
viewport.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', onDrag);
window.addEventListener('mouseup', endDrag);

// Touch Support (Passive: false to allow preventDefault on mobile)
viewport.addEventListener('touchstart', startDrag, { passive: true });
window.addEventListener('touchmove', onDrag, { passive: false });
window.addEventListener('touchend', endDrag, { passive: true });

// Handle Resize
window.addEventListener('resize', () => {
    // Keep clamping updated if window sizes change
    updateStagePosition(currentX, currentY);
});

// Fade out hint after 3 seconds
setTimeout(() => {
    hint.classList.add('fade-out');
}, 3000);

// Initialize
initPosition();

// Theme Toggle Logic
const themeCheckbox = document.getElementById('theme-checkbox');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeCheckbox) themeCheckbox.checked = true;
}

if (themeCheckbox) {
    themeCheckbox.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}


// Center button logic
const recenterBtn = document.getElementById('recenter-btn');
recenterBtn.addEventListener('click', () => {
    // Add smooth class
    stage.classList.add('smooth-reset');
    
    // Reset to center
    initPosition();
    
    // Reset mouse variables for overlay
    viewport.style.setProperty('--mouseX', `50%`);
    viewport.style.setProperty('--mouseY', `50%`);
    
    // Remove smooth class after animation completes
    setTimeout(() => {
        stage.classList.remove('smooth-reset');
    }, 800);
});

// Grid Reveal Effect (Tracking Mouse)
viewport.addEventListener('mousemove', (e) => {
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    viewport.style.setProperty('--mouseX', `${x}px`);
    viewport.style.setProperty('--mouseY', `${y}px`);
});

// Chat Interaction Logic
const chatInput = document.getElementById('chat-input-field');
const chatBubbleText = document.getElementById('chat-text');

if (chatInput && chatBubbleText) {
    // Prevent drag events from firing when interacting with input
    chatInput.addEventListener('mousedown', (e) => e.stopPropagation());
    chatInput.addEventListener('touchstart', (e) => e.stopPropagation());

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default if any
            const userText = chatInput.value.trim();
            if (userText) {
                // Simple reactive feedback
                chatBubbleText.style.opacity = '0';
                
                setTimeout(() => {
                    chatBubbleText.textContent = "That's interesting! Let's explore that further.";
                    chatBubbleText.style.opacity = '1';
                    
                    // Add a little pop animation to the bubble
                    const bubble = chatBubbleText.parentElement;
                    bubble.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    bubble.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        bubble.style.transform = 'scale(1)';
                    }, 300);
                }, 200);

                chatInput.value = '';
            }
        }
    });
    
// Smooth transition for bubble text
    chatBubbleText.style.transition = 'opacity 0.2s ease';
}

/**
 * Universal Draggable Class Implementation
 */
function initializeDraggableStickers() {
    const draggables = document.querySelectorAll('.draggable-sticker-container');
    
    draggables.forEach(sticker => {
        let isStickerDragging = false;
        let stickerStartX = 0;
        let stickerStartY = 0;
        let elementX = 0;
        let elementY = 0;

        sticker.addEventListener('mousedown', (e) => {
            e.stopPropagation(); // CRITICAL: Stop stage from panning when dragging sticker
            isStickerDragging = true;
            stickerStartX = e.clientX;
            stickerStartY = e.clientY;
            
            // Get current style position
            const rect = sticker.getBoundingClientRect();
            // Since we use translate/calc/percent, it's safer to read the computed left/top
            elementX = sticker.offsetLeft;
            elementY = sticker.offsetTop;
            
            sticker.style.transition = 'none'; // Disable pop anim while dragging
        });

        window.addEventListener('mousemove', (e) => {
            if (!isStickerDragging) return;

            const deltaX = e.clientX - stickerStartX;
            const deltaY = e.clientY - stickerStartY;

            sticker.style.left = `${elementX + deltaX}px`;
            sticker.style.top = `${elementY + deltaY}px`;
        });

        window.addEventListener('mouseup', () => {
            if (isStickerDragging) {
                isStickerDragging = false;
                sticker.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Re-enable pop anim
            }
        });

        // Touch support
        sticker.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            isStickerDragging = true;
            stickerStartX = e.touches[0].clientX;
            stickerStartY = e.touches[0].clientY;
            elementX = sticker.offsetLeft;
            elementY = sticker.offsetTop;
            sticker.style.transition = 'none';
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (!isStickerDragging) return;
            e.preventDefault();
            const deltaX = e.touches[0].clientX - stickerStartX;
            const deltaY = e.touches[0].clientY - stickerStartY;
            sticker.style.left = `${elementX + deltaX}px`;
            sticker.style.top = `${elementY + deltaY}px`;
        }, { passive: false });

        window.addEventListener('touchend', () => {
            isStickerDragging = false;
            sticker.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });
}

// Global initialization call
initializeDraggableStickers();
