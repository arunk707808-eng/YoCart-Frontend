import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
   <div className="w-full bg-white shadow-md rounded-lg overflow-hidden border">
  <Skeleton className="w-full h-40 md:h-64" />

  <div className="p-4 space-y-3">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-5/6" />
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-8 w-full rounded-md" />
  </div>
</div>
  );
};

export default ProductCardSkeleton;