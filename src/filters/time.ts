export function formatMs(valueMs: number | null): string {
  if (!valueMs) {
    return "---";
  }

  const msStr = valueMs.toString().padStart(4, "0");
  const decimalPosition = msStr.length - 3;
  return msStr.slice(0, decimalPosition) + "." + msStr.slice(decimalPosition);
}