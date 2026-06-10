import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  TrendingUp,
  Zap,
  Clock,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Aether AI" },
      { name: "description", content: "Overview of your AI workplace productivity." },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "AI Requests", value: "4,820", delta: "+12.4%", icon: Zap, hint: "this month" },
  { label: "Time Saved", value: "126h", delta: "+8.2%", icon: Clock, hint: "vs last month" },
  { label: "Active Workflows", value: "37", delta: "+3", icon: Activity, hint: "running now" },
  { label: "Productivity Score", value: "92", delta: "+5pts", icon: TrendingUp, hint: "team avg" },
];

const usageData = [
  { day: "Mon", requests: 320 }, { day: "Tue", requests: 480 }, { day: "Wed", requests: 410 },
  { day: "Thu", requests: 620 }, { day: "Fri", requests: 540 }, { day: "Sat", requests: 210 },
  { day: "Sun", requests: 180 },
];

const featureUsage = [
  { name: "Email", uses: 620 }, { name: "Meetings", uses: 410 },
  { name: "Tasks", uses: 380 }, { name: "Research", uses: 290 }, { name: "Chat", uses: 510 },
];

const activity = [
  { icon: Mail, title: "Generated cold outreach email", time: "2m ago", tag: "Email" },
  { icon: FileText, title: "Summarized Q3 planning meeting", time: "1h ago", tag: "Meetings" },
  { icon: ListChecks, title: "Created launch roadmap plan", time: "3h ago", tag: "Tasks" },
  { icon: Search, title: "Researched competitor pricing", time: "yesterday", tag: "Research" },
  { icon: MessageSquare, title: "Chat session: onboarding flow", time: "yesterday", tag: "Chat" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={LayoutDashboard}
        title="Welcome back, Your Majesty Unathi Salman"
        description="Here's what's happening across your AI workspace today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{k.label}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <k.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tracking-tight">{k.value}</span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{k.delta}</span>
                </div>
                <span className="text-xs text-muted-foreground">{k.hint}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">AI Usage · Last 7 days</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="requests" stroke="var(--brand)" strokeWidth={2} fill="url(#usageFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">By Feature</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureUsage}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="uses" fill="var(--accent2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {activity.map((a, i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.tag} · {a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
