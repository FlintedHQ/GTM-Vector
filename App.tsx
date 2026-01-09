import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronDown,
  Mail,
  Target,
  Cpu,
  Workflow,
  Layers,
  Search,
  MessageCircle,
  Database,
  Activity,
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility for cleaner tailwind classes ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 1. The "Scramble" Text Effect (The Hacker Vibe) ---
const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayedText}</span>;
};

// --- 2. Technical "Corner Brackets" (The HUD Look) ---
const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-lime-500/50" />
    <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-lime-500/50" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-lime-500/50" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-lime-500/50" />
  </>
);

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-black/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        {/* Replaced SVG with provided logo image */}
        <img src="https://i.ibb.co/7n64Kz0/image_0.png" alt="GTM Vector Logo" className="h-8 md:h-10" />
      </div>

      <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-gray-500">
        <a href="#services" className="hover:text-lime-500 transition-colors">
          Services
        </a>
        <a href="#process" className="hover:text-lime-500 transition-colors">
          Process
        </a>
        <a href="#faq" className="hover:text-lime-500 transition-colors">
          FAQ
        </a>
      </div>

      <button className="bg-white/5 hover:bg-lime-500 hover:text-black border border-white/10 text-white px-5 py-2 text-xs font-mono uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        // init_audit
      </button>
    </div>
  </nav>
);

const ParticleDrift = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    const particleCount = 50;

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
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.05,
        });
      }
    };

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
      requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

const ServiceCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="glass-card p-10 rounded-[32px] group relative overflow-hidden flex flex-col items-start gap-5 border border-white/5 hover:border-lime-500/30 transition-colors">
    <CornerBrackets />
    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-lime-500 group-hover:text-black group-hover:border-lime-500 transition-all duration-500 shadow-inner z-10 relative">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold group-hover:text-lime-500 transition-colors tracking-tight z-10 relative">
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed font-medium z-10 relative">{description}</p>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-7 flex items-center justify-between text-left group transition-all"
      >
        <span
          className={`text-lg font-bold transition-all ${
            isOpen ? 'text-lime-500 tracking-wide' : 'text-gray-300'
          }`}
        >
          {question}
        </span>
        <div
          className={`p-2 rounded-full border transition-all duration-500 ${
            isOpen
              ? 'border-lime-500 rotate-180 bg-lime-500 text-black'
              : 'border-white/10 text-gray-500'
          }`}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? 'max-h-60 pb-8 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed font-medium pl-2 border-l-2 border-lime-500/20">
          {answer}
        </p>
      </div>
    </div>
  );
};

// --- Main Page ---

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative animated-bg selection:bg-lime-500 selection:text-black bg-[#050505] text-white font-sans overflow-x-hidden">
      <div className="noise-overlay" />
      <ParticleDrift />
      <Navbar />

      {/* Grid Shimmer Overlay */}
      <div className="fixed inset-0 shimmer-grid opacity-30 pointer-events-none z-0" />

      {/* Light Field / Beams */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none beam-mask z-0 mix-blend-screen" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-lime-600/5 blur-[140px] rounded-full pointer-events-none beam-mask z-0 mix-blend-screen" />

      {/* Main Content */}
      <main className="relative z-10 pt-32 px-6">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center relative text-center">
          
          {/* Decorative "System Status" Line */}
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-lime-500/60 uppercase tracking-widest mb-8">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              System Online
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>v2.4.0 Deployment</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[100px] font-jakarta font-extrabold tracking-tighter mb-10 leading-[0.9] text-glow"
          >
            Outbound GTM Architecture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500">
               <ScrambleText text="BUILT TO SCALE" />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-400 mb-14 leading-relaxed font-medium"
          >
            From ICP definition to tooling and workflows, we design outbound systems teams can actually run.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative px-14 py-6 bg-lime-500 text-black font-black text-lg rounded-2xl hover:bg-white transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(132,204,22,0.3)] hover:scale-110 active:scale-95 border-beam"
            >
              Book a Free GTM Audit
              <ArrowRight size={22} strokeWidth={3} className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          </motion.div>

          {/* Floating Data Graphic removed as requested */}

        </section>

        {/* --- STATS BAND (Ticker Tape Style) --- */}
        <section className="w-screen relative left-[50%] -translate-x-[50%] border-y border-white/10 bg-white/5 py-4 overflow-hidden mb-32">
          <div className="flex whitespace-nowrap gap-12 animate-marquee font-mono text-sm text-gray-400">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="flex items-center gap-2"><Zap size={14} className="text-lime-500"/> +73% BOOKING RATE</span>
                <span className="text-white/20">///</span>
                <span className="flex items-center gap-2"><Activity size={14} className="text-lime-500"/> 100% DELIVERABILITY</span>
                <span className="text-white/20">///</span>
                <span className="flex items-center gap-2"><Cpu size={14} className="text-lime-500"/> -85% MANUAL WORK</span>
                <span className="text-white/20">///</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto py-24 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
                What we do
              </div>
              <h2 className="text-4xl md:text-6xl font-jakarta font-bold tracking-tight mb-8">
                Architecting Growth
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We don't just "set up tools." We engineer high-velocity revenue engines focused on precision and
                deliverability.
              </p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/10 to-transparent mx-12 mb-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <ServiceCard
              icon={Target}
              title="ICP & Targeting"
              description="Deep-dive persona research and data source aggregation. We find your exact buyers and verify every entry with mathematical precision."
            />
            <ServiceCard
              icon={ShieldCheck}
              title="Infrastructure"
              description="Bulletproof deliverability setup. Secondary domains, SPF/DKIM/DMARC alignment, and hyper-diligent inbox warmups."
            />
            <ServiceCard
              icon={Workflow}
              title="Automation & RevOps"
              description="n8n-driven workflows synced with HubSpot. Automated data enrichment, intent signals, and perpetual CRM hygiene."
            />
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="max-w-5xl mx-auto py-24 mb-24 relative">
          <div className="text-center mb-24">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Methodology
            </div>
            <h2 className="text-4xl md:text-6xl font-jakarta font-bold tracking-tight mb-8">
              The Vector Blueprint
            </h2>
            <p className="text-gray-400 text-lg">A ruthless commitment to operational maturity.</p>
          </div>

          <div className="space-y-16 relative">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-lime-500 via-lime-500/20 to-transparent hidden md:block" />

            {[
              {
                step: '01',
                title: 'Audit',
                duration: '48h',
                desc: 'Exhaustive review of current stack, deliverability health, and CRM bottlenecks. No stone left unturned.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Build',
                duration: '2–4 weeks',
                desc: 'Heavy lifting: Infrastructure setup, complex tool integration, and high-level n8n workflow engineering.',
                icon: Cpu,
              },
              {
                step: '03',
                title: 'Handover',
                duration: 'Documentation + Training',
                desc: 'Full ownership transfer. SOPs, technical documentation, and intensive team onboarding for long-term independence.',
                icon: Layers,
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-10 group relative">
                <div className="flex-shrink-0 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-black border-2 border-white/10 flex items-center justify-center text-white text-xl font-black group-hover:border-lime-500 group-hover:bg-lime-500 group-hover:text-black transition-all duration-500 shadow-2xl">
                    {item.step}
                  </div>
                </div>

                <div className="glass-card flex-1 p-8 rounded-3xl border-l-4 border-l-lime-500/30 group-hover:border-l-lime-500 relative overflow-hidden">
                  <CornerBrackets />
                  <div className="flex flex-wrap items-center gap-4 mb-4 z-10 relative">
                    <h4 className="text-3xl font-bold tracking-tight">{item.title}</h4>
                    <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-lime-400 text-[10px] font-black uppercase tracking-widest">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed font-medium z-10 relative">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Replacement for Stack section: keep the sentence only */}
        <section className="max-w-7xl mx-auto py-24 mb-40">
          <div className="flex flex-col items-center text-center relative">
            <CornerBrackets />
            <p className="text-2xl text-gray-400 max-w-4xl leading-[1.6] font-medium px-4 z-10 relative">
              <span className="text-white font-black border-b-2 border-lime-500/30">
                n8n is the nervous system.
              </span>{' '}
              <span className="text-lime-500 font-black italic">CRM is the source of truth.</span>{' '}
              Everything else is a modular endpoint we optimize for sheer output.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-4xl mx-auto py-24 mb-40">
          <div className="text-center mb-16">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Clarifications
            </div>
            <h2 className="text-4xl md:text-5xl font-jakarta font-bold tracking-tight">
              Intelligence Briefing
            </h2>
          </div>

          <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] px-10 py-6 shadow-2xl relative overflow-hidden">
            <CornerBrackets />
            <div className="z-10 relative">
            <FAQItem
              question="Who is this for?"
              answer="B2B SaaS and high-ticket service agencies looking to transition founders away from the keyboard into a scalable, automated engine that processes thousands of personalized leads monthly."
            />
            <FAQItem
              question="What do you deliver in the audit?"
              answer="A high-impact strategic briefing document covering technical domain health, data architectures, and a prioritized build roadmap designed for immediate execution."
            />
            <FAQItem
              question="How long does setup take?"
              answer="We move fast. Standard build-outs are completed within 14-28 days, including full validation and stress-testing."
            />
            <FAQItem
              question="Do you run campaigns for us or hand it over?"
              answer="We are systems architects. We build the machinery and train your team to operate it at peak performance. We ensure you own your infrastructure."
            />
            <FAQItem
              question="What tools do you work with?"
              answer="Our core is the n8n + CRM ecosystem. We integrate these with advanced data layers like Clay and high-deliverability platforms like Instantly."
            />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-7xl mx-auto py-24 mb-48">
          <div className="relative group p-[2px] rounded-[48px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-emerald-500 to-blue-500 animate-gradient-move opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#02040a] rounded-[46px] py-32 px-10 text-center flex flex-col items-center overflow-hidden">
              <CornerBrackets />
              <div className="z-10 relative">
              <h2 className="text-5xl md:text-8xl font-jakarta font-black mb-10 tracking-tighter leading-[0.9]">
                Ready to Upgrade?
              </h2>
              <p className="text-2xl text-gray-400 mb-16 max-w-2xl font-medium">
                Stop battling friction. Start deploying architecture. Secure your technical audit today.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative px-16 py-7 bg-lime-500 text-black font-black text-2xl rounded-2xl hover:bg-white transition-all shadow-[0_25px_60px_rgba(132,204,22,0.4)] hover:scale-110 active:scale-95 border-beam"
                >
                  Book a Free GTM Audit
                  <ArrowRight size={22} strokeWidth={3} className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4 group cursor-pointer">
            {/* Replaced SVG with provided logo image */}
            <img src="https://i.ibb.co/7n64Kz0/image_0.png" alt="GTM Vector Logo" className="h-12 md:h-16" />
          </div>

          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.3em]">
            © 2024 GTM Vector Architecture. Engineering for revenue.
          </p>
        </div>
      </footer>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-[#05070a] border border-white/10 rounded-[40px] p-10 md:p-14 shadow-2xl animate-in zoom-in duration-500 overflow-hidden">
            <CornerBrackets />
            <div className="z-10 relative">
            <div className="w-12 h-1 bg-lime-500 mb-8 rounded-full" />
            <h3 className="text-4xl font-jakarta font-black mb-4 tracking-tight">Infiltration Form</h3>
            <p className="text-gray-400 mb-10 text-lg font-medium leading-relaxed">
              Secure your slot. We review your architecture within a 48-hour window.
            </p>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
                alert('System update: Audit request dispatched.');
              }}
            >
              <div>
                <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">
                  Deployment Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-5 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-lime-500 transition-all text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">
                  Intelligence Link (LinkedIn)
                </label>
                <input
                  type="text"
                  placeholder="linkedin.com/in/..."
                  className="w-full px-5 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-lime-500 transition-all text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">
                  Personnel Count
                </label>
                <select className="w-full px-5 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-lime-500 transition-all text-white font-bold appearance-none">
                  <option className="bg-[#05070a]">1-10 Employees</option>
                  <option className="bg-[#05070a]">11-50 Employees</option>
                  <option className="bg-[#05070a]">51-200 Employees</option>
                  <option className="bg-[#05070a]">201+ Employees</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-6 bg-lime-500 text-black font-black rounded-2xl hover:bg-white transition-all text-xl shadow-2xl"
              >
                Confirm Deployment
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-8 text-gray-600 hover:text-white transition-colors text-xs font-black uppercase tracking-widest w-full text-center"
            >
              Abort Mission
            </button>
            </div>
          </div>
        </div>
      )}

      {/* Cursor proximity effect */}
      <div
        className="fixed w-10 h-10 rounded-full border-2 border-lime-500/20 pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)`,
        }}
      >
        <div className="w-1 h-1 bg-lime-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#84cc16]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-lime-500/40" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-lime-500/40" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-lime-500/40" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-lime-500/40" />
      </div>
    </div>
  );
};

export default App;

// --- CSS Additions needed in global.css for the marquee ---
// @keyframes marquee {
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// }
// .animate-marquee {
//   animation: marquee 20s linear infinite;
// }
