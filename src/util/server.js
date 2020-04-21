import fetch from 'got';
import koaStatic from 'koa-static';
import Koa from 'koa';
import Router from 'koa-router';
import {app as electronApp, ipcMain} from 'electron';
import Store from 'electron-store';
import path from 'path';
import {readdirSync, statSync, readFileSync} from 'fs';
import nunjucks from 'nunjucks';
import http from "http";
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import log from 'electron-log';

import {encryptValue} from './keys';
import config from './config';
import {getAvailablePort} from './port';
import {getServices} from './service';


const app = new Koa();
const appCallback = app.callback();

const store = new Store();
const STATIC_PATH = path.join(__dirname, '..', 'static');

app.use(koaStatic(STATIC_PATH));
app.use(bodyParser());

const router = new Router();

app.use(cors({
  origin: (ctx) => {
    const cors = config.service.allowOrigin;
    if (cors.indexOf(ctx.request.header.origin) < 0) return;
    return ctx.request.header.origin;
  }
}));

router.post('/baseline', async (ctx, res) => {
  store.set('baselineCredentials', ctx.request.body);
  ipcMain.emit('navigate', null, '/services');
  ctx.body = {
    status: 'ok'
  };
});

router.post('/baseline/credentials/encrypt', async (ctx, res) => {
  let responseStatus, responseBody;
  try {
    const {statusCode, body} = await fetch.post(`${config.baselineApiUrl}/v1/baseline/dryrun`, {
      json: ctx.body,
      headers: {
        Authorization: `Bearer ${store.get('baselineAccessKey')}`
      },
      responseType: 'json'
    });

    if (body.status === 'error') {
      responseStatus = statusCode;
      responseBody = body;
    } else if (body.status === 'ok' && body.result.errors.length) {
      responseStatus = 500;
      responseBody = body.result.errors;
    } else {
      const {publicKey} = store.get('baselineKeyPair');
      const encryptedCredentials = ctx.body.map((service) => {
        Object.keys(service.credentials).forEach(async (key) => {
          service.credentials[key] = encryptValue(publicKey, service.credentials[key]);
        });
        return service;
      });

      responseStatus = statusCode;
      responseBody = {
        status: 'ok',
        result: encryptedCredentials
      };
    }
  } catch(e) {
    responseStatus = 500;
    responseBody = ['We were not able to encrypt your credentials'];
  }

  res.status = responseStatus;
  res.body = responseBody;
});

router.get('/baseline/credentials', async (ctx, res) => {
  const credentials = store.get('baselineCredentials');
  ctx.body = {
    status: 'ok',
    result: credentials || []
  };
});

function getMostRecentReport(dir) {
  return new Promise((resolve, reject) => {
    dir = path.resolve(dir);
    const files = readdirSync(dir);

    const sorted = files.map(function(v) {
      const filepath = path.resolve(dir, v);
      return {
        name: v,
        time: statSync(filepath).ctime.getTime()
      };
    })
      .sort(function(a, b) { return b.time - a.time; })
      .map(function(v) { return v.name; });

    if (sorted.length > 0) {
      resolve(sorted[0]);
    } else {
      reject('There are no Baseline reports');
    }

  });
}

router.get('/baseline/report', async (ctx, res) => {
  try {
    let file;
    const dir = electronApp.getPath('userData');

    if (!ctx.request.query.report || !ctx.request.query.report.length) {
      file = await getMostRecentReport(path.join(dir, 'reports'));
    } else {
      file = ctx.request.query.report;
    }

    const report = JSON.parse(readFileSync(path.join(dir, 'reports', file), 'utf-8'));
    const services = await getServices();

    ctx.body = nunjucks.render(path.join(__dirname, '..', 'template', 'report', 'report.njk'), {
      users: report.users || [],
      resources: report.resources.reduce((prev, next) => {
        if (!prev[next.service]) {
          prev[next.service] = [];
        }
        prev[next.service].push(next);
        return prev;
      }, {}),
      errors: report.errors || [],
      services: services.result.reduce((prev, service) => {
        prev[service.name] = service;
        return prev;
      }, {})
    });
  } catch(e) {
    log.error(e);
    ctx.status = 500;
    ctx.body = e;
  }
});

app.use(router.routes());

let port;
async function initServer() {
  port = await getAvailablePort();
  http.createServer(appCallback).listen(port, () => log.info(`Baseline service listening on http port ${port}....`));
  app.port = port;
  return app;
}

function getPort() {
  return port;
}

export {
  initServer,
  getPort
}
