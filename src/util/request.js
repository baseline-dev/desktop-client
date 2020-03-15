import https from 'https';
import http from 'http';
import path from 'path';
import {readFileSync} from 'fs';
import {homedir} from 'os';
import Url from 'url';

const jwtFile = path.join(homedir(), '.baseline', 'baseline');

function post(url, body, options) {
  return new Promise((resolve, reject) => {
    const postUrl = Url.parse(url);
    const jwt = readFileSync(jwtFile).toString().trim();

    body = JSON.stringify(body);

    const options = {
      hostname: postUrl.hostname,
      port: postUrl.port || 443,
      path: postUrl.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
        'Authorization': `Bearer ${jwt}`
      }
    };

    const request = postUrl.protocol === 'http:' ? http : https;

    const req = request.request(options, (res) => {
      const body = [];
      res.on('data', (d) => {
        body.push(d);
      });

      res.on('end', () => {
        if (res.statusCode === 500) reject({
          status: 500,
          message: body.toString()
        });

        if (res.statusCode === 401) reject({
          status: 401,
          message: body.toString()
        });

        try {
          const response = JSON.parse(body);
          resolve(response);
        } catch(e) {
          reject({
            status: 500,
            message: e.message
          });
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
