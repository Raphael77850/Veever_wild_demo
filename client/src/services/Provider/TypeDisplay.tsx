const typeMapping: Record<string, string> = {
  activity: "Activité",
  hotel: "Hébergement",
  restaurant: "Restaurant",
};

export default function TypeDisplay({ type }: { type: string }) {
  return typeMapping[type] || "Inconnu";
}
