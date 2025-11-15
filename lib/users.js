import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function findUserByEmail(email) {
  const client = await clientPromise.conn;
  const db = client.db();
  return db.collection('users').findOne({ email });
}

export async function createUser({ email, password, name }) {
  const client = await clientPromise.conn;
  const db = client.db();
  const hash = await bcrypt.hash(password, 10);
  const result = await db.collection('users').insertOne({
    email,
    name,
    password: hash,
    role: 'admin',
    createdAt: new Date(),
  });
  return { insertedId: result.insertedId, email, name };
}

export async function verifyUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
  // remove password before returning
  delete user.password;
  return user;
}
