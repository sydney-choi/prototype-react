import getProducts from '@/api/getProducts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/model/common';
import { PaginationResponse, Product } from '@/mocks/handlers';

export const useFetchProducts = ({ size }: PaginationParams) =>
  useInfiniteQuery<PaginationResponse<Product>, Error, Product[], [string], number>({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => getProducts({ page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.isLastPage ? undefined : lastPage.pageNumber + 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.contents);
    },
  });
