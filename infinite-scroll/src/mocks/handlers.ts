import { delay, http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

export interface Product {
  id: string;
  productName: string;
  price: string;
  image: string;
}

export interface PaginationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

const products = Array.from(Array(1024).keys()).map(
  (): Product => ({
    id: faker.string.uuid(),
    productName: faker.commerce.productName(),
    price: faker.commerce.price({ min: 100, max: 200 }),
    image: faker.image.avatarGitHub(),
  })
);

export const handlers = [
  http.get(`/api/products`, async ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get("size"));
    const page = Number(url.searchParams.get("page"));
    const totalCount = products.length;
    const totalPages = Math.round(totalCount / size);
    await delay(500);

    return HttpResponse.json<PaginationResponse<Product>>({
      contents: products.slice(page * size, (page + 1) * size),
      pageNumber: page,
      pageSize: size,
      totalPages,
      totalCount,
      isLastPage: totalPages <= page,
      isFirstPage: page === 0,
    });
  }),
];
