import { isAdmin } from "@/app/utils/isAdmin";
import { QuestionCreationCard } from "@/components/general/QuestionCreationCard";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { createContest } from "@/app/actions";

export default async function CreateContestPage() {
  const allowed = await isAdmin();
  if (!allowed) redirect("/unauthorized");
  const questionIndices = [...Array(10).keys()];//0-9

  return (
    <form action={createContest}  className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Create Contest</h1>

      <Input name="title" placeholder="Contest Title (Max 50 characters)" maxLength={50} className="border p-2 block w-full" />
      <Textarea name="description" placeholder="Description" className="border p-2 block w-full" />

      {questionIndices.map((i) => (
       
          <QuestionCreationCard i={i} key={i}/>
        
      ))}

        <label className="block ">
  Start Time:
  <input
    type="datetime-local"
    name="startTime"
    required
    className="border p-2 w-full"
  />
</label>

<label className="block">
  End Time:
  <input
    type="datetime-local"
    name="endTime"
    required
    className="border p-2 w-full"
  />
</label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Contest
      </button>
    </form>
  );
}
