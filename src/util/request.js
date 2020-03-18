import https from 'https';
import http from 'http';
import Url from 'url';
import merge from 'lodash.merge';

import config from './config';
import {getCredentials} from './baseline-settings';

function post(url, body, options = {}) {
  return new Promise((resolve, reject) => {
    const postUrl = Url.parse(`${config.baselineApiUrl}${url}`);

    body = JSON.stringify(body);

    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    };

    const credentials = getCredentials();
    if (credentials) {
      headers.Authorization = `Bearer ${credentials}`;
    }

    const requestOptions = {
      hostname: postUrl.hostname,
      port: postUrl.port || 443,
      path: postUrl.path,
      method: 'POST',
      headers: merge(headers, options.headers)
    };

    const request = postUrl.protocol === 'http:' ? http : https;

    const req = request.request(requestOptions, (res) => {
      const body = [];
      res.on('data', (d) => {
        body.push(d);
      });

      res.on('end', () => {
        if (res.statusCode === 500) {
          resolve({
            status: 500,
            body: body.toString()
          });
        } else if (res.statusCode === 401) {
          resolve({
            status: 401,
            body: body.toString()
          });
        } else {
          try {
            resolve({
              status: res.statusCode,
              body: JSON.parse(body)
            });
          } catch(e) {
            resolve({
              status: 500,
              body: e.message
            });
          }
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
