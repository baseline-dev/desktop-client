import {app, ipcMain, shell} from "electron";
import Store from 'electron-store';
import fetch from 'got';
import config from './config';
import querystring from "querystring";
import {getPort} from './server';

const store = new Store();

ipcMain.handle('/service/credentials', async () => {
  return {
    status: 'ok',
    result: store.get('baselineCredentials')
  };
});

ipcMain.handle('/service/list', async () => {
  return await getServices();
});

ipcMain.on('/service/credentials/manage', async () => {
  const {publicKey} = store.get('baselineKeyPair');
  const query = {
    publicKey: publicKey,
    port: getPort()
  };

  shell.openExternal(`${config.baselineUrl}/?${querystring.stringify(query)}`);
});

async function getServices() {
  const response = await fetch.get(`${config.baselineApiUrl}/v1/service`, {
    headers: {
      Authorization: `Bearer ${store.get('baselineAccessKey')}`
    },
    responseType: 'json'
  });

  if (response.statusCode !== 200) return {
    status: 'error'
  };

  return {
    status: 'ok',
    result: response.body.result
  }
}

export {getServices}