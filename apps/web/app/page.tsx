"use client"
import { api } from "~/trpc/server";
import { useState } from "react";

import {
  Github,
  Zap,
  GitPullRequest,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Bot,
  Columns,
  FileText,
  Shield,
  Sparkles,
  CircleDot,
  Menu,
  X,
} from "lucide-react";

/* ─────────────── Dot Grid Background ─────────────── */
function DotGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(113,201,206,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

/* ─────────────── Logo ─────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative size-7 flex items-center justify-center">
        <div className="absolute inset-0 rounded-lg bg-[#71C9CE]/20 blur-sm" />
        <Sparkles className="relative z-10 size-4 text-[#71C9CE]" />
      </div>
      <span className="text-white font-semibold text-lg tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
        Vaskora
      </span>
    </div>
  );
}

/* ─────────────── Nav ─────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Features", "Workflow", "Integrations", "Pricing"];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div
          className="flex items-center justify-between rounded-2xl px-5 py-3"
          style={{
            background: "rgba(6,6,8,0.75)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Logo />

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm text-[#a1a1aa] hover:text-white transition-colors duration-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/login">
            <button
              className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-white rounded-xl border border-white/10 transition-all duration-200 hover:border-white/20"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Sign In
            </button>
            </a>
            <button
              className="px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-90"
              style={{
                background: "#71C9CE",
                color: "#060608",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Get Early Access
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-[#a1a1aa]" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="mt-2 rounded-2xl px-5 py-4 flex flex-col gap-4"
            style={{
              background: "rgba(14,14,17,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {l}
              </a>
            ))}
            <button
              className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl mt-2"
              style={{ background: "#71C9CE", color: "#060608" }}
            >
              Get Early Access
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

/* ─────────────── Hero ─────────────── */
function Hero() {
  return (
    <section className="relative pt-36 pb-16 px-6 overflow-hidden">
      {/* Glow behind hero */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(113,201,206,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-8 border border-[#71C9CE]/25 bg-[#71C9CE]/5">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-[#71C9CE] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#71C9CE]" />
          </span>
          <span className="text-[#A6E3E9]" style={{ fontFamily: "Inter, sans-serif" }}>
            Now in private beta — AI for Engineering teams
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Tired of reviewing
          <br />
          so many PRs?{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #71C9CE 0%, #E3FDFD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Let AI handle it.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Vaskora is an autonomous software delivery platform. From feature request
          to PRD, Kanban tasks, to AI-powered code reviews. Build faster, review
          smarter.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "#71C9CE", color: "#060608", fontFamily: "Inter, sans-serif" }}
          >
            Start Building Free
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:bg-white/5 border border-white/12"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Github size={16} className="text-[#a1a1aa]" />
            See how it works
          </button>
        </div>

        {/* Dashboard mockup */}
        <div className="relative mx-auto max-w-5xl">
          {/* Glow behind image */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(113,201,206,0.22) 0%, transparent 65%)",
              filter: "blur(40px)",
              transform: "scale(1.05) translateY(20px)",
            }}
          />
          {/* Glassmorphism frame */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(113,201,206,0.2)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Fake title bar */}
            <div
              className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]"
              style={{ background: "rgba(14,14,17,0.9)" }}
            >
              <span className="size-3 rounded-full bg-[#3f3f46]" />
              <span className="size-3 rounded-full bg-[#3f3f46]" />
              <span className="size-3 rounded-full bg-[#3f3f46]" />
              <div className="mx-auto flex items-center gap-2 px-4 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <CircleDot size={11} className="text-[#71C9CE]" />
                <span className="text-xs text-[#52525b]" style={{ fontFamily: "Geist Mono, monospace" }}>
                  app.vaskora.dev/dashboard
                </span>
              </div>
            </div>

            {/* Dashboard body */}
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Dashboard Mockup ─────────────── */
function DashboardMockup() {
  const tasks = [
    { id: "VSK-041", title: "Auth rate-limiting middleware", status: "review", priority: "high" },
    { id: "VSK-042", title: "Redis cache layer for sessions", status: "in-progress", priority: "medium" },
    { id: "VSK-043", title: "Webhook delivery retry logic", status: "done", priority: "high" },
    { id: "VSK-044", title: "OpenAPI spec generation", status: "todo", priority: "low" },
  ];

  const statusColors: Record<string, string> = {
    review: "#A6E3E9",
    "in-progress": "#71C9CE",
    done: "#4fa8ad",
    todo: "#3f3f46",
  };

  return (
    <div
      className="grid grid-cols-[220px_1fr] min-h-[420px]"
      style={{ background: "#080810" }}
    >
      {/* Sidebar */}
      <div className="border-r border-white/[0.06] p-4 hidden sm:block">
        <div className="flex items-center gap-2 mb-6 px-2">
          <Sparkles size={14} className="text-[#71C9CE]" />
          <span className="text-xs font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>Vaskora</span>
        </div>
        {["Overview", "Tasks", "PRDs", "Reviews", "Integrations"].map((item, i) => (
          <div
            key={item}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 text-xs cursor-pointer transition-colors ${i === 1 ? "bg-[#71C9CE]/10 text-[#71C9CE]" : "text-[#52525b] hover:text-[#a1a1aa]"}`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {[Bot, Columns, FileText, GitPullRequest, Zap][i] && (
              <>
                {i === 0 && <Bot size={13} />}
                {i === 1 && <Columns size={13} />}
                {i === 2 && <FileText size={13} />}
                {i === 3 && <GitPullRequest size={13} />}
                {i === 4 && <Zap size={13} />}
              </>
            )}
            {item}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>Sprint 12 — Active</h3>
            <p className="text-xs text-[#52525b] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>4 tasks · 2 under AI review</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#71C9CE]/10 border border-[#71C9CE]/20">
            <Bot size={12} className="text-[#71C9CE]" />
            <span className="text-xs text-[#71C9CE] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>AI Agent active</span>
          </div>
        </div>

        <div className="space-y-2">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group"
            >
              <CheckCircle size={14} className={t.status === "done" ? "text-[#71C9CE]" : "text-[#3f3f46]"} />
              <span className="text-xs font-mono text-[#3f3f46]" style={{ fontFamily: "Geist Mono, monospace" }}>{t.id}</span>
              <span className="flex-1 text-xs text-[#a1a1aa] group-hover:text-white transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>{t.title}</span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  color: statusColors[t.status],
                  background: `${statusColors[t.status]}18`,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>

        {/* AI review panel */}
        <div
          className="mt-4 p-3.5 rounded-xl border border-[#71C9CE]/15 bg-[#71C9CE]/5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Bot size={12} className="text-[#71C9CE]" />
            <span className="text-xs font-semibold text-[#71C9CE]" style={{ fontFamily: "Inter, sans-serif" }}>QA Agent · VSK-041</span>
            <span className="ml-auto text-[10px] text-[#52525b]" style={{ fontFamily: "Geist Mono, monospace" }}>just now</span>
          </div>
          <p className="text-xs text-[#a1a1aa] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Found 2 edge cases in rate-limiting logic. Missing test for concurrent requests exceeding burst limit. PRD section 3.2 requires idempotent retry handling — not implemented.
          </p>
          <div className="flex gap-2 mt-2.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-medium border border-red-500/20" style={{ fontFamily: "Inter, sans-serif" }}>2 blocking issues</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 font-medium border border-yellow-500/20" style={{ fontFamily: "Inter, sans-serif" }}>1 suggestion</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Section Label ─────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs border border-[#71C9CE]/20 bg-[#71C9CE]/5 text-[#71C9CE] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </div>
  );
}

/* ─────────────── Product Thinking Section ─────────────── */
function ProductThinking() {
  return (
    <section id="features" className="relative py-36 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-24">
          <SectionLabel><Bot size={12} /> Product Thinking</SectionLabel>
          <h2
            className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            From vague idea to
            <br />
            <span className="text-[#a1a1aa] font-normal italic">engineered clarity.</span>
          </h2>
        </div>

        {/* Block 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-36">
          <div>
            <span className="text-xs font-mono text-[#71C9CE] mb-3 block" style={{ fontFamily: "Geist Mono, monospace" }}>01 / Discovery</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              Understand the request.{" "}
              <span className="italic text-[#A6E3E9]">Generate the PRD.</span>
            </h3>
            <p className="text-[#a1a1aa] leading-relaxed text-base mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Our AI Agent chats with your PMs to gather missing context, then instantly
              generates a structured Product Requirements Document — complete with
              acceptance criteria, edge cases, and technical constraints.
            </p>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm text-[#71C9CE] hover:text-[#A6E3E9] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              See demo <ChevronRight size={14} />
            </a>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(ellipse, rgba(113,201,206,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0a0a10" }}
            >
              <ChatDocMockup />
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visual first on desktop */}
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(ellipse, rgba(113,201,206,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0a0a10" }}
            >
              <KanbanMockup />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="text-xs font-mono text-[#71C9CE] mb-3 block" style={{ fontFamily: "Geist Mono, monospace" }}>02 / Planning</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              From document to{" "}
              <span className="italic text-[#A6E3E9]">actionable tasks.</span>
            </h3>
            <p className="text-[#a1a1aa] leading-relaxed text-base mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Watch as Vaskora automatically breaks down your PRD into engineering tasks
              and organizes them on a Kanban board — with estimates, dependencies, and
              acceptance criteria pre-filled.
            </p>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm text-[#71C9CE] hover:text-[#A6E3E9] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              See demo <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Chat + Doc Mockup ─────────────── */
function ChatDocMockup() {
  return (
    <div className="grid grid-cols-2 min-h-[300px] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Chat */}
      <div className="border-r border-white/[0.06] p-4 flex flex-col gap-3">
        <div className="text-[10px] text-[#52525b] mb-1">AI Agent</div>
        <div className="bg-[#71C9CE]/10 rounded-xl rounded-tl-sm px-3 py-2 text-[#A6E3E9] text-[11px]">
          What&apos;s the expected behavior when the token expires mid-session?
        </div>
        <div className="bg-white/[0.05] rounded-xl rounded-tr-sm px-3 py-2 text-[#a1a1aa] text-[11px] self-end">
          Redirect to login and preserve the current route for after auth.
        </div>
        <div className="bg-[#71C9CE]/10 rounded-xl rounded-tl-sm px-3 py-2 text-[#A6E3E9] text-[11px]">
          Got it. Generating PRD now...
        </div>
      </div>
      {/* Doc */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 mb-1">
          <FileText size={11} className="text-[#71C9CE]" />
          <span className="text-[10px] text-[#71C9CE] font-medium">PRD Generated</span>
        </div>
        <div className="text-[11px] text-white font-medium">Session Management v2</div>
        {["Overview", "Acceptance Criteria", "Edge Cases", "Tech Constraints"].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-[#71C9CE]/40 flex-shrink-0" />
            <span className="text-[10px] text-[#52525b]">{s}</span>
          </div>
        ))}
        <div className="mt-2 px-2 py-1.5 rounded-lg bg-[#71C9CE]/5 border border-[#71C9CE]/15 text-[10px] text-[#71C9CE]">
          4 sections · 12 criteria
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Kanban Mockup ─────────────── */
function KanbanMockup() {
  const cols = [
    { label: "Todo", color: "#3f3f46", tasks: ["Define token schema", "Write unit tests"] },
    { label: "In Progress", color: "#71C9CE", tasks: ["Auth middleware"] },
    { label: "Review", color: "#A6E3E9", tasks: ["Rate limiting logic"] },
  ];

  return (
    <div className="p-4 flex gap-3 min-h-[280px]">
      {cols.map((col) => (
        <div key={col.label} className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="size-2 rounded-full" style={{ background: col.color }} />
            <span className="text-[10px] font-medium text-[#a1a1aa]" style={{ fontFamily: "Inter, sans-serif" }}>{col.label}</span>
          </div>
          {col.tasks.map((t) => (
            <div
              key={t}
              className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] text-[11px] text-[#a1a1aa] hover:border-white/10 hover:bg-white/[0.05] transition-colors cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t}
            </div>
          ))}
          {col.label === "Todo" && (
            <div className="p-2.5 rounded-xl border border-dashed border-[#71C9CE]/20 text-[11px] text-[#71C9CE]/50 flex items-center gap-1.5">
              <Zap size={10} />
              AI added 2 tasks
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Implementation & Review ─────────────── */
function ImplementationReview() {
  const features = [
    {
      icon: <GitPullRequest size={18} className="text-[#71C9CE]" />,
      title: "Track Implementation",
      body: "Developers push code, Vaskora tracks every Pull Request in real time — linking commits to the original tasks and PRD.",
    },
    {
      icon: <Bot size={18} className="text-[#71C9CE]" />,
      title: "AI Code Review",
      body: "Our QA Agent reviews code against the original PRD, catching edge cases, missing test coverage, and spec deviations instantly.",
    },
    {
      icon: <Shield size={18} className="text-[#71C9CE]" />,
      title: "Human Approval",
      body: "Blocking issues are sent back automatically. Only perfect, AI-verified code reaches a human reviewer for final sign-off.",
    },
  ];

  return (
    <section id="integrations" className="relative py-36 px-6 overflow-hidden">
      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse, rgba(113,201,206,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <SectionLabel><Github size={12} /> GitHub Native</SectionLabel>
          <h2
            className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Connect GitHub.{" "}
            <span className="italic text-[#71C9CE]">Automate QA.</span>
          </h2>
          <p className="mt-4 text-[#a1a1aa] max-w-lg mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Vaskora sits inside your existing GitHub workflow. No migration. Just smarter reviews.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border border-white/[0.07] bg-[#0a0a10] hover:border-[#71C9CE]/25 transition-all duration-300 group"
            >
              <div className="size-10 rounded-xl bg-[#71C9CE]/10 flex items-center justify-center mb-4 group-hover:bg-[#71C9CE]/15 transition-colors">
                {f.icon}
              </div>
              <h4 className="text-white font-semibold text-base mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{f.title}</h4>
              <p className="text-[#71717a] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{f.body}</p>
            </div>
          ))}
        </div>

        {/* PR Review mockup */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(113,201,206,0.18) 0%, transparent 60%)",
              filter: "blur(50px)",
              transform: "scale(1.1)",
            }}
          />
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(113,201,206,0.18)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px rgba(0,0,0,0.5)",
            }}
          >
            <PRReviewMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PR Review Mockup ─────────────── */
function PRReviewMockup() {
  return (
    <div style={{ background: "#0a0a10" }}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <GitPullRequest size={15} className="text-[#71C9CE]" />
        <span className="text-sm font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>PR #841 — feat: add session token refresh</span>
        <span className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[11px] text-yellow-400 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
          <CircleDot size={10} /> AI Reviewing
        </span>
      </div>

      {/* Code diff */}
      <div className="p-6 grid md:grid-cols-[1fr_340px] gap-5">
        <div>
          <div className="rounded-xl overflow-hidden border border-white/[0.06]">
            {/* Diff header */}
            <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06] flex items-center gap-2">
              <span className="text-[10px] text-[#52525b]" style={{ fontFamily: "Geist Mono, monospace" }}>src/auth/token-service.ts</span>
            </div>
            {/* Diff lines */}
            <div className="p-4 space-y-0.5" style={{ fontFamily: "Geist Mono, monospace", fontSize: "12px" }}>
              {[
                { type: "neutral", code: "async refreshToken(token: string) {" },
                { type: "neutral", code: "  const payload = await verify(token);" },
                { type: "remove", code: "  if (!payload) return null;" },
                { type: "add", code: "  if (!payload) throw new UnauthorizedError();" },
                { type: "neutral", code: "  const newToken = await sign(payload);" },
                { type: "comment", code: "  // BUG: no expiry check on concurrent refresh" },
                { type: "neutral", code: "  return { token: newToken };" },
                { type: "neutral", code: "}" },
              ].map((l, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 px-3 py-0.5 rounded ${
                    l.type === "add"
                      ? "bg-[#71C9CE]/8 text-[#71C9CE]"
                      : l.type === "remove"
                      ? "bg-red-500/8 text-red-400"
                      : l.type === "comment"
                      ? "bg-yellow-500/5 text-yellow-400/70"
                      : "text-[#52525b]"
                  }`}
                >
                  <span className="select-none w-4 text-right opacity-40 flex-shrink-0">{i + 1}</span>
                  <span>{l.code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI comments */}
        <div className="flex flex-col gap-3">
          <div className="text-[10px] text-[#52525b] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>AI QA Agent · 3 comments</div>
          {[
            { severity: "blocking", line: "L6", msg: "Concurrent refresh requests can generate multiple valid tokens. PRD §4.1 requires single-use tokens." },
            { severity: "blocking", line: "L3→4", msg: "Silent null return replaced with exception — good. But UnauthorizedError is not in error catalog." },
            { severity: "suggestion", line: "L5", msg: "Consider caching the new token briefly to handle burst refresh scenarios gracefully." },
          ].map((c, i) => (
            <div
              key={i}
              className="rounded-xl p-3.5 border text-xs"
              style={{
                background: c.severity === "blocking" ? "rgba(239,68,68,0.05)" : "rgba(113,201,206,0.05)",
                borderColor: c.severity === "blocking" ? "rgba(239,68,68,0.2)" : "rgba(113,201,206,0.15)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: c.severity === "blocking" ? "rgba(239,68,68,0.15)" : "rgba(113,201,206,0.15)",
                    color: c.severity === "blocking" ? "#f87171" : "#71C9CE",
                  }}
                >
                  {c.severity}
                </span>
                <span className="text-[#52525b]" style={{ fontFamily: "Geist Mono, monospace" }}>{c.line}</span>
              </div>
              <p className="text-[#a1a1aa] leading-relaxed">{c.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Workflow Ribbon ─────────────── */
function WorkflowRibbon() {
  const steps = [
    "Request",
    "PRD",
    "Tasks",
    "Implementation",
    "AI Review",
    "Fixes",
    "Approval",
    "Release",
  ];

  return (
    <section id="workflow" className="py-20 px-6 overflow-x-auto">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <SectionLabel><Zap size={12} /> The Pipeline</SectionLabel>
          <h2
            className="text-2xl font-bold text-white tracking-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Every release. Fully automated.
          </h2>
        </div>

        <div className="flex items-center justify-between min-w-[640px] relative">
          {/* Track line */}
          <div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(113,201,206,0.3) 10%, rgba(113,201,206,0.3) 90%, transparent 100%)" }}
          />

          {steps.map((step, i) => (
            <div key={step} className="relative flex flex-col items-center gap-3 z-10">
              {/* Node */}
              <div
                className="size-9 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                style={{
                  background: i <= 4 ? "rgba(113,201,206,0.15)" : "#0e0e11",
                  borderColor: i <= 4 ? "#71C9CE" : "rgba(255,255,255,0.1)",
                  boxShadow: i <= 4 ? "0 0 16px rgba(113,201,206,0.3)" : "none",
                }}
              >
                <div
                  className="size-2.5 rounded-full"
                  style={{ background: i <= 4 ? "#71C9CE" : "#3f3f46" }}
                />
              </div>
              <span
                className="text-[11px] font-medium whitespace-nowrap"
                style={{
                  color: i <= 4 ? "#A6E3E9" : "#52525b",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Pricing ─────────────── */
function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      desc: "For solo devs exploring AI reviews.",
      features: ["1 GitHub repo", "50 AI reviews / mo", "Basic PRD generation", "Community support"],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/mo",
      desc: "For growing engineering teams.",
      features: ["Unlimited repos", "Unlimited AI reviews", "Full PRD + Task gen", "Priority support", "Custom AI rules"],
      cta: "Start Pro Trial",
      highlight: true,
      tag: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For orgs with advanced compliance needs.",
      features: ["SSO & SAML", "Dedicated AI instance", "Audit logs", "SLA guarantees", "Custom integrations"],
      cta: "Talk to Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-36 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <SectionLabel><Sparkles size={12} /> Pricing</SectionLabel>
          <h2
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Transparent pricing.
            <br />
            <span className="text-[#a1a1aa] font-normal italic">No surprises.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className="relative rounded-2xl p-7 flex flex-col"
              style={{
                background: p.highlight ? "#0c0c14" : "#0a0a10",
                border: p.highlight
                  ? "1px solid rgba(113,201,206,0.4)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: p.highlight
                  ? "0 0 40px rgba(113,201,206,0.12), inset 0 1px 0 rgba(113,201,206,0.1)"
                  : "none",
              }}
            >
              {p.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-semibold"
                    style={{ background: "#71C9CE", color: "#060608", fontFamily: "Inter, sans-serif" }}
                  >
                    {p.tag}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <span className="text-[11px] font-mono text-[#71C9CE] mb-1 block" style={{ fontFamily: "Geist Mono, monospace" }}>{p.name}</span>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>{p.price}</span>
                  {p.period && <span className="text-[#52525b] mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{p.period}</span>}
                </div>
                <p className="text-sm text-[#71717a]" style={{ fontFamily: "Inter, sans-serif" }}>{p.desc}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#a1a1aa]" style={{ fontFamily: "Inter, sans-serif" }}>
                    <CheckCircle size={14} className="text-[#71C9CE] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  background: p.highlight ? "#71C9CE" : "rgba(255,255,255,0.05)",
                  color: p.highlight ? "#060608" : "#a1a1aa",
                  border: p.highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Workflow", "Integrations", "Changelog", "Roadmap"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
  ];

  return (
    <footer className="border-t border-white/[0.06] px-6 pt-20 pb-10">
      <div className="mx-auto max-w-6xl">
        {/* Final CTA */}
        <div
          className="relative rounded-2xl px-10 py-14 mb-20 text-center overflow-hidden"
          style={{
            background: "#0a0a10",
            border: "1px solid rgba(113,201,206,0.18)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 120%, rgba(113,201,206,0.15) 0%, transparent 60%)",
            }}
          />
          <h2
            className="relative text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Ready to ship faster?
          </h2>
          <p className="relative text-[#a1a1aa] mb-8 max-w-md mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Join hundreds of engineering teams already using Vaskora to automate their delivery pipeline.
          </p>
          <button
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
            style={{ background: "#71C9CE", color: "#060608", fontFamily: "Inter, sans-serif" }}
          >
            Get Early Access <ArrowRight size={15} />
          </button>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo />
            <p className="mt-3 text-xs text-[#52525b] leading-relaxed max-w-[160px]" style={{ fontFamily: "Inter, sans-serif" }}>
              AI-powered software delivery for modern engineering teams.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h5 className="text-xs font-semibold text-white mb-4" style={{ fontFamily: "Inter, sans-serif" }}>{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/[0.05] gap-4">
          <span className="text-xs text-[#3f3f46]" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2025 Vaskora, Inc. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-[#71C9CE] animate-pulse" />
            <span className="text-xs text-[#52525b]" style={{ fontFamily: "Inter, sans-serif" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── App ─────────────── */
export default function App() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#060608", fontFamily: "Inter, sans-serif" }}
    >
      <DotGrid />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <ProductThinking />
        <ImplementationReview />
        <WorkflowRibbon />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

// export default async function Home() {
//   // const { status } = await api.health.getHealth.query();
//   return (
//     <main className="min-h-screen min-w-screen flex justify-center items-center">
//       <div>
//         <h1 className="text-3xl"></h1>
//         <h2></h2>
//       </div>
//     </main>
//   );
// }
