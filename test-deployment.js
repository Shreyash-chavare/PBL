// Test script to verify deployment configuration
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Deployment Configuration Test');
console.log('================================');

console.log('Environment Variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- PORT:', process.env.PORT || 'not set');
console.log('- JWT_TOKEN:', process.env.JWT_TOKEN ? '✅ set' : '❌ not set');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✅ set' : '❌ not set');
console.log('- FRONTEND_URL:', process.env.FRONTEND_URL || 'not set');

console.log('\nPackage.json scripts:');
console.log('- start:', 'npm start');
console.log('- dev:', 'npm run dev');

console.log('\nExpected URLs:');
console.log('- Backend: https://collaborative-editor-backend.railway.app');
console.log('- Frontend: https://collaborative-editor-frontend.railway.app');

console.log('\nHealth Check Endpoints:');
console.log('- /health - Basic health check');
console.log('- / - API information');

console.log('\n✅ Configuration test complete!');
