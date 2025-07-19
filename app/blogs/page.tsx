

import { BlogPostCard } from "@/components/general/BlogPostCard";
import {prisma} from "../utils/db"



async function getData(){
  const data=await prisma.blogPost.findMany({
    select:{
      title:true,
      content:true,
      imageUrl:true,
      authorImage:true,
      authorName:true,
      authorId: true,
      id:true,
      createdAt:true,
      updatedAt: true,
    },
    orderBy:{
      createdAt:"desc",
    }
  });
  return data;
}

export default async function Home() {
  const data=await getData();

  return (

       <div className="py-6">
      
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          Latest Blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {
          data.map((item)=>(
            <BlogPostCard data={item} key={item.id}/>
          ))
         }
        </div>
       </div>
   
  );
}

