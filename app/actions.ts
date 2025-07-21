"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db"
import { redirect } from "next/navigation";
import { ablyServer } from "./utils/ablyServer";
import { isAdmin } from "./utils/isAdmin";
import { revalidatePath } from "next/cache";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function handleBlogSubmission(formData:FormData){
 
     const {getUser}=getKindeServerSession();
     const user=await getUser();

     if(!user){
        return redirect("/api/auth/register")
     }
    

    const title=formData.get("title");
    const content=formData.get("content");
    const url=formData.get("url");

   

    await prisma.blogPost.create({

        data:{
            title:title as string,
            content:content as string,
            imageUrl:url as string,
            authorId:user?.id as string ,
            authorName:user?.given_name as string,
            authorImage:user?.picture as string,



        },
    });  
    revalidatePath("/blogs");        
   
    return redirect("/dashboard");
}

export async function createContest(formData: FormData) {
    const {getUser}=getKindeServerSession();
     const kindeUser=await getUser();
  
     if(!kindeUser){
        return redirect("/api/auth/register")
     }
     const user = await prisma.user.findUnique({
        where: { kindeId:kindeUser.id } 
     });
     if(!user)return

    const allowed = await isAdmin();
    if (!allowed) redirect("/unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const rawStartTime = formData.get("startTime") as string;

const startTime = dayjs.tz(rawStartTime, "Asia/Kolkata").toDate();
const endTime = dayjs.tz(formData.get("endTime") as string, "Asia/Kolkata").toDate();

  const questions = [];

  for (let i = 0; i < 10; i++) {
    const text = formData.get(`questions[${i}][text]`) as string;
    const options = formData.getAll(`questions[${i}][options][]`) as string[];
    const answer = parseInt(formData.get(`questions[${i}][answer]`) as string);

    if (!text || options.length !== 4 || isNaN(answer)) {
      throw new Error(`Invalid data in question ${i + 1}`);
    }

    questions.push({ text, options, answer });
  }

  const contest = await prisma.contest.create({
    data: {
      title,
      description,
      startTime,
      endTime,
      hostId: user.id,
      questions: {
        create: questions
      }
    }
  });
 
  revalidatePath("/contest");

  redirect(`/contest`);
}

export async function submitAnswer({
  questionId,
  selected,
  userId,
  contestId,
}: {
  questionId: string;
  selected: number;
  userId: string;
  contestId: string;
}){
  try{
     const now = new Date();
  const contest = await prisma.contest.findUnique({
    where: { id: contestId },
    select: { startTime: true, endTime: true },
  });

  if (!contest) {
    return { status: "error", message: "Contest not found" };
  }

  if (now.getTime() > contest.endTime.getTime()) {
    return { status: "error", message: "Contest has already ended" };
  }
    const existing = await prisma.submission.findUnique({
    where: {
      userId_contestId_questionId: {
        userId,
        contestId,
        questionId,
      },
    },
  });

  if (existing) {
    return { status: "error", message: "Already submitted" };
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { answer: true },
  });

  if (!question) throw new Error("Invalid question");
  
  const isCorrect = question.answer === selected;

  // Save submission
  await prisma.submission.create({
    data: {
      userId,
      contestId,
      questionId,
      selected: selected,
      isCorrect:isCorrect
    },
  });

 

  const score = await prisma.score.upsert({
    where: {
      userId_contestId: {
        userId,
        contestId,
      },
    },
    update: {
      points: {
        increment: isCorrect ? 4 : -1,
      },
    },
    create: {
      userId,
      contestId,
      points: isCorrect ? 4 : -1,
    },
    include: {
      user: true,
    },
  });
   
  const channel = ablyServer.channels.get(`contest-${contestId}`);
  await channel.publish("score-update", {
    userId: score.userId,
    username: score.user.username,
    points: score.points,
    submittedAt:score.submittedAt,
  });

  ablyServer.close()
  revalidatePath(`/contest/${contestId}`);
  return { status: "success", isCorrect };
}
catch{
  if (ablyServer && ablyServer.connection.state === 'connected') {
        ablyServer.close();
    }
  return {status:"error", message:"server error during submission"}
}
}
