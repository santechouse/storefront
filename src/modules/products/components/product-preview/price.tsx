import { VariantPrice } from "@/types/globals";

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null;
  }

  return (
    <>
      {price.price_type === "sale" && (
        <span className="font-bold">{price.original_price}</span>
      )}
      <span className="font-bold">{price.calculated_price}</span>
    </>
  );
}
