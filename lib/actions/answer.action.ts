"use server";

import Answer from "../database/answer.model";
import Question from "../database/question.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question } = params;

    const newAnswer = await Answer.create({ content, author, question });

    // add answer to the question's answer array

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // todo: add interaction.. for reputation that answer was added.
  } catch (error) {
    console.log(error);
    throw error;
  }
}
