const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

async function runTest() {
  console.log('--- CAMPUS OS SMOKE TEST ---');
  let token = '';

  try {
    // 1. Test Auth Login
    console.log('1. Testing Login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: 'student@campusos.com',
      password: 'password'
    });
    token = loginRes.data.data.accessToken;
    console.log('✅ Login successful');

    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: { Authorization: `Bearer ${token}` }
    });

    // 2. Test Analytics Dashboard
    console.log('2. Testing Student Analytics Dashboard...');
    const analyticsRes = await axiosInstance.get('/analytics/dashboard');
    console.log('✅ Analytics successful:', Object.keys(analyticsRes.data.data));

    // 3. Test Chat AI
    console.log('3. Testing AI Chat...');
    const chatRes = await axiosInstance.post('/ai/chat', { question: 'Hello!' });
    console.log('✅ Chat successful. Response received.');

    // 4. Test Quiz AI
    console.log('4. Testing AI Quiz...');
    const quizRes = await axiosInstance.post('/ai/quiz', { subject: 'Test', numQuestions: 2 });
    console.log('✅ Quiz successful. Total questions:', quizRes.data.data.questions.length);

    // 5. Test Documents List
    console.log('5. Testing Documents Fetch...');
    const docsRes = await axiosInstance.get('/documents');
    console.log('✅ Documents fetch successful. Count:', docsRes.data.data.documents.length);
    
    console.log('\n🎉 ALL SMOKE TESTS PASSED!');
    
  } catch (error) {
    console.error('\n❌ SMOKE TEST FAILED');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Response:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

runTest();
