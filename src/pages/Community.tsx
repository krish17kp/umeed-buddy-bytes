import { useEffect, useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";

type Post = { id: string; text: string; ts: number; likes: number };

const KEY = "umeed:community";

export default function Community() {
  const [text, setText] = useState("");
  const [items, setItems] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
      else
        setItems([
          {
            id: crypto.randomUUID(),
            text: "How do you handle exam stress?",
            ts: Date.now(),
            likes: 3,
          },
          {
            id: crypto.randomUUID(),
            text: "Share one thing that helped you this week ✨",
            ts: Date.now() - 3600_000,
            likes: 5,
          },
        ]);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setItems((p) => [
      { id: crypto.randomUUID(), text: t, ts: Date.now(), likes: 0 },
      ...p,
    ]);
    setText("");
  };

  const like = (id: string) => {
    setItems((p) =>
      p.map((x) => (x.id === id ? { ...x, likes: x.likes + 1 } : x))
    );
  };

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold">Peer Community</h1>
      </div>

      <Card className="p-5 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a supportive thought or question…"
          className="w-full h-24 bg-background border border-border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
        />
        <div className="flex justify-end">
          <button
            onClick={add}
            className="btn bg-primary text-primary-foreground rounded-xl px-4 py-2"
          >
            Post
          </button>
        </div>
      </Card>

      <div className="space-y-3">
        {items.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="text-sm text-muted-foreground">
              {new Date(p.ts).toLocaleString()}
            </div>
            <div className="mt-1">{p.text}</div>
            <button
              onClick={() => like(p.id)}
              className="mt-3 inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80"
            >
              <ThumbsUp className="w-4 h-4" /> {p.likes}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
