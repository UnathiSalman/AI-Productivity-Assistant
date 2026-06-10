# Aether AI — Workplace Productivity Assistant

A modern SaaS web application that brings AI-powered productivity to the workplace. Aether AI helps you draft emails, summarize meetings, plan tasks, conduct research, and chat with an AI assistant — all from one elegant, responsive dashboard.

> Built for **Your Majesty Unathi Salman** ✨

---

## ✨ Features

- **📊 Dashboard** — KPI cards, AI usage statistics, and a live recent-activity feed.
- **✉️ Smart Email Generator** — Generate polished emails by specifying purpose, recipient, and tone.
- **📝 Meeting Notes Summarizer** — Turn raw transcripts into executive summaries, decisions, action items, and next steps.
- **✅ AI Task Planner** — Convert any goal into prioritized tasks, timelines, milestones, and risk assessments.
- **🔍 AI Research Assistant** — Generate research reports with findings, opportunities, risks, and references.
- **💬 AI Chatbot** — Real-time conversational assistant with suggested prompts and typing indicators.
- **🌓 Light & Dark Mode** — Persistent theme switching with a warm coral-to-amber palette designed to inspire.
- **📱 Fully Responsive** — Mobile-first design with a collapsible sidebar and adaptive layouts.
- **🛡️ Responsible AI Disclaimer** — Shown on every AI-generated page to encourage human review.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TanStack Start (SSR-ready)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with semantic design tokens
- **UI Components:** shadcn/ui + Radix primitives
- **Routing:** TanStack Router (file-based)
- **Data:** TanStack Query
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **Build Tool:** Vite 7
- **Runtime:** Bun

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (or Node.js 20+ with npm/pnpm)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd aether-ai

# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
bun run build
bun run start
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Sidebar, topbar, page headers
│   ├── ui/               # shadcn/ui primitives
│   ├── ai-disclaimer.tsx # Responsible AI notice
│   └── theme-provider.tsx
├── lib/
│   ├── mock-ai.ts        # Mock AI response generators
│   └── utils.ts
├── routes/               # File-based routes (TanStack)
│   ├── __root.tsx        # App shell
│   ├── index.tsx         # Dashboard
│   ├── email.tsx
│   ├── meetings.tsx
│   ├── tasks.tsx
│   ├── research.tsx
│   └── chat.tsx
└── styles.css            # Tailwind + design tokens
```

---

## 🎨 Design System

Aether AI uses a warm, energizing **coral-to-amber gradient** palette designed to inspire creativity and focus. All colors are defined as semantic CSS tokens in `src/styles.css` and automatically adapt to light/dark mode.

---

## 🤖 AI Integration

The app ships with a mock AI layer (`src/lib/mock-ai.ts`) that simulates realistic responses with typing delays. To wire up a real AI provider:

1. Replace the functions in `mock-ai.ts` with calls to your provider (OpenAI, Anthropic, Lovable AI Gateway, etc.).
2. Move API calls into TanStack server functions for secure key handling.
3. Stream responses for a better UX in the chatbot and generators.

---

## ⚠️ Responsible AI

Every AI-generated page displays the disclaimer:

> *AI-generated content may contain inaccuracies and should be reviewed before business use.*

Please review all outputs before sharing externally.

---

## 📄 License

MIT — feel free to fork, remix, and build on top of it.

---

Built with ❤️ on [Lovable](https://lovable.dev).
