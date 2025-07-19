import { buttonVariants } from "@/components/ui/button"

import Link from "next/link"
import { prisma } from "../utils/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { BlogPostCard } from "@/components/general/BlogPostCard"
import { isAdmin } from "../utils/isAdmin"

async function getMyBlogs(userId:string){
  const data=await prisma.blogPost.findMany({
    where:{
      authorId:userId as string,
    },
    orderBy:{
      createdAt:"desc",
    }
  })
  return data;
}

export default async function DashboardRoute() {
  const {getUser}=getKindeServerSession();
  const user=await getUser();
  const allowed=await isAdmin();

  if(!user)return

  const data=await getMyBlogs(user.id);

  return (
    <div>
      <div className="flex items-center  justify-between mb-4 ">
        <h2 className="text-xl font-medium">Your Blogs</h2>
        <div className="gap-2 flex ">

        <Link className={buttonVariants()} href="/dashboard/create-blog">Create Post</Link>
        {allowed && (
  <Link className={buttonVariants()} href="/dashboard/create-contest">
    Create Contest
  </Link>
)}
        </div>

      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {
          data.map((item)=>(
            <BlogPostCard data={item} key={item.id}/>
          ))
         }
        </div>
    </div>
  )
}


