"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../../../lib/auth-client";

/* ─── Animated Logo ─── */
function SluuniLogo({ size = 56 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-2xl animate-morph"
        style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
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

/* ─── Password strength indicator ─── */
function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    if (!password) return { level: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (score <= 2) return { level: 2, label: "Fair", color: "bg-orange-500" };
    if (score <= 3) return { level: 3, label: "Good", color: "bg-yellow-500" };
    if (score <= 4) return { level: 4, label: "Strong", color: "bg-green-500" };
    return { level: 5, label: "Very Strong", color: "bg-emerald-400" };
  };

  const { level, label, color } = getStrength();
  if (!password) return null;

  return (
    <div className="space-y-1.5 animate-fade-in" style={{ animationDuration: "0.3s" }}>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i <= level ? color : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className={`text-[11px] font-medium ${
        level <= 1 ? "text-red-400" : level <= 2 ? "text-orange-400" : level <= 3 ? "text-yellow-400" : "text-green-400"
      }`}>
        {label}
      </p>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        setError(error.message || "Registration failed.");
        return;
      }

      router.push("/api/FrontEnd/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-navy-dark text-white px-4 overflow-hidden">
      {/* ── Background Effects ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />
        {/* Top-left glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet/8 blur-[120px] animate-pulse-glow" />
        {/* Bottom-right glow */}
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        {/* Center ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-[0.04]">
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="350" stroke="url(#rg)" strokeWidth="0.5" strokeDasharray="6 10" />
            <circle cx="400" cy="400" r="300" stroke="url(#rg)" strokeWidth="0.3" strokeDasharray="4 14" />
            <defs>
              <linearGradient id="rg" x1="0" y1="0" x2="800" y2="800">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 2 === 0 ? "#7c3aed" : "#3b82f6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-md animate-slide-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
        {/* Outer glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/20 via-violet/20 to-blue-600/20 blur-xl opacity-60" />

        <form
          onSubmit={handleRegister}
          className="relative glass rounded-3xl p-8 md:p-10 shadow-2xl shadow-violet/10 space-y-5"
        >
          {/* Logo + heading */}
          <div className="flex flex-col items-center text-center space-y-4">
            <SluuniLogo size={60} />
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Join <span className="text-gradient">SLUUNI</span>
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Create your account to start chatting
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4 animate-slide-up" style={{ animationDuration: "0.3s" }}>
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Name field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 tracking-wide uppercase">Full Name</label>
            <div className={`relative rounded-xl border transition-all duration-300 ${
              focused === "name"
                ? "border-violet/60 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                : "border-white/10 hover:border-white/20"
            }`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className={`w-4.5 h-4.5 transition-colors duration-300 ${focused === "name" ? "text-violet-light" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                required
                className="w-full bg-transparent pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none rounded-xl"
              />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 tracking-wide uppercase">Email</label>
            <div className={`relative rounded-xl border transition-all duration-300 ${
              focused === "email"
                ? "border-violet/60 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                : "border-white/10 hover:border-white/20"
            }`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className={`w-4.5 h-4.5 transition-colors duration-300 ${focused === "email" ? "text-violet-light" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                required
                className="w-full bg-transparent pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none rounded-xl"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400 tracking-wide uppercase">Password</label>
            <div className={`relative rounded-xl border transition-all duration-300 ${
              focused === "password"
                ? "border-violet/60 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                : "border-white/10 hover:border-white/20"
            }`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className={`w-4.5 h-4.5 transition-colors duration-300 ${focused === "password" ? "text-violet-light" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                required
                minLength={8}
                className="w-full bg-transparent pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none rounded-xl"
              />
            </div>
            <PasswordStrength password={password} />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input type="checkbox" required className="peer sr-only" />
              <div className="w-5 h-5 rounded-md border border-white/20 bg-white/5 peer-checked:bg-violet peer-checked:border-violet transition-all duration-300 flex items-center justify-center">
                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
              I agree to the{" "}
              <a href="#" className="text-violet-light hover:text-white transition-colors">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-violet-light hover:text-white transition-colors">Privacy Policy</a>
            </span>
          </label>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full py-4 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet via-violet-dark to-blue-600 transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(124,58,237,0.4)]" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-xs text-gray-600 font-medium">or sign up with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="group flex items-center justify-center gap-2.5 py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/5 hover:border-violet/30 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="group flex items-center justify-center gap-2.5 py-3 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/5 hover:border-violet/30 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 pt-1">
            Already have an account?{" "}
            <Link
              href="/api/FrontEnd/login"
              className="text-violet-light font-semibold hover:text-white transition-colors duration-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
