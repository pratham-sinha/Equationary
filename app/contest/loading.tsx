import { Skeleton } from "@/components/ui/skeleton"

const skeletonCount = 5;

export default function SkeletonList() {
  return (
    <div className="flex flex-col space-y-3 p-4 sm:p-6">
      {Array.from({ length: skeletonCount }).map((_, idx) => (
        <Skeleton key={idx} className="h-[120px] w-full rounded-xl" />
      ))}
    </div>
  );
}

