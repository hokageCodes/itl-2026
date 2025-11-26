import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

async function findUserByEmail(email) {
  const client = await MongoClient.connect(uri);
  const db = client.db(); // Uses database from connection string
  const user = await db.collection('users').findOne({ email });
  await client.close();
  return user;
}

async function createUser({ email, password, name }) {
  const client = await MongoClient.connect(uri);
  const db = client.db(); // Uses database from connection string
  const hash = await bcrypt.hash(password, 10);
  const result = await db.collection('users').insertOne({
    email,
    name,
    password: hash,
    role: 'admin',
    createdAt: new Date(),
  });
  await client.close();
  return { insertedId: result.insertedId, email, name };
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@itlconference.ca';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User';

async function seedAdmin() {
  try {
    console.log('🌱 Starting admin seed...');
    
    // Check if admin already exists
    const existing = await findUserByEmail(ADMIN_EMAIL);
    if (existing) {
      console.log('⚠️  Admin user already exists:', ADMIN_EMAIL);
      console.log('   Skipping seed. To reseed, delete the user from the database first.');
      return;
    }

    // Create admin user
    console.log('📝 Creating admin user...');
    const result = await createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    });

    console.log('✅ Admin user created successfully!');
    console.log('   Email:', ADMIN_EMAIL);
    console.log('   Name:', ADMIN_NAME);
    console.log('   ID:', result.insertedId);
    console.log('\n🔐 You can now login with these credentials at /admin-login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();

