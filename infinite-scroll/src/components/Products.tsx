'use client';
import ProductCard from '@/components/ProductCard';
import { useIntersect } from '@/hooks/useIntersect';
import { useFetchProducts } from '@/hooks/useFetchProducts';

const PAGE_SIZE = 20;

export default function Products() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchProducts({
    size: PAGE_SIZE,
  });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
      {data?.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
      {isFetching && <p>Loading...</p>}
      <div ref={ref} className="h-1" />
    </div>
  );
}
