import { useState } from "react";
import { analyzeText } from "../lib/sentimentApi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Moodcheck() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    const res = await analyzeText(text, "en-IN");
    setResult(res.sentiment);
  };

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-4">Mood Check</h1>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling today?"
      />
      <Button onClick={handleAnalyze} className="mt-4">
        Analyze
      </Button>

      {result && (
        <div className="mt-4 p-4 rounded bg-muted">
          Sentiment: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}
