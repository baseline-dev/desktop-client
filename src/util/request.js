import https from 'https';
import http from 'http';

import Url from 'url';

function post(url, body, options) {
  return new Promise((resolve, reject) => {
    const postUrl = Url.parse(url);

    body = JSON.stringify(body);

    const options = {
      hostname: postUrl.hostname,
      port: postUrl.port || 443,
      path: postUrl.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    };

    const request = postUrl.protocol === 'http:' ? http : https;

    const req = request.request(options, (res) => {
      const body = [];
      res.on('data', (d) => {
        body.push(d);
      });

      res.on('end', () => {
        if (res.statusCode === 500) reject(body.toString());

        try {
          const response = JSON.parse(body);
          resolve(response);
        } catch(e) {
          reject(e.message);
        }
      })
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  })
}

export {post}
