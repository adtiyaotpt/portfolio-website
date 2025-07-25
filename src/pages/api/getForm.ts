import type { APIRoute } from "astro";
import { connectToDB } from "../../lib/mongo";

export const GET: APIRoute = async ({ url }) => {
  try {
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    const db = await connectToDB(); // ✅ MOVE THIS UP HERE

    const total = await db.collection("Formdetails").countDocuments();

    const formDetails = await db
      .collection("Formdetails")
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return new Response(
      JSON.stringify({ success: true, data: formDetails, total }), // ✅ include `total` here
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("GET API Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
