import {app, ipcMain} from 'electron';
import Store from 'electron-store';
import {mkdirSync, readdirSync, unlinkSync, writeFileSync} from 'fs';
import fetch from 'got';
import path from 'path';
import config from './config';
import {getPort} from './server';
import {decryptServiceKeys} from './keys';

const store = new Store();

ipcMain.handle('/baseline/audits', async () => {
  const dir = app.getPath('userData');
  return {
    status: 'ok',
    result: readdirSync(path.resolve(path.join(dir, 'reports')))
  }
});

ipcMain.on('/audit', async () => {
  ipcMain.emit('navigate', null, '/audit/baselining');

  const credentials = store.get('baselineCredentials');
  const serviceKeys = decryptServiceKeys(credentials);

  const response = await fetch.post(`${config.baselineApiUrl}/v1/baseline`, {
    json: serviceKeys,
    headers: {
      Authorization: `Bearer ${store.get('baselineAccessKey')}`
    },
    responseType: 'json'
  });

  storeReport(response.body.result);

  ipcMain.emit('navigate', null, '/audit/view');
});

ipcMain.on('/baseline/audit/delete', async (event, audit) => {
  const dir = app.getPath('userData');
  unlinkSync(path.resolve(path.join(dir, 'reports', audit)));
  ipcMain.emit('navigate', null, '/audits');
});


ipcMain.handle('/baseline/audit/url', async (event, report = '') => {
  return {
    status: 'ok',
    result: `http://localhost:${getPort()}/baseline/report?report=${report}`
  }
});

function storeReport(report) {
  const dir = app.getPath('userData');
  const reportFileName = `${(new Date).toISOString()}.json`;
  mkdirSync(path.join(dir, 'reports'), { recursive: true });
  writeFileSync(path.join(dir, 'reports', reportFileName), JSON.stringify(report, null, 2));
}
