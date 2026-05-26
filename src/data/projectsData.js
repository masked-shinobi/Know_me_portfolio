// All 17 projects from the GitHub Project Catalog
// Each tech has a name, brand color, and SVG icon path (inline SVGs used in components)

export const techIcons = {
  react: { name: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.15)' },
  nodejs: { name: 'Node.js', color: '#339933', bg: 'rgba(51,153,51,0.15)' },
  python: { name: 'Python', color: '#3776AB', bg: 'rgba(55,118,171,0.15)' },
  langchain: { name: 'LangChain', color: '#1C3C3C', bg: 'rgba(28,60,60,0.15)' },
  faiss: { name: 'FAISS', color: '#0467DF', bg: 'rgba(4,103,223,0.15)' },
  supabase: { name: 'Supabase', color: '#3ECF8E', bg: 'rgba(62,207,142,0.15)' },
  javascript: { name: 'JavaScript', color: '#F7DF1E', bg: 'rgba(247,223,30,0.15)' },
  gsap: { name: 'GSAP', color: '#88CE02', bg: 'rgba(136,206,2,0.15)' },
  threejs: { name: 'Three.js', color: '#ffffff', bg: 'rgba(255,255,255,0.1)' },
  docker: { name: 'Docker', color: '#2496ED', bg: 'rgba(36,150,237,0.15)' },
  cicd: { name: 'CI/CD', color: '#2496ED', bg: 'rgba(36,150,237,0.15)' },
  cloud: { name: 'Cloud', color: '#FF9900', bg: 'rgba(255,153,0,0.15)' },
  reactnative: { name: 'React Native', color: '#61DAFB', bg: 'rgba(97,218,251,0.15)' },
  kotlin: { name: 'Kotlin', color: '#7F52FF', bg: 'rgba(127,82,255,0.15)' },
  solidity: { name: 'Solidity', color: '#636890', bg: 'rgba(99,104,144,0.15)' },
  blockchain: { name: 'Blockchain', color: '#121D33', bg: 'rgba(18,29,51,0.2)' },
  networking: { name: 'Networking', color: '#4A4A4A', bg: 'rgba(74,74,74,0.15)' },
  cpp: { name: 'C++', color: '#00599C', bg: 'rgba(0,89,156,0.15)' },
  gtest: { name: 'GTest', color: '#4285F4', bg: 'rgba(66,133,244,0.15)' },
  algorithm: { name: 'Algorithm', color: '#6E6E6E', bg: 'rgba(110,110,110,0.15)' },
  unittest: { name: 'unittest', color: '#3776AB', bg: 'rgba(55,118,171,0.15)' },
  demo: { name: 'Demo', color: '#999999', bg: 'rgba(153,153,153,0.15)' },
};

