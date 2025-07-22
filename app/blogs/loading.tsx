 import { Skeleton } from "@/components/ui/skeleton"

const skeletonCount = 6;

export default function SkeletonList() {
  return (
    <div className="py-6">

    
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          Loading...
        </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: skeletonCount }).map((_, idx) => (
        <div key={idx} className="p-4">

            <Skeleton  className="h-50 w-full rounded-xl m-1 p-2" />
            <Skeleton  className="h-10 w-full m-1"/>
        </div>
      ))}
    </div>
    </div>
  );
}