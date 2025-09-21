import { useState } from "react";
import { Brain, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function reply(text: string) {
  const t = text.toLowerCase();
  if (t.includes("exam") || t.includes("study")) {
    return "Exams can be intense. Try a 25–5 focus cycle, sip some water, and remember rest improves recall.";
  }
  if (t.includes("sleep")) {
    return "For sleep, wind-down routine + no screens 60 minutes before bed helps a lot. Gentle stretches too.";
  }
  if (t.includes("anx") || t.includes("worry")) {
    return "Try box breathing: in 4, hold 4, out 6 for 2 minutes. Small walks help your nervous system settle.";
  }
  return "Thanks for sharing. You're not alone. A tiny step—like a 2-minute breath—can shift the day.";
}

export default function Insights() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<{ role: "you" | "umeed"; text: string }[]>(
    [{ role: "umeed", text: "Hi! How are you feeling today?" }]
  );

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    const r = reply(txt);
    setItems((p) => [
      ...p,
      { role: "you", text: txt },
      { role: "umeed", text: r },
    ]);
    setInput("");
  };

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold">AI-Powered Insights</h1>
        <Badge variant="secondary">Mock</Badge>
      </div>

      <Card className="p-4 max-w-3xl">
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {items.map((m, i) => (
            <div
              key={i}
              className={m.role === "you" ? "text-right" : "text-left"}
            >
              <div
                className={`inline-block px-3 py-2 rounded-xl text-sm ${
                  m.role === "you"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Share a thought…"
            className="flex-1 bg-background border border-border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={send}
            className="btn bg-primary text-primary-foreground px-4 rounded-xl flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </Card>
    </div>
  );
}
