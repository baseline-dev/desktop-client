import ora from 'ora';
import path from 'path';
import prompts from 'prompts';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import {generateKeyPair as cryptoGenerateKeyPair, createPrivateKey} from 'crypto';

import {createBaselineSettingsDirIfNotExists, getBaselinePath} from './baseline';
import {exit} from './process';

async function keysExist() {
  const baselinePath = getBaselinePath();
  return existsSync(path.join(baselinePath, 'id_rsa.pub')) && existsSync(path.join(baselinePath, 'id_rsa'));
}

function isValidPassphrase(privateKey, passphrase) {
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
  } catch(e) {
    console.log('Invalid passphrase');
  }
  return isValid;
}

async function saveKeys(publicKey, privateKey) {
  const baselinePath = getBaselinePath();

  await createBaselineSettingsDirIfNotExists();

  await writeFileSync(path.join(baselinePath, 'id_rsa.pub'), publicKey);
  await writeFileSync(path.join(baselinePath, 'id_rsa'), privateKey);
}

async function getKeys() {
  const baselinePath = getBaselinePath();

  const publicKey = await readFileSync(path.join(baselinePath, 'id_rsa.pub')).toString('ascii');
  const privateKey = await readFileSync(path.join(baselinePath, 'id_rsa')).toString('ascii');

  return {privateKey, publicKey};
}

async function generateKeyPair(passphrase) {
  return await (new Promise((resolve, reject) => {
    let spinner = ora({
      text: 'Generating public/private key pair.',
      color: 'white'
    }).start();

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
        spinner.fail('Public/private key pair generation failed.');
        return reject(err);
      }

      spinner.text = 'Saving public/private key pair to disk.';

      await saveKeys(publicKey, privateKey);

      spinner.succeed('Public/private key pair saved to disk.');

      resolve({publicKey, privateKey, passphrase});
    });
  }));
}

async function useExistingKeys() {
  const {useExistingKeys} = await prompts({
    type: 'confirm',
    name: 'useExistingKeys',
    message: 'You have previously used baseline and a public/private key was found. Would you like to use the keys stored on disk?',
    initial: true
  });

  if (typeof useExistingKeys === 'undefined') exit();

  return useExistingKeys;
}

async function runPublicPrivateKeyFlow() {
  let passphrase, privateKey, publicKey;
  const baselineKeysExist = await keysExist();
  const shouldCreateNewKeys = (baselineKeysExist && !await useExistingKeys()) || !baselineKeysExist;

  if (shouldCreateNewKeys) {
    ({passphrase} = await prompts({
      type: 'password',
      name: 'passphrase',
      message: 'Creating a new private/public key pair. Please enter a passphrase to encrypt the access tokens.',
      validate: value => value.length < 4 ? `Please enter at least 4 characters` : true
    }));

    ({privateKey, publicKey} = await generateKeyPair(passphrase));
  } else {
    ({passphrase} = await prompts({
      type: 'password',
      name: 'passphrase',
      message: 'Please enter the passphrase of the private key to decrypt the service keys.'
    }));

    ({privateKey, publicKey} = await getKeys());

    while (!isValidPassphrase(privateKey, passphrase)) {
      ({passphrase} = await prompts({
        type: 'password',
        name: 'passphrase',
        message: 'Please try again and enter the passphrase of the private key to decrypt the service keys.'
      }));

      if (typeof passphrase === 'undefined') exit();
    }
  }

  return {passphrase, privateKey, publicKey};
}

export {
  runPublicPrivateKeyFlow
};
