import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let cached = global.__mongoClientPromise;

if (!cached && uri) {
  const client = new MongoClient(uri, {
    // use recommended options as needed
  });
  cached = { conn: client.connect(), client };
  global.__mongoClientPromise = cached;
}

// Export cached connection or a promise that will reject if URI is not set
export default cached || {
  conn: Promise.reject(new Error('Please define the MONGODB_URI environment variable inside .env.local')),
  client: null,
};
