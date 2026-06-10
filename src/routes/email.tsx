import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Sparkles, Copy, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/layout/page-header";
import { AIDisclaimer } from "@/components/ai-disclaimer";
import { mockDelay, mockEmail } from "@/lib/mock-ai";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Email Generator · Aether AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    await mockDelay();
    setOutput(mockEmail(purpose, recipient, tone));
    setLoading(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Email copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Draft polished emails in seconds. Adjust tone, purpose, and recipient."
      />
      <AIDisclaimer />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Compose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="purpose">Email purpose</Label>
              <Textarea
                id="purpose"
                placeholder="e.g. Request an intro meeting about partnership opportunities"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="e.g. Jordan Lee, Head of Partnerships"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generate} disabled={loading} className="w-full bg-brand-gradient text-white hover:opacity-90">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {loading ? "Generating..." : "Generate Email"}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Generated Email</CardTitle>
            {output && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={generate} disabled={loading}>
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={copy}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {output ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  rows={18}
                  className="font-mono text-sm leading-relaxed"
                />
              </motion.div>
            ) : (
              <div className="flex h-80 flex-col items-center justify-center rounded-lg border border-dashed border-border text-center">
                <Mail className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Your generated email will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
