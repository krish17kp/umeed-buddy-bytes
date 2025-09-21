// src/utils/local-support.ts
export type SupportPlace = {
  name: string;
  type?: string;
  phone?: string;
  website?: string;
  address?: string;
  lat?: number;
  lon?: number;
};

type Params = { lat: number; lon: number; radius?: number };

export async function findNearbySupport({
  lat,
  lon,
  radius = 5000,
}: Params): Promise<SupportPlace[]> {
  // For production, set VITE_N8N_WEBHOOK_URL. For local dev we use the Vite proxy.
  const url = import.meta.env.VITE_N8N_WEBHOOK_URL || "/api/local-support";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lon, radius }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Local support request failed (${res.status}): ${text}`);
  }

  const data = await res.json();

  // n8n might return [{json: {...}}, ...] or plain [{...}, ...]
  const items: any[] = Array.isArray(data)
    ? data.map((it: any) => (it && it.json ? it.json : it))
    : data?.data || data?.items || [];

  return items as SupportPlace[];
}
