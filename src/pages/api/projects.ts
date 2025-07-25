import type { APIRoute } from "astro";
import { connectToDB } from "../../lib/mongo";
import { ObjectId } from "mongodb";

export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  const db = await connectToDB();
  await db.collection("Formdetails").deleteOne({ _id: new ObjectId(id) });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

