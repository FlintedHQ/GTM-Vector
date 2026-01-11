import React, { useEffect, useRef } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Cpu,
  Workflow,
  Layers,
  Search,
  Activity,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

// ✅ Put your logo file here (see steps below)
import Logo from "./assets/gtm-vector-logo.png";

// Cal link (used everywhere)
const CAL_LINK = "https://cal.com/dino-lukovac-7ap2jt/freegtmaudit";

// --- 1) Scramble text (kept from your version) ---
const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = React.useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  React.useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        prev
          .split("")
          .map((_, index) => {
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

// --- 2) HUD corner brackets ---
const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-lime-500/40" />
    <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-lime-500/40" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-lime-500/40" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-lime-500/40" />
  </>
);

// --- Header (logo fixed, init button removed) ---
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-black/75 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <a href="#" className="flex items-center gap-3">
        <img
          src={Logo}
          alt="GTM Vector"
          className="h-8 md:h-10 w-auto object-contain"
          draggable={false}
        />
      </a>

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

      {/* ✅ Removed // init_audit button */}
      <div className="w-[110px] hidden md:block" />
    </div>
  </nav>
);

// --- subtle particles ---
const ParticleDrift = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    const particleCount = 55;

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
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.25 + 0.06,
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

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
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
  <div className="p-10 rounded-[32px] group relative overflow-hidden flex flex-col items-start gap-5 border border-white/5 hover:border-lime-500/25 transition-colors bg-white/[0.02] backdrop-blur-xl">
    <CornerBrackets />
    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:bg-lime-500 group-hover:text-black group-hover:border-lime-500 transition-all duration-500 shadow-inner z-10 relative">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold group-hover:text-lime-500 transition-colors tracking-tight z-10 relative">
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed font-medium z-10 relative">{description}</p>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-7 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-lg font-bold transition-all ${isOpen ? "text-lime-500" : "text-gray-300"}`}>
          {question}
        </span>
        <div
          className={`p-2 rounded-full border transition-all duration-500 ${
            isOpen ? "border-lime-500 rotate-180 bg-lime-500 text-black" : "border-white/10 text-gray-500"
          }`}
        >
          <span className="block rotate-0">⌄</span>
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "max-h-60 pb-8 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400 leading-relaxed font-medium pl-2 border-l-2 border-lime-500/20">
          {answer}
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div className="min-h-screen relative selection:bg-lime-500 selection:text-black bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <ParticleDrift />
      <Navbar />

      <main className="relative z-10 pt-32 px-6">
        {/* HERO */}
        <section className="max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center relative text-center">
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-lime-500/60 uppercase tracking-widest mb-8">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              System Online
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>v2.4.0 Deployment</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[100px] font-extrabold tracking-tighter mb-10 leading-[0.9]"
          >
            Outbound GTM Architecture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500">
              <ScrambleText text="BUILT TO SCALE" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-400 mb-14 leading-relaxed font-medium"
          >
            From ICP definition to tooling and workflows, we design outbound systems teams can actually run.
          </motion.p>

          {/* ✅ Direct to calendar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex justify-center"
          >
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="group relative px-14 py-6 bg-lime-500 text-black font-black text-lg rounded-2xl hover:bg-white transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(132,204,22,0.28)] hover:scale-[1.04] active:scale-95"
            >
              Book a Free GTM Audit
              <ArrowRight size={22} strokeWidth={3} className="opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* subtle floating accent */}
          <motion.div style={{ y }} className="pointer-events-none absolute inset-x-0 -bottom-16 h-32 opacity-20">
            <div className="mx-auto max-w-4xl h-full bg-gradient-to-r from-transparent via-lime-500/30 to-transparent blur-2xl" />
          </motion.div>
        </section>

        {/* ✅ MOVING STATS BAND */}
        <section className="w-screen relative left-[50%] -translate-x-[50%] border-y border-white/10 bg-white/5 py-4 overflow-hidden mb-32">
          <div className="marquee">
            <div className="marquee__track font-mono text-sm text-gray-400">
              <div className="marquee__content">
                <span className="flex items-center gap-2">
                  <Zap size={14} className="text-lime-500" /> +73% BOOKING RATE
                </span>
                <span className="text-white/20 mx-6">///</span>
                <span className="flex items-center gap-2">
                  <Activity size={14} className="text-lime-500" /> 100% DELIVERABILITY
                </span>
                <span className="text-white/20 mx-6">///</span>
                <span className="flex items-center gap-2">
                  <Cpu size={14} className="text-lime-500" /> -85% MANUAL WORK
                </span>
                <span className="text-white/20 mx-6">///</span>
              </div>

              {/* duplicate for seamless loop */}
              <div className="marquee__content" aria-hidden="true">
                <span className="flex items-center gap-2">
                  <Zap size={14} className="text-lime-500" /> +73% BOOKING RATE
                </span>
                <span className="text-white/20 mx-6">///</span>
                <span className="flex items-center gap-2">
                  <Activity size={14} className="text-lime-500" /> 100% DELIVERABILITY
                </span>
                <span className="text-white/20 mx-6">///</span>
                <span className="flex items-center gap-2">
                  <Cpu size={14} className="text-lime-500" /> -85% MANUAL WORK
                </span>
                <span className="text-white/20 mx-6">///</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="max-w-7xl mx-auto py-24 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">What we do</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Architecting Growth</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We don’t just set up tools. We engineer high-velocity revenue engines focused on precision and deliverability.
              </p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/10 to-transparent mx-12 mb-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <ServiceCard
              icon={Target}
              title="ICP & Targeting"
              description="Deep-dive persona research and data sourcing. We find your exact buyers and validate the list."
            />
            <ServiceCard
              icon={ShieldCheck}
              title="Infrastructure"
              description="Secondary domains, SPF/DKIM/DMARC alignment, warming, and guardrails to protect deliverability."
            />
            <ServiceCard
              icon={Workflow}
              title="Automation & RevOps"
              description="Workflow automation + CRM hygiene so every lead, touch, and outcome is tracked correctly."
            />
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="max-w-5xl mx-auto py-24 mb-24 relative">
          <div className="text-center mb-24">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">Methodology</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">The Vector Blueprint</h2>
            <p className="text-gray-400 text-lg">A ruthless commitment to operational maturity.</p>
          </div>

          <div className="space-y-16 relative">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-lime-500 via-lime-500/20 to-transparent hidden md:block" />

            {[
              {
                step: "01",
                title: "Audit",
                duration: "48h",
                desc: "Review of deliverability, tooling, ICP, messaging, and CRM health. Clear gaps. Clear fixes.",
                icon: Search,
              },
              {
                step: "02",
                title: "Build",
                duration: "2–4 weeks",
                desc: "Infrastructure + workflow engineering. Tooling wired. Process documented. System stress-tested.",
                icon: Cpu,
              },
              {
                step: "03",
                title: "Handover",
                duration: "Docs + Training",
                desc: "You own it. SOPs, playbooks, onboarding, and operating cadence so the engine runs without you.",
                icon: Layers,
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-10 group relative">
                <div className="flex-shrink-0 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-black border-2 border-white/10 flex items-center justify-center text-white text-xl font-black group-hover:border-lime-500 group-hover:bg-lime-500 group-hover:text-black transition-all duration-500 shadow-2xl">
                    {item.step}
                  </div>
                </div>

                <div className="flex-1 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden">
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

        {/* FAQ */}
        <section id="faq" className="max-w-4xl mx-auto py-24 mb-40">
          <div className="text-center mb-16">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">Clarifications</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Intelligence Briefing</h2>
          </div>

          <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] px-10 py-6 shadow-2xl relative overflow-hidden">
            <CornerBrackets />
            <div className="z-10 relative">
              <FAQItem
                question="Who is this for?"
                answer="B2B SaaS and high-ticket service teams that want a repeatable outbound engine and clean CRM operations."
              />
              <FAQItem
                question="What happens in the audit?"
                answer="We review your current setup and return a prioritized roadmap (infra, tooling, process, and quick wins)."
              />
              <FAQItem
                question="Do you run campaigns or hand it over?"
                answer="We build + document + train so you own the system and can run it consistently."
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA (button centered + direct link) */}
        <section className="max-w-7xl mx-auto py-24 mb-48">
          <div className="relative group p-[2px] rounded-[48px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-emerald-500 to-blue-500 animate-gradient-move opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative bg-[#02040a] rounded-[46px] py-28 px-10 text-center flex flex-col items-center overflow-hidden">
              <CornerBrackets />
              <div className="z-10 relative max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95]">Ready to Upgrade?</h2>
                <p className="text-xl md:text-2xl text-gray-400 mb-14 font-medium">
                  Stop battling friction. Start deploying architecture. Secure your free GTM audit today.
                </p>

                {/* ✅ centered */}
                <div className="flex justify-center">
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative px-14 py-6 bg-lime-500 text-black font-black text-xl rounded-2xl hover:bg-white transition-all shadow-[0_25px_60px_rgba(132,204,22,0.35)] hover:scale-[1.04] active:scale-95 inline-flex items-center gap-3"
                  >
                    Book a Free GTM Audit
                    <ArrowRight size={22} strokeWidth={3} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (logo fixed + right text) */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="GTM Vector" className="h-10 md:h-12 w-auto object-contain" draggable={false} />
          </div>

          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] text-center md:text-right">
            © 2025 GTM Vector. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
