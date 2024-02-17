import { Schema, models, model, Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag", // Assuming you have a Tag model
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
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
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming the author is a user from the User model
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer", // Assuming you have an Answer model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
