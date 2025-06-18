import type { APIRoute } from "astro";
import { connectToDB } from "../../lib/mongo";
 
export const POST: APIRoute = async ({ request }) => {
  try {
    const { title, description, githubLink } = await request.json();
 
    if (!title || !description || !githubLink) {
      return new Response(JSON.stringify({ error: "All fields required" }), {
        status: 400,
      });
    }
 
    const db = await connectToDB();
 
    const result = await db.collection("Formdetails").insertOne({
      title,
      description,
      githubLink,
      createdAt: new Date(),
    });
 
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
      status: 200,
    });
 
   
  } catch (err) {
    console.error("API Error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
 
// "/api/PostForm"
// data
// {
//     "title": "My Project1",
//     "description": "This is a test project",
//     "githubLink": "https://github.com/myrepo"
// }
 
 