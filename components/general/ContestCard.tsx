import { CalendarClock } from "lucide-react";
import { Button } from "../ui/button"
import Link from "next/link";
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

export function ContestCard({
  title,
  startTime,
  endTime,
  id,
  count,
}: {
  title: string;
  startTime: Date;
  endTime: Date;
  id:string;
  count:number;
}) {
  const now = new Date();
  const hasStarted = now.getTime() >= startTime.getTime();
  const hasEnded = now.getTime() >= endTime.getTime();

  const formattedStart = dayjs(startTime).tz("Asia/Kolkata").format("DD MMM YYYY, h:mm A");

  return (
    <div className="p-4 rounded-xl border-1 border-zinc-500 shadow-md bg-white dark:bg-zinc-900 hover:shadow-2xl transition-all">
      <div className="relative flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>

        {hasEnded ? (
          <div className="flex  gap-2">
          <span className="text-sm text-center px-2 py-0.5 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold">
            Ended
          </span>
          <span className="text-sm text-center px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium">
            {count} participant{count !== 1 && "s"}
          </span>
          </div>
        ) : hasStarted ? (
          <span className="relative flex size-3">
            <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative size-3 rounded-full bg-red-600"></span>
          </span>
        ) : null}
      </div>

      <div className="flex justify-between">
        <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
          <CalendarClock className="w-4 h-4 mr-2" />
          {formattedStart}
        </div>

        <Link href={`/contest/join/${id}`}>
          <Button size="sm" className="mt-3 cursor-pointer">
            {hasEnded ? <>View</> : <>JOIN</>}
          </Button>
        </Link>
      </div>
    </div>
  );
}
