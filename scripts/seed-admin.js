#!/usr/bin/env node

/**
 * Seed script to create the first admin account
 * Usage: node scripts/seed-admin.js [email] [password] [name]
 */

import { config } from "dotenv";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI environment variable not set");
  console.error("   Set it in your .env.local file");
  process.exit(1);
}

async function seedAdmin() {
  const email = process.argv[2] || "admin@example.com";
  const password = process.argv[3] || "AdminPassword123!";
  const name = process.argv[4] || "Admin User";

  console.log("\n🌱 Seeding admin account...");
  console.log(`   Email: ${email}`);
  console.log(`   Name: ${name}`);
  console.log(`   Password: ${password}\n`);

  let client;
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existing = await usersCollection.findOne({ email });
    if (existing) {
      console.log(`⚠️  Admin user with email "${email}" already exists`);
      process.exit(0);
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create admin user
    const result = await usersCollection.insertOne({
      email,
      name,
      password: hash,
      role: "admin",
      createdAt: new Date(),
    });

    console.log(`✅ Admin account created successfully!`);
    console.log(`   ID: ${result.insertedId}`);
    console.log(`\n📝 You can now login with:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("✅ Disconnected from MongoDB\n");
    }
  }
}

seedAdmin();
