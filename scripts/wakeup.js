const https = require('https');

const BACKEND_URL = 'https://weybee-backend.onrender.com/api/health';
const RETRY_INTERVAL = 10000; // 10 seconds

function wakeUpServer() {
  console.log(`[${new Date().toLocaleTimeString()}] Pinging ${BACKEND_URL} to wake up the server...`);
  
  https.get(BACKEND_URL, (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Server is awake, database is connected, and API is fully ready!');
      process.exit(0);
    } else {
      console.log(`⚠️ Server returned status ${res.statusCode}. It might still be starting. Retrying in 10 seconds...`);
      setTimeout(wakeUpServer, RETRY_INTERVAL);
    }
  }).on('error', (err) => {
    console.log(`⏳ Server is still spinning up (Error: ${err.message}). Retrying in 10 seconds...`);
    setTimeout(wakeUpServer, RETRY_INTERVAL);
  });
}

wakeUpServer();
