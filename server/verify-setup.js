#!/usr/bin/env node

/**
 * EduLearn Platform - Setup Verification Script
 * Run this script to verify your development environment is ready
 */

const fs = require('fs');
const path = require('path');

console.log('\n🎓 EduLearn Platform - Setup Verification\n');
console.log('='.repeat(50));

let errors = 0;
let warnings = 0;

// Check Node.js version
console.log('\n📦 Checking Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 14) {
  console.log(`✅ Node.js ${nodeVersion} (OK)`);
} else {
  console.log(`❌ Node.js ${nodeVersion} (Need v14 or higher)`);
  errors++;
}

// Check required files
console.log('\n📄 Checking required files...');
const requiredFiles = [
  'server.js',
  'package.json',
  '.env.example',
  'config/db.js',
  'client/package.json',
  'client/src/App.js'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} (Missing)`);
    errors++;
  }
});

// Check environment file
console.log('\n🔐 Checking environment configuration...');
if (fs.existsSync('.env')) {
  console.log('✅ .env file exists');
  const envContent = fs.readFileSync('.env', 'utf8');
  
  const requiredVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET', 'JWT_EXPIRE'];
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`✅ ${varName} configured`);
    } else {
      console.log(`⚠️  ${varName} not found in .env`);
      warnings++;
    }
  });
} else {
  console.log('⚠️  .env file not found (copy from .env.example)');
  warnings++;
}

// Check client environment
console.log('\n🎨 Checking frontend configuration...');
if (fs.existsSync('client/.env')) {
  console.log('✅ client/.env file exists');
} else {
  console.log('⚠️  client/.env not found (copy from client/.env.example)');
  warnings++;
}

// Check dependencies
console.log('\n📚 Checking dependencies...');
if (fs.existsSync('node_modules')) {
  console.log('✅ Backend dependencies installed');
} else {
  console.log('⚠️  Backend dependencies not installed (run: npm install)');
  warnings++;
}

if (fs.existsSync('client/node_modules')) {
  console.log('✅ Frontend dependencies installed');
} else {
  console.log('⚠️  Frontend dependencies not installed (run: cd client && npm install)');
  warnings++;
}

// Check documentation
console.log('\n📖 Checking documentation...');
const docs = ['README.md', 'DEPLOYMENT.md', 'TESTING.md', 'QUICKSTART.md'];
docs.forEach(doc => {
  if (fs.existsSync(doc)) {
    console.log(`✅ ${doc}`);
  } else {
    console.log(`⚠️  ${doc} (Missing)`);
    warnings++;
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 Verification Summary:\n');

if (errors === 0 && warnings === 0) {
  console.log('✅ Perfect! Your setup is complete and ready to go!');
  console.log('\n🚀 Next steps:');
  console.log('   1. Start MongoDB: mongod');
  console.log('   2. Run backend: npm run dev');
  console.log('   3. Run frontend: cd client && npm start');
  console.log('   4. Visit: http://localhost:3000');
} else {
  if (errors > 0) {
    console.log(`❌ ${errors} error(s) found - Please fix before proceeding`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} warning(s) found - Recommended to fix`);
  }
  console.log('\n📖 See QUICKSTART.md for detailed setup instructions');
}

console.log('\n' + '='.repeat(50));
console.log('\n💡 Tip: Run "npm run dev:full" to start both servers\n');

process.exit(errors > 0 ? 1 : 0);
