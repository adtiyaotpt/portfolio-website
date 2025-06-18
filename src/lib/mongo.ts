import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://adityag2712:q1w2e3r4t5y6@adityagupta.8uthmet.mongodb.net/?retryWrites=true&w=majority&appName=adityagupta"
);

let db: any;

export async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db("portfoliodb");
  }
  return db;
}
