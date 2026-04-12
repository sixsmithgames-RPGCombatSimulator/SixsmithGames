const fs = require('fs');
const https = require('https');

// Read environment variables from .env.local
let envContent = '';
try {
  envContent = fs.readFileSync('.env.local', 'utf8');
} catch (err) {
  console.error('Could not read .env.local:', err.message);
  process.exit(1);
}

const gistMatch = envContent.match(/BLOG_GIST_ID=(.+)/);
const tokenMatch = envContent.match(/BLOG_GITHUB_TOKEN=(.+)/);

if (!gistMatch || !tokenMatch) {
  console.error('BLOG_GIST_ID or BLOG_GITHUB_TOKEN not found in .env.local');
  process.exit(1);
}

const gistId = gistMatch[1].trim();
const token = tokenMatch[1].trim();

console.log('Fetching posts from Gist:', gistId);

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: `/gists/${gistId}`,
  method: 'GET',
  headers: {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'SixsmithGames-Blog-Sync'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const gistData = JSON.parse(data);
      const postsContent = gistData.files?.['posts.json']?.content || '[]';
      const posts = JSON.parse(postsContent);
      
      console.log('Found', posts.length, 'dynamic posts:');
      console.log(JSON.stringify(posts, null, 2));
      
      // Save to a temporary file for reference
      fs.writeFileSync('dynamic-posts.json', JSON.stringify(posts, null, 2));
      console.log('\nSaved to dynamic-posts.json for reference');
      
    } catch (err) {
      console.error('Error parsing response:', err.message);
      console.error('Response data:', data);
    }
  });
});

req.on('error', (err) => {
  console.error('Request error:', err.message);
});

req.end();
