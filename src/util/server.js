import http from 'http';
import config from './config';

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': config.service.allowOrigin,
  'Access-Control-Allow-Headers': 'content-type'
};

async function startServer(port) {
  const requestListener = function (req, res) {
    if (req.method === 'OPTIONS') {
      res.writeHead(200, DEFAULT_HEADERS);
      res.end();
    }

    if (req.method === 'POST') {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', async () => {
        const data = Buffer.concat(chunks);
        server.emit('keys', JSON.parse(data.toString()).credentials);
      });
      res.writeHead(200, DEFAULT_HEADERS);
      res.end('OK');
    }

    res.writeHead(200);
    res.end('Hi!');
  };

  const server = http.createServer(requestListener);
  server.listen(port);
  return server;
}

function stopServer(server) {
  server.close();
}

export {
  startServer,
  stopServer
};
