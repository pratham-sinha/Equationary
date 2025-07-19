"use client";
import { useEffect, useState } from "react";

export function ContestTimer({ endTime }: { endTime: Date }) {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingTime("00:00:00");
        return;
      }

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setRemainingTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="text-lg font-mono text-red-600 text-center">
     {new Date()>endTime?" ": `Contest ends in: ${remainingTime}`}
    </div>
  );
}
