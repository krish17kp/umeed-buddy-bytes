import { useEffect, useState } from "react";
import { Users, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const KEY = "umeed:circle";

export default function Circle() {
  const [emails, setEmails] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareMood, setShareMood] = useState(true);
  const [shareNotes, setShareNotes] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const obj = JSON.parse(raw);
        setEmails(obj.emails || []);
        setShareMood(!!obj.shareMood);
        setShareNotes(!!obj.shareNotes);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      KEY,
      JSON.stringify({ emails, shareMood, shareNotes })
    );
  }, [emails, shareMood, shareNotes]);

  const add = () => {
    const e = email.trim();
    if (!e || emails.includes(e)) return;
    setEmails((p) => [e, ...p]);
    setEmail("");
  };

  const inviteLink = `${location.origin}/circle?code=${btoa(
    "umeed-demo-code"
  )}`;

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold">Trusted Circle</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-5 space-y-4">
          <div className="font-medium">Invite people you trust</div>
          <div className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="flex-1 bg-background border border-border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={add}
              className="btn bg-primary text-primary-foreground rounded-xl px-4"
            >
              Add
            </button>
          </div>

          <div className="text-sm text-muted-foreground">Invite link</div>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 bg-muted/60 rounded-xl px-3 py-2 text-sm"
            />
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(inviteLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              className="btn bg-foreground text-background rounded-xl px-3 py-2 flex items-center gap-2"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="text-sm text-muted-foreground mt-2">
            Only people you invite can view what you explicitly share.
          </div>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="font-medium">What to share</div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={shareMood}
              onChange={(e) => setShareMood(e.target.checked)}
            />
            <span>Mood scores</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={shareNotes}
              onChange={(e) => setShareNotes(e.target.checked)}
            />
            <span>Notes (journal)</span>
          </label>

          <div className="text-sm text-muted-foreground">
            You can change this anytime. Nothing is shared without your consent.
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="font-medium mb-3">
          People in your circle ({emails.length})
        </div>
        <div className="flex flex-wrap gap-2">
          {emails.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No one added yet.
            </div>
          )}
          {emails.map((e) => (
            <span key={e} className="px-3 py-1 rounded-full bg-muted text-sm">
              {e}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
