// Gemini 2.5 Flash API integration for portfolio chatbot
// Grounded with Sanjay's portfolio data — no hallucination

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-2.5-flash';
const getApiUrl = () => `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// Full portfolio context to ground the AI — sourced ONLY from the website
const SYSTEM_PROMPT = `You are the AI assistant for Sanjay Baskar's portfolio website. You MUST answer ONLY based on the following verified information. If a question falls outside this data, say "I can only answer about Sanjay's portfolio and skills." Never hallucinate or make up information.

=== ABOUT SANJAY ===
Name: Sanjay Baskar
Role: Design Engineer / Cloud & Security Developer
Education: 3rd year Computer Science student at SRM Institute of Science and Technology (SRM IST), Chennai. CGPA: 9.88 with Merit Scholarship.
Tagline: "Non-linear thinking for a linear world."

=== SKILLS ===
Languages: Java, C++, Python, TypeScript, JavaScript, Kotlin, Solidity
Frontend: React, React Native, Next.js, GSAP, Three.js
Backend: Node.js, Supabase
AI/ML: Python, LangChain, FAISS, RAG Architecture
Cloud: Google Cloud Platform (Kubernetes, BigQuery), CI/CD, Docker
Other: Unit Testing, Algorithm Design, Blockchain

=== EXPERIENCE ===
1. Research Intern — King Faisal University (AI/ML research)
2. Web Development Intern — CJ Network
3. Python Development Intern — Infosys

=== PROJECTS (17 total, 9 categories) ===

AI (3 projects):
- AI Resume Analyzer: React + Node.js. AI-powered resume parsing and analysis tool.
- RAG Architecture: Python. Retrieval-augmented generation pipeline.
- Advanced RAG — Resembler: Python + LangChain + FAISS. Advanced RAG with semantic similarity search.

Web Development (4 projects):
- MCQ Master: React + Supabase. MCQ test builder and management platform.
- Ecommerce Devin: JavaScript. AI-assisted e-commerce workflow automation.
- CyberSecurity Web Centinel: GSAP. Animated cybersecurity showcase website.
- GSAP 3D Website: GSAP + Three.js. Immersive 3D web experience with GSAP animations.

DevOps (2 projects):
- DevOps WebApp Cloud: CI/CD + Cloud. Cloud-deployed web app with full CI/CD pipeline.
- Tic Tac Toe Docker: Docker. Containerized game deployment.

Mobile (2 projects):
- Food Delivery App: React Native. Cross-platform food delivery mobile application.
- Android File Manager: Kotlin. Native Android file management application.

Blockchain (1 project):
- Organ Donation Platform: Solidity + Blockchain. Decentralized organ donation registry.

Computer Networks (1 project):
- Email Simulator: Networking. Simulates SMTP/POP3 email protocols from scratch.

DSA (2 projects):
- DSA in C++: C++ + GTest. Data structures implemented with unit tests.
- PTS Algorithm: Custom algorithm design and implementation.

Testing (1 project):
- Python Unit Testing: Python + unittest. Unit testing patterns and best practices.

Academic (1 project):
- SRM Placement Compass: Placement preparation guide for SRM students.

=== CONTACT ===
GitHub: https://github.com/masked-shinobi
The portfolio website uses a draggable canvas design with floating cards and stickers.

=== INSTRUCTIONS ===
- Be concise but friendly. Keep responses under 120 words.
- If asked about projects, mention specific tech stacks.
- If asked "who are you", say you're Sanjay's AI assistant on his portfolio.
- Never invent jobs, skills, or projects not listed above.
- You can recommend visiting sections of the portfolio.`;

// Conversation history for context
let conversationHistory = [];

/**
 * Send message to Gemini 2.5 Flash and get a grounded response
 */
export async function fetchGeminiResponse(userMsg) {
  // Add user message to history
  conversationHistory.push({ role: 'user', parts: [{ text: userMsg }] });

  // Keep history manageable (last 10 exchanges)
  if (conversationHistory.length > 20) {
    conversationHistory = conversationHistory.slice(-20);
  }

  try {
    const response = await fetch(getApiUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: conversationHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
          topP: 0.9,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Try asking about Sanjay's projects or skills!";

    // Add AI response to history
    conversationHistory.push({ role: 'model', parts: [{ text: aiText }] });

    return aiText;
  } catch (error) {
    console.error('Gemini API error:', error);
    // Fallback to local responses
    return fetchLocalResponse(userMsg);
  }
}

/**
 * Local fallback responses (used when API fails)
 */
function fetchLocalResponse(userMsg) {
  const input = userMsg.toLowerCase().trim();

  if (input.includes('hi') || input.includes('hello'))
    return "Hey! I'm Sanjay's AI assistant. Happy to chat about his work, cloud experience, or projects!";
  if (input.includes('skill') || input.includes('know'))
    return 'Sanjay specializes in Cloud (GCP), AI/ML, and Full-stack development with Next.js, React, and TypeScript.';
  if (input.includes('education') || input.includes('college'))
    return 'He studies at SRM IST, Chennai. Current CGPA is 9.88 with a Merit Scholarship.';
  if (input.includes('intern') || input.includes('work'))
    return "He's interned at King Faisal University (AI), Infosys (Python), and CJ Network (Web).";
  if (input.includes('project') || input.includes('build'))
    return 'Key projects include AI Resume Analyzer, RAG Architecture, MCQ Master, and GSAP 3D experiences! Check the Projects section for all 17.';
  return "I focus on Sanjay's Cloud, Security, and AI work. Ask about a specific project or his tech stack!";
}

/**
 * Original hardcoded function (kept for easter egg)
 */
export function fetchAIResponse(userMsg) {
  const input = userMsg.toLowerCase().trim();
  if (input === 'bankai' || input === '/bankai') return 'Zanka No Tachi !!!';
  return null; // null = use Gemini instead
}

/**
 * Reset conversation history
 */
export function resetChat() {
  conversationHistory = [];
}
