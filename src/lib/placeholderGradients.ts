export const PLACEHOLDER_GRADIENTS = [
  "from-blush-200 to-blush-400",
  "from-sage-200 to-sage-400",
  "from-cream-200 to-blush-300",
];

export function pickPlaceholderGradient(index: number) {
  return PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];
}
