import { useEffect, useState } from "react";
import { Gamepad2 } from "lucide-react";
import { Card } from "@/components/ui/card";

type Quest = { id: string; title: string; done: boolean };

const KEY = "umeed:quests";

export default function Quests() {
  const [items, setItems] = useState<Quest[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
      else
        setItems([
          { id: crypto.randomUUID(), title: "Breathe 2 minutes", done: false },
          {
            id: crypto.randomUUID(),
            title: "Write 3 gratitude notes",
            done: false,
          },
          { id: crypto.randomUUID(), title: "Walk 10 minutes", done: false },
        ]);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const toggle = (id: string) =>
    setItems((p) => p.map((q) => (q.id === id ? { ...q, done: !q.done } : q)));
  const progress = Math.round(
    (items.filter((x) => x.done).length / Math.max(1, items.length)) * 100
  );

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Gamepad2 className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold">Wellness Quests</h1>
      </div>

      <Card className="p-5 space-y-4">
        <div className="font-medium">Today’s progress</div>
        <div className="h-2 bg-muted rounded">
          <div
            className="h-full bg-primary rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {progress}% complete
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((q) => (
          <Card key={q.id} className="p-4 flex items-center justify-between">
            <div
              className={`font-medium ${
                q.done ? "line-through text-muted-foreground" : ""
              }`}
            >
              {q.title}
            </div>
            <button
              onClick={() => toggle(q.id)}
              className="btn rounded-xl px-3 border"
            >
              {q.done ? "Undo" : "Done"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
