import { PaginationResponse, Product } from "@/mocks/handlers";
import { PaginationParams } from "@/model/common";

export default async function getProducts(params: PaginationParams) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?page=${params.page}&size=${params.size}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: PaginationResponse<Product> = await res.json();
  return data;
}
