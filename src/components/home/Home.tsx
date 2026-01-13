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
} from 'lucide-react';

const CAL_LINK = 'https://cal.com/dino-lukovac-7ap2jt/freegtmaudit';
const LOGO_SRC = '/gtm-vector-logo.png';

// --- Sub-components ---

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-[60] py-4 px-6 md:px-12 bg-black/60 backdrop-blur-2xl border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <a href="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 relative transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
          <img
            src={LOGO_SRC}
            alt="GTM Vector"
            className="w-full h-full object-contain drop-shadow-[0_0_16px_rgba(132,204,22,0.25)]"
          />
        </div>
        <span className="font-jakarta text-xl font-bold tracking-tighter uppercase">
          GTM <span className="text-lime-500">Vector</span>
        </span>
      </a>

      <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
        <a href="#services" className="hover:text-lime-500 transition-all hover:tracking-[0.3em]">
          Services
        </a>
        <a href="#process" className="hover:text-lime-500 transition-all hover:tracking-[0.3em]">
          Process
        </a>
        <a href="#faq" className="hover:text-lime-500 transition-all hover:tracking-[0.3em]">
          FAQ
        </a>
      </div>

      <div className="flex items-center">
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-lime-500 text-black font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 hover:bg-white"
        >
          Get in touch
        </a>
      </div>
    </div>
  </nav>
);

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

const ServiceCard: React.FC<{ icon: any; title: string; description: string }> = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-10 rounded-[40px] group relative overflow-hidden flex flex-col items-start gap-6">
    <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-lime-500 group-hover:text-black group-hover:border-lime-500 transition-all duration-700 shadow-inner group-hover:scale-110 group-hover:rotate-6">
      <Icon size={32} />
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-bold group-hover:text-lime-500 transition-colors tracking-tight font-jakarta">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-medium text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
        {description}
      </p>
    </div>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex items-center justify-between text-left group transition-all">
        <span
          className={`text-lg md:text-xl font-bold transition-all duration-500 ${
            isOpen ? 'text-lime-500 translate-x-2' : 'text-gray-300'
          }`}
        >
          {question}
        </span>
        <div
          className={`p-2.5 rounded-full border-2 transition-all duration-700 ${
            isOpen ? 'border-lime-500 rotate-180 bg-lime-500 text-black' : 'border-white/10 text-gray-500 hover:border-white/30'
          }`}
        >
          <ChevronDown size={20} />
        </div>
      </button>
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed font-medium pl-6 border-l-2 border-lime-500/30 text-base md:text-lg">{answer}</p>
      </div>
    </div>
  );
};

