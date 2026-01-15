import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Mail,
  Target,
  Cpu,
  Workflow,
  Layers,
  Search,
  Database,
  Share2,
  Zap,
  Brain,
  MessageSquare,
  LineChart,
  Monitor,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react';

const CAL_LINK = 'https://cal.com/dino-lukovac-7ap2jt/freegtmaudit';

// ----------------------------
// NAVBAR (single source of truth)
// ----------------------------
const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Content Momentum', href: '#content-momentum' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-black/70 backdrop-blur-2xl border-b border-white/5">
      <div className="py-2 px-4 md:py-2 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3" aria-label="GTM Vector Home">
            <img src="/gtm-vector-logo.png" alt="GTM Vector" className="h-9 w-auto md:h-10" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-400 hover:text-lime-500 font-bold text-sm uppercase tracking-[0.15em] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center justify-center px-6 py-3 rounded-xl bg-lime-500 text-black font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 hover:bg-white"
            >
              Get in touch
            </a>

            {/* Hamburger Menu Button (Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-lime-500 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-left text-gray-300 hover:text-lime-500 font-bold text-base uppercase tracking-[0.15em] transition-colors py-3 border-b border-white/5 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center px-6 py-4 rounded-xl bg-lime-500 text-black font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-white"
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
};

// ----------------------------
// PARTICLES
// ----------------------------
const ParticleDrift: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    const particleCount = 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.2,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.2 + 0.05,
        });
      }
    };

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(132, 204, 22, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// ----------------------------
// CARDS + FAQ
// ----------------------------
const ServiceCard: React.FC<{ icon: any; title: string; description: string }> = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-6 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[34px] md:rounded-[40px] group relative overflow-hidden flex flex-col items-start gap-4 sm:gap-5 md:gap-6">
    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-lime-500/10 blur-[50px] sm:blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-lime-500 group-hover:text-black group-hover:border-lime-500 transition-all duration-700 shadow-inner group-hover:scale-110 group-hover:rotate-6">
      <Icon size={24} className="sm:hidden" />
      <Icon size={30} className="hidden sm:block" />
    </div>
    <div className="space-y-2 sm:space-y-3">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-lime-500 transition-colors tracking-tight font-jakarta">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed font-medium text-[13px] sm:text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
        {description}
      </p>
    </div>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 sm:py-6 md:py-8 flex items-center justify-between text-left group transition-all gap-4"
      >
        <span
          className={`text-[14px] sm:text-base md:text-xl font-bold transition-all duration-500 pr-2 ${
            isOpen ? 'text-lime-500 translate-x-1 sm:translate-x-2' : 'text-gray-300'
          }`}
        >
          {question}
        </span>
        <div
          className={`flex-shrink-0 p-2 sm:p-2.5 rounded-full border-2 transition-all duration-700 ${
            isOpen ? 'border-lime-500 rotate-180 bg-lime-500 text-black' : 'border-white/10 text-gray-500 hover:border-white/30'
          }`}
        >
          <ChevronDown size={16} className="sm:hidden" />
          <ChevronDown size={20} className="hidden sm:block" />
        </div>
      </button>
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? 'max-h-[520px] pb-6 sm:pb-8 md:pb-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed font-medium pl-4 sm:pl-5 md:pl-6 border-l-2 border-lime-500/30 text-[13px] sm:text-sm md:text-lg">
          {answer}
        </p>
      </div>
    </div>
  );
};

// ----------------------------
// GTM STRATEGY SECTION (NEW)
// ----------------------------
interface StrategyStep {
  title: string;
  description?: string;
  tools: { name: string; icon?: React.ReactNode; color?: string }[];
  position: 'left' | 'right' | 'center';
}

// ----------------------------
// CONTENT MOMENTUM SECTION
// ----------------------------
interface ContentStep {
  title: string;
  tools?: string[];
  branches?: { left: string; right: string };
}

const contentMomentumSteps: ContentStep[] = [
  { title: 'Scrape Posts', tools: ['Apify', 'LinkedIn', 'Phantom', 'X'] },
  { branches: { left: 'Create Assets', right: 'Create Posts' } },
  { title: 'Plan the Calendar', tools: ['Notion'] },
  { title: 'Make Posts', tools: ['LinkedIn'] },
  { title: 'Engage Daily', tools: ['Expandi', 'Phantom'] },
  { branches: { left: 'Commenting', right: 'Lead Magnet Replies' } },
  { title: 'Capture Interest', tools: ['Clay', 'n8n'] },
  { branches: { left: 'Social Listening', right: 'Profile Views' } },
  { title: 'Pass to Outbound', tools: ['HubSpot', 'Clay'] },
];

const ContentMomentumSection: React.FC = () => {
  return (
    <section id="content-momentum" className="max-w-5xl mx-auto py-12 sm:py-16 md:py-24 mb-12 sm:mb-16 md:mb-24 relative scroll-mt-24 px-1 sm:px-0">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[30%] left-[20%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-lime-500/5 blur-[80px] sm:blur-[100px] rounded-full" />
        <div className="absolute bottom-[30%] right-[20%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-emerald-500/5 blur-[80px] sm:blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 md:mb-20">
        <div className="text-lime-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-5 md:mb-6 flex items-center justify-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-12 h-[1px] bg-lime-500/50" /> Content Engine <div className="w-8 sm:w-12 h-[1px] bg-lime-500/50" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-jakarta font-bold tracking-tight mb-4 sm:mb-5 md:mb-6 text-white px-2">
          Content Momentum System
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-medium opacity-80 max-w-2xl mx-auto px-4">
          An 8-step content system that has supported <span className="text-lime-500 font-bold">$14M+</span> in client revenue
        </p>
      </div>

      {/* Flowchart */}
      <div className="relative">
        {/* Vertical connector line - desktop */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-lime-500/40 via-lime-500/20 to-lime-500/40 -translate-x-1/2 hidden md:block" />

        {/* Vertical connector line - mobile */}
        <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-lime-500/30 via-lime-500/15 to-lime-500/30 md:hidden" />

        <div className="flex flex-col gap-3 sm:gap-4 md:gap-8">
          {contentMomentumSteps.map((step, idx) => {
            if (step.branches) {
              // Render branching step
              return (
                <div key={idx} className="relative pl-10 sm:pl-14 md:pl-0">
                  {/* Mobile branch indicator */}
                  <div className="absolute left-[10px] sm:left-[18px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-lime-500/20 border border-lime-500/40 md:hidden" />

                  {/* Horizontal connector - desktop */}
                  <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-[2px] bg-lime-500/20 -translate-y-1/2" />
                  <div className="hidden md:block absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-lime-500/30 border-2 border-lime-500/50 -translate-x-1/2 -translate-y-1/2" />

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-3 md:gap-16 px-0 md:px-8">
                    <div className="glass-card p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:border-lime-500/30 transition-all duration-300 group md:ml-auto md:mr-8">
                      <span className="text-white font-bold text-[11px] sm:text-xs md:text-base group-hover:text-lime-500 transition-colors">
                        {step.branches.left}
                      </span>
                    </div>
                    <div className="glass-card p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:border-lime-500/30 transition-all duration-300 group md:mr-auto md:ml-8">
                      <span className="text-white font-bold text-[11px] sm:text-xs md:text-base group-hover:text-lime-500 transition-colors">
                        {step.branches.right}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // Render single step
            return (
              <div key={idx} className="flex items-center relative md:justify-center">
                {/* Mobile step indicator */}
                <div className="absolute left-[6px] sm:left-[12px] w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black border-2 border-lime-500/30 flex items-center justify-center text-[8px] sm:text-[9px] font-black text-lime-500/60 md:hidden">
                  {idx + 1}
                </div>

                <div className="glass-card p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:border-lime-500/40 transition-all duration-300 group w-full md:w-auto md:min-w-[320px] hover:shadow-[0_10px_40px_-10px_rgba(132,204,22,0.15)] ml-10 sm:ml-14 md:ml-0">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <span className="text-white font-bold text-[12px] sm:text-sm md:text-base group-hover:text-lime-500 transition-colors">
                      {step.title}
                    </span>
                    {step.tools && (
                      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
                        {step.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/5 border border-white/10 text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-400 transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const strategySteps: StrategyStep[] = [
  {
    title: 'Demand Generation',
    description: 'Publishing high-performing content across channels.',
    position: 'left',
    tools: [
      { name: 'n8n', icon: <Share2 size={12} /> },
      { name: 'GPT-4', icon: <Brain size={12} /> },
      { name: 'LinkedIn', color: 'bg-blue-600/20' },
    ],
  },
  {
    title: 'Identity Resolution',
    description: 'De-anonymizing website visitors into accounts.',
    position: 'right',
    tools: [
      { name: 'RB2B', color: 'bg-purple-500/20' },
      { name: 'Koala', color: 'bg-blue-500/20' },
      { name: 'Clearbit', color: 'bg-emerald-500/20' },
    ],
  },
  {
    title: 'Signal Enrichment',
    description: 'Waterfalling data sources for 100% coverage.',
    position: 'left',
    tools: [
      { name: 'Clay', color: 'bg-orange-500/20' },
      { name: 'Apollo', color: 'bg-blue-600/20' },
      { name: 'PeopleData', color: 'bg-pink-500/20' },
    ],
  },
  {
    title: 'Central Data Warehouse',
    description: 'Syncing all signals into a unified system of record.',
    position: 'center',
    tools: [
      { name: 'Airtable', icon: <Database size={12} /> },
      { name: 'n8n', icon: <Zap size={12} /> },
    ],
  },
  {
    title: 'AI Qualification',
    description: 'Automated ICP matching and lead tiering.',
    position: 'center',
    tools: [
      { name: 'OpenAI', icon: <Brain size={12} /> },
      { name: 'Anthropic', color: 'bg-amber-500/20' },
    ],
  },
  {
    title: 'CRM Automation',
    description: 'Auto-creating deals and updating lifecycle stages.',
    position: 'right',
    tools: [
      { name: 'HubSpot', color: 'bg-orange-600/20' },
      { name: 'Salesforce', color: 'bg-blue-400/20' },
    ],
  },
  {
    title: 'Autonomous Outreach',
    description: 'Hyper-personalized multi-channel sequencing.',
    position: 'center',
    tools: [
      { name: 'Smartlead', color: 'bg-indigo-500/20' },
      { name: 'Instantly', color: 'bg-purple-500/20' },
    ],
  },
  {
    title: 'Real-time Monitoring',
    description: 'Engagement tracking and intent alerting.',
    position: 'left',
    tools: [
      { name: 'Slack', color: 'bg-red-500/20' },
      { name: 'n8n', icon: <Monitor size={12} /> },
    ],
  },
  {
    title: 'AI Reply Agents',
    description: 'Handling objections and booking meetings 24/7.',
    position: 'center',
    tools: [
      { name: 'GPT-4o', icon: <MessageSquare size={12} /> },
      { name: 'Cal.com', color: 'bg-black' },
    ],
  },
  {
    title: 'Closed-Won ROI',
    description: 'Full-funnel attribution and revenue growth.',
    position: 'right',
    tools: [
      { name: 'Revenue', icon: <LineChart size={12} /> },
      { name: 'ROI', icon: <CheckCircle2 size={12} /> },
    ],
  },
];

const GTMStrategy: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[10%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-lime-500/5 blur-[80px] md:blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-emerald-500/5 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="text-center mb-12 md:mb-24">
        <div className="text-lime-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-5 md:mb-6 flex items-center justify-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-12 h-[1px] bg-lime-500/50" /> Future-Proof Operations{' '}
          <div className="w-8 sm:w-12 h-[1px] bg-lime-500/50" />
        </div>
        <p className="text-gray-400 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed opacity-80 px-2">
          We engineer <span className="text-white">autonomous revenue workflows</span> that scale infinitely.
        </p>
      </div>

      <div className="relative min-h-0 md:min-h-[1600px] py-4 md:py-10">
        {/* Connector line (desktop only) */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1000 1600" fill="none" preserveAspectRatio="none">
            <path
              d="M 250 80
                 C 500 80, 750 160, 750 240
                 C 750 320, 250 320, 250 400
                 C 250 480, 500 480, 500 560
                 C 500 640, 750 640, 750 720
                 C 750 800, 250 800, 250 880
                 C 250 960, 500 960, 500 1040
                 C 500 1120, 750 1120, 750 1200
                 C 750 1280, 250 1280, 250 1360
                 C 250 1440, 500 1440, 500 1520"
              stroke="rgba(132, 204, 22, 0.15)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 250 80
                 C 500 80, 750 160, 750 240
                 C 750 320, 250 320, 250 400
                 C 250 480, 500 480, 500 560
                 C 500 640, 750 640, 750 720
                 C 750 800, 250 800, 250 880
                 C 250 960, 500 960, 500 1040
                 C 500 1120, 750 1120, 750 1200
                 C 750 1280, 250 1280, 250 1360
                 C 250 1440, 500 1440, 500 1520"
              stroke="url(#lime-gradient)"
              strokeWidth="4"
              strokeDasharray="12 24"
              strokeLinecap="round"
              className="animate-[dash_20s_linear_infinite]"
            />
            <defs>
              <linearGradient id="lime-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#bef264" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <style>{`
                @keyframes dash { to { stroke-offset: -1000; } }
              `}</style>
            </defs>

            {/* Beacon dot */}
            <circle r="6" fill="#84cc16">
              <animateMotion
                dur="12s"
                repeatCount="indefinite"
                path="M 250 80 C 500 80, 750 160, 750 240 C 750 320, 250 320, 250 400 C 250 480, 500 480, 500 560 C 500 640, 750 640, 750 720 C 750 800, 250 800, 250 880 C 250 960, 500 960, 500 1040 C 500 1120, 750 1120, 750 1200 C 750 1280, 250 1280, 250 1360 C 250 1440, 500 1440, 500 1520"
              />
              <animate r="6" values="6;10;6" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Mobile vertical connector */}
        <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-lime-500/30 via-lime-500/15 to-lime-500/30 md:hidden" />

        {/* Steps */}
        <div className="relative z-10 flex flex-col gap-4 md:gap-0">
          {strategySteps.map((step, idx) => {
            const alignments: Record<string, string> = {
              left: 'md:justify-start md:ml-[10%]',
              right: 'md:justify-end md:mr-[10%]',
              center: 'md:justify-center',
            };

            return (
              <div key={idx} className={`flex w-full ${alignments[step.position]} md:h-40 items-center`}>
                {/* Mobile step indicator */}
                <div className="flex-shrink-0 w-12 flex justify-center md:hidden relative z-20">
                  <div className="w-8 h-8 rounded-full bg-black border-2 border-lime-500/30 flex items-center justify-center text-[10px] font-black text-lime-500/70">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="group glass-card p-5 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] border border-white/5 hover:border-lime-500/40 transition-all duration-500 flex-1 md:flex-none md:w-[380px] hover:shadow-[0_20px_60px_-15px_rgba(132,204,22,0.15)] relative overflow-hidden">
                  <div className="absolute -top-1 -right-1 w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-bl-2xl md:rounded-bl-3xl flex items-center justify-center font-black text-[10px] md:text-xs text-gray-700 group-hover:text-lime-500/50 transition-colors hidden md:flex">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>

                  <h4 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 tracking-tight group-hover:text-lime-500 transition-colors flex items-center gap-2 sm:gap-3 pr-8 md:pr-0">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm font-medium mb-3 sm:mb-4 md:mb-5 opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {step.tools.map((tool, tIdx) => (
                      <div
                        key={tIdx}
                        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider sm:tracking-widest text-gray-500 group-hover:text-gray-300 transition-all ${
                          tool.color || ''
                        }`}
                      >
                        {tool.icon && (
                          <span className="text-lime-500 group-hover:scale-110 transition-transform">{tool.icon}</span>
                        )}
                        {tool.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ----------------------------
// MAIN PAGE
// ----------------------------
const Home: React.FC = () => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative font-jakarta bg-[#050505] selection:bg-lime-500 selection:text-black">
      <div className="noise-overlay" />
      <ParticleDrift />
      <Navbar />

      {/* Background elements */}
      <div className="fixed inset-0 shimmer-grid opacity-15 sm:opacity-20 pointer-events-none z-0" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{ transform: `translate(-50%, ${scrolled * 0.06}px)` }}
      >
        <div className="absolute top-[10%] left-[5%] sm:left-[10%] w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] bg-lime-600/8 sm:bg-lime-600/10 blur-[100px] sm:blur-[140px] md:blur-[180px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute top-[40%] right-[5%] sm:right-[10%] w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] md:w-[440px] md:h-[440px] lg:w-[500px] lg:h-[500px] bg-blue-600/8 sm:bg-blue-600/10 blur-[100px] sm:blur-[140px] md:blur-[180px] rounded-full mix-blend-screen animate-gradient-slow" />
        <div className="absolute bottom-[10%] left-[15%] sm:left-[20%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[620px] md:h-[620px] lg:w-[700px] lg:h-[700px] bg-emerald-600/4 sm:bg-emerald-600/5 blur-[120px] sm:blur-[160px] md:blur-[200px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-2 md:pt-22 px-3 sm:px-4 md:px-6 overflow-hidden">
        {/* Hero */}
        <section id="hero" className="max-w-7xl mx-auto min-h-[calc(100vh-80px)] md:min-h-0 py-8 md:py-16 text-center relative flex flex-col justify-center px-1">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.4em] text-lime-400 mb-6 sm:mb-7 shadow-2xl animate-bounce-slow mx-auto">
            <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-lime-500/10">
              <Workflow size={12} className="text-lime-400 sm:hidden" />
              <Workflow size={14} className="text-lime-400 hidden sm:block" />
            </span>
            Operational Excellence
          </div>

          <h1 className="text-[38px] leading-[1] sm:text-5xl md:text-6xl lg:text-[110px] font-jakarta font-extrabold tracking-tighter mb-5 sm:mb-7 text-white px-2">
            Outbound GTM Architecture <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500 animate-gradient-slow bg-[length:200%_auto]">
              Built to Scale
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-[15px] leading-[1.6] sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-9 font-medium opacity-90 px-3 sm:px-2">
            From ICP definition to tooling and workflows, we design outbound systems teams can actually run.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-2">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="group relative w-full sm:w-auto px-8 sm:px-10 md:px-14 py-4 sm:py-5 md:py-7 bg-lime-500 text-black font-black text-[15px] sm:text-base md:text-xl rounded-2xl transition-all duration-500 hover:scale-[1.02] md:hover:scale-110 active:scale-[0.98] shadow-[0_15px_40px_rgba(132,204,22,0.35)] sm:shadow-[0_20px_50px_rgba(132,204,22,0.3)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 md:gap-4">
                Book a Free GTM Audit
                <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform sm:w-[22px] sm:h-[22px]" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.18em] text-gray-500 mt-1 md:mt-0">
              <span>Trusted by 50+ scaling startups</span>
            </div>
          </div>
        </section>

        {/* NEW: GTM Strategy lives right under hero (replaces +73% band) */}
        <div id="gtm-strategy" className="scroll-mt-24">
          <GTMStrategy />
        </div>

        {/* Services */}
        <section id="services" className="max-w-7xl mx-auto py-12 sm:py-14 md:py-20 mb-12 sm:mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 md:mb-16 gap-6 sm:gap-8 md:gap-10">
            <div className="max-w-2xl">
              <div className="text-lime-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-5 md:mb-6 flex items-center gap-3 sm:gap-4">
                <div className="w-8 sm:w-10 md:w-12 h-[1px] bg-lime-500/50" /> What we do
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-jakarta font-bold tracking-tight mb-4 sm:mb-5 md:mb-6 text-white">
                Architecting Growth
              </h2>
              <p className="text-gray-400 text-[14px] sm:text-base md:text-lg lg:text-xl leading-relaxed opacity-80">
                We design end-to-end revenue systems: CRM foundations, clean data, deliverability, outbound execution, and AI workflows that keep pipeline moving.
              </p>
            </div>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent mx-12 mb-8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <ServiceCard
              icon={Database}
              title="CRM Foundations"
              description="We implement and optimize your CRM (HubSpot, Salesforce, Attio, or any stack) so forecasting, pipeline, ownership, and reporting stay clean as headcount grows."
            />
            <ServiceCard
              icon={Target}
              title="ICP, Data & Outbound"
              description="We reverse-engineer ICP from closed-won deals, source and segment the right accounts, enrich with the right signals, and launch outbound with strong deliverability and consistent meeting volume."
            />
            <ServiceCard
              icon={Workflow}
              title="Automation & AI SDRs"
              description="n8n workflows synced with your CRM: enrichment, routing, intent signals, AI inbound SDRs, content automation, and visitor identification that turns traffic into meetings."
            />
          </div>
        </section>

        {/* Process */}
        <section id="process" className="max-w-6xl mx-auto py-12 sm:py-16 md:py-24 mb-12 sm:mb-16 md:mb-24 relative">
          <div className="text-center mb-10 sm:mb-14 md:mb-20">
            <div className="text-lime-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-5 md:mb-6">Methodology</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-jakarta font-bold tracking-tight mb-4 sm:mb-5 md:mb-6 text-white">
              The Vector Blueprint
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-medium opacity-70 italic font-mono px-4">
              Systems first. Output second. Scale always.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-10 md:space-y-16 relative">
            <div className="absolute left-[22px] sm:left-7 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-lime-500 via-lime-500/20 to-transparent hidden sm:block" />

            {[
              {
                step: '01',
                title: 'Audit',
                duration: '48h',
                desc:
                  'We audit your full revenue engine: CRM structure (objects, lifecycle stages, forecasting), data quality, routing, attribution, deliverability health, and the outbound flow. You get bottlenecks, root causes, and quick wins ranked by impact.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Build',
                duration: '2-4 weeks',
                desc:
                  'We implement the system: CRM foundations, enrichment and segmentation workflows, outbound infrastructure and deliverability, automation in n8n, plus AI agents where it makes sense. Everything is wired end-to-end so leads move cleanly from signal to pipeline.',
                icon: Cpu,
              },
              {
                step: '03',
                title: 'Handover',
                duration: 'Documentation + Training',
                desc:
                  'You own it. We deliver SOPs, dashboards, routing maps, and operating playbooks. Then we train your team so the machine stays stable as volume and headcount increase.',
                icon: Layers,
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 group relative">
                <div className="flex-shrink-0 z-10 flex items-center gap-4 sm:block">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl sm:rounded-3xl bg-black border-2 border-white/10 flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-black group-hover:border-lime-500 group-hover:bg-lime-500 group-hover:text-black transition-all duration-700 shadow-2xl group-hover:scale-110">
                    {item.step}
                  </div>
                  <div className="sm:hidden flex-1">
                    <div className="flex items-center gap-3">
                      <item.icon className="text-lime-500" size={18} />
                      <h4 className="text-2xl font-bold tracking-tight font-jakarta text-white">{item.title}</h4>
                    </div>
                  </div>
                </div>
                <div className="glass-card flex-1 p-5 sm:p-6 md:p-8 lg:p-10 rounded-[24px] sm:rounded-[30px] md:rounded-[34px] lg:rounded-[40px] border-l-4 border-l-lime-500/20 group-hover:border-l-lime-500">
                  <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    <div className="hidden sm:flex items-center gap-3 sm:gap-4">
                      <item.icon className="text-lime-500" size={20} />
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-jakarta text-white">{item.title}</h4>
                    </div>
                    <span className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-lime-400 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[13px] sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Momentum */}
        <ContentMomentumSection />

        {/* Stack statement */}
        <section className="max-w-6xl mx-auto py-10 sm:py-12 md:py-20 mb-12 sm:mb-16 md:mb-24 text-center px-2">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-400 leading-tight">
            <span className="text-white font-black">n8n is the nervous system.</span>
            <br />
            <span className="text-lime-500 font-black italic">CRM is the source of truth.</span>
            <br />
            <span className="opacity-70 text-[13px] sm:text-base md:text-lg lg:text-xl mt-2 inline-block">
              Everything else is a modular endpoint we optimize for sheer output.
            </span>
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-5xl mx-auto py-12 sm:py-16 md:py-24 mb-16 sm:mb-20 md:mb-32 relative px-1 sm:px-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-lime-500/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="text-lime-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-5 md:mb-6">FAQ</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-jakarta font-bold tracking-tight text-white">FAQ</h2>
          </div>

          <div className="glass-card rounded-[24px] sm:rounded-[34px] md:rounded-[50px] px-4 sm:px-8 md:px-10 lg:px-16 py-3 sm:py-4 md:py-8 shadow-3xl">
            <FAQItem
              question="Who is this for?"
              answer="B2B SaaS and high-ticket teams that want outbound to behave like a system: predictable inputs, clean data, strong deliverability, and consistent meetings."
            />
            <FAQItem
              question="What do you deliver in the audit?"
              answer="A concise teardown of your current setup (CRM, ICP, list quality, deliverability, tooling, routing) plus a prioritized build plan so you know exactly what to fix first."
            />
            <FAQItem
              question="How long does setup take?"
              answer="Most builds land in 14-28 days depending on scope, access, and how much you want automated end-to-end."
            />
            <FAQItem
              question="Do you run campaigns for us or hand it over?"
              answer="We build the system, document it, and train your team to run it. If you need help ramping output, we can support early execution too."
            />
            <FAQItem
              question="What tools do you work with?"
              answer="We’re tool-agnostic. We recommend and implement the stack that fits your workflow, needs, and budget (CRM, enrichment, sending, automation)."
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto py-10 sm:py-14 md:py-24 mb-14 sm:mb-20 md:mb-40 relative overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[60px]">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-600/20 via-emerald-600/10 to-blue-600/20 animate-gradient-slow opacity-60 pointer-events-none" />
          <div className="relative z-10 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[28px] sm:rounded-[36px] md:rounded-[60px] py-10 sm:py-14 md:py-24 px-4 sm:px-8 md:px-10 text-center flex flex-col items-center group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-30 transition-opacity hidden md:block">
              <Workflow size={200} className="text-lime-500" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[90px] font-jakarta font-black mb-5 sm:mb-7 md:mb-10 tracking-tighter leading-[0.9] text-white">
              Ready to <br className="sm:hidden" /> Upgrade?
            </h2>

            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-400 mb-8 sm:mb-10 md:mb-16 max-w-3xl font-medium leading-tight px-2">
              We'll design comprehensive GTM architecture tailored for your team's execution.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5 md:gap-8 w-full md:w-auto">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="group relative w-full md:w-auto px-8 sm:px-10 md:px-16 py-4 sm:py-5 md:py-7 bg-lime-500 text-black font-black text-lg sm:text-xl md:text-2xl rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-[1.02] md:hover:scale-110 active:scale-[0.98] shadow-[0_20px_50px_rgba(132,204,22,0.35)] sm:shadow-[0_30px_70px_rgba(132,204,22,0.4)] overflow-hidden"
              >
                <span className="relative z-10">Get in touch</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <a
                href="mailto:info@gtmvector.com"
                className="w-full md:w-auto px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-7 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl font-black text-[11px] sm:text-sm md:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 sm:gap-4 group uppercase tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.2em] text-white"
              >
                <Mail size={20} className="group-hover:text-lime-500 group-hover:scale-125 transition-all sm:w-6 sm:h-6" />
                <span className="truncate">info@gtmvector.com</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-8 sm:py-10 md:py-14 px-4 sm:px-6 border-t border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img src="/gtm-vector-logo.png" alt="GTM Vector" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain" />
            <span className="font-jakarta text-base sm:text-lg md:text-xl font-black tracking-tighter uppercase text-white leading-none">
              GTM <span className="text-lime-500">Vector</span>
            </span>
          </div>

          <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.35em] text-center">
            © 2024 GTM Vector. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;