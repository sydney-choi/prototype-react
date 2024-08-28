import { Product } from "@/mocks/handlers";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
  return (
    <Link
      href={`/products/${item.id}`}
      key={item.id}
      className=" border-solid border-2 border-slate-100 shadow-md hover:bg-slate-100"
    >
      <Image
        alt={item.productName}
        src={item.image}
        width={120}
        height={120}
        priority
      />
      <p>{item.productName}</p>
      <p>{item.price}</p>
    </Link>
  );
}
