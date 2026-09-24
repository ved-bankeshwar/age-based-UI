export function formatRupee(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatDelivery(range: [number, number]) {
  return `${range[0]}–${range[1]} min`;
}

export function formatPriceForTwo(amount: number) {
  return `${formatRupee(amount)} for two`;
}

export function formatRating(value: number) {
  return value.toFixed(1);
}

export function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
