import {getAvailablePort} from './port';
import {Server} from './http';
import {post} from './request';
import {writeServiceCredentialsToDisk} from './service-credentials';
import {getEventBus} from './event-bus';

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

app.post('/baseline/dryrun', async (ctx, res) => {
  const {status, body} = await post(`/v1/baseline/dryrun`, ctx.body);
  res.status = status;
  res.body = body;
});

async function initServer() {
  const port = await getAvailablePort();
  app.listen(port);
  return app;
}

export {initServer}
