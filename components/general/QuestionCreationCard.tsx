
import { Textarea } from "../ui/textarea"


type QuestionCardProps={
   i:number,
 }
export function QuestionCreationCard({i}:QuestionCardProps){
    return (
         <div key={i} className="border p-4 rounded space-y-2">

        
        <h2 className="font-semibold">Question {i + 1}</h2>
        <Textarea name={`questions[${i}][text]`} placeholder="Question text" className="border p-2 w-full" >
          
          </Textarea>
          
          <input name={`questions[${i}][options][]`} placeholder="Option A" className="border p-2 w-full" />
          <input name={`questions[${i}][options][]`} placeholder="Option B" className="border p-2 w-full" />
          <input name={`questions[${i}][options][]`} placeholder="Option C" className="border p-2 w-full" />
          <input name={`questions[${i}][options][]`} placeholder="Option D" className="border p-2 w-full" />

          <select name={`questions[${i}][answer]`} className="border p-2 w-full">
            <option value="0">Correct Option: A</option>
            <option value="1">Correct Option: B</option>
            <option value="2">Correct Option: C</option>
            <option value="3">Correct Option: D</option>
          </select>
          </div>
    )
}