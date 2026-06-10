import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ListChecks, Sparkles, Loader2, AlertTriangle, Flag, Calendar, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";
import { AIDisclaimer } from "@/components/ai-disclaimer";
import { mockDelay, mockPlan } from "@/lib/mock-ai";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Task Planner · Aether AI" }] }),
  component: TasksPage,
});

type Plan = ReturnType<typeof mockPlan>;

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    await mockDelay(1300);
    setPlan(mockPlan(goal));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ListChecks}
        title="AI Task Planner"
        description="Turn an ambitious goal into a prioritized, time-boxed plan."
      />
      <AIDisclaimer />

      <Card>
        <CardHeader><CardTitle className="text-base">Your Goal</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="e.g. Launch our self-serve onboarding flow in the next 6 weeks"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
          />
          <Button onClick={generate} disabled={loading} className="bg-brand-gradient text-white hover:opacity-90">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? "Planning..." : "Generate Plan"}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Target className="h-4 w-4 text-brand" /> Prioritized Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {plan.tasks.map((t, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
                  <Badge variant={t.priority === "P0" ? "destructive" : t.priority === "P1" ? "default" : "secondary"} className="shrink-0">
                    {t.priority}
                  </Badge>
                  <span className="flex-1 text-sm">{t.title}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{t.eta}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4 text-brand" /> Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-4 border-l border-border pl-5">
                {plan.timeline.map((phase, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[27px] flex h-4 w-4 items-center justify-center rounded-full bg-brand-gradient text-[10px] font-bold text-white">{i + 1}</span>
                    <p className="text-sm font-medium">{phase.phase} <span className="ml-1 text-xs font-normal text-muted-foreground">· {phase.range}</span></p>
                    <p className="text-xs text-muted-foreground">{phase.focus}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Flag className="h-4 w-4 text-brand" /> Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {plan.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-accent/40 p-3">
                  <Flag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent2" />
                  <span className="text-sm">{m}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Risks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {plan.risks.map((r, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <span className="text-sm">{r}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
