// Simple test script to verify the registration API
// Run with: node test-api.js

const testCases = [
  {
    name: "Valid Student Registration",
    data: {
      name: "Test Student",
      email: "test.student@example.com",
      password: "password123",
      role: "student"
    },
    expectedStatus: 201
  },
  {
    name: "Valid Admin Registration", 
    data: {
      name: "Test Admin",
      email: "test.admin@example.com",
      password: "adminpass123",
      role: "admin"
    },
    expectedStatus: 201
  },
  {
    name: "Missing Fields",
    data: {
      name: "Test User",
      email: "test@example.com"
      // Missing password and role
    },
    expectedStatus: 400
  },
  {
    name: "Invalid Email",
    data: {
      name: "Test User",
      email: "invalid-email",
      password: "password123",
      role: "student"
    },
    expectedStatus: 400
  },
  {
    name: "Short Password",
    data: {
      name: "Test User", 
      email: "short@example.com",
      password: "123",
      role: "student"
    },
    expectedStatus: 400
  },
  {
    name: "Invalid Role",
    data: {
      name: "Test User",
      email: "role@example.com", 
      password: "password123",
      role: "teacher"
    },
    expectedStatus: 400
  }
];

async function testAPI() {
  console.log('🧪 Testing Registration API...\n');
  
  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.name}`);
      
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });
      
      const result = await response.json();
      
      if (response.status === testCase.expectedStatus) {
        console.log(`✅ PASS - Status: ${response.status}`);
        if (response.status === 201) {
          console.log(`   User created: ${result.user.name} (${result.user.email})`);
        } else {
          console.log(`   Error: ${result.error}`);
        }
      } else {
        console.log(`❌ FAIL - Expected: ${testCase.expectedStatus}, Got: ${response.status}`);
        console.log(`   Response: ${JSON.stringify(result)}`);
      }
      
      console.log('');
      
    } catch (error) {
      console.log(`❌ ERROR - ${error.message}\n`);
    }
  }
  
  console.log('🏁 Testing complete!');
}

// Run tests if server is available
testAPI().catch(error => {
  console.error('Failed to run tests:', error.message);
  console.log('Make sure the development server is running: npm run dev');
});