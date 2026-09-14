const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static assets from app directory, fallback to dist
const staticDir = fs.existsSync(path.join(__dirname, 'app', 'index.html'))
  ? path.join(__dirname, 'app')
  : path.join(__dirname, 'dist');

app.use(express.static(staticDir));

// Fallback to index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
