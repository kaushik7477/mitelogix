/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from './assets/mitelogix_main_logo.png';
import {
  Clock,
  Link as LinkIcon,
  Rocket,
  ChevronRight,
  LayoutDashboard,
  Database,
  ShieldCheck,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  Cpu,
  Globe,
  Code2,
  Zap,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  Wrench,
  BarChart3,
  Box,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import whatsappLogo from './assets/whatsapp_logo.png';
import image3 from './assets/image3.png';
import image7 from './assets/image7.png';
import image8 from './assets/image8.png';
import image10 from './assets/image10.png';
import image12 from './assets/image12.png';
import image14 from './assets/image14.png';

// --- Constants ---
const WHATSAPP_NUMBER = "917477310465/8617791812";
const EMAIL = "mitelogix@gmail.com";

// --- Components ---

const SchedulingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSchedule = () => {
    const message = `Hey, I want to book a meeting at ${date} ${time} for Mitelogix. I'm interested in your digital solutions.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-md w-full relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-accent">Schedule a Meeting</h3>

        {step === 1 ? (
          <div className="space-y-4">
            <p className="text-white/60 text-sm">Select a date for our consultation:</p>
            <input
              type="date"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent"
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            <button
              disabled={!date}
              onClick={() => setStep(2)}
              className="w-full py-4 bg-accent text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Select Time
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-white/60 text-sm">Select a time (IST):</p>
            <div className="grid grid-cols-3 gap-2">
              {["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${time === t ? 'bg-accent border-accent text-white' : 'bg-black border-white/10 text-white/60 hover:border-accent/50'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              disabled={!time}
              onClick={handleSchedule}
              className="w-full py-4 bg-accent text-white font-bold rounded-xl mt-4 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Schedule on WhatsApp
            </button>
            <button onClick={() => setStep(1)} className="w-full text-white/40 text-xs hover:text-white transition-colors">
              Back to Date Selection
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Navbar = ({ onOpenSchedule }: { onOpenSchedule: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="MITELOGIX"
            className="h-16 md:h-20 w-auto"
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Work', 'Pricing', 'Process', 'Blog', 'Team'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-widest font-bold text-white/50 hover:text-accent transition-colors">
              {item}
            </a>
          ))}
          <button
            onClick={onOpenSchedule}
            className="px-6 py-2.5 bg-accent text-white text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform purple-glow-box flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Schedule
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-white/70 hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <img src={logo} alt="MITELOGIX" className="h-12 w-auto" />
            <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white" aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            {['Services', 'Work', 'Pricing', 'Process', 'Blog', 'Team'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenSchedule();
              }}
              className="px-8 py-4 bg-accent text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
            >
              Schedule
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Floating3DIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] opacity-20"
      >
        <div className="w-24 h-24 bg-accent/30 rounded-3xl blur-xl" />
        <MessageCircle className="w-16 h-16 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[60%] right-[10%] opacity-20"
      >
        <div className="w-32 h-32 bg-accent/30 rounded-full blur-2xl" />
        <Zap className="w-20 h-20 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[80%] w-40 h-40 bg-accent/10 rounded-full blur-3xl"
      />
    </div>
  );
};

const Hero = ({ onOpenSchedule }: { onOpenSchedule: () => void }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <Floating3DIcons />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black tracking-[0.2em] mb-8">
            YOUR VISION, OUR LOGIC
          </div>
          <h1 className="text-6xl md:text-9xl font-black leading-[0.85] mb-8 tracking-tighter uppercase">
            WE BUILD <br />
            <span className="text-accent purple-glow">DIGITAL</span> <br />
            <span className="text-white">SOLUTION</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-lg leading-relaxed font-medium">
            Custom software that transforms how Indian businesses operate. From Vertical SaaS ERP to mobile apps — we turn complex problems into elegant solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onOpenSchedule}
              className="px-10 py-5 bg-accent text-white font-black uppercase tracking-[0.1em] rounded-2xl hover:scale-105 transition-all purple-glow-box flex items-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              Schedule a meeting
            </button>
            <a
              href="#work"
              className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.1em] rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3"
            >
              View Work
              <ArrowUpRight className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative w-full max-w-sm aspect-[4/5] mx-auto">
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full animate-pulse" />
            {/* Main Hero Image - Reduced size */}
            <img
              src={image3}
              alt="Mitelogix Tech"
              className="w-full h-full object-cover rounded-[40px] border border-white/10 transition-all duration-1000 shadow-2xl"
              referrerPolicy="no-referrer"
            />

            {/* Floating Elements on Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -left-12 p-4 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl purple-glow-box hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg text-accent"><Rocket className="w-5 h-5" /></div>
                <div>
                  <div className="text-[8px] font-black text-white/40 uppercase tracking-widest">Performance</div>
                  <div className="text-xs font-bold">99.9% UPTIME</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute bottom-4 right-4 md:-bottom-6 md:-right-12 p-4 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl purple-glow-box"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg text-accent"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <div className="text-[8px] font-black text-white/40 uppercase tracking-widest">Security</div>
                  <div className="text-xs font-bold">END-TO-END ENCRYPTION</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "VERTICAL SAAS ERP",
      desc: "Industry-specific ERP systems built from the ground up. We understand your domain deeply — not just software.",
      tags: ["Rice Mill", "Inventory", "GST Ready", "Custom"],
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "WEB DEVELOPMENT",
      desc: "Fast, modern, and responsive websites that work for your business — landing pages, portals, e-commerce.",
      tags: ["React", "Node.js", "Responsive", "SEO"],
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "MOBILE APPS",
      desc: "Native-quality Android apps that your field teams and customers actually want to use every day.",
      tags: ["Android", "React Native", "Offline"],
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: "INVENTORY MANAGEMENT",
      desc: "Real-time stock tracking, low-stock alerts, supplier management — built for your specific workflow.",
      tags: ["Real-time", "Multi-location", "Reports"],
      icon: <Box className="w-6 h-6" />
    },
    {
      title: "BUSINESS INTELLIGENCE",
      desc: "Turn your data into decisions. Dashboards, analytics, and reports that give you real business insight.",
      tags: ["Dashboards", "Analytics", "Exports"],
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: "AMC & SUPPORT",
      desc: "We don't disappear after delivery. Annual maintenance, feature updates, and bug fixes — always here.",
      tags: ["24/7 Support", "Updates", "Training"],
      icon: <Wrench className="w-6 h-6" />
    }
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">What We Do</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">OUR <span className="text-accent">SERVICES</span></h2>
          <p className="mt-6 text-white/40 max-w-xl text-lg">End-to-end digital solutions tailored for Indian businesses — from ideation to deployment.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="p-10 rounded-[32px] bg-zinc-900/50 border border-white/5 hover:border-accent/30 transition-all group">
              <div className="mb-8 p-4 bg-accent/10 rounded-2xl w-fit text-accent group-hover:bg-accent group-hover:text-white transition-all">
                {s.icon}
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(t => (
                  <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechArsenal = () => {
  const row1 = ["JavaScript", "TypeScript", "Python", "PHP", "React.js", "Next.js", "VITE.JS", "Tailwind CSS", "HTML", "CSS"];
  const row2 = ["Node.js", "NestJS", "Django", "FastAPI", "MongoDB", "MySQL", "Firebase", "Kotlin", "Java", "Dart"];

  const getTechIcon = (name: string) => {
    const iconProps = { className: "w-8 h-8 text-accent mb-2 group-hover:scale-110 transition-transform" };
    if (name.includes("React") || name.includes("Next") || name.includes("VITE")) return <Zap {...iconProps} />;
    if (name.includes("Node") || name.includes("Nest") || name.includes("Django") || name.includes("FastAPI")) return <Cpu {...iconProps} />;
    if (name.includes("Mongo") || name.includes("MySQL") || name.includes("Firebase")) return <Database {...iconProps} />;
    if (name.includes("Tailwind") || name.includes("HTML") || name.includes("CSS") || name.includes("Globe")) return <Globe {...iconProps} />;
    return <Code2 {...iconProps} />;
  };

  return (
    <section className="py-32 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-4xl font-black uppercase tracking-widest text-center">Our Technical <span className="text-accent">Arsenal</span></h2>
      </div>

      <div className="space-y-12">
        <div className="flex gap-8 animate-scroll-left whitespace-nowrap">
          {[...row1, ...row1].map((tech, i) => (
            <div key={i} className="group flex flex-col items-center justify-center min-w-[160px] px-8 py-6 bg-transparent border border-accent/40 rounded-2xl hover:border-accent transition-all cursor-default">
              {getTechIcon(tech)}
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-8 animate-scroll-right whitespace-nowrap">
          {[...row2, ...row2].map((tech, i) => (
            <div key={i} className="group flex flex-col items-center justify-center min-w-[160px] px-8 py-6 bg-transparent border border-accent/40 rounded-2xl hover:border-accent transition-all cursor-default">
              {getTechIcon(tech)}
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "RICEMILL PRO ERP",
      tag: "FLAGSHIP PRODUCT",
      desc: "A complete end-to-end ERP purpose-built for rice mill operations in India. Handles the full business lifecycle from paddy inward to final sale — with GST compliance built in.",
      features: [
        "Paddy Inward & Stock Management",
        "Production & Milling Tracking",
        "GST-Compliant Accounts & Ledger",
        "Farmer Ledger with KG Quantity Tracking",
        "Real-time P&L, Day Book & Reports"
      ],
      img: image8
    },
    {
      title: "INVENTORY SUITE",
      tag: "SAAS PRODUCT",
      desc: "Multi-location inventory management with real-time stock alerts, supplier tracking, and automated reorder.",
      features: ["Real-time Stock Levels", "Barcode & QR Scanning", "Supplier Management"],
      img: image7
    },
    {
      title: "BUSINESS WEBSITES",
      tag: "WEB PLATFORM",
      desc: "Professional, mobile-first websites for local businesses — fast, SEO-optimized, easy to manage.",
      features: ["Responsive & Mobile-First", "SEO Optimized", "Easy Content Management"],
      img: image12
    },
    {
      title: "CUSTOM MOBILE HUB",
      tag: "MOBILE APP",
      desc: "Dedicated internal apps for field teams to track sales and deliveries in real-time.",
      features: ["Offline Sync", "Location Tracking", "Instant Notifications"],
      img: image10
    }
  ];

  return (
    <section id="work" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-5xl font-black uppercase tracking-tighter">Solutions We Have <span className="text-accent">Delivered</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <div key={i} className="bg-zinc-900 border border-white/5 rounded-[40px] overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-accent text-[10px] font-black tracking-widest rounded-full">
                  {p.tag}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-black mb-4 tracking-tight">{p.title}</h3>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">{p.desc}</p>
                <ul className="space-y-3">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-xs font-bold text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Discovery Call", desc: "Understanding your pain points and business goals." },
    { title: "Proposal & Plan", desc: "Detailed roadmap with tech stack and timelines." },
    { title: "Build & Review", desc: "Agile development with regular demos and feedback." },
    { title: "Launch & Support", desc: "Seamless deployment and ongoing maintenance." }
  ];

  return (
    <section className="py-32 bg-accent/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">How We Work</span>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter">OUR <span className="text-accent">PROCESS</span></h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && <div className="hidden md:block absolute top-8 left-full w-full h-px bg-white/5 -translate-x-1/2" />}
              <div className="w-16 h-16 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-2xl font-black text-accent mb-8 relative z-10">
                {i + 1}
              </div>
              <h4 className="text-lg font-black mb-3 uppercase tracking-tight">{s.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Founders = () => {
  const founders = [
    {
      name: "KOUSHIK HALDER",
      role: "FOUNDER & LEAD DEVELOPER",
      desc: "Full-stack developer with deep expertise in ERP systems, business logic, and scalable architecture. Passionate about solving real operational problems through clean code.",
      phone: "+91 74773 10465",
      initials: "KH"
    },
    {
      name: "ARKO SARKAR",
      role: "CO-FOUNDER & TECH LEAD",
      desc: "full stack developer turning ideas into scalable products,building saas solutions for indian SMEs with focus with focus on real time system and automation.specializes in problem solving",
      phone: "+91 86177 91812",
      initials: "AS"
    }
  ];

  return (
    <section id="team" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">The Team</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">MEET THE <span className="text-accent">FOUNDERS</span></h2>
          <p className="mt-6 text-white/40 max-w-xl text-lg">Two engineers from Barasat — building practical software for real Indian businesses.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {founders.map((f, i) => (
            <div key={i} className="p-12 rounded-[40px] bg-zinc-900 border border-white/5 hover:border-accent/30 transition-all">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 bg-gradient-to-br from-accent to-purple-900 rounded-full flex items-center justify-center text-3xl font-black text-white purple-glow-box">
                  {f.initials}
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{f.name}</h3>
                  <p className="text-accent text-xs font-bold uppercase tracking-widest mt-1">{f.role}</p>
                </div>
              </div>
              <p className="text-white/50 leading-relaxed mb-10">{f.desc}</p>
              <div className="flex items-center gap-3 text-white/40 font-bold">
                <Phone className="w-5 h-5 text-accent" />
                {f.phone}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex items-center gap-4 text-white/20 text-sm font-bold">
          <MapPin className="w-5 h-5 text-red-500" />
          Barasat, West Bengal — 700124 · Serving clients Pan-India
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = ["PayPal", "PhonePe", "Twilio", "MSG91", "WhatsApp Business API", "Firebase", "Shiprocket", "Delhivery", "Cloudinary", "Razorpay", "Google Ads", "AWS"];

  return (
    <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
      <p className="text-center text-[20px] font-black uppercase tracking-[0.5em] text-white/400 mb-12">Trusted Integrations & Partners</p>
      <div className="flex gap-16 animate-infinite-scroll whitespace-nowrap">
        {[...partners, ...partners].map((p, i) => (
          <div key={i} className="text-3xl font-black italic text-white/40 hover:text-accent transition-all cursor-default uppercase tracking-tighter">
            {p}
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-32 pb-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 mb-24">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Ready to scale?</h2>
            <p className="text-xl text-white/60 mb-12 max-w-md leading-relaxed">
              Tell us about your business problem. We'll tell you exactly how we can solve it — honestly and affordably.
            </p>

            <div className="space-y-8">
              <div className="flex flex-wrap gap-4">
                <a href="tel:+917477310465/8617791812" className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 hover:border-accent transition-all group">
                  <Phone className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold">+91 74773 10465</span>
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="flex items-center gap-3 px-6 py-4 bg-accent/10 rounded-2xl border border-accent/20 hover:bg-accent transition-all group">
                  <MessageCircle className="w-6 h-6 text-accent group-hover:text-white group-hover:scale-110 transition-transform" />
                  <span className="font-bold">WhatsApp Us</span>
                </a>
              </div>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
                <Mail className="w-5 h-5 text-accent" />
                <span className="font-bold">{EMAIL}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent">Company</h4>
              <ul className="space-y-4 text-sm text-white/40 font-bold">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent">Legal</h4>
              <ul className="space-y-4 text-sm text-white/40 font-bold">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent">Connect</h4>
              <ul className="space-y-4 text-sm text-white/40 font-bold">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="MITELOGIX" className="h-16 md:h-20 opacity-50" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">mitelogix.in</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">© 2025 MITELOGIX. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

const WhoWeAre = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-32 relative overflow-hidden bg-black cursor-none"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Flashlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, rgba(159, 41, 255, 0.15), transparent 80%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center purple-glow-box rotate-12">
              <Zap className="text-white w-8 h-8" />
            </div>
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
            WHO <span className="text-accent">WE ARE?</span>
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-white/80 max-w-3xl mx-auto leading-tight">
            The Light That <span className="text-accent italic">Guides You</span> to The Summit
          </p>
        </motion.div>

        {/* Floating 3D Icons (Simulated) */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 md:top-20 left-10 md:left-40"
        >
          <div className="p-4 bg-accent/20 backdrop-blur-xl border border-accent/30 rounded-2xl purple-glow-box">
            <MessageCircle className="w-10 h-10 text-accent" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-4 md:bottom-20 right-4 md:right-40"
        >
          <div className="p-4 bg-accent/20 backdrop-blur-xl border border-accent/30 rounded-2xl purple-glow-box">
            <Zap className="w-10 h-10 text-accent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Projects Delivered", value: "150+" },
    { label: "Happy Clients", value: "80+" },
    { label: "Lines of Code", value: "2M+" },
    { label: "Coffee Consumed", value: "∞" }
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-6xl font-black text-accent mb-2 purple-glow">{s.value}</div>
              <div className="text-xs font-black uppercase tracking-widest text-white/40">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "KAUSTAV SINGHA", role: "RICE MILL OWNER", text: "Mitelogix transformed our manual operations into a seamless digital workflow. Their ERP is a game-changer." },
    { name: "CHAMPA KHANAM", role: "OWNER OF COLORS LTD.", text: "The WEB APP they built for our field team is intuitive and robust. Highly recommended for custom solutions." },
    { name: "ARIJIT ROY", role: "FOUNDER OF GOLPOCHOBI", text: "Professional, agile, and technically sound. They delivered exactly what we needed, on time and within budget." }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter">What Our <span className="text-accent">Clients Say</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-10 rounded-[40px] bg-zinc-900 border border-white/5 hover:border-accent/30 transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Zap key={i} className="w-4 h-4 text-accent fill-accent" />)}
              </div>
              <p className="text-white/60 italic mb-8 leading-relaxed">"{r.text}"</p>
              <div>
                <div className="font-black text-white">{r.name}</div>
                <div className="text-xs font-bold text-accent uppercase tracking-widest">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "How long does a typical ERP project take?", a: "Depending on complexity, it usually takes 1-3 months from discovery to launch." },
    { q: "Do you provide post-launch support?", a: "Yes, we offer comprehensive AMC and 24/7 support packages to ensure your systems run smoothly." },
    { q: "Can you integrate with existing tools?", a: "Absolutely. We specialize in building bridges between fragmented systems using custom APIs." }
  ];

  return (
    <section className="py-32 bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 text-center">Frequently Asked <span className="text-accent">Questions</span></h2>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <details key={i} className="group p-6 rounded-2xl bg-zinc-900 border border-white/5 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg list-none">
                {f.q}
                <ChevronRight className="w-5 h-5 text-accent group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-white/40 leading-relaxed text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("ERP Solution");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Replace with your Formspree form endpoint
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojkwapd";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill out name, email, and message.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          project,
          message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setProject("ERP Solution");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Get In Touch</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
              LET'S START <br />
              <span className="text-accent">SOMETHING BIG</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-md leading-relaxed">
              Whether you're a startup or an enterprise, we have the expertise to build your next digital masterpiece.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-zinc-900 border border-white/5 rounded-3xl hover:border-accent/30 transition-all">
                <div className="p-3 bg-accent/10 rounded-xl text-accent"><Mail className="w-6 h-6" /></div>
                <div>
                  <div className="text-xs font-black text-white/40 uppercase tracking-widest">Email Us</div>
                  <div className="text-lg font-bold">{EMAIL}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-zinc-900 border border-white/5 rounded-3xl hover:border-accent/30 transition-all">
                <div className="p-3 bg-accent/10 rounded-xl text-accent"><Phone className="w-6 h-6" /></div>
                <div>
                  <div className="text-xs font-black text-white/40 uppercase tracking-widest">Call Us</div>
                  <div className="text-lg font-bold">+91 74773 10465 / 86177 91812</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[40px] purple-glow-box">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Email Address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all"
                    placeholder="your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Project Type</label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all"
                >
                  <option>ERP Solution</option>
                  <option>Web Application</option>
                  <option>Mobile App</option>
                  <option>Digital Marketing</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all h-32 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-accent text-white font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all purple-glow-box disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : status === "success" ? "Message Sent ✅" : "Send Message"}
              </button>
              {status === "error" && (
                <p className="text-xs text-red-300">Something went wrong. Please try again later.</p>
              )}
              {status === "success" && (
                <p className="text-xs text-green-300">Thanks! We'll reach out to you shortly.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedCaseStudy = () => {
  return (
    <section className="py-32 bg-zinc-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-accent" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Featured Case Study</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-video overflow-hidden rounded-[40px] border border-white/10">
              <img
                src={image14}
                alt="FinTech Platform"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-accent/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/30">FinTech</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Enterprise</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
              REVOLUTIONIZING <br />
              <span className="text-accent">TECHNICAL SERVICE AND PRODUCTS WITH REAL TIME ANALYTICS</span>
            </h3>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Discover how we built a custom ERP solution for a leading rice mill, streamlining their operations and boosting efficiency by 40%.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="text-3xl font-black text-accent mb-1"></div>
                <div className="text-xs font-black text-white/40 uppercase tracking-widest"></div>
              </div>
              <div>
                <div className="text-3xl font-black text-accent mb-1"></div>
                <div className="text-xs font-black text-white/40 uppercase tracking-widest"></div>
              </div>
            </div>

            {/* <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all" /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    {
      title: "The Future of Vertical SaaS in India",
      category: "Insights",
      date: "Mar 10, 2024",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      href: "https://lollypop.design/blog/2025/june/vertical-saas/"
    },
    {
      title: "Scaling ERP Systems for 10x Growth",
      category: "Engineering",
      date: "Mar 05, 2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      href: "https://10xerp.com/blog/scaling-erp-as-you-grow-when-and-how-to-adjust-configurations-for-expanding-operations/"
    },
    {
      title: "Why UX is the Secret to B2B Success",
      category: "Design",
      date: "Feb 28, 2024",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop",
      href: "https://lollypop.design/blog/2025/may/ui-ux-in-b2b-digital-transformation/"
    }
  ];

  return (
    <section id="blog" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Our Journal</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              LATEST <span className="text-accent">INSIGHTS</span>
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-white/60 hover:text-accent transition-colors font-black uppercase tracking-widest text-xs">
            View All Posts <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.href ?? "#"}
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-3xl mb-6 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">{post.date}</div>
                <h4 className="text-xl font-bold group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h4>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Careers = () => {
  const positions = [
    { title: "Senior Fullstack Engineer", type: "Full-time", location: "Hiring close" },
    { title: "Product Designer (UI/UX)", type: "Full-time", location: "Hiring close" },
    { title: "Backend Architect", type: "Full-time", location: "Hiring close" }
  ];

  return (
    <section className="py-32 bg-accent/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Careers</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
              JOIN THE <br />
              <span className="text-accent">REVOLUTION</span>
            </h2>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              We're looking for the brightest minds to help us build the future of digital solutions in India.
            </p>
            <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white transition-all">
              View All Openings
            </button>
          </div>

          <div className="space-y-4">
            {positions.map((job, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                className="p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl flex justify-between items-center group cursor-pointer hover:border-accent/30 transition-all"
              >
                <div>
                  <h4 className="text-xl font-bold mb-1">{job.title}</h4>
                  <div className="flex gap-4 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span className="text-red-400">{job.location}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="p-16 bg-zinc-900 border border-white/10 rounded-[60px] relative overflow-hidden text-center purple-glow-box">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              STAY IN THE <span className="text-accent">LOOP</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              Get the latest insights on digital transformation and vertical SaaS delivered to your inbox.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-black border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent transition-all"
              />
              <button className="px-8 py-4 bg-accent text-white font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Preloader = () => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setComplete(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 border-2 border-accent/20 rounded-full animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-10 h-10 text-accent purple-glow" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-black tracking-[0.5em] text-white uppercase mb-2">MITELOGIX</h2>
            <div className="w-48 h-px bg-white/10 mx-auto relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-accent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[1000] pointer-events-none">
      <motion.div
        className="h-full bg-accent purple-glow"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Plan",
      desc: "Perfect for small local businesses looking to establish a digital presence.",
      features: ["Responsive Website", "Access From Anywhere", "WhatsApp Integration", "1 Month Free Support"],
      accent: false
    },
    {
      name: "Business",
      price: "Plan",
      desc: "Comprehensive solutions for growing enterprises needing custom workflows.",
      features: ["Custom Admin Panel", "SaaS Platform", "Advanced Analytics", "Priority Support"],
      accent: true
    },
    {
      name: "Enterprise",
      price: "Plan",
      desc: "Full-scale digital transformation for large organizations with complex needs.",
      features: ["Multi-platform Suite", "Dedicated Architect", "Cloud Infrastructure", "24/7 AMC Support"],
      accent: false
    }
  ];

  return (
    <section id="pricing" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Investment</span>
            <div className="w-12 h-px bg-accent" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">OUR <span className="text-accent">PACKAGES</span></h2>
          <p className="mt-6 text-white/40 max-w-xl mx-auto text-lg">Transparent value-based pricing tailored to your specific business requirements.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-12 rounded-[40px] border transition-all ${plan.accent ? 'bg-accent/10 border-accent/50 purple-glow-box' : 'bg-zinc-900/50 border-white/5 hover:border-accent/30'}`}
            >
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{plan.name}</h3>
              <div className="text-4xl font-black text-accent mb-6">{plan.price}</div>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">{plan.desc}</p>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/60">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${plan.accent ? 'bg-accent text-white hover:scale-105' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                Get a Quote
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Culture = () => {
  const images = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"
  ];

  return (
    <section className="py-32 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-px bg-accent" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Our Vibe</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">LIFE AT <span className="text-accent">MITELOGIX</span></h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
            className="aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10"
          >
            <img src={img} alt="Office Culture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          href="https://wa.me/917477310465"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-8 right-8 z-[1000] w-25 h-25 bg-transparent rounded-full flex items-center justify-center hover:scale-110 transition-all"
        >
          <img src={whatsappLogo} alt="WhatsApp" className="w-50px h-50px" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 2.5 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999]"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
};

export default function App() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <div className="bg-black text-white selection:bg-accent selection:text-white min-h-screen">
      <Preloader />
      <ScrollProgressBar />
      <CustomCursor />
      <BackToTop />
      <Navbar onOpenSchedule={() => setIsScheduleOpen(true)} />
      <main>
        <Hero onOpenSchedule={() => setIsScheduleOpen(true)} />
        <WhoWeAre />
        <Services />
        <TechArsenal />
        <FeaturedCaseStudy />
        <Portfolio />
        <Process />
        <Partners />
        <Pricing />
        <Blog />
        <Founders />
        <Culture />
        <Careers />
        <Testimonials />
        <FAQ />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
      <SchedulingModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left { animation: scroll-left 20s linear infinite; }
        .animate-scroll-right { animation: scroll-right 20s linear infinite; }
        .animate-infinite-scroll { animation: infinite-scroll 30s linear infinite; }

        /* Make the tech carousel scroll a bit faster on tablet and mobile for better pacing */
        @media (max-width: 1024px) {
          .animate-scroll-left { animation-duration: 10s; }
          .animate-scroll-right { animation-duration: 10s; }
        }
        @media (max-width: 640px) {
          .animate-scroll-left { animation-duration: 10s; }
          .animate-scroll-right { animation-duration: 10s; }
        }

        /* Hide default cursor globally */
        body { cursor: none; }
        a, button, select, input, textarea { cursor: none !important; }
      `}</style>
    </div>
  );
}
