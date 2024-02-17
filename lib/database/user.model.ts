import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioLink?: string;
  reputation: number;
  joinDate: Date;
  savedPosts: Schema.Types.ObjectId[];
}

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true, // Assuming Clerk ID is unique for each user
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Usernames should be unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email addresses should be unique
  },
  password: {
    type: String,
    // Password may not be required if using alternative auth methods
  },
  bio: {
    type: String,
    // Optional field, users may not have a bio
  },
  picture: {
    type: String,
    // URL to the user's picture, optional
  },
  location: {
    type: String,
    // Optional field, not all users may want to share their location
  },
  portfolioWebsite: {
    type: String,
    // Optional field, not all users have a portfolio
  },
  reputation: {
    type: Number,
    default: 0, // Optional field, can be used for gamification, starts at 0
  },
  joinedAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date when a new user is created
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post", // Assuming you have a Post model
      // This field will store references to posts saved by the user
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
