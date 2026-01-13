
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  ExternalLink,
  Github,
  Linkedin,
  X
} from 'lucide-react';

// --- Sub-components ---

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-[60] py-4 px-6 md:px-12 bg-black/60 backdrop-blur-2xl border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 relative transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
          <svg viewBox="0 0 100 100" className="w-full h-full logo-glow">
             <path d="M10 40 L40 70 L90 20 L45 20 L25 40 Z" fill="#84cc16" />
             <path d="M10 40 L30 60 L15 60 Z" fill="#94a3b8" />
          </svg>
        </div>
        <span className="font-jakarta text-xl font-bold tracking-tighter uppercase">
          GTM <span className="text-lime-500">Vector</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
        <a href="#services" className="hover:text-lime-500 transition-all hover:tracking-[0.3em]">Services</a>
        <a href="#process" className="hover:text-lime-500 transition-all hover:tracking-[0.3em]">Process</a>
        <a href="#stack" className="hover:text-lime-500 transition-all hover:tracking-[0.3em]">Stack</a>
        <a href="#faq" className="hover:text-lime-500 transition-all hover:tracking-[0.3em]">FAQ</a>
      </div>
      <button className="relative group overflow-hidden bg-white text-black font-black px-8 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <span className="relative z-10">Get Audit</span>
        <div className="absolute inset-0 bg-lime-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
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

const ServiceCard: React.FC<{ icon: any, title: string, description: string }> = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-10 rounded-[40px] group relative overflow-hidden flex flex-col items-start gap-6">
    <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-lime-500 group-hover:text-black group-hover:border-lime-500 transition-all duration-700 shadow-inner group-hover:scale-110 group-hover:rotate-6">
      <Icon size={32} />
    </div>
    <div className="space-y-3">
        <h3 className="text-2xl font-bold group-hover:text-lime-500 transition-colors tracking-tight font-jakarta">{title}</h3>
        <p className="text-gray-400 leading-relaxed font-medium text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">{description}</p>
    </div>
  </div>
);

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-lg md:text-xl font-bold transition-all duration-500 ${isOpen ? 'text-lime-500 translate-x-2' : 'text-gray-300'}`}>
            {question}
        </span>
        <div className={`p-2.5 rounded-full border-2 transition-all duration-700 ${isOpen ? 'border-lime-500 rotate-180 bg-lime-500 text-black' : 'border-white/10 text-gray-500 hover:border-white/30'}`}>
           <ChevronDown size={20} />
        </div>
      </button>
      <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-400 leading-relaxed font-medium pl-6 border-l-2 border-lime-500/30 text-base md:text-lg">
            {answer}
        </p>
      </div>
    </div>
  );
};

const CustomCursor: React.FC<{ mousePos: { x: number, y: number } }> = ({ mousePos }) => (
    <div 
      className="fixed w-10 h-10 rounded-full border border-lime-500/30 pointer-events-none z-[9999] transition-transform duration-[120ms] ease-out hidden md:block"
      style={{
        transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)`,
      }}
    >
      <div className="w-1.5 h-1.5 bg-lime-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#84cc16]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-lime-500/50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-lime-500/50" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-lime-500/50" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-lime-500/50" />
    </div>
);

