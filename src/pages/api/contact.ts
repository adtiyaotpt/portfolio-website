import type { APIRoute } from "astro";

import { connectToDB } from "../../lib/mongo";
 
export const POST: APIRoute = async ({ request }) => {

  const { name, email, message } = await request.json();

  const db = await connectToDB();
 
  await db.collection("contacts").insertOne({ name, email, message });
 
  return new Response(JSON.stringify({ success: true }), { status: 200 });
//"/api/contact"
};

 