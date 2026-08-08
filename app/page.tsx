"use client";

import { useState, useEffect } from "react";
import Link from "next/link";


type Particle = {
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

 function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 40 }, () => ({
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
    }));

    setParticles(generated);
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background:
              i % 3 === 0
                ? "#7c3aed"
                : i % 3 === 1
                  ? "#3b82f6"
                  : "#a78bfa",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ─── Animated SVG Logo ─── */
function SluuniLogo({ size = 48 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-2xl animate-morph"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4z"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="80"
            strokeDashoffset="80"
            style={{ animation: "dash 2s ease forwards" }}
          />
          <circle cx="12" cy="14" r="2" fill="white" className="animate-scale-in delay-500" style={{ opacity: 0 }} />
          <circle cx="20" cy="14" r="2" fill="white" className="animate-scale-in delay-700" style={{ opacity: 0 }} />
          <path
            d="M11 20c1.5 2 3 3 5 3s3.5-1 5-3"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-fade-in delay-1000"
            style={{ opacity: 0 }}
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── Glowing Orb ─── */
function GlowingOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div className="w-72 h-72 rounded-full bg-violet/10 blur-[100px] animate-pulse-glow" />
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hey! I'm SLUUNI. Ask me anything...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-violet/8 to-transparent blur-3xl" />
      <GlowingOrb className="-top-20 -right-20" />
      <GlowingOrb className="bottom-0 -left-40" />

      {/* Rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-10">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="url(#grad1)" strokeWidth="0.5" strokeDasharray="8 8" />
          <circle cx="300" cy="300" r="240" stroke="url(#grad1)" strokeWidth="0.3" strokeDasharray="4 12" />
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="600" y2="600">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Orbiting dots */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-violet-light"
            style={{
              animation: `orbit ${8 + i * 4}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Badge */}
        <div className="animate-slide-up opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-violet-light tracking-wide uppercase">Now in Public Beta</span>
        </div>

        {/* Main heading */}
        <h1 className="animate-slide-up opacity-0 delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
          <span className="text-white">Meet </span>
          <span className="text-gradient relative">
            SLUUNI
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
              <path d="M0 6C40 2 60 2 100 4C140 6 160 2 200 6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <br />
          <span className="text-gradient-blue">Your AI Companion</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-slide-up opacity-0 delay-300 mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Experience the future of conversation. SLUUNI understands context, learns your preferences, and delivers
          intelligent responses that feel genuinely human.
        </p>

        {/* Chat preview */}
        <div className="animate-scale-in opacity-0 delay-500 mt-12 max-w-lg mx-auto">
          <div className="glass rounded-2xl p-5 shadow-2xl shadow-violet/10">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
              <SluuniLogo size={32} />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">SLUUNI</p>
                <p className="text-xs text-green-400">● Online</p>
              </div>
            </div>
            <div className="bg-navy/60 rounded-xl p-4 text-left">
              <p className="text-sm text-gray-300 font-mono">
                {displayText}
                <span className="inline-block w-0.5 h-4 bg-violet-light ml-0.5 animate-pulse" />
              </p>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="animate-slide-up opacity-0 delay-700 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/api/FrontEnd/register"
            className="group relative px-8 py-4 bg-gradient-to-r from-violet to-blue-600 rounded-2xl text-base font-semibold text-white shadow-xl shadow-violet/25 hover:shadow-violet/40 hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet to-blue-600 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
          </Link>
          <button className="px-8 py-4 rounded-2xl text-base font-semibold text-gray-300 border border-white/10 hover:border-violet/40 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="animate-fade-in opacity-0 delay-1000 mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "10M+", label: "Messages Sent" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-violet/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-violet-light rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ─── */
const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast",
    desc: "Sub-second response times powered by cutting-edge AI infrastructure. No waiting, just instant answers.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Multi-Platform",
    desc: "Use SLUUNI on web, mobile, desktop, or integrate via API. Your AI assistant, everywhere you go.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Privacy First",
    desc: "End-to-end encryption for all conversations. Your data stays yours — we never sell or share it.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Learns You",
    desc: "SLUUNI adapts to your communication style and preferences, becoming more helpful over time.",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "40+ Languages",
    desc: "Communicate in your language. SLUUNI supports 40+ languages with native-level fluency.",
    color: "from-violet to-purple-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Developer API",
    desc: "Powerful REST & WebSocket APIs. Build SLUUNI into your apps with just a few lines of code.",
    color: "from-indigo-400 to-blue-600",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
      <GlowingOrb className="top-0 right-0" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-violet-light glass-light mb-6">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Why Choose <span className="text-gradient">SLUUNI</span>?
          </h2>
          <p className="mt-5 text-gray-400 text-lg max-w-2xl mx-auto">
            Packed with powerful features designed to make your AI experience seamless and delightful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative glass rounded-2xl p-7 hover:border-violet/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/10"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="animate-shimmer absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Demo / Chat Preview Section ─── */
function DemoSection() {
  const messages = [
    { role: "user" as const, text: "Can you help me write a Python script to sort a list?" },
    { role: "ai" as const, text: "Of course! Here's a clean Python solution using the built-in sorted() function:" },
    { role: "ai" as const, text: "my_list = [3, 1, 4, 1, 5, 9]\nsorted_list = sorted(my_list)\nprint(sorted_list)  # [1, 1, 3, 4, 5, 9]" },
    { role: "user" as const, text: "What about sorting in reverse order?" },
    { role: "ai" as const, text: "Just add reverse=True:\nsorted(my_list, reverse=True)  # [9, 5, 4, 3, 1, 1]" },
  ];

  return (
    <section id="demo" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-violet-light glass-light mb-6">
            Live Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            See <span className="text-gradient">SLUUNI</span> in Action
          </h2>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            From coding assistance to creative writing, SLUUNI handles it all with remarkable intelligence and speed.
          </p>
          <div className="mt-8 space-y-4">
            {["Code generation & debugging", "Natural language understanding", "Creative content writing", "Data analysis & insights"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-violet/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-violet-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right chat mockup */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet/20 to-blue-600/20 rounded-3xl blur-2xl" />
          <div className="relative glass rounded-3xl p-6 shadow-2xl">
            {/* Chat header */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
              <SluuniLogo size={36} />
              <div>
                <p className="text-sm font-bold text-white">SLUUNI AI</p>
                <p className="text-xs text-gray-500">Always ready to help</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-violet to-violet-dark text-white"
                        : "bg-navy-light text-gray-300 border border-white/5"
                    }`}
                  >
                    <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="mt-5 flex items-center gap-3 p-3 rounded-xl bg-navy/80 border border-white/5">
              <input
                type="text"
                placeholder="Ask SLUUNI anything..."
                className="flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none"
                readOnly
              />
              <button className="w-9 h-9 rounded-lg bg-gradient-to-r from-violet to-blue-600 flex items-center justify-center flex-shrink-0 cursor-pointer">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section ─── */
function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Perfect to get started",
      features: ["50 messages/day", "Basic AI model", "Web access only", "Community support"],
      cta: "Start Free",
      href: "/register",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      desc: "For power users",
      features: ["Unlimited messages", "Advanced AI model", "All platforms", "Priority support", "Custom personas", "API access"],
      cta: "Get Pro",
      href: "/register",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      desc: "For teams & businesses",
      features: ["Everything in Pro", "Team management", "Custom training", "SLA guarantee", "Dedicated support", "On-premise option"],
      cta: "Contact Sales",
      href: "/register",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 px-6">
      <GlowingOrb className="-bottom-20 left-1/4" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-violet-light glass-light mb-6">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "bg-gradient-to-b from-violet/20 to-navy-light border-2 border-violet/40 shadow-2xl shadow-violet/20 scale-105"
                  : "glass hover:border-violet/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet to-blue-600 text-xs font-bold text-white">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-violet-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center w-full mt-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet to-blue-600 text-white hover:shadow-lg hover:shadow-violet/30"
                    : "border border-violet/30 text-violet-light hover:bg-violet/10"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Section ─── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "What makes SLUUNI different from other AI chatbots?", a: "SLUUNI uses a proprietary AI architecture that combines contextual understanding, adaptive learning, and real-time knowledge. Unlike generic chatbots, SLUUNI remembers your preferences and adapts its communication style to match yours." },
    { q: "Is my data safe with SLUUNI?", a: "Absolutely. All conversations are end-to-end encrypted. We never sell your data or use it to train models without your explicit consent. You can delete your data at any time with a single click." },
    { q: "Can I use SLUUNI for my business?", a: "Yes! Our Enterprise plan includes team management, custom AI training on your business data, API access, and dedicated support. Contact our sales team for a personalized demo." },
    { q: "How accurate are SLUUNI's responses?", a: "SLUUNI achieves industry-leading accuracy through continuous model improvements and real-time fact-checking. For critical use cases, SLUUNI always provides source citations and confidence levels." },
    { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your subscription at any time with no questions asked. You'll continue to have access until the end of your billing period." },
  ];

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-violet-light glass-light mb-6">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Got <span className="text-gradient">Questions</span>?
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet/30"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-violet-light flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-60 pb-6 px-6" : "max-h-0"
                }`}
              >
                <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Background effects */}
        <div className="absolute inset-0 -m-10 bg-gradient-to-r from-violet/10 via-blue-600/10 to-violet/10 rounded-3xl blur-3xl" />

        <div className="relative glass rounded-3xl p-12 md:p-16 overflow-hidden">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet via-blue-600 to-violet opacity-20 animate-gradient" style={{ backgroundSize: "200% 200%" }} />
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-8">
              <SluuniLogo size={80} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Ready to Chat with <span className="text-gradient">SLUUNI</span>?
            </h2>
            <p className="mt-5 text-gray-400 text-lg max-w-lg mx-auto">
              Join 50,000+ users already experiencing the future of AI conversation. Start free today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group px-10 py-4 bg-gradient-to-r from-violet to-blue-600 rounded-2xl text-base font-bold text-white shadow-xl shadow-violet/25 hover:shadow-violet/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Create Free Account
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/api/FrontEnd/login"
                className="px-10 py-4 rounded-2xl text-base font-semibold text-gray-300 border border-white/10 hover:border-violet/40 hover:text-white transition-all duration-300"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <SluuniLogo size={36} />
              <span className="text-xl font-bold text-gradient">SLUUNI</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your intelligent AI companion for every conversation.
            </p>
            <div className="flex gap-3 mt-6">
              {["X", "GH", "DC", "LI"].map((social) => (
                <div key={social} className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-xs text-gray-400 hover:text-violet-light hover:border-violet/40 transition-colors cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "API Docs", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Support", links: ["Help Center", "Contact", "Status", "Privacy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-violet-light transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2026 SLUUNI AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-violet-light transition-colors">Terms</a>
            <a href="#" className="text-xs text-gray-600 hover:text-violet-light transition-colors">Privacy</a>
            <a href="#" className="text-xs text-gray-600 hover:text-violet-light transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Landing Page ─── */
export default function HomePage() {
  return (
    <main className="relative bg-navy-dark min-h-screen overflow-hidden">
      <ParticleField />

      {/* Background gradient mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-navy-dark via-navy to-navy-dark" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-violet/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-600/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-5 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer">
              <SluuniLogo size={40} />
              <span className="text-2xl font-bold tracking-tight text-gradient">SLUUNI</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
              <a href="#features" className="hover:text-violet-light transition-colors duration-300">Features</a>
              <a href="#demo" className="hover:text-violet-light transition-colors duration-300">Demo</a>
              <a href="#pricing" className="hover:text-violet-light transition-colors duration-300">Pricing</a>
              <a href="#faq" className="hover:text-violet-light transition-colors duration-300">FAQ</a>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/api/FrontEnd/login"
                className="px-5 py-2.5 text-sm font-medium text-violet-light border border-violet/30 rounded-xl hover:bg-violet/10 hover:border-violet/60 transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                href="/api/FrontEnd/register"
                className="btn-glow px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet to-violet-dark rounded-xl hover:shadow-lg hover:shadow-violet/30 transition-all duration-300 relative z-10"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
