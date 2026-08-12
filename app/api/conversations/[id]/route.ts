import { NextRequest } from "next/server";
import { auth } from "../../../lib/auth";
import sql from "../../../lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check logged-in user
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const { id } = await params;

    // Make sure this conversation belongs to
    // the currently logged-in user
    const conversations = await sql`
      SELECT
        id,
        title,
        created_at,
        updated_at
      FROM conversations
      WHERE id = ${id}
        AND user_id = ${userId}
      LIMIT 1
    `;

    if (conversations.length === 0) {
      return Response.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    // Get all messages belonging to this conversation
    const messages = await sql`
      SELECT
        id,
        role,
        content,
        created_at
      FROM messages
      WHERE conversation_id = ${id}
      ORDER BY created_at ASC
    `;

    return Response.json({
      conversation: conversations[0],
      messages,
    });
  } catch (error) {
    console.error("GET CONVERSATION ERROR:", error);

    return Response.json(
      { error: "Failed to load conversation" },
      { status: 500 }
    );
  }
}