import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { auth } from "../../lib/auth";
import sql from "../../lib/db";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    // 1. Check authentication
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return Response.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // 2. Get request data
    const body = (await req.json()) as {
      message?: unknown;
      conversationId?: string;
    };

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const conversationId =
      typeof body.conversationId === "string" &&
      body.conversationId.trim()
        ? body.conversationId
        : undefined;

    if (!message) {
      return Response.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // 3. Find existing conversation OR create new one
    let currentConversationId: string;

    if (conversationId) {
      const conversations = await sql`
        SELECT id
        FROM conversations
        WHERE id = ${conversationId}
          AND user_id = ${userId}
        LIMIT 1
      `;

      if (conversations.length === 0) {
        return Response.json(
          { error: "Conversation not found." },
          { status: 404 }
        );
      }

      currentConversationId = String(conversations[0].id);
    } else {
      const newConversation = await sql`
        INSERT INTO conversations (
          user_id,
          title
        )
        VALUES (
          ${userId},
          ${"New Chat"}
        )
        RETURNING id
      `;

      if (newConversation.length === 0) {
        throw new Error("Failed to create conversation.");
      }

      currentConversationId = String(newConversation[0].id);
    }

    // 4. Get previous messages
    const previousMessages = await sql`
      SELECT role, content
      FROM messages
      WHERE conversation_id = ${currentConversationId}
      ORDER BY created_at ASC
    `;

    // 5. Save user's current message
    await sql`
      INSERT INTO messages (
        conversation_id,
        role,
        content
      )
      VALUES (
        ${currentConversationId},
        ${"user"},
        ${message}
      )
    `;

    // 6. Convert database messages to Gemini history
    const history = previousMessages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: String(msg.content),
        },
      ],
    }));

    // 7. Create Gemini chat with previous conversation
    const chat = ai.chats.create({
      model: "gemini-flash-latest",
      history,
    });

    // 8. Send current question
    const response = await chat.sendMessage({
      message,
    });

    const reply = response.text;

    if (!reply || !reply.trim()) {
      throw new Error("AI returned an empty response.");
    }

    // 9. Save AI response
    await sql`
      INSERT INTO messages (
        conversation_id,
        role,
        content
      )
      VALUES (
        ${currentConversationId},
        ${"assistant"},
        ${reply}
      )
    `;

    // 10. Update conversation
    await sql`
      UPDATE conversations
      SET
        updated_at = NOW(),
        title = CASE
          WHEN title = 'New Chat'
          THEN LEFT(${message}, 50)
          ELSE title
        END
      WHERE id = ${currentConversationId}
    `;

    // 11. Return result
    return Response.json({
      reply,
      conversationId: currentConversationId,
    });
  } catch (error) {
    console.error("CHAT API ERROR:", error);

    return Response.json(
      {
        error: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}