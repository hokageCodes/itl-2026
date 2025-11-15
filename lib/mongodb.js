import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.__mongoClientPromise;

if (!cached) {
  const client = new MongoClient(uri, {
    // use recommended options as needed
  });
  cached = { conn: client.connect(), client };
  global.__mongoClientPromise = cached;
}

export default cached;
