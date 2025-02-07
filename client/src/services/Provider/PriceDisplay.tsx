export default function PriceDisplay({ price }: { price: number }) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
}
