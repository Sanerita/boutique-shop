import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
const client = new MongoClient(uri);

let database;

export async function connectDB() {
  try {
    await client.connect();
    database = client.db();
    console.log("Connected to MongoDB");
    return database;
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
}

export function getDB() {
  if (!database) throw new Error("Database not initialized");
  return database;
}