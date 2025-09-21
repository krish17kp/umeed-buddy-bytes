type Props = { sentiment?: string };

export default function SentimentBadge({ sentiment }: Props) {
  const s = (sentiment ?? "Neutral").toLowerCase();
  const map: Record<string, { label: string; cls: string }> = {
    positive: {
      label: "Positive",
      cls: "bg-green-100 text-green-700 border-green-300",
    },
    negative: {
      label: "Negative",
      cls: "bg-red-100 text-red-700 border-red-300",
    },
    neutral: {
      label: "Neutral",
      cls: "bg-gray-100 text-gray-700 border-gray-300",
    },
  };
  const v = map[s] ?? map.neutral;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${v.cls}`}
    >
      {v.label}
    </span>
  );
}
