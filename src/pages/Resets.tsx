import { Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

export default function Resets() {
  const [seconds, setSeconds] = useState(120);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running]);

  const reset = (s: number) => {
    setSeconds(s);
    setRunning(false);
  };

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="w-6 h-6 text-yellow-500" />
        <h1 className="text-2xl font-semibold">Quick Reset Tools</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-5 space-y-4">
          <div className="font-medium">2-minute breathing</div>
          <div className="text-4xl font-bold tabular-nums">
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
          </div>
          <div className="text-sm text-muted-foreground">
            In 4 • Hold 4 • Out 6
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setRunning(true)}
              className="btn bg-primary text-primary-foreground rounded-xl px-3"
            >
              Start
            </button>
            <button
              onClick={() => setRunning(false)}
              className="btn rounded-xl px-3 border"
            >
              Pause
            </button>
            <button
              onClick={() => reset(120)}
              className="btn rounded-xl px-3 border"
            >
              Reset
            </button>
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="font-medium">Grounding (5-4-3-2-1)</div>
          <ul className="list-disc pl-6 text-sm space-y-1 text-muted-foreground">
            <li>5 things you can see</li>
            <li>4 things you can touch</li>
            <li>3 things you can hear</li>
            <li>2 things you can smell</li>
            <li>1 thing you can taste</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
