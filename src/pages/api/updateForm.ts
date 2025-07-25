import type { APIRoute } from "astro";
import { connectToDB } from "../../lib/mongo";
import { ObjectId } from "mongodb";
 
export const PUT: APIRoute = async ({ request }) => {
  try {
    const { id, title, description, githubLink } = await request.json();
 
    if (!id || !title || !description || !githubLink) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }
 
    const db = await connectToDB();
 
    const result = await db.collection("Formdetails").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          githubLink,
          updatedAt: new Date(),
        },
      }
    );
 
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
      });
    }
 
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
 
  } catch (err) {
    console.error("Update Error:", err);
 
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
 
 