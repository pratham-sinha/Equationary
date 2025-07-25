'use client';

import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { Button } from "../ui/button";
import { ChevronsRightIcon,ChevronsLeftIcon } from "lucide-react";

type Question = {
  id: string;
  text: string;
  options: string[];
};

type Submission={
  questionId:string,
  selected:number,
  isCorrect:boolean
}

type ContestClientProps = {
  contest: {
    id: string;
    title: string;
    description: string | null;
    questions: Question[];
  };
  userId: string | null
  submittedQuestionIds:string[];
  submissions:Submission[];
};
                                                           


export default function ContestPageClient({ contest, userId , submittedQuestionIds,submissions}: ContestClientProps) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((i) => Math.min(i + 1, contest.questions.length - 1));
  const prev = () => setCurrent((i) => Math.max(i - 1, 0));
 
  const [submittedIds, setSubmittedIds] = useState<string[]>(submittedQuestionIds);
  const currentQuestion = contest.questions[current];

  return (
  
      <div className="col-span-3 space-y-6 mb-4">
        <h1 className="text-2xl font-bold">{contest.title}</h1>
        <p className="text-md">{contest.description}</p>

        <div>
          <div className="text-sm text-gray-400 mb-2">
            Question {current + 1} 
          </div>

          <QuestionCard
           key={currentQuestion.id} 
            question={currentQuestion}
            userId={userId||""}
            contestId={contest.id}
            alreadySubmitted={submittedIds.includes(currentQuestion?.id)}
            submissions={submissions}
            onSubmitSuccess={() => setSubmittedIds((prev) => [...prev, currentQuestion?.id])}
          />

          <div className="flex gap-4 mt-3">
            <Button
              variant="secondary"
              size="icon"

              onClick={prev}
              disabled={current === 0}
              className="px-4 py-2 size-10 disabled:opacity-50  transition-all cursor-pointer"
            >
              <ChevronsLeftIcon/>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={next}
              disabled={current === contest.questions.length - 1}
              className="px-4 py-2 size-10 disabled:opacity-50  transition-all cursor-pointer"
            >
            <ChevronsRightIcon/>
            </Button>
          </div>
        </div>
      </div>

     
    
  );
}
