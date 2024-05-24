import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// ...

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const prompt = `You are a coding assistant, tell me ${question}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
