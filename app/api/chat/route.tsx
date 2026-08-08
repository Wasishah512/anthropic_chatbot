import { GoogleGenAI } from "@google/genai";
import { auth } from "../../lib/auth";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    // Check logged-in user
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return Response.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    // This is the authenticated user's Better Auth ID
    const userId = session.user.id;

    console.log("Logged-in user:", userId);

    const { message } = await req.json();

    const chat = ai.chats.create({
      model: "gemini-flash-latest",
    });

    const response = await chat.sendMessage({
      message,
    });

    return Response.json({
      reply: response.text,
      userId,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}