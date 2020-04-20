import {ipcMain} from 'electron';
import fetch from 'got';
import log from 'electron-log';
import Store from 'electron-store';
import config from './config';

const store = new Store();

ipcMain.handle('/account/access-key/validate', async (event, accessKey) => {
  const isValid = await isValidBaselineAccessKey(accessKey);
  if (!isValid) {
    return {
      status: 'error',
      message: 'This Baseline Access Key is not valid.'
    }
  }

  store.set('baselineAccessKey', accessKey);

  return {
    status: 'ok'
  };
});

ipcMain.handle('/account/access-key/delete', async (event, accessKey) => {
  deleteAccessKey();
});

async function isValidBaselineAccessKey(credential = '') {
  try {
    const response = await fetch.post(`${config.baselineApiUrl}/v1/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${credential.trim()}`
      }
    });
    return response.statusCode === 200;
  } catch(e) {
    log.error(e);
  }
  return false;
}

async function hasValidAccessKey() {
  const credentials = store.get('baselineAccessKey');

  if (typeof credentials === 'undefined') {
    return false;
  }
  else {
    return await isValidBaselineAccessKey(credentials);
  }
}

function deleteAccessKey() {
  store.delete('baselineAccessKey');
  ipcMain.emit('navigate');
}

export {
  isValidBaselineAccessKey,
  hasValidAccessKey,
  deleteAccessKey
}