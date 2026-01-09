import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Mail,
  Target,
  Workflow,
  Activity,
  Database,
} from "lucide-react";

/** Scramble text (no deps) */
function ScrambleText({
  text,
  className = "",
  speed = 28,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?";
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const id = window.setInterval(() => {
      setDisplayed((prev) =>
        prev
          .split("")
          .map((_, idx) => {
            if (idx < iteration) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3;
      if (iteration >= text.length) window.clearInterval(id);
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
}

function CornerBrackets() {
  return (
    <>
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-lime-500/50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-lime-500/50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-lime-500/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-lime-500/50" />
    </>
  );
}

function Navbar({ onAudit }: { onAudit: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 select-none">
          <div className="w-8 h-8 bg-lime-500 flex items-center justify-center font-black text-black text-xs">
            GTM
          </div>
          <span className="font-mono text-sm tracking-widest uppercase text-white">
            Vector<span className="text-lime-500 animate-pulse">_</span>
          </span>
        </div>

        <button
          onClick={onAudit}
          className="bg-white/5 hover:bg-lime-500 hover:text-black border border-white/10 text-white px-5 py-2 text-xs font-mono uppercase tracking-widest transition-all"
        >
          // init_audit
        </button>
      </div>
    </nav>
  );
}

function BentoItem({
  title,
  desc,
  icon: Icon,
  className = "",
}: {
  title: string;
  desc: string;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div
      className={[
        "group relative p-8 bg-white/[0.02] border border-white/5 hover:border-lime-500/30 transition-colors overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <CornerBrackets />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="w-10 h-10 mb-4 rounded bg-white/5 flex items-center justify-center text-lime-500 group-hover:scale-110 transition-transform duration-300">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white mb-2 font-mono tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [parallaxY, setParallaxY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        setParallaxY(window.scrollY * 0.08);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dataRows = useMemo(() => {
    // stable rows (don’t regenerate on every render)
    return Array.from({ length: 12 }).map((_, i) => {
      const id = Math.random().toString(36).slice(2, 11).toUpperCase();
      const pct = (Math.random() * 100).toFixed(2);
      return { key: `${id}-${i}`, id, pct };
    });
  }, []);

  const onAudit = () => {
    // swap this with your real booking link later
    window.location.href = "mailto:info@gtmvector.com?subject=GTM%20Audit%20Request";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-lime-500 selection:text-black overflow-x-hidden">
      {/* Background grid with mask */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar onAudit={onAudit} />

      <main className="relative z-10 pt-32 px-6">
        {/* HERO */}
        <section className="max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center relative">
          <div className="flex items-center gap-4 text-[10px] font-mono text-lime-500/60 uppercase tracking-widest mb-8">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              System Online
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>v2.4.0 Deployment</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-white mb-8">
            REVENUE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600">
              <ScrambleText text="ENGINEERING" />
            </span>
          </h1>

          <p className="max-w-xl text-lg text-gray-400 font-mono mb-12 border-l border-lime-500/30 pl-6">
            We don&apos;t “do marketing.” We architect high-velocity outbound systems.
            From ICP definition to n8n automation, we build the machine. You pull the lever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={onAudit}
              className="group relative px-8 py-4 bg-lime-500 hover:bg-lime-400 text-black font-black text-sm uppercase tracking-widest transition-all sm:hover:pr-12"
            >
              Initiate Audit
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </button>

            <a
              href="#services"
              className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-black text-sm uppercase tracking-widest transition-all text-center"
            >
              View Schematic
            </a>
          </div>

          {/* Floating panel */}
          <div
            style={{ transform: `translateY(${-parallaxY}px)` }}
            className="hidden lg:block absolute right-0 top-20 w-[420px] h-[520px] border border-white/10 bg-black/50 backdrop-blur-sm p-6 font-mono text-xs text-lime-500/60"
          >
            <div className="flex justify-between border-b border-white/10 pb-2 mb-4">
              <span>TARGET_ACQUISITION</span>
              <span>RUNNING...</span>
            </div>

            <div className="space-y-2">
              {dataRows.map((r) => (
                <div
                  key={r.key}
                  className="flex justify-between opacity-60 hover:opacity-100 transition-opacity"
                >
                  <span>ID_{r.id}</span>
                  <span>{r.pct}% MATCH</span>
                </div>
              ))}
            </div>

            <CornerBrackets />
          </div>
        </section>

        {/* STATS MARQUEE */}
        <section className="w-screen relative left-[50%] -translate-x-[50%] border-y border-white/10 bg-white/5 py-4 overflow-hidden mb-32">
          <div className="marquee font-mono text-sm text-gray-300">
            <div className="marquee__track">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="marquee__item">
                  <span className="inline-flex items-center gap-2">
                    <Zap size={14} className="text-lime-500" /> +73% BOOKING RATE
                  </span>
                  <span className="mx-6 text-white/20">///</span>
                  <span className="inline-flex items-center gap-2">
                    <Activity size={14} className="text-lime-500" /> 99.8% DELIVERABILITY
                  </span>
                  <span className="mx-6 text-white/20">///</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="max-w-7xl mx-auto mb-32">
          <div className="flex items-end justify-between mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              System <br />
              <span className="text-lime-500">Architecture</span>
            </h2>
            <div className="hidden md:block text-right">
              <p className="text-xs font-mono text-gray-500 uppercase">Module Breakdown</p>
              <p className="text-xs font-mono text-gray-500 uppercase">Sector: Outbound</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px]">
            <BentoItem
              title="Infrastructure & Deliverability"
              desc="Secondary domains, SPF/DKIM alignment, warming protocols — built to stay out of spam."
              icon={ShieldCheck}
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-white/[0.05] to-transparent"
            />

            <BentoItem
              title="Hyper-Targeting"
              desc="Find buyers, not “lists”. Precision enrichment and persona filters that actually hold up."
              icon={Target}
              className="md:col-span-1 md:row-span-1"
            />

            <BentoItem
              title="n8n Automation"
              desc="Workflows that route signals, trigger follow-ups, and keep operations brutally efficient."
              icon={Workflow}
              className="md:col-span-1 md:row-span-1"
            />

            <BentoItem
              title="CRM Hygiene & RevOps"
              desc="Your CRM is the source of truth. Bidirectional syncs and guardrails so nothing rots."
              icon={Database}
              className="md:col-span-2 md:row-span-1"
            />
          </div>

          {/* CTA strip */}
          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10 bg-black/40 backdrop-blur-sm p-8">
            <div>
              <p className="font-mono text-xs text-lime-500/70 uppercase tracking-widest">
                Next action
              </p>
              <p className="text-xl font-black tracking-tight">
                Want this system installed for your ICP?
              </p>
              <p className="text-gray-400 mt-2">
                Book the audit. We’ll map gaps, deliverability, data flow, and the build plan.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onAudit}
                className="px-6 py-3 bg-lime-500 text-black font-black uppercase tracking-widest text-sm hover:bg-lime-400 transition-all"
              >
                Initiate Audit
              </button>
              <a
                href="mailto:info@gtmvector.com"
                className="px-6 py-3 border border-white/15 hover:bg-white/5 font-black uppercase tracking-widest text-sm transition-all inline-flex items-center gap-2"
              >
                <Mail size={16} className="text-lime-500" />
                Email
              </a>
            </div>
          </div>
        </section>

        <footer className="max-w-7xl mx-auto pb-20 text-sm text-gray-500">
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <span className="font-mono">© {new Date().getFullYear()} GTM Vector</span>
            <span className="font-mono text-gray-600">
              Built for outbound operators.
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

