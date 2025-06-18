import type { APIRoute } from "astro";
import { connectToDB } from "../../lib/mongo";
 
export const GET: APIRoute = async () => {
  try {
    const db = await connectToDB();
    const formDetails = await db
      .collection("Formdetails")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
 
    return new Response(JSON.stringify({ success: true, data: formDetails }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET API Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
// api/getForm