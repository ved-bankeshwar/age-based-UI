import { offers } from "@/data";
import { OfferList } from "@/components/offers/Secondary";

export default function OffersPage() {
  return <OfferList offers={offers} />;
}
