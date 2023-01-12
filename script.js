const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const urlData = url.parse(req.url, true);
  if (urlData.pathname === '/sync') {
    const videoId = urlData.query.videoId;
    const timestamp = urlData.query.t;
    // Save the videoId and timestamp to a file or a database
    // ...
    fs.writeFile(`video-${timestamp}.txt`, videoId, (err) => {
      if (err) throw err;
    });
    res.writeHead(301, { Location: `/watch.html?videoId=${videoId}&t=${timestamp}` });
    res.end();
  } else if (urlData.pathname === '/watch.html') {
    // Read the videoId and timestamp from the file or database
    // ...
    fs.readFile(`video-${urlData.query.t}.txt`, 'utf8', (err, data) => {
      if (err) throw err;
      const videoId = data;
      // Send the HTML file with the videoId and timestamp
      fs.readFile('watch.html', 'utf8', (err, data) => {
        if (err) throw err;
        data = data.replace('VIDEO_ID', videoId);
        data = data.replace('TIMESTAMP', urlData.query.t);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