export const categories = [
  { id: 'ai', name: 'Artificial Intelligence', icon: '🧠', color: '#A855F7', gradient: 'linear-gradient(135deg, #A855F7, #6D28D9)' },
  { id: 'web', name: 'Web Development', icon: '🌐', color: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' },
  { id: 'devops', name: 'DevOps', icon: '⚙️', color: '#F97316', gradient: 'linear-gradient(135deg, #F97316, #EA580C)' },
  { id: 'mobile', name: 'Mobile', icon: '📱', color: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #059669)' },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: '#6366F1', gradient: 'linear-gradient(135deg, #6366F1, #4338CA)' },
  { id: 'networks', name: 'Computer Networks', icon: '🔌', color: '#EF4444', gradient: 'linear-gradient(135deg, #EF4444, #DC2626)' },
  { id: 'dsa', name: 'DSA', icon: '🧩', color: '#14B8A6', gradient: 'linear-gradient(135deg, #14B8A6, #0D9488)' },
  { id: 'testing', name: 'Testing', icon: '🧪', color: '#EC4899', gradient: 'linear-gradient(135deg, #EC4899, #DB2777)' },
  { id: 'academic', name: 'Academic', icon: '🎓', color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)' },
];

export const projects = [
  // --- AI ---
  {
    id: 'ai-resume',
    name: 'AI Resume Analyzer',
    category: 'ai',
    stack: ['react', 'nodejs'],
    description: 'AI-powered resume parsing and analysis tool',
    github: 'https://github.com/masked-shinobi/AI-RESUME-ANALYSER',
  },
  {
    id: 'rag-arch',
    name: 'RAG Architecture',
    category: 'ai',
    stack: ['python'],
    description: 'Retrieval-augmented generation pipeline',
    github: 'https://github.com/masked-shinobi/minor_rag_architecture',
  },
  {
    id: 'resembler',
    name: 'Advanced RAG — Resembler',
    category: 'ai',
    stack: ['python', 'langchain', 'faiss'],
    description: 'Advanced RAG with semantic similarity search',
    github: 'https://github.com/masked-shinobi/MinorProject_resembler',
  },

  // --- Web Dev ---
  {
    id: 'mcq-master',
    name: 'MCQ Master',
    category: 'web',
    stack: ['react', 'supabase'],
    description: 'MCQ test builder and management platform',
    github: 'https://github.com/masked-shinobi/MCQ_test_Maker_website',
  },
  {
    id: 'ecommerce-devin',
    name: 'Ecommerce Devin',
    category: 'web',
    stack: ['javascript'],
    description: 'AI-assisted e-commerce workflow automation',
    github: 'https://github.com/masked-shinobi/Ecommerce-devin-ai-workflow',
  },
  {
    id: 'cybersec',
    name: 'CyberSecurity Web Centinel',
    category: 'web',
    stack: ['gsap'],
    description: 'Animated cybersecurity showcase website',
    github: 'https://github.com/masked-shinobi/CyberSecurity_Web_Centinel',
  },
  {
    id: 'gsap-3d',
    name: 'GSAP 3D Website',
    category: 'web',
    stack: ['gsap', 'threejs'],
    description: 'Immersive 3D web experience with GSAP animations',
    github: 'https://github.com/masked-shinobi/GSAP-website-3d',
  },

  // --- DevOps ---
  {
    id: 'devops-cloud',
    name: 'DevOps WebApp Cloud',
    category: 'devops',
    stack: ['cicd', 'cloud'],
    description: 'Cloud-deployed web app with full CI/CD pipeline',
    github: 'https://github.com/masked-shinobi/devops_webapp_cloud',
  },
  {
    id: 'tictactoe-docker',
    name: 'Tic Tac Toe Docker',
    category: 'devops',
    stack: ['docker'],
    description: 'Containerized game deployment with Docker',
    github: 'https://github.com/masked-shinobi/Tic-Tac-Toe-Docker',
  },

  // --- Mobile ---
  {
    id: 'food-delivery',
    name: 'Food Delivery App',
    category: 'mobile',
    stack: ['reactnative'],
    description: 'Cross-platform food delivery mobile application',
    github: 'https://github.com/masked-shinobi/Food-delivery-app-reactnative',
  },
  {
    id: 'file-manager',
    name: 'Android File Manager',
    category: 'mobile',
    stack: ['kotlin'],
    description: 'Native Android file management application',
    github: 'https://github.com/masked-shinobi/file-manager-app',
  },

  // --- Blockchain ---
  {
    id: 'organ-donation',
    name: 'Organ Donation Platform',
    category: 'blockchain',
    stack: ['solidity', 'blockchain'],
    description: 'Decentralized organ donation registry on blockchain',
    github: 'https://github.com/masked-shinobi/Organ-Donation-Platform-BlockChain',
  },

  // --- Networks ---
  {
    id: 'email-sim',
    name: 'Email Simulator',
    category: 'networks',
    stack: ['networking'],
    description: 'Simulates SMTP/POP3 email protocols from scratch',
    github: 'https://github.com/masked-shinobi/email-simulator-CN',
  },

  // --- DSA ---
  {
    id: 'dsa-cpp',
    name: 'DSA in C++',
    category: 'dsa',
    stack: ['cpp', 'gtest'],
    description: 'Data structures implemented in C++ with unit tests',
    github: 'https://github.com/masked-shinobi/DSA-C-with-gtest',
  },
  {
    id: 'pts-algo',
    name: 'PTS Algorithm',
    category: 'dsa',
    stack: ['algorithm'],
    description: 'Custom algorithm design and implementation',
    github: 'https://github.com/masked-shinobi/PTS-Algorithm',
  },

  // --- Testing ---
  {
    id: 'unit-testing',
    name: 'Python Unit Testing',
    category: 'testing',
    stack: ['python', 'unittest'],
    description: 'Unit testing patterns and best practices in Python',
    github: 'https://github.com/masked-shinobi/code-unit-testing',
  },

  // --- Academic ---
  {
    id: 'srm-compass',
    name: 'SRM Placement Compass',
    category: 'academic',
    stack: ['demo'],
    description: 'Placement preparation guide for SRM students',
    github: 'https://github.com/masked-shinobi/srm-placement-compass',
  },
];

// Helper: get category object by id
export function getCategory(catId) {
  return categories.find(c => c.id === catId);
}

// Helper: get all unique tech keys across all projects
export function getAllTechKeys() {
  const set = new Set();
  projects.forEach(p => p.stack.forEach(t => set.add(t)));
  return [...set];
}
