import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Entry = { id: string; score: number; note: string; ts: number };

const KEY = "umeed:moods";

export default function Tracking() {
  const [score, setScore] = useState(5);
  const [note, setNote] = useState("");
  const [items, setItems] = useState<Entry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = () => {
    const e: Entry = { id: crypto.randomUUID(), score, note, ts: Date.now() };
    setItems((p) => [e, ...p].slice(0, 60));
    setNote("");
  };

  const avg = useMemo(
    () =>
      items.length
        ? (items.reduce((s, x) => s + x.score, 0) / items.length).toFixed(1)
        : "—",
    [items]
  );

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Heart className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-semibold">Mood & Wellness Tracking</h1>
        <Badge variant="secondary">Local</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-5 space-y-4">
          <div className="font-medium">Add today’s check-in</div>
          <label className="block text-sm text-muted-foreground">
            Mood score: {score}/10
          </label>
          <input
            type="range"
            min={0}
            max={10}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="w-full"
          />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What influenced your mood today?"
            className="w-full h-24 bg-background border border-border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={add}
            className="btn bg-primary text-primary-foreground rounded-xl px-4 py-2"
          >
            Save entry
          </button>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Trend</div>
            <div className="text-sm text-muted-foreground">Average: {avg}</div>
          </div>
          {/* Simple sparkline without extra libs */}
          <div className="h-24 bg-muted rounded-lg flex items-end gap-1 p-2 overflow-hidden">
            {items
              .slice(0, 30)
              .reverse()
              .map((e) => (
                <div
                  key={e.id}
                  title={`${new Date(e.ts).toLocaleDateString()} • ${
                    e.score
                  }/10`}
                  className="w-2 bg-primary/70 rounded-t"
                  style={{ height: `${(e.score / 10) * 100}%` }}
                />
              ))}
          </div>
          <div className="text-xs text-muted-foreground">
            Last {Math.min(items.length, 30)} entries
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="font-medium mb-3">History</div>
        <div className="space-y-3">
          {items.length === 0 && (
            <div className="text-muted-foreground text-sm">No entries yet.</div>
          )}
          {items.map((e) => (
            <div
              key={e.id}
              className="flex items-start justify-between gap-3 py-2 border-b border-border/40 last:border-none"
            >
              <div>
                <div className="text-sm font-medium">
                  {new Date(e.ts).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {e.note || "—"}
                </div>
              </div>
              <div className="text-sm font-semibold">{e.score}/10</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
