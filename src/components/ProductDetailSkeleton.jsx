import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-14">

        <div className="w-full lg:max-w-[560px]">
          <Skeleton className="w-full h-72 sm:h-96 rounded-md" />

          <div className="flex gap-3 mt-4">
            <Skeleton className="h-16 w-16 rounded-md" />
            <Skeleton className="h-16 w-16 rounded-md" />
            <Skeleton className="h-16 w-16 rounded-md" />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-5">

          <Skeleton className="h-8 w-3/4" />

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />

          <Skeleton className="h-6 w-1/4" />
          
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>

      </div>
    </div>
  );
};

export default ProductDetailSkeleton;