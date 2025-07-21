"use client";

import { useState,useEffect } from "react";
import { submitAnswer } from "@/app/actions";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import RenderMathText from "../Extras/RenderMathText";

type Submission={
  questionId:string,
  selected:number,
  isCorrect:boolean
}

export type QuestionProps = {
  question: {
    id: string;
    text: string;
    options: string[];
  };
  userId: string;
  contestId: string;
  alreadySubmitted: boolean;
  submissions:Submission[];
  onSubmitSuccess: () => void;
};

export function QuestionCard({
  question,
  userId,
  contestId,
  alreadySubmitted,
  submissions,
  onSubmitSuccess,
}: QuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
   useEffect(() => {
    // If the question becomes 'alreadySubmitted', reset the submitting state
    // This handles cases where the prop changes without a full remount.
    if (alreadySubmitted) {
      setSubmitting(false);
      setSelected(null); // Also reset selected option if it's already submitted
    }
  }, [alreadySubmitted]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected === null) return;

    setSubmitting(true); 

    try {
  const res = await submitAnswer({
    questionId: question.id,
    selected,
    contestId,
    userId,
  });

  if (res?.status === "success") {
    setSubmitting(false);
    onSubmitSuccess();
  } else {
    setSubmitting(false);
    alert(res?.message || "Submission failed");
  }
} catch (error) {
  alert("Something went wrong while submitting.");
} finally {
  setSubmitting(false);
}

  }

  const isDisabled = alreadySubmitted || submitting;
  const currSubmission=submissions.find((s) => s.questionId===question.id);


  return (
    <form onSubmit={handleSubmit} className="border-2 border-zinc-900 p-4 rounded-xl space-y-3 w-full">
      <RenderMathText as={"h2"} className="text-base md:text-lg font-semibold mb-2 nocopy"  content={question?.text}/>

      {question?.options.map((opt, idx) => (
       <button
    key={idx}
    type="button"
    disabled={alreadySubmitted}
    onClick={() => setSelected(idx)}
    className={`w-full text-left p-3 border rounded mb-2 transition-all
      ${
        alreadySubmitted
          ? currSubmission?.selected === idx && currSubmission.isCorrect
            ? 'bg-green-500 text-white border-green-600' //selected and correct
            : currSubmission?.selected === idx && !currSubmission.isCorrect
              ? 'bg-red-500 text-white border-red-600'   //selected and wrong
              : currSubmission?.isCorrect
                ? 'bg-green-100 text-green-800 border-green-300' //correct but not selected
                : 'bg-white text-black dark:bg-zinc-700' //default after submit
          : selected === idx
            ? 'bg-blue-500 text-white border-blue-600' //selecting before submit
            : 'bg-white text-black dark:bg-zinc-700 hover:scale-101'
      }`}
  >
    {opt}
  </button>
        
      ))}

      <Button
        type="submit"
         
        className="cursor-pointer"
        disabled={isDisabled || selected === null || submitting}
       
      >
        {alreadySubmitted
          ? "Submitted"
          : submitting
          ? <>
          <Loader2 className='size-5 animate-spin'/>
           Submitting...
            </>
          : "Submit"}
      </Button>
    </form>
  );
}
