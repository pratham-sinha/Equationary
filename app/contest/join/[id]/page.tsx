import { prisma } from "@/app/utils/db";
import { isAdmin } from "@/app/utils/isAdmin";
import { ContestTimer } from "@/components/Extras/ContestTimer";
import ContestPageClient from "@/components/general/ContestPageClient";
import { Leaderboard } from "@/components/general/Leaderboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

async function getContest(id: string) {
  const contest = await prisma.contest.findUnique({
    where: { id: id },
    select: {
        id:true,
        title :true    ,
        description:true, 
        startTime:true,
        endTime :true,
    questions: {
      select: {
      id: true,
      text: true,
      options: true,
      //not selecting correct answer
      }
    }
}
  });

  if (!contest) {
    notFound();
  }
  const now=new Date();
  const hasStarted=now>=contest.startTime

  //not sending qstn to the client if contest has not started
  return {
    ...contest,
    questions:hasStarted? contest.questions:[],
    hasStarted,
  };
}
 

type Params = Promise<{ id: string }>;

export default async function ContestPage({ params }: { params: Params }) {

  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
if(!kindeUser){
  return redirect('/login');
}
  const { id } = await params;
  const contest = await getContest(id);
  if(!contest)return;
  const user = await prisma.user.findUnique({ where: { kindeId: kindeUser?.id } });
  if(!user){
    return redirect("/login")
  }
  
  if(!kindeUser.email)return;

 

 const allowed=await isAdmin();



  if(!contest.hasStarted && !allowed){
    return(
      <div className="text-center">
        <h1 className="text-2xl font-bold">{contest.title}</h1>
        <p className="text-lg">{contest.description}</p>
      <div className="p-6 text-center font-semibold">
         Contest has not started yet. Please come back at {contest.startTime.toLocaleString()}.
      </div>
      </div>
    )
  }
  const submissions = await prisma.submission.findMany({
  where: {
    userId: user.id,
    contestId: contest.id,
  
  },
  select: { 
    questionId: true, 
    selected:true ,
    isCorrect:true,
          
  },
});

const submittedQuestionIds = submissions.map((s) => s.questionId);


const scores = await prisma.score.findMany({
  where: { contestId: contest.id },
  include: { user: true },
  orderBy: [
    {points:"desc"},
    {submittedAt:"asc"}
  ]
});

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 pt-4 w-full ">
      <div className="md:col-span-3 min-w-0 w-full">
       
      <ContestPageClient contest={contest} userId={user.id} submittedQuestionIds={submittedQuestionIds} submissions={submissions} />
      </div>

      

      <div className="space-y-4 min-w-0 w-full">
        <ContestTimer endTime={contest.endTime}/>
         <Leaderboard
         contestId={contest.id}
         initialScores={scores.map((s) => ({
         userId: s.userId,
         username: s.user.username ?? "Anonymous",
         points: s.points,
         submittedAt:s.submittedAt ,
         }))}
         userId={user?.id}
         endTime={contest?.endTime}
        />

         
      </div>
    </div>
  );
}