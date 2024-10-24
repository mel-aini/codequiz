import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { Difficulty } from "@prisma/client";
import { AIchatSession } from "@/utils/gemini";
import { api } from "@/trpc/server";

interface Input {
  topic: string;
  difficulty: string;
  questionNumber: number;
  totalQuestions: number;
}

function getPrompt(input: Input) {
  return (
    `Create a multiple-choice programming question for the topic: ${input.topic}.
  this quiz has 3 difficulties: beginner, intermediate and advanced, and each level has ${input.totalQuestions} questions.
  the question number is ${input.questionNumber} from ${input.totalQuestions} questions with the difficulty ${input.difficulty}.

  The question should be in the following format:

  1. **Question**: Provide the question that needs to be answered.
  2. **Options**: Give four options in a clear A, B, C, D format.
  3. **Correct Answer**: Specify the correct option (A, B, C, or D).
  4. **Explanation**: Briefly explain why the correct answer is right.

  Example:
  - Question: What does the <a> tag represent in HTML?
  - Options:
    A) Audio element
    B) Anchor (link) element
    C) Article element
    D) Alert box
  - Correct Answer: B
  - Explanation: The <a> tag is used to create hyperlinks, which is why B is correct.
  
  Please follow this structure exactly for all questions.
  
  the response should be in json format like this:
  {
    question: string,
    options: string[],
    correctAnswer: 0 | 1 | 2 | 3,
    explanation: string
  }
  `
  )
}

export const questionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ 
        topicId: z.string(), 
        difficulty: z.string(), 
        questionNumber: z.number(),
        totalQuestions: z.number()
     }))
    .mutation(async ({ ctx, input }) => {
        const topic = await ctx.db.topic.findUnique({
          where: {
            id: input.topicId
          }
        })

        if (!topic) return null
      
        const prompt = getPrompt({
          topic: topic.name,
          difficulty: input.difficulty,
          questionNumber: input.questionNumber,
          totalQuestions: input.totalQuestions,
        });
      
        const response = await AIchatSession.sendMessage(prompt);
        return response.response.text().replace(/^```json|```$/g, "");
    })
});
