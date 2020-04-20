import {app, ipcMain} from 'electron';
import Store from 'electron-store';
import {generateKeyPair as cryptoGenerateKeyPair, createPrivateKey, publicEncrypt, privateDecrypt} from 'crypto';
import {SERVICES} from '../const/service';

const store = new Store();
const STATE = {};

ipcMain.handle('/account/enter-passphrase', async (event, passphrase) => {
  const isValid = await isValidPassphrase(passphrase);

  if (!isValid) {
    return {
      status: 'error',
      message: 'The passphrase you provided is not valid.'
    };
  }

  STATE.passphrase = passphrase;

  return {
    status: 'ok'
  };
});

ipcMain.handle('/setup/create-key-pair', async (event, passphrase) => {
  if (passphrase.length < 4) {
    return {
      status: 'error',
      message: 'Please provide a passphrase with at least 4 characters.'
    };
  }

  const {privateKey, publicKey} = await generateKeyPair(passphrase);

  STATE.passphrase = passphrase;
  store.set('baselineKeyPair', {
    publicKey,
    privateKey
  });

  return {
    status: 'ok'
  }
});

ipcMain.handle('/account/key-pair/delete', async () => {
  deleteKeys();
});

app.createKeyPair = async function(passphrase) {
  STATE.passphrase = passphrase;

  if (passphrase.length < 4) {
    return {
      status: 'error',
      message: 'Please provide a passphrase with at least 4 characters.'
    };
  }

  const {privateKey, publicKey} = await generateKeyPair(passphrase);
  store.set('baselineKeyPair', {
    publicKey,
    privateKey
  });

  return {
    status: 'ok'
  }
};

function isValidPassphrase(passphrase) {
  const {privateKey} = store.get('baselineKeyPair');
  let isValid = false;
  try {
    createPrivateKey({
      'key': privateKey,
      'format': 'pem',
      'type': 'pkcs8',
      'cipher': 'aes-256-cbc',
      'passphrase': passphrase
    });
    isValid = true;
  } catch(e) {}

  return isValid;
}

function encryptValue(key, value) {
  return publicEncrypt(key, Buffer.from(value)).toString('base64');
}

async function generateKeyPair(passphrase) {
  return await (new Promise((resolve, reject) => {
    if (!passphrase) reject('Passphrase is required');

    cryptoGenerateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase
      }
    }, async (err, publicKey, privateKey) => {
      if (err) {
        return reject(err);
      }

      resolve({publicKey, privateKey, passphrase});
    });
  }));
}

async function hasKeyPair() {
  const keyPair = store.get('baselineKeyPair');
  return keyPair && keyPair.privateKey && keyPair.publicKey;
}

async function providedValidPassphrase() {
  return isValidPassphrase(STATE.passphrase);
}

function decryptServiceKeys(serviceKeys) {
  const {privateKey} = store.get('baselineKeyPair');

  const passphrase = STATE.passphrase;
  return serviceKeys.map((service) => {
    try {
      Object.keys(service.credentials).forEach((key) => {
        if (service.credentials[key]) {
          service.credentials[key] = privateDecrypt({
            key: privateKey,
            passphrase: passphrase
          }, Buffer.from(service.credentials[key], 'base64')).toString('utf8');
        }
      });
    } catch(e) {
      console.error(`\n  Something went wrong baselining ${SERVICES[service.service].name}`);
    }
    return service;
  });
}

function deleteKeys() {
  store.delete('baselineKeyPair');
  store.delete('baselineCredentials');
  ipcMain.emit('navigate');
}

export {
  encryptValue,
  generateKeyPair,
  isValidPassphrase,
  hasKeyPair,
  providedValidPassphrase,
  decryptServiceKeys,
  deleteKeys
};
