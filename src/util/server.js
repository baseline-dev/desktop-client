import http from 'http';
import config from './config';
import {getEventBus} from './event-bus';

const eventBus = getEventBus();

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': config.service.allowOrigin,
  'Access-Control-Allow-Headers': 'content-type',
  'Content-Type': 'application/json'
};

async function startServer(port) {
  const requestListener = function (req, res) {
    eventBus.on('baseline-fail', () => {
      res.writeHead(500, DEFAULT_HEADERS);
      res.end(JSON.stringify({
        status: 'error',
        message: 'Baselining failed.'
      }));
    });

    eventBus.on('baseline-success', (args) => {
      res.writeHead(200, DEFAULT_HEADERS);
      res.end(JSON.stringify({
        status: 'ok',
        message: 'Baselining succeeded.',
        result: {
          reportLocation: args.reportLocation
        }
      }));
    });

    if (req.method === 'OPTIONS') {
      res.writeHead(200, DEFAULT_HEADERS);
      res.end();
    } else if (req.method === 'POST') {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', async () => {
        const data = Buffer.concat(chunks);
        eventBus.emit('received-service-credentials', JSON.parse(data.toString()).credentials);
      });
    } else {
      res.writeHead(200, DEFAULT_HEADERS);
      res.end(JSON.stringify({
        status: 'ok',
        message: 'Hi!'
      }));
    }

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