// --- Main App ---

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
        setScrolled(window.scrollY);
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen relative font-jakarta bg-[#050505] selection:bg-lime-500 selection:text-black">
      <div className="noise-overlay" />
      <ParticleDrift />
      <Navbar />
      <CustomCursor mousePos={mousePos} />

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 shimmer-grid opacity-20 pointer-events-none z-0" />
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{ transform: `translate(-50%, ${scrolled * 0.1}px)` }}
      >
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-lime-600/10 blur-[180px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full mix-blend-screen animate-gradient-slow" />
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] bg-emerald-600/5 blur-[200px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-32 px-6 overflow-hidden">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto py-24 md:py-48 text-center relative">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-lime-400 mb-12 shadow-2xl animate-bounce-slow">
            <Zap size={14} className="fill-lime-400 animate-pulse" /> Operational Excellence
          </div>
          <h1 className="text-6xl md:text-[110px] font-jakarta font-extrabold tracking-tighter mb-12 leading-[0.85] text-white">
            Outbound GTM Architecture <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500 animate-gradient-slow bg-[length:200%_auto]">
                Built to Scale
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-400 mb-16 leading-relaxed font-medium opacity-90">
            From ICP definition to tooling and workflows, we design outbound systems teams can actually run.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative px-14 py-7 bg-lime-500 text-black font-black text-xl rounded-2xl transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(132,204,22,0.3)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Book a Free GTM Audit <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <img key={i} src={`https://picsum.photos/seed/${i+10}/100/100`} className="w-10 h-10 rounded-full border-2 border-black" alt="Client" />
                    ))}
                </div>
                <span>Trusted by 50+ scaling startups</span>
            </div>
          </div>
        </section>

        {/* Results Band */}
        <section className="max-w-7xl mx-auto mb-48">
          <div className="relative group overflow-hidden rounded-[50px] p-[1px] bg-gradient-to-b from-white/20 to-transparent">
            <div className="bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-[49px] py-20 px-8 flex flex-col items-center text-center relative">
              <div className="absolute inset-0 bg-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="text-8xl md:text-[140px] font-jakarta font-black text-white mb-4 tracking-tighter text-glow animate-pulse-slow">+73%</span>
              <p className="text-3xl md:text-5xl font-jakarta font-bold text-gray-200 tracking-tight max-w-2xl">booked meetings on average.</p>
              <div className="h-1.5 w-32 bg-lime-500 mt-12 mb-6 rounded-full opacity-60 group-hover:w-48 transition-all duration-700" />
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black italic">Varies by ICP, offer, and volume.</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto py-24 mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <div className="text-lime-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-lime-500/50" /> What we do
              </div>
              <h2 className="text-5xl md:text-7xl font-jakarta font-bold tracking-tight mb-8 text-white">Architecting Growth</h2>
              <p className="text-gray-400 text-xl leading-relaxed opacity-80">We don't just "set up tools." We engineer high-velocity revenue engines focused on precision and deliverability.</p>
            </div>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent mx-12 mb-10" />
          </div>
          <div className="grid md:grid-cols-3 gap-12">
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
        <section id="process" className="max-w-6xl mx-auto py-32 mb-32 relative">
          <div className="text-center mb-32">
            <div className="text-lime-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Methodology</div>
            <h2 className="text-5xl md:text-7xl font-jakarta font-bold tracking-tight mb-8">The Vector Blueprint</h2>
            <p className="text-gray-400 text-xl font-medium opacity-70 italic font-mono">A ruthless commitment to operational maturity.</p>
          </div>
          
          <div className="space-y-24 relative">
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-lime-500 via-lime-500/20 to-transparent hidden md:block" />
            {[
              { step: "01", title: "Audit", duration: "48h", desc: "Exhaustive review of current stack, deliverability health, and CRM bottlenecks. No stone left unturned.", icon: Search },
              { step: "02", title: "Build", duration: "2–4 weeks", desc: "Heavy lifting: Infrastructure setup, complex tool integration, and high-level n8n workflow engineering.", icon: Cpu },
              { step: "03", title: "Handover", duration: "Documentation + Training", desc: "Full ownership transfer. SOPs, technical documentation, and intensive team onboarding for long-term independence.", icon: Layers },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-12 group relative">
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
                    <span className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-lime-400 text-[10px] font-black uppercase tracking-[0.2em]">{item.duration}</span>
                  </div>
                  <p className="text-gray-400 text-xl leading-relaxed font-medium opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stack Section */}
        <section id="stack" className="max-w-7xl mx-auto py-32 mb-48">
          <div className="flex flex-col items-center text-center">
            <div className="text-lime-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Our Stack</div>
            <h2 className="text-5xl md:text-8xl font-jakarta font-bold tracking-tighter mb-20 text-white">The Revenue Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-6 mb-24 max-w-4xl">
              {[
                { name: 'n8n', icon: Workflow, color: 'text-lime-500', bg: 'hover:bg-lime-500/10' },
                { name: 'HubSpot', icon: Database, color: 'text-orange-500', bg: 'hover:bg-orange-500/10' },
                { name: 'Apollo', icon: Target, color: 'text-blue-500', bg: 'hover:bg-blue-500/10' },
                { name: 'Instantly', icon: Zap, color: 'text-purple-500', bg: 'hover:bg-purple-500/10' },
                { name: 'Clay', icon: Cpu, color: 'text-gray-100', bg: 'hover:bg-gray-100/10' },
                { name: 'ChatGPT', icon: MessageCircle, color: 'text-emerald-500', bg: 'hover:bg-emerald-500/10' },
                { name: 'Perplexity', icon: Search, color: 'text-cyan-500', bg: 'hover:bg-cyan-500/10' }
              ].map((tool) => (
                <div key={tool.name} className={`px-10 py-5 rounded-[24px] bg-white/5 border border-white/10 text-gray-300 font-bold ${tool.bg} hover:border-lime-500/50 hover:text-white transition-all duration-500 cursor-pointer flex items-center gap-4 shadow-xl group hover:scale-105`}>
                   <tool.icon size={22} className={`${tool.color} group-hover:scale-110 transition-transform`} />
                   <span className="font-mono">{tool.name}</span>
                </div>
              ))}
            </div>
            <p className="text-3xl text-gray-400 max-w-5xl leading-tight font-medium px-4">
              <span className="text-white font-black border-b-2 border-lime-500/40">n8n is the nervous system.</span> <br className="hidden md:block" />
              <span className="text-lime-500 font-black italic">HubSpot is the source of truth.</span> <br className="hidden md:block" />
              <span className="opacity-60 text-xl">Everything else is a modular endpoint we optimize for sheer output.</span>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-5xl mx-auto py-32 mb-48 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-lime-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="text-center mb-24">
            <div className="text-lime-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Clarifications</div>
            <h2 className="text-5xl md:text-7xl font-jakarta font-bold tracking-tight text-white">Intelligence Briefing</h2>
          </div>
          <div className="glass-card rounded-[50px] px-10 md:px-16 py-8 shadow-3xl">
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
              answer="Our core is the n8n + HubSpot ecosystem. We integrate these with advanced data layers like Clay and high-deliverability platforms like Instantly." 
            />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-7xl mx-auto py-32 mb-56 relative overflow-hidden rounded-[60px]">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-600/20 via-emerald-600/10 to-blue-600/20 animate-gradient-slow opacity-60 pointer-events-none" />
          <div className="relative z-10 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[60px] py-32 px-10 text-center flex flex-col items-center group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-opacity">
                <Workflow size={200} className="text-lime-500" />
            </div>
            <h2 className="text-6xl md:text-[100px] font-jakarta font-black mb-12 tracking-tighter leading-[0.85] text-white">
                Ready to <br /> Upgrade?
            </h2>
            <p className="text-2xl md:text-3xl text-gray-400 mb-20 max-w-2xl font-medium leading-tight">
                Stop battling friction. Start deploying architecture. Secure your technical audit today.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-10">
                 <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group relative px-20 py-8 bg-lime-500 text-black font-black text-2xl rounded-3xl transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_30px_70px_rgba(132,204,22,0.4)] overflow-hidden"
                 >
                   <span className="relative z-10">Book a Free GTM Audit</span>
                   <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 </button>
                 <a 
                  href="mailto:info@gtmvector.com"
                  className="px-14 py-8 bg-white/5 border border-white/10 rounded-3xl font-black text-xl hover:bg-white/10 transition-all flex items-center gap-4 group uppercase tracking-[0.2em] text-white"
                 >
                   <Mail size={28} className="group-hover:text-lime-500 group-hover:scale-125 transition-all" /> info@gtmvector.com
                 </a>
              </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-20 py-24 px-6 border-t border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col gap-6 items-center md:items-start">
            <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 relative group-hover:rotate-[360deg] transition-all duration-700">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M10 40 L40 70 L90 20 L45 20 L25 40 Z" fill="#84cc16" />
                    <path d="M10 40 L30 60 L15 60 Z" fill="#94a3b8" />
                </svg>
                </div>
                <span className="font-jakarta text-2xl font-black tracking-tighter uppercase text-white">
                GTM <span className="text-lime-500">Vector</span>
                </span>
            </div>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.4em] text-center md:text-left">© 2024 GTM Vector Architecture. Engineering for revenue.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-8">
              <div className="flex items-center gap-12 text-[11px] text-gray-500 font-black uppercase tracking-[0.3em]">
                <a href="#" className="hover:text-lime-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-lime-500 transition-colors">Terms of Intel</a>
                <a href="#" className="hover:text-lime-500 transition-colors flex items-center gap-2 group">
                    LinkedIn <Linkedin size={14} className="group-hover:scale-110" />
                </a>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">System Status: Optimal</span>
              </div>
          </div>
        </div>
      </footer>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-500" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-[#080808] border border-white/10 rounded-[50px] p-10 md:p-16 shadow-[0_0_100px_rgba(132,204,22,0.1)] animate-in zoom-in duration-700 overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-gray-800 opacity-20 pointer-events-none">
                 <Target size={200} />
             </div>
             <div className="w-16 h-1.5 bg-lime-500 mb-10 rounded-full" />
             <h3 className="text-5xl font-jakarta font-black mb-6 tracking-tighter text-white uppercase">Infiltration Form</h3>
             <p className="text-gray-400 mb-12 text-xl font-medium leading-relaxed opacity-80">
                Secure your slot. Our high-velocity analysis team reviews your architecture within a 48-hour window.
             </p>
             <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert('System update: Audit request dispatched.'); }}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                        <label className="block text-[10px] font-black text-gray-500 mb-4 uppercase tracking-[0.3em] group-focus-within:text-lime-500 transition-colors">Deployment Email</label>
                        <input type="email" required placeholder="name@company.com" className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-lime-500 transition-all text-white font-bold placeholder:text-gray-700" />
                    </div>
                    <div className="group">
                        <label className="block text-[10px] font-black text-gray-500 mb-4 uppercase tracking-[0.3em] group-focus-within:text-lime-500 transition-colors">Intelligence Link</label>
                        <input type="text" placeholder="linkedin.com/in/..." className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-lime-500 transition-all text-white font-bold placeholder:text-gray-700" />
                    </div>
                </div>
                <div className="group">
                   <label className="block text-[10px] font-black text-gray-500 mb-4 uppercase tracking-[0.3em] group-focus-within:text-lime-500 transition-colors">Personnel Count</label>
                   <div className="relative">
                        <select className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-lime-500 transition-all text-white font-bold appearance-none cursor-pointer">
                            <option className="bg-[#0a0a0a]">1-10 Employees</option>
                            <option className="bg-[#0a0a0a]">11-50 Employees</option>
                            <option className="bg-[#0a0a0a]">51-200 Employees</option>
                            <option className="bg-[#0a0a0a]">201+ Employees</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <ChevronDown size={18} />
                        </div>
                   </div>
                </div>
                <button type="submit" className="group relative w-full py-7 bg-lime-500 text-black font-black rounded-2xl transition-all duration-500 hover:scale-105 hover:bg-white text-2xl shadow-3xl overflow-hidden uppercase tracking-widest">
                    <span className="relative z-10">Confirm Deployment</span>
                </button>
             </form>
             <button 
              onClick={() => setIsModalOpen(false)}
              className="mt-10 text-gray-600 hover:text-white transition-all text-xs font-black uppercase tracking-[0.4em] w-full text-center hover:tracking-[0.6em]"
             >
               Abort Mission
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
