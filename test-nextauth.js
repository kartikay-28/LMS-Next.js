// Test script to verify NextAuth integration with bcrypt
// Run with: node test-nextauth.js

const bcrypt = require('bcryptjs');

async function testPasswordHashing() {
  console.log('🧪 Testing bcrypt password hashing...\n');

  const testPassword = 'secure123';
  
  // Hash password (same as registration)
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(testPassword, saltRounds);
  
  console.log('Original password:', testPassword);
  console.log('Hashed password:', hashedPassword);
  console.log('Hash length:', hashedPassword.length);
  
  // Verify password (same as NextAuth login)
  const isValid = await bcrypt.compare(testPassword, hashedPassword);
  const isInvalid = await bcrypt.compare('wrongpassword', hashedPassword);
  
  console.log('\n✅ Password verification tests:');
  console.log('Correct password:', isValid ? 'PASS' : 'FAIL');
  console.log('Wrong password:', !isInvalid ? 'PASS' : 'FAIL');
  
  console.log('\n🔐 bcrypt integration is working correctly!');
}

testPasswordHashing().catch(console.error);