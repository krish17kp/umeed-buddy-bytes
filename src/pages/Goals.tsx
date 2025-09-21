import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { Card } from "@/components/ui/card";

type Goal = { id: string; title: string; progress: number };

const KEY = "umeed:goals";

export default function Goals() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<Goal[]>([]);

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
    const t = title.trim();
    if (!t) return;
    setItems((p) => [{ id: crypto.randomUUID(), title: t, progress: 0 }, ...p]);
    setTitle("");
  };

  const setProg = (id: string, v: number) =>
    setItems((p) => p.map((g) => (g.id === id ? { ...g, progress: v } : g)));

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Target className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold">Wellness Goals</h1>
      </div>

      <Card className="p-5 space-y-3">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Sleep by 11 PM for 5 days"
            className="flex-1 bg-background border border-border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={add}
            className="btn bg-primary text-primary-foreground rounded-xl px-4"
          >
            Add
          </button>
        </div>
      </Card>

      <div className="space-y-3">
        {items.length === 0 && (
          <div className="text-sm text-muted-foreground">No goals yet.</div>
        )}
        {items.map((g) => (
          <Card key={g.id} className="p-4 space-y-2">
            <div className="font-medium">{g.title}</div>
            <input
              type="range"
              min={0}
              max={100}
              value={g.progress}
              onChange={(e) => setProg(g.id, Number(e.target.value))}
              className="w-full"
            />
            <div className="h-2 bg-muted rounded">
              <div
                className="h-full bg-primary rounded"
                style={{ width: `${g.progress}%` }}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {g.progress}% complete
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
