export const API_BASE =
  import.meta.env.VITE_SENTI_API ?? "http://localhost:9090";

export async function listModels(): Promise<string[]> {
  const r = await fetch(`${API_BASE}/models`);
  const j = await r.json();
  return j.available ?? [];
}

export async function analyzeText(text: string, lang: string) {
  const r = await fetch(`${API_BASE}/analyze-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, lang }),
  });
  return r.json();
}

export async function analyzeAudio(file: File, lang: string) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("lang", lang);
  const r = await fetch(`${API_BASE}/analyze-audio`, {
    method: "POST",
    body: fd,
  });
  return r.json();
}
