import { CalendarClock } from "lucide-react";
import { Button } from "../ui/button"
import Link from "next/link";

export function ContestCard({
  title,
  startTime,
  endTime,
  id,
}: {
  title: string;
  startTime: Date;
  endTime: Date;
  id:string;
}) {
  const now = new Date();
  const hasStarted = now >= startTime;
  const hasEnded = now >= endTime;

  return (
    <div className="p-4 rounded-xl border-1 border-zinc-500 shadow-md bg-white dark:bg-zinc-900 hover:shadow-2xl  transition-all">
      <div className="relative flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>

        {hasEnded ? (
          <span className="text-sm px-2 py-0.5 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold">
            Ended
          </span>
        
       
        ) : hasStarted ? (
           <span className="relative flex size-3">
  <span className="absolute  h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
  <span className="relative  size-3 rounded-full bg-red-600"></span>
 
</span>
        ) : null}
      </div>
 <div className="flex justify-between">

      <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
        <CalendarClock className="w-4 h-4 mr-2" />
        {startTime.toLocaleString()}
      </div>
      <Link href={`/contest/join/${id}`}  >
      <Button size="sm" className="mt-3 cursor-pointer">
       {
        hasEnded? (
            <>View</>
        ):
        (
            <>JOIN</>
        )
       }
      </Button>
      </Link>
    </div>
 </div>
  );
}
