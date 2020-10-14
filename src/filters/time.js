export function formatMs(valueMs) {
  const msStr = valueMs.toString().padStart(4, "0");
  const decimalPosition = msStr.length-3;
  return msStr.slice(0, decimalPosition) + "." + msStr.slice(decimalPosition);
}