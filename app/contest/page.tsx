import {prisma} from "../utils/db"
import { ContestCard } from "@/components/general/ContestCard";

export const revalidate=60;

async function getContests(){
  const contests=await prisma.contest.findMany({
    select:{
      id:true,
      title:true,
      description:true,
      startTime   :true,
      endTime    :true ,
      isActive:true,
      hostId:true,
      _count:{
        select:{
          scores:true,
        }
      }
    },
    orderBy:{
      startTime:"desc",
    }
    
  });
  return contests;
}

export default async function Contest() {
  const contests=await getContests();

  return (

       <div className="py-6">
      
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          Contests
        </h1>
        <div className=" ">
         {
          contests.map((contest)=>(
              <div key={contest.id} className="p-2 ">
            
                
                <ContestCard title={contest.title} startTime={contest.startTime} endTime={contest.endTime} id={contest.id} count={contest._count.scores}/>
            
            
            </div>
          ))
         }
        </div>
       </div>
   
  );
}
