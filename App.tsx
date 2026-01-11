import React from "react";
import {
  ArrowRight,
  Zap,
  Activity,
  Cpu,
} from "lucide-react";

import logo from "./src/assets/gtm-vector-logo.png";

const CAL_LINK = "https://cal.com/dino-lukovac-7ap2jt/freegtmaudit";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-black/70 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img
            src={logo}
            alt="GTM Vector"
            className="h-9 md:h-10 w-auto"
            loading="eager"
          />
        </a>

        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-gray-500">
          <a href="#services" className="hover:text-lime-500 transition-colors">Services</a>
          <a href="#process" className="hover:text-lime-500 transition-colors">Process</a>
          <a href="#faq" className="hover:text-lime-500 transition-colors">FAQ</a>
        </div>

        {/* removed INIT_AUDIT button */}
        <div className="w-[1px] md:w-auto" />
      </div>
    </nav>
  );
};

const Marquee = () => {
  // Two identical tracks to make the loop seamless
  const items = [
    { icon: Zap, text: "+73% BOOKING RATE" },
    { icon: Activity, text: "100% DELIVERABILITY" },
    { icon: Cpu, text: "-85% MANUAL WORK" },
  ];

  return (
    <section className="w-screen relative left-[50%] -translate-x-[50%] border-y border-white/10 bg-white/5 py-4 overflow-hidden">
      <div className="marquee">
        <div className="marquee__track">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={`a-${i}`}>
              {items.map((it, j) => {
                const Icon = it.icon;
                return (
                  <span className="marquee__item" key={`a-${i}-${j}`}>
                    <span className="flex items-center gap-2 font-mono text-sm text-gray-300">
                      <Icon size={14} className="text-lime-500" />
                      {it.text}
                    </span>
                    <span className="mx-6 text-white/20">///</span>
                  </span>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div className="marquee__track" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={`b-${i}`}>
              {items.map((it, j) => {
                const Icon = it.icon;
                return (
                  <span className="marquee__item" key={`b-${i}-${j}`}>
                    <span className="flex items-center gap-2 font-mono text-sm text-gray-300">
                      <Icon size={14} className="text-lime-500" />
                      {it.text}
                    </span>
                    <span className="mx-6 text-white/20">///</span>
                  </span>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      <main className="relative z-10 pt-28 px-6">
        {/* HERO */}
        <section className="max-w-7xl mx-auto min-h-[75vh] flex flex-col justify-center text-center">
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-lime-500/60 uppercase tracking-widest mb-8">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              System Online
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>v2.4.0 Deployment</span>
          </div>

          <h1 className="text-5xl md:text-[92px] font-extrabold tracking-tight leading-[0.95] mb-10">
            Outbound GTM Architecture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500">
              Built to Scale
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-400 mb-12 leading-relaxed">
            From ICP definition to tooling and workflows, we design outbound systems teams can actually run.
          </p>

          <div className="flex items-center justify-center">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-lime-500 text-black font-extrabold text-lg rounded-2xl hover:bg-white transition-all shadow-[0_20px_50px_rgba(132,204,22,0.25)] hover:scale-105 active:scale-95"
            >
              Book a Free GTM Audit
              <ArrowRight size={20} className="opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </section>

        {/* MOVING TICKER */}
        <div className="mb-24">
          <Marquee />
        </div>

        {/* SERVICES */}
        <section id="services" className="max-w-7xl mx-auto py-10 mb-28">
          <div className="mb-14 text-center md:text-left">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
              What we do
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Architecting Growth
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              We build the underlying system so outbound is predictable, measurable, and scalable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-9 rounded-3xl border border-white/10 bg-white/5">
              <h3 className="text-2xl font-bold mb-3">ICP and Targeting</h3>
              <p className="text-gray-400 leading-relaxed">
                Clear buyer definition, targeting logic, and list-building rules that stop wasted outreach and focus volume where it converts.
              </p>
            </div>

            <div className="p-9 rounded-3xl border border-white/10 bg-white/5">
              <h3 className="text-2xl font-bold mb-3">Deliverability and Infrastructure</h3>
              <p className="text-gray-400 leading-relaxed">
                Domains, DNS, warmup, and sending practices engineered for consistent inbox placement and stable reputation over time.
              </p>
            </div>

            <div className="p-9 rounded-3xl border border-white/10 bg-white/5">
              <h3 className="text-2xl font-bold mb-3">Automation and RevOps</h3>
              <p className="text-gray-400 leading-relaxed">
                Tooling wired together with reliable data flow, clean CRM structure, and automated workflows so the engine runs daily without chaos.
              </p>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="max-w-5xl mx-auto py-10 mb-28">
          <div className="text-center mb-14">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Methodology
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              The Vector Blueprint
            </h2>
            <p className="text-gray-400 text-lg">
              A commitment to operational maturity, built around clarity, repeatability, and ownership.
            </p>
          </div>

          <div className="space-y-10">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-lime-500 text-black font-extrabold flex items-center justify-center">
                  01
                </div>
                <h3 className="text-2xl font-bold">Audit</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-lime-400 ml-auto">
                  48h
                </span>
              </div>
              <p className="text-gray-300 font-semibold mb-3">
                A deep technical and operational teardown of your current outbound motion.
              </p>
              <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                <li>ICP definition and targeting logic, who you are hitting versus who you should</li>
                <li>Deliverability and inbox health, domains, DNS, warmup, sender reputation</li>
                <li>Messaging structure and sequencing, what is breaking and what is underperforming</li>
                <li>Tooling and data flow across CRM, enrichment, automation, and outbound platforms</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-4">
                Output: a prioritized roadmap outlining gaps, risks, and the exact fixes required, split into quick wins and structural changes.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-lime-500 text-black font-extrabold flex items-center justify-center">
                  02
                </div>
                <h3 className="text-2xl font-bold">Build</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-lime-400 ml-auto">
                  2 to 4 weeks
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Infrastructure, workflows, and tooling implementation. Everything is wired, tested, and documented so it runs reliably at scale.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-lime-500 text-black font-extrabold flex items-center justify-center">
                  03
                </div>
                <h3 className="text-2xl font-bold">Handover</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-lime-400 ml-auto">
                  Docs and training
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                You own it. SOPs, playbooks, onboarding, and operating cadence so the engine keeps running without constant founder involvement.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-4xl mx-auto py-10 mb-28">
          <div className="text-center mb-10">
            <div className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
              Clarifications
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              FAQ
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Who is this for?</h3>
              <p className="text-gray-400 leading-relaxed">
                B2B SaaS and high-ticket service teams that want a repeatable outbound engine and clean CRM operations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">What happens in the audit?</h3>
              <p className="text-gray-400 leading-relaxed">
                We review your current setup and return a prioritized roadmap covering infrastructure, tooling, process, and quick wins.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Do you run campaigns or hand it over?</h3>
              <p className="text-gray-400 leading-relaxed">
                We build and hand over the system with documentation and training. If you need ongoing support later, we can discuss it.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-7xl mx-auto py-16 mb-24">
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-12 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-5">Ready to Upgrade?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Stop battling friction. Start deploying architecture. Secure your technical audit today.
            </p>

            {/* button centered */}
            <div className="flex justify-center">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 bg-lime-500 text-black font-extrabold rounded-2xl hover:bg-white transition-all shadow-[0_20px_50px_rgba(132,204,22,0.25)] hover:scale-105 active:scale-95"
              >
                Book a Free GTM Audit
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <img src={logo} alt="GTM Vector" className="h-10 w-auto" />
          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.25em]">
            © 2025 GTM Vector. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
