export function formatMs(valueMs: number): string {
  if (valueMs === null) {
    return "---";
  }
  
  const msStr = valueMs.toString().padStart(4, "0");
  const decimalPosition = msStr.length-3;
  return msStr.slice(0, decimalPosition) + "." + msStr.slice(decimalPosition);
}