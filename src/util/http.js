import http from 'http';
import config from './config';
import url from 'url';

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': config.service.allowOrigin,
  'Access-Control-Allow-Headers': 'content-type',
  'Content-Type': 'application/json'
};

function stopServer(server) {
  server.close();
}

class Server {
  constructor() {
    this.routes = {
      post: {},
      get: {}
    };

    // Binding to scope as the build tool doesn't support
    // arrow functions.
    this.handlePost = this.handlePost.bind(this);
    this.noHandler = this.noHandler.bind(this);
    this.requestListener = this.requestListener.bind(this);

    this.server = http.createServer(this.requestListener);
  }

  async requestListener(nodeReq, nodeRes) {
    const method = nodeReq.method.toLowerCase();
    const req = {
      url: url.parse(nodeReq.url),
      method: nodeReq.method
    };
    const res = {
      headers: DEFAULT_HEADERS
    };

    try {
      switch (method) {
        case 'options':
          res.status = 200;
          break;
        case 'post':
          await this.handlePost(nodeReq, req, res);
          break;
        case 'get':
          await this.handleGet(nodeReq, req, res);
          break;
        default:
          await this.noHandler(nodeReq, req, res);
          break;
      }
    } catch(e) {
      res.status = 500;
    }

    nodeRes.writeHead(res.status || 200, res.headers);

    let body;
    if (res.body) body = JSON.stringify(res.body);
    nodeRes.end(body);
  };

  async noHandler(nodeReq, ctx, res) {
    res.status = 404;
  }

  async handlePost(nodeReq, req, res) {
    return new Promise((resolve, reject) => {
      const {pathname} = req.url;
      const chunks = [];

      nodeReq.on('data', chunk => chunks.push(chunk));

      nodeReq.on('end', async () => {
        const data = Buffer.concat(chunks);

        let promise;
        if (typeof this.routes.post[pathname] === 'function') {
          promise = this.routes.post[pathname]({
            body: JSON.parse(data.toString())
          }, res);
        } else {
          promise = this.noHandler(nodeReq, {}, res);
        }

        promise
          .then(resolve)
          .catch(reject);
      });
    });
  }

  async handleGet(nodeReq, req, res) {
    const {pathname} = req.url;

    if (typeof this.routes.get[pathname] === 'function') {
      await this.routes.get[pathname]({}, res);
    } else {
      await this.noHandler(nodeReq, {}, res);
    }
  }

  post(route, handler) {
    this.routes.post[route] = handler;
  }

  get(route, handler) {
    this.routes.get[route] = handler;
  }

  listen(port) {
    this.port = port;
    this.server.listen(port);
  }

  stop() {
    this.server.close();
  }
}

export {
  Server
};
