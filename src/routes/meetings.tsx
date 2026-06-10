import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { FileText, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/layout/page-header";
import { AIDisclaimer } from "@/components/ai-disclaimer";
import { mockDelay, mockMeeting } from "@/lib/mock-ai";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes · Aether AI" }] }),
  component: MeetingPage,
});

type Result = ReturnType<typeof mockMeeting>;

function MeetingPage() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    await mockDelay(1400);
    setResult(mockMeeting());
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Meeting Notes Summarizer"
        description="Paste a transcript and get an executive summary, decisions, action items, and next steps."
      />
      <AIDisclaimer />

      <Card>
        <CardHeader><CardTitle className="text-base">Transcript</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Paste your meeting transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={8}
          />
          <Button onClick={generate} disabled={loading} className="bg-brand-gradient text-white hover:opacity-90">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Summarizing..." : "Generate Summary"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
          <EditableCard title="Executive Summary" value={result.summary}
            onChange={(v) => setResult({ ...result, summary: v })} rows={6} />

          <ListCard title="Key Decisions" items={result.decisions}
            onChange={(items) => setResult({ ...result, decisions: items })} />

          <Card>
            <CardHeader><CardTitle className="text-base">Action Items</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {result.actions.map((a, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                    {a.who[0]}
                  </div>
                  <input
                    className="w-20 shrink-0 rounded border border-input bg-background px-2 py-1 text-xs"
                    value={a.who}
                    onChange={(e) => {
                      const next = [...result.actions];
                      next[i] = { ...a, who: e.target.value };
                      setResult({ ...result, actions: next });
                    }}
                  />
                  <input
                    className="min-w-0 flex-1 rounded border border-input bg-background px-2 py-1 text-sm"
                    value={a.task}
                    onChange={(e) => {
                      const next = [...result.actions];
                      next[i] = { ...a, task: e.target.value };
                      setResult({ ...result, actions: next });
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <ListCard title="Next Steps" items={result.next}
            onChange={(items) => setResult({ ...result, next: items })} />
        </motion.div>
      )}
    </div>
  );
}

function EditableCard({ title, value, onChange, rows = 4 }: { title: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="text-sm" />
      </CardContent>
    </Card>
  );
}

function ListCard({ title, items, onChange }: { title: string; items: string[]; onChange: (items: string[]) => void }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <input
              className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
