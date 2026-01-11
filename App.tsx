import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronDown,
  Target,
  Cpu,
  Workflow,
  Layers,
  Search,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import logo from "./assets/gtm-vector-logo.png";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CAL_LINK = "https://cal.com/dino-lukovac-7ap2jt/freegtmaudit";

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedText(() =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return letter;
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

const CornerBrackets = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-lime-500/50" />
    <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-lime-500/50" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-lime-500/50" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-lime-500/50" />
  </>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-black/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <a href="#" className="flex items-center gap-3 group">
        <img src={logo} alt="GTM Vector" className="h-8 md:h-10" />
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

      <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
    </div>
  </nav>
);

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

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
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
          className={cn(
            "text-lg font-bold transition-all",
            isOpen ? "text-lime-500 tracking-wide" : "text-gray-300"
          )}
        >
          {question}
        </span>
        <div
          className={cn(
            "p-2 rounded-full border transition-all duration-500",
            isOpen
              ? "border-lime-500 rotate-180 bg-lime-500 text-black"
              : "border-white/10 text-gray-500"
          )}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      <div
        className={cn(
          "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isOpen ? "max-h-96 pb-8 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-gray-400 leading-relaxed font-medium pl-2 border-l-2 border-lime-500/20">
          {answer}
        </p>
      </div>
    </div>
  );
};

