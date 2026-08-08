"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

/* ─── Animated SLUUNI Logo ─── */
function SluuniLogo({ size = 40 }: { size?: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-xl animate-morph"
        style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 32 32" fill="none">
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
          <path d="M11 20c1.5 2 3 3 5 3s3.5-1 5-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" className="animate-fade-in delay-1000" style={{ opacity: 0 }} />
        </svg>
      </div>
    </div>
  );
}

/* ─── Small avatar for messages ─── */
function AiAvatar() {
  return (
    <div className="relative flex-shrink-0 w-8 h-8">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet to-blue-600" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
          <circle cx="12" cy="14" r="2" fill="white" />
          <circle cx="20" cy="14" r="2" fill="white" />
          <path d="M11 20c1.5 2 3 3 5 3s3.5-1 5-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-dark to-violet flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );
}

/* ─── Suggestion chips for empty state ─── */
const suggestions = [
  { icon: "💡", text: "Explain quantum computing" },
  { icon: "✍️", text: "Write a poem about the stars" },
  { icon: "🐍", text: "Python sorting algorithms" },
  { icon: "🎨", text: "UI design best practices" },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const sendMessage = async (overrideMessage?: string) => {
    const message = (overrideMessage || input).trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="relative min-h-screen bg-navy-dark text-white flex flex-col overflow-hidden">
      {/* ── Background effects ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy-dark" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* ── Header ── */}
      <header className="relative z-20 glass border-b-0 border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SluuniLogo size={36} />
            <div>
              <h1 className="text-base font-bold tracking-tight text-gradient">SLUUNI</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[11px] text-gray-500">Online · AI Assistant</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* New chat button */}
            <button
              onClick={() => setMessages([])}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-400 border border-white/10 hover:text-white hover:border-violet/30 hover:bg-violet/5 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </button>
            {/* Settings */}
            <button className="w-9 h-9 rounded-xl border border-white/10 hover:border-violet/30 hover:bg-violet/5 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Chat Area ── */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

          {/* Empty state */}
          {messages.length === 0 && (
            <div className="min-h-[65vh] flex flex-col items-center justify-center text-center animate-fade-in">
              {/* Big logo */}
              <div className="relative mb-8">
                <div className="absolute inset-0 w-24 h-24 rounded-3xl bg-violet/20 blur-2xl animate-pulse-glow" />
                <SluuniLogo size={80} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                How can I <span className="text-gradient">help</span> you?
              </h2>

              <p className="text-gray-500 mt-3 max-w-md text-sm leading-relaxed">
                Ask me anything about programming, coding, technology, or general information. I&apos;m here to assist.
              </p>

              {/* Suggestion chips */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {suggestions.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => sendMessage(s.text)}
                    className="group glass rounded-xl px-4 py-3.5 text-left hover:border-violet/40 hover:bg-violet/5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{s.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-slide-up ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
                style={{ animationDuration: "0.35s" }}
              >
                {/* AI avatar */}
                {message.role === "assistant" && <AiAvatar />}

                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3.5 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-violet to-violet-dark text-white rounded-br-lg shadow-lg shadow-violet/10"
                      : "glass rounded-bl-lg"
                  }`}
                >
                  {message.role === "assistant" && (
                    <p className="text-[11px] font-semibold text-violet-light mb-1.5">SLUUNI</p>
                  )}
                  <p className={`text-sm leading-7 whitespace-pre-wrap ${
                    message.role === "user" ? "text-white" : "text-gray-300"
                  }`}>
                    {message.content}
                  </p>

                  {/* Action buttons on AI messages */}
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-1 mt-3 pt-2 border-t border-white/5">
                      {[
                        { icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z", label: "Copy" },
                        { icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5", label: "Like" },
                      ].map((action) => (
                        <button
                          key={action.label}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-violet-light hover:bg-violet/10 transition-all duration-200 cursor-pointer"
                          title={action.label}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={action.icon} />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* User avatar */}
                {message.role === "user" && <UserAvatar />}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-3 justify-start animate-fade-in" style={{ animationDuration: "0.3s" }}>
                <AiAvatar />
                <div className="glass rounded-2xl rounded-bl-lg px-5 py-4">
                  <p className="text-[11px] font-semibold text-violet-light mb-2">SLUUNI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-light/60 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-violet-light/60 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-violet-light/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* ── Input Area ── */}
      <div className="relative z-20">
        {/* Fade gradient above input */}
        <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-navy-dark to-transparent pointer-events-none" />

        <div className="glass border-t-0 border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
            <form onSubmit={handleSubmit}>
              <div className={`relative flex items-end rounded-2xl border transition-all duration-300 ${
                input ? "border-violet/40 shadow-[0_0_20px_rgba(124,58,237,0.1)]" : "border-white/10 hover:border-white/20"
              }`} style={{ background: "rgba(15, 23, 42, 0.5)" }}>
                {/* Attachment button */}
                <button
                  type="button"
                  className="absolute left-3 bottom-3.5 w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-violet-light hover:bg-violet/10 transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>

                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message SLUUNI..."
                  rows={1}
                  disabled={loading}
                  className="flex-1 bg-transparent resize-none outline-none pl-13 pr-14 py-4 text-sm text-white placeholder:text-gray-600 max-h-40 disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-3 bottom-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer disabled:cursor-not-allowed group"
                  style={{
                    background: input.trim() && !loading
                      ? "linear-gradient(135deg, #7c3aed, #3b82f6)"
                      : "rgba(255,255,255,0.05)",
                  }}
                >
                  {loading ? (
                    <svg className="w-4 h-4 text-gray-500 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg
                      className={`w-4 h-4 transition-all duration-300 ${
                        input.trim() ? "text-white group-hover:-translate-y-0.5" : "text-gray-600"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                  {/* Send button glow */}
                  {input.trim() && !loading && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet to-blue-600 blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                  )}
                </button>
              </div>
            </form>

            <p className="text-center text-[11px] text-gray-700 mt-3 flex items-center justify-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-500">Enter</kbd>
                <span>send</span>
              </span>
              <span className="text-white/10">·</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-500">Shift</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-500">Enter</kbd>
                <span>new line</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
