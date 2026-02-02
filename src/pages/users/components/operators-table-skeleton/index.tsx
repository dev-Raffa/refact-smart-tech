import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function OperatorsTableSkeleton() {
  return (
    <>
      <Card className="max-w-8xl 2xl:min-w-[1400px] w-full">
        <main className="pt-2 flex flex-col space-y-3">
          <div className="flex flex-col space-y-5 pb-6">
            <div className="flex justify-between items-center px-6 pt-4 pb-2">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-48 h-4" />
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-40 h-4" />
            </div>
            <Separator />
            <div className="flex justify-between items-center px-6">
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex justify-between items-center px-6">
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex justify-between items-center px-6">
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex justify-between items-center px-6">
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex justify-between items-center px-6">
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex justify-between items-center px-6">
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-28 h-3" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </main>
      </Card>

      <div className="flex justify-between items-center pt-6 pb-12 pl-8 pr-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-44 h-3" />
          <Skeleton className="w-72 h-3" />
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
    </>
  );
}
