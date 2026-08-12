import { NextRequest } from "next/server";
import { auth } from "../../lib/auth";
import sql from "../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const conversations = await sql`
      SELECT
        id,
        title,
        created_at,
        updated_at
      FROM conversations
      WHERE user_id = ${session.user.id}
      ORDER BY updated_at DESC
    `;

    return Response.json({
      conversations,
    });
  } catch (error) {
    console.error("GET CONVERSATIONS ERROR:", error);

    return Response.json(
      { error: "Failed to load conversations" },
      { status: 500 }
    );
  }
}