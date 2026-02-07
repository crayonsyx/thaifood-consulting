// Client-safe utility functions (no server-only dependencies)

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTextFromNode(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.text) return node.text;
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join(" ");
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function estimateReadingTime(body: any): number {
  const wordsPerMinute = 200;
  const text = extractTextFromNode(body);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