// --- Main ---

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

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 shimmer-grid opacity-20 pointer-events-none z-0" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{ transform: `translate(-50%, ${scrolled * 0.08}px)` }}
      >
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-lime-600/10 blur-[180px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full mix-blend-screen animate-gradient-slow" />
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] bg-emerald-600/5 blur-[200px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-12 px-6 overflow-hidden">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 text-center relative">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-lime-400 mb-9 shadow-2xl animate-bounce-slow">
            <Zap size={14} className="fill-lime-400 animate-pulse" /> Operational Excellence
          </div>

          <h1 className="text-6xl md:text-[110px] font-jakarta font-extrabold tracking-tighter mb-9 leading-[0.85] text-white">
            Outbound GTM Architecture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500 animate-gradient-slow bg-[length:200%_auto]">
              Built to Scale
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed font-medium opacity-90">
            From ICP definition to tooling and workflows, we design outbound systems teams can actually run.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noreferrer"
              className="group relative px-14 py-7 bg-lime-500 text-black font-black text-xl rounded-2xl transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(132,204,22,0.3)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Book a Free GTM Audit <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
              <span>Trusted by 50+ scaling startups</span>
            </div>
          </div>
        </section>

        {/* Results Band */}
        <section className="max-w-7xl mx-auto mb-32">
          <div className="relative group overflow-hidden rounded-[50px] p-[1px] bg-gradient-to-b from-white/20 to-transparent">
            <div className="bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-[49px] py-16 px-8 flex flex-col items-center text-center relative">
              <div className="absolute inset-0 bg-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="text-7xl md:text-[120px] font-jakarta font-black text-white mb-4 tracking-tighter text-glow animate-pulse-slow">
                +73%
              </span>
              <p className="text-3xl md:text-5xl font-jakarta font-bold text-gray-200 tracking-tight max-w-2xl">
                booked meetings on average.
              </p>
              <div className="h-1.5 w-32 bg-lime-500 mt-10 mb-6 rounded-full opacity-60 group-hover:w-48 transition-all duration-700" />
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black italic">Varies by ICP, offer, and volume.</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto py-20 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
            <div className="max-w-2xl">
              <div className="text-lime-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-lime-500/50" /> What we do
              </div>
              <h2 className="text-5xl md:text-7xl font-jakarta font-bold tracking-tight mb-6 text-white">Architecting Growth</h2>
              <p className="text-gray-400 text-xl leading-relaxed opacity-80">
                We design end-to-end revenue systems: CRM foundations, clean data, deliverability, outbound execution, and AI workflows that keep pipeline moving.
              </p>
            </div>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent mx-12 mb-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <ServiceCard
              icon={Database}
              title="CRM Foundations"
              description="We implement and optimize your CRM (HubSpot, Salesforce, Attio, or any stack) so forecasting, pipeline, ownership, and reporting stay clean as headcount grows."
            />
            <ServiceCard
              icon={Target}
              title="ICP, Data & Outbound"
              description="We reverse-engineer ICP from closed-won deals, source and segment the right accounts, enrich with the right signals, and launch outbound with high deliverability and consistency."
            />
            <ServiceCard
              icon={Workflow}
              title="Automation & AI SDRs"
              description="n8n-driven workflows synced with your CRM. Automated enrichment, routing, intent signals, AI inbound SDRs, content automation, and visitor identification that turns traffic into meetings."
            />
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="max-w-6xl mx-auto py-24 mb-24 relative">
          <div className="text-center mb-20">
            <div className="text-lime-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Methodology</div>
            <h2 className="text-5xl md:text-7xl font-jakarta font-bold tracking-tight mb-6">The Vector Blueprint</h2>
            <p className="text-gray-400 text-xl font-medium opacity-70 italic font-mono">Systems first. Output second. Scale always.</p>
          </div>

          <div className="space-y-16 relative">
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-lime-500 via-lime-500/20 to-transparent hidden md:block" />

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
              <div key={i} className="flex flex-col md:flex-row gap-10 group relative">
                <div className="flex-shrink-0 z-10">
                  <div className="w-16 h-16 rounded-3xl bg-black border-2 border-white/10 flex items-center justify-center text-white text-2xl font-black group-hover:border-lime-500 group-hover:bg-lime-500 group-hover:text-black transition-all duration-700 shadow-2xl group-hover:scale-110">
                    {item.step}
                  </div>
                </div>
                <div className="glass-card flex-1 p-10 rounded-[40px] border-l-4 border-l-lime-500/20 group-hover:border-l-lime-500">
                  <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-4">
                      <item.icon className="text-lime-500" size={24} />
                      <h4 className="text-4xl font-bold tracking-tight font-jakarta text-white">{item.title}</h4>
                    </div>
                    <span className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-lime-400 text-[10px] font-black uppercase tracking-[0.2em]">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xl leading-relaxed font-medium opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Condensed Stack Statement */}
        <section className="max-w-6xl mx-auto py-20 mb-24 text-center">
          <p className="text-3xl md:text-4xl font-medium text-gray-400 leading-tight">
            <span className="text-white font-black">n8n is the nervous system.</span>
            <br />
            <span className="text-lime-500 font-black italic">CRM is the source of truth.</span>
            <br />
            <span className="opacity-70 text-xl">Everything else is a modular endpoint we optimize for sheer output.</span>
          </p>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-5xl mx-auto py-24 mb-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-lime-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="text-center mb-16">
            <div className="text-lime-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">FAQ</div>
            <h2 className="text-5xl md:text-7xl font-jakarta font-bold tracking-tight text-white">FAQ</h2>
          </div>

          <div className="glass-card rounded-[50px] px-10 md:px-16 py-8 shadow-3xl">
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

        {/* Final CTA Section */}
        <section className="max-w-7xl mx-auto py-24 mb-40 relative overflow-hidden rounded-[60px]">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-600/20 via-emerald-600/10 to-blue-600/20 animate-gradient-slow opacity-60 pointer-events-none" />
          <div className="relative z-10 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[60px] py-24 px-10 text-center flex flex-col items-center group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-opacity">
              <Workflow size={200} className="text-lime-500" />
            </div>

            <h2 className="text-6xl md:text-[90px] font-jakarta font-black mb-10 tracking-tighter leading-[0.85] text-white">
              Ready to <br /> Upgrade?
            </h2>

            <p className="text-2xl md:text-3xl text-gray-400 mb-16 max-w-3xl font-medium leading-tight">
              We'll design comprehensive GTM architecture tailored for your team’s execution.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="group relative px-16 py-7 bg-lime-500 text-black font-black text-2xl rounded-3xl transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_30px_70px_rgba(132,204,22,0.4)] overflow-hidden"
              >
                <span className="relative z-10">Get in touch</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <a
                href="mailto:info@gtmvector.com"
                className="px-12 py-7 bg-white/5 border border-white/10 rounded-3xl font-black text-lg hover:bg-white/10 transition-all flex items-center gap-4 group uppercase tracking-[0.2em] text-white"
              >
                <Mail size={26} className="group-hover:text-lime-500 group-hover:scale-125 transition-all" /> info@gtmvector.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-14 px-6 border-t border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 relative">
              <img src={LOGO_SRC} alt="GTM Vector" className="w-full h-full object-contain" />
            </div>
            <span className="font-jakarta text-xl font-black tracking-tighter uppercase text-white">
              GTM <span className="text-lime-500">Vector</span>
            </span>
          </div>

          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.35em] text-center">
            © 2024 GTM Vector. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
