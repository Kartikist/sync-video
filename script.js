const http = require('http');
const url = require('url');

// Store the current time of the video
let currentTime = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/sync' && req.method === 'POST') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', () => {
        const data = JSON.parse(body);
        currentTime = data.currentTime;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      });
    } else if (req.url === '/sync' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ currentTime: currentTime }));
    } else {
      res.writeHead(404);
      res.end();
    }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
