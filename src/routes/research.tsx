import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Search, Sparkles, Loader2, BookOpen, TrendingUp, AlertTriangle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { AIDisclaimer } from "@/components/ai-disclaimer";
import { mockDelay, mockResearch } from "@/lib/mock-ai";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "Research Assistant · Aether AI" }] }),
  component: ResearchPage,
});

type Report = ReturnType<typeof mockResearch>;

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    await mockDelay(1500);
    setReport(mockResearch(topic));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        description="Briefs, market scans, and competitive snapshots — drafted in seconds."
      />
      <AIDisclaimer />

      <Card>
        <CardHeader><CardTitle className="text-base">Research Topic</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="e.g. The state of AI coding assistants in enterprise"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button onClick={generate} disabled={loading} className="bg-brand-gradient text-white hover:opacity-90">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Researching..." : "Generate Report"}
          </Button>
        </CardContent>
      </Card>

      {report && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-brand" /> Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={report.summary} onChange={(e) => setReport({ ...report, summary: e.target.value })} rows={5} className="text-sm" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ReportList icon={BookOpen} title="Findings" items={report.findings} accent="text-brand" />
            <ReportList icon={TrendingUp} title="Opportunities" items={report.opportunities} accent="text-emerald-500" />
            <ReportList icon={AlertTriangle} title="Risks" items={report.risks} accent="text-amber-500" />
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">References</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {report.references.map((r, i) => (
                  <li key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                    <span className="truncate">{r.title}</span>
                    <span className="ml-3 shrink-0 text-xs text-muted-foreground">{r.source}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

function ReportList({
  icon: Icon, title, items, accent,
}: { icon: React.ComponentType<{ className?: string }>; title: string; items: string[]; accent: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2"><Icon className={`h-4 w-4 ${accent}`} /> {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${accent}`} />
            <span>{it}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