const ProcessCard = ({
  step,
  title,
  duration,
  icon: Icon,
  intro,
  bullets,
  output,
}: {
  step: string;
  title: string;
  duration: string;
  icon: any;
  intro: string;
  bullets: string[];
  output?: string;
}) => (
  <div className="glass-card flex-1 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
    <CornerBrackets />
    <div className="flex items-start justify-between gap-6 z-10 relative">
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300">
          <Icon size={22} />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-lime-500 text-black font-black flex items-center justify-center">
              {step}
            </span>
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          </div>
          <p className="text-gray-400 mt-3 leading-relaxed font-medium max-w-2xl">{intro}</p>
        </div>
      </div>

      <div className="text-[11px] font-black uppercase tracking-widest text-lime-400 whitespace-nowrap mt-2">
        {duration}
      </div>
    </div>

    <ul className="mt-6 space-y-3 text-gray-300/90 font-medium z-10 relative">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-lime-500/70 shrink-0" />
          <span className="leading-relaxed">{b}</span>
        </li>
      ))}
    </ul>

    {output && (
      <div className="mt-6 text-gray-400 font-medium z-10 relative">
        <span className="text-gray-300 font-bold">Output:</span> {output}
      </div>
    )}
  </div>
);

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative animated-bg selection:bg-lime-500 selection:text-black bg-[#050505] text-white font-sans overflow-x-hidden">
      <div className="noise-overlay" />
      <ParticleDrift />
      <Navbar />

      <div className="fixed inset-0 shimmer-grid opacity-30 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none beam-mask z-0 mix-blend-screen" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-lime-600/5 blur-[140px] rounded-full pointer-events-none beam-mask z-0 mix-blend-screen" />

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
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="group relative px-14 py-6 bg-lime-500 text-black font-black text-lg rounded-2xl hover:bg-white transition-all inline-flex items-center gap-4 shadow-[0_20px_50px_rgba(132,204,22,0.3)] hover:scale-110 active:scale-95 border-beam"
            >
              Book a Free GTM Audit
              <ArrowRight
                size={22}
                strokeWidth={3}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all"
              />
            </a>
          </motion.div>
        </section>

        {/* STATS MARQUEE */}
        <section className="w-screen relative left-[50%] -translate-x-[50%] border-y border-white/10 bg-white/5 py-4 overflow-hidden mb-32">
          <div className="marquee">
            <div className="marquee__track font-mono text-sm text-gray-400">
              <div className="marquee__item">
                <span className="flex items-center gap-2">
                  <Zap size={14} className="text-lime-500" /> +73% BOOKING RATE
                </span>
                <span className="mx-6 text-white/20">///</span>
                <span className="flex items-center gap-2">
                  <Activity size={14} className="text-lime-500" /> 100% DELIVERABILITY
                </span>
                <span className="mx-6 text-white/20">///</span>
                <span className="flex items-center gap-2">
                  <Cpu size={14} className="text-lime-500" /> -85% MANUAL WORK
                </span>
                <span className="mx-6 text-white/20">///</span>
              </div>

              <div className="marquee__item" aria-hidden="true">
                <span className="flex items-center gap-2">
                  <Zap size={14} className="text-lime-500" /> +73% BOOKING RATE
                </span>
                <span className="mx-6 text-white/20">///</span>
                <span className="flex items-center gap-2">
                  <Activity size={14} className="text-lime-500" /> 100% DELIVERABILITY
                </span>
                <span className="mx-6 text-white/20">///</span>
                <span className="flex items-center gap-2">
                  <Cpu size={14} className="text-lime-500" /> -85% MANUAL WORK
                </span>
                <span className="mx-6 text-white/20">///</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
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
                We build the infrastructure, workflows, and operating cadence behind high-output outbound. Clean data, clean
                execution, measurable outcomes.
              </p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/10 to-transparent mx-12 mb-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <ServiceCard
              icon={Target}
              title="ICP & Targeting"
              description="Persona definition, account selection logic, and a targeting model that stays consistent as you scale volume."
            />
            <ServiceCard
              icon={ShieldCheck}
              title="Infrastructure"
              description="Domains, DNS alignment, warmup strategy, and governance that keeps deliverability stable as output rises."
            />
            <ServiceCard
              icon={Workflow}
              title="Automation & RevOps"
              description="n8n workflows wired into your CRM so lead flow, routing, hygiene, and reporting run without manual work."
            />
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="max-w-5xl mx-auto py-24 mb-24 relative">
          <div className="text-center mb-16">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Methodology
            </div>
            <h2 className="text-4xl md:text-6xl font-jakarta font-bold tracking-tight mb-6">
              The Vector Blueprint
            </h2>
            <p className="text-gray-400 text-lg">
              A commitment to operational maturity, built around clarity, repeatability, and ownership.
            </p>
          </div>

          <div className="space-y-10">
            <ProcessCard
              step="01"
              title="Audit"
              duration="48H"
              icon={Search}
              intro="A deep technical and operational teardown of your current outbound motion."
              bullets={[
                "ICP definition and targeting logic, who you are hitting versus who you should",
                "Deliverability and inbox health, domains, DNS, warmup, sender reputation",
                "Messaging structure and sequencing, what is breaking and what is underperforming",
                "Tooling and data flow across CRM, enrichment, automation, and outbound platforms",
              ]}
              output="A prioritized roadmap outlining gaps, risks, and the exact fixes required, split into quick wins and structural changes."
            />

            <ProcessCard
              step="02"
              title="Build"
              duration="2 TO 4 WEEKS"
              icon={Cpu}
              intro="Infrastructure plus workflow engineering that turns strategy into a system your team can run every day."
              bullets={[
                "Deliverability stack setup: domains, SPF, DKIM, DMARC, routing, warmup strategy, sending policy",
                "Data layer: sourcing, enrichment logic, validation rules, dedupe, and segmentation that stays clean at scale",
                "Outbound tooling: sequencing, personalization logic, handoffs, and tracking wired end to end",
                "CRM operations: lifecycle stages, ownership rules, pipeline taxonomy, and reporting that matches reality",
                "Automation: n8n workflows for list intake, routing, hygiene, alerts, and feedback loops from replies to CRM fields",
                "Stress testing: volume tests, inbox placement checks, and failure mode review before you go live",
              ]}
              output="A fully working outbound system with documented flows, tracked metrics, and a stable operating baseline."
            />

            <ProcessCard
              step="03"
              title="Handover"
              duration="DOCS AND TRAINING"
              icon={Layers}
              intro="You own it. We transfer the full playbook so the engine runs without constant founder involvement."
              bullets={[
                "SOPs for list building, QA, launching sequences, and handling replies",
                "Playbooks for targeting changes, new segments, and iterative messaging improvements",
                "CRM hygiene routines: weekly checks, stuck stage rules, and dedupe guardrails",
                "Reporting cadence: what to review daily, weekly, and monthly, and how to act on signals",
                "Team training: walkthroughs, troubleshooting guide, and a checklist to onboard new operators fast",
              ]}
              output="An operating cadence and documentation set that keeps quality high while volume increases."
            />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-4xl mx-auto py-24 mb-40">
          <div className="text-center mb-16">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Clarifications
            </div>
            <h2 className="text-4xl md:text-5xl font-jakarta font-bold tracking-tight">
              FAQ
            </h2>
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
                answer="We review your current setup and return a prioritized roadmap covering infrastructure, tooling, process, and quick wins."
              />
              <FAQItem
                question="Do you run campaigns or hand it over?"
                answer="We build and hand over the system with documentation and training. If you need ongoing support later, we can discuss it."
              />
              <FAQItem
                question="How long does setup take?"
                answer="Most builds land in 2 to 4 weeks depending on domain work, tool complexity, and how much needs to be rebuilt versus refined."
              />
              <FAQItem
                question="What tools do you work with?"
                answer="n8n, HubSpot, Clay, Apollo, Instantly, and supporting deliverability tooling. We adapt to your stack if it is sound."
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
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

                <div className="flex items-center justify-center">
                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative px-16 py-7 bg-lime-500 text-black font-black text-2xl rounded-2xl hover:bg-white transition-all shadow-[0_25px_60px_rgba(132,204,22,0.4)] hover:scale-110 active:scale-95 border-beam inline-flex items-center justify-center"
                  >
                    Book a Free GTM Audit
                    <ArrowRight
                      size={22}
                      strokeWidth={3}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <img src={logo} alt="GTM Vector" className="h-10 md:h-12" />
          </div>

          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.3em] text-center">
            © 2025 GTM Vector. All Rights Reserved.
          </p>
        </div>
      </footer>

      <div
        className="fixed w-10 h-10 rounded-full border-2 border-lime-500/20 pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block"
        style={{ transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)` }}
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
