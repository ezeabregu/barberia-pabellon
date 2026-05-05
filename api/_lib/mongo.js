import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "barberia_pabellon";

if (!uri) {
  throw new Error("Missing MONGODB_URI env var");
}

let cachedClient = globalThis._mongoClient;

export async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
    globalThis._mongoClient = cachedClient;
  }
  return cachedClient.db(dbName);
}

export async function getBookingsCollection() {
  const db = await getDb();
  return db.collection("bookings");
}
