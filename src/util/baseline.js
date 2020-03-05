import path from 'path';
import {homedir} from 'os';
import {existsSync, mkdirSync} from 'fs';
import {privateDecrypt} from 'crypto';

function getBaselinePath() {
  return path.join(homedir(), '.baseline');
}

async function createBaselineSettingsDirIfNotExists() {
  const baselinePath = getBaselinePath();
  if (!existsSync(baselinePath)) {
    await mkdirSync(baselinePath, {recursive: true});
  }
  return baselinePath;
}

async function baseline(serviceKeys, privateKey, passphrase) {
  serviceKeys = serviceKeys.map(async (service) => {
    try {
      if (service.keys.accessToken) {
        service.keys.accessToken = privateDecrypt({
          key: privateKey,
          passphrase: passphrase
        }, Buffer.from(service.keys.accessToken)).toString('utf8');
      }

      if (service.keys.refreshToken) {
        service.keys.refreshToken = privateDecrypt({
          key: privateKey,
          passphrase: passphrase
        }, Buffer.from(service.keys.refreshToken)).toString('utf8');
      }
    } catch(e) {
      console.error('Something went wrong');
    }
  });
}

export {
  createBaselineSettingsDirIfNotExists,
  getBaselinePath,
  baseline
};
