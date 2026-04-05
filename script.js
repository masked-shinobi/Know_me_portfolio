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

// --- Single-Bubble "Sanjay AI" Logic ---
const chatInput = document.getElementById('chat-input-field');
const chatBubble = document.getElementById('chat-bubble');
const chatText = document.getElementById('chat-text');
const chatCard = document.querySelector('.chat-card');

if (chatInput && chatBubble && chatText) {
    const resumeContext = `
        You are the AI double of Sanjay Baskar, a Cloud & Security Developer. 
        Background: 3rd year CS student at SRM IST Chennai, CGPA 9.88.
        Skills: Java, C++, Python, TS, React, Next.js, Google Cloud (Kubernetes, BigQuery), AI/ML.
        Experience: Research Intern at King Faisal Univ, Web Intern at CJ Network, Python Intern at Infosys.
        Projects: TrashNetX (waste AI), Emotion Recognition.
    `;

    const typeWriter = (text) => {
        let i = 0;
        chatText.textContent = "";
        const interval = setInterval(() => {
            chatText.textContent += text.charAt(i);
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 15);
    };

    const updateBubble = (text) => {
        // Pop out animation
        chatBubble.style.opacity = '0';
        chatBubble.style.transform = 'scale(0.8) translateY(10px)';
        
        // Remove Bankai effect by default
        chatText.classList.remove('bankai-active');

        setTimeout(() => {
            // Apply Bankai styling if it's the specific easter-egg
            if (text === "Zanka No Tachi !!!") {
                chatText.classList.add('bankai-active');
            }
            typeWriter(text);
            chatBubble.style.opacity = '1';
            chatBubble.style.transform = 'scale(1) translateY(0)';
        }, 300);
    };

    const fetchAIResponse = async (userMsg) => {
        // Note: Real LLM can be plugged here via Hugging Face/OpenAI
        const input = userMsg.toLowerCase().trim();
        
        // Easter Egg
        if (input === "bankai" || input === "/bankai") return "Zanka No Tachi !!!";

        if (input.includes("hi") || input.includes("hello")) return "Hey! I'm Sanjay's AI double. Happy to chat about my work, cloud experience, or projects!";
        if (input.includes("skill") || input.includes("know")) return "I specialize in Cloud (GCP), AI/ML, and Full-stack development with Next.js and TypeScript.";
        if (input.includes("education") || input.includes("college")) return "I study at SRM IST, Chennai. Current CGPA is 9.88 with a Merit Scholarship.";
        if (input.includes("intern") || input.includes("work")) return "I've interned at King Faisal University (AI), Infosys (Python), and CJ Network (Web).";
        if (input.includes("project") || input.includes("build")) return "My key projects include TrashNetX for waste classification and an Emotion Recognition system!";
        return "That's interesting! I focus on Cloud, Security, and AI. Want to hear about a specific project or my tech stack?";
    };

    const handleSend = async () => {
        const val = chatInput.value.trim();
        if (!val) return;

        chatInput.value = '';
        chatCard.classList.add('typing');
        
        const response = await fetchAIResponse(val);

        setTimeout(() => {
            chatCard.classList.remove('typing');
            updateBubble(response);
        }, 600);
    };

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Prevent drag events
    chatInput.addEventListener('mousedown', (e) => e.stopPropagation());
    chatInput.addEventListener('touchstart', (e) => e.stopPropagation());
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

// Intro & Projects Pop Screen Logic
const introModal = document.getElementById('intro-modal');
const introIframe = document.getElementById('intro-iframe');
const closeIntroBtn = document.getElementById('close-modal');
const heroSticker = document.querySelector('.hero-sticker-wrapper');

const projectsModal = document.getElementById('projects-modal');
const projectsIframe = document.getElementById('projects-iframe');
const closeProjectsBtn = document.getElementById('close-projects-modal');
const projectsTrigger = document.getElementById('projects-trigger');

function openModal(modal, iframe, file) {
    if (!modal || !iframe) return;
    iframe.src = file;
    modal.classList.add('active');
    
    iframe.onload = () => {
        const isDark = document.body.classList.contains('dark-mode');
        iframe.contentWindow.postMessage({ theme: isDark ? 'dark' : 'light' }, '*');
    };
}

function closeModal(modal, iframe) {
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        iframe.src = 'about:blank';
    }, 500);
}

// Hero Logo Trigger
if (heroSticker) {
    heroSticker.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(introModal, introIframe, 'intro.html');
    });
    heroSticker.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        openModal(introModal, introIframe, 'intro.html');
    });
}

// Projects Glass Card Trigger
if (projectsTrigger) {
    projectsTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(projectsModal, projectsIframe, 'projects.html');
    });
    projectsTrigger.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        openModal(projectsModal, projectsIframe, 'projects.html');
    });
}

// Close Buttons
closeIntroBtn?.addEventListener('click', () => closeModal(introModal, introIframe));
closeProjectsBtn?.addEventListener('click', () => closeModal(projectsModal, projectsIframe));

// Close on background click
[introModal, projectsModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            const iframe = modal.id === 'intro-modal' ? introIframe : projectsIframe;
            closeModal(modal, iframe);
        }
    });
});

// Sync theme with iframes when it changes
themeCheckbox?.addEventListener('change', () => {
    const isDark = document.body.classList.contains('dark-mode');
    [introIframe, projectsIframe].forEach(iframe => {
        if (iframe && iframe.src !== 'about:blank') {
            iframe.contentWindow.postMessage({ theme: isDark ? 'dark' : 'light' }, '*');
        }
    });
});
