import { Schema, models, model, Document } from "mongoose";
import User from "./user.model";
import Question from "./question.model";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId[];
  question: Schema.Types.ObjectId[];
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnswerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: Question,
    required: true,
  },
  content: [
    {
      type: String,
      required: true, // Assuming you have a Tag model
    },
  ],
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming users can upvote, and you have a User model
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Similarly, assuming users can downvote
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
