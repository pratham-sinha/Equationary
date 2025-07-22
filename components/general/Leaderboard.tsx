"use client";

import { useEffect, useState } from "react";
import { ablyClient } from "@/app/utils/ablyClient";
import type { Message } from "ably";

type Score = {
  userId: string;
  username: string;
  points: number;
  submittedAt: Date;
};

export function Leaderboard({contestId,initialScores,userId,endTime}:{
  contestId: string;
  initialScores: Score[];
  userId:string;
  endTime:Date,
}) {
  const [scores, setScores] = useState<Score[]>(initialScores);

  useEffect(() => {
    const now = new Date();
    const end = new Date(endTime); 

    if (now > end) return;
    const client = ablyClient(contestId, userId);
    const channel = client.channels.get(`contest-${contestId}`);

    const updateScore = (newScore: Score) => {
      setScores((prev) => {
        const updated = [...prev];
        const index = updated.findIndex((s) => s.userId === newScore.userId);

        if (index !== -1) {
          updated[index] = newScore;
        } else {
          updated.push(newScore);
        }

        
        return updated.sort((a, b) => {
            if(b.points!==a.points)
            return b.points - a.points;
             
            return new Date(a.submittedAt).getTime()-new Date(b.submittedAt).getTime();
        });
      });
    };
    const handleMessage = (msg: Message) => {
      if(!msg?.data?.userId || !msg?.data?.points)return;
  updateScore(msg.data);
};
    channel.subscribe("score-update",handleMessage);

    return () => {
      channel.unsubscribe("score-update",handleMessage);
    };
  }, [contestId,endTime]);

    const top10 = scores.slice(0, 10);
    const currentUserRank = scores.findIndex((s) => s.userId === userId);
    const currentUserScore = scores[currentUserRank];
    const currUsername = currentUserScore?.username ?? "Anonymous";
    const userRank = currentUserRank !== -1 ? currentUserRank + 1 : null;
    const currUserPoints=currentUserScore?.points;
  return (
    <div className="flex flex-col items-center">
     <div className={`p-3 rounded-xl shadow-2xl w-full  border transition-colors duration-300
      bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700`}>
      <h2 className={`text-2xl font-extrabold mb-6 text-center tracking-wide transition-colors duration-300
        text-gray-800 dark:text-white`}>
        {new Date() > endTime ? "🏁Final Rankings" : "🔥Live Leaderboard"}
      </h2>
     

      <div className="space-y-4">
        {top10.map((score, index) => (
          <LeaderboardItem
            key={score.userId}
            score={score}
            rank={index + 1}
            isCurrentUser={score.userId === userId}
          />
        ))}
      </div>
      



    </div>
     {userRank && (
  <div className="m-6 w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm flex items-center space-x-4">
    
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm shadow">
      #{userRank}
    </div>

    <div className="flex flex-col">
      <span className="text-sm text-gray-500 dark:text-gray-400">You</span>
      <span className="text-base font-medium text-gray-900 dark:text-white">
        {currUsername}
      </span>
    </div>

    <div className="ml-auto text-right">
      <span className="text-sm text-gray-500 dark:text-gray-400">Points</span>
      <div className="text-lg font-semibold text-green-600 dark:text-green-400">
        {currUserPoints}
      </div>
    </div>

  </div>
)}
</div>


  );
}

const LeaderboardItem= ({ score, rank, isCurrentUser }:{
  score:Score,
  rank:number,
  isCurrentUser:boolean,

}) => {
  let rankClasses = ''; 
  let rankNumberClasses = '';
  let nameClasses = ''; 
  let scoreClasses = ''; 

  rankClasses = 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200';
  rankNumberClasses = 'bg-gray-300 text-gray-800 dark:bg-gray-900 dark:text-white';
  nameClasses = 'text-gray-800 dark:text-gray-100';
  scoreClasses = 'text-blue-600 dark:text-yellow-300';

 
  switch (rank) {
    case 1:
      rankClasses = 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 font-bold transform scale-105 shadow-lg';
      rankNumberClasses = 'bg-yellow-600 text-white';
      nameClasses = 'text-gray-900';
      scoreClasses = 'text-gray-900';
      break;
    case 2:
      rankClasses = 'bg-gradient-to-r from-gray-300 to-gray-200 text-gray-900 font-semibold shadow-md';
      rankNumberClasses = 'bg-gray-500 text-white';
      nameClasses = 'text-gray-900';
      scoreClasses = 'text-gray-900';
      break;
    case 3:
      rankClasses = 'bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-sm';
      rankNumberClasses = 'bg-orange-700 text-white';
      nameClasses = 'text-white';
      scoreClasses = 'text-yellow-200';
      break;
    default:
      
      break;
  }

 
 
  const currentUserHighlight = isCurrentUser
    ? 'animate-pulse scale-[1.04] font-extrabold text-black dark:text-blue-900 '
    : '';

  return (
    <div className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out ${rankClasses}`}>
      <div className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-lg font-bold mr-4 shadow-inner ${rankNumberClasses}`}>
        {rank}
      </div>
      <div className="flex-grow">
        <p className={`text-lg lg:text-sm ${nameClasses} ${currentUserHighlight}`}>{score.username}</p>
      </div>
      <div className={`text-xl font-extrabold ${scoreClasses}`}>
        {score.points}
      </div>
      
    </div>

  );
};