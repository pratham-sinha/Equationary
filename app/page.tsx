import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getOrCreateUser } from "./utils/getOrCreateUser";
import LandingPage from "./pages/LandingPage";

export default async function Home() {
 
//try to do this when there is serious need of user like joining contest or creating a blog
  const { getUser,isAuthenticated } = getKindeServerSession();
 // const kindeUser = await getUser();
  const isUserAuthenticated=await isAuthenticated();

 if(isUserAuthenticated){
   await getOrCreateUser();
 }

  return (
     <div>
      
         <LandingPage />
     </div>

      
   
  );
}
