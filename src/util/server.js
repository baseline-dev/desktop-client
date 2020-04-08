import {getAvailablePort} from './port';
import {Server} from './http';
import fetch from 'got';
import {getServiceCredentials, writeServiceCredentialsToDisk} from './service-credentials';
import {getEventBus} from './event-bus';
import {encryptValue, getKeys} from './keys';
import {getCredentials} from './baseline-settings';
import config from './config';

const app = new Server();
const eventBus = getEventBus();

app.post('/baseline', (ctx, res) => {
  return new Promise((resolve, reject) => {
    writeServiceCredentialsToDisk(ctx.body)
      .then(() => {
        eventBus.emit('received-service-credentials', ctx.body);
      })
      .catch(reject);

    eventBus.on('baseline-fail', () => {
      res.status = 500;
      res.body = {
        status: 'error',
        message: 'Baselining failed.'
      };
      resolve();
    });

    eventBus.on('baseline-success', (args) => {
      res.status = 200;
      res.body = {
        status: 'ok',
        message: 'Baselining succeeded.',
        result: {
          reportLocation: args.reportLocation
        }
      };
      resolve();
    });
  });

});

app.post('/baseline/credentials/encrypt', async (ctx, res) => {
  let responseStatus, responseBody;
  try {
    const {statusCode, body} = await fetch.post(`${config.baselineApiUrl}/v1/baseline/dryrun`, {
      json: ctx.body,
      headers: {
        Authorization: `Bearer ${getCredentials()}`
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
      const {publicKey} = await getKeys();
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

app.get('/baseline/credentials', async (ctx, res) => {
  const credentials = await getServiceCredentials();
  res.status = 200;
  res.body = {
    status: 'ok',
    result: credentials || []
  };
});

async function initServer() {
  const port = await getAvailablePort();
  app.listen(port);
  return app;
}

export {initServer}
