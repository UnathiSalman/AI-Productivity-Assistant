import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, Sparkles, Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/layout/page-header";
import { AIDisclaimer } from "@/components/ai-disclaimer";
import { mockDelay } from "@/lib/mock-ai";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chatbot · Aether AI" }] }),
  component: ChatPage,
});

type Msg = { id: string; role: "user" | "assistant"; content: string };

const suggestions = [
  "Summarize my unread Slack threads",
  "Draft a project kickoff agenda",
  "Compare GPT and Claude for code review",
  "Help me prep for a 1:1 with my manager",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hi! I'm your AI assistant. Ask me anything — drafts, research, planning, or quick brainstorms.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content) return;
    setInput("");
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", content }]);
    setTyping(true);
    await mockDelay(1100);
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Here's a thought on "${content}": let's break it down into context, options, and next steps. I can pull in research, draft messages, or build a plan — just tell me which direction to take.`,
      },
    ]);
    setTyping(false);
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col space-y-4">
      <PageHeader
        icon={MessageSquare}
        title="AI Chatbot"
        description="Your always-on assistant for quick answers and creative work."
      />
      <AIDisclaimer />

      <Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto max-w-3xl space-y-5">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand-gradient text-white rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {messages.length <= 1 && (
          <div className="border-t border-border bg-muted/30 px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-3xl flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" /> Try:
              </span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t border-border bg-background px-4 py-3 sm:px-6"
        >
          <div className="mx-auto flex max-w-3xl items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Aether..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              className="min-h-[44px] max-h-40 resize-none"
            />
            <Button type="submit" disabled={!input.trim() || typing} className="bg-brand-gradient text-white hover:opacity-90 h-11 w-11 shrink-0 p-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
