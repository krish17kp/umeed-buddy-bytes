import { Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const KEY = "umeed:privacy";

export default function Privacy() {
  const [e2e, setE2e] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [crisisBanner, setCrisisBanner] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const x = JSON.parse(raw);
        setE2e(!!x.e2e);
        setAnalytics(!!x.analytics);
        setCrisisBanner(!!x.crisisBanner);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ e2e, analytics, crisisBanner }));
  }, [e2e, analytics, crisisBanner]);

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold">Privacy by Design</h1>
      </div>

      <Card className="p-5 space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={e2e}
            onChange={(e) => setE2e(e.target.checked)}
          />
          <span>Enable end-to-end encryption (simulated)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          <span>Allow anonymous analytics</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={crisisBanner}
            onChange={(e) => setCrisisBanner(e.target.checked)}
          />
          <span>Show crisis resources banner</span>
        </label>
        <div className="text-sm text-muted-foreground">
          Your settings are stored locally for this demo. In production, keep
          them on the server with full consent logs.
        </div>
      </Card>
    </div>
  );
}
