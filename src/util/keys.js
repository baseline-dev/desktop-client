import ora from 'ora';
import path from 'path';
import prompts from 'prompts';
import chalk from 'chalk';
import {existsSync, writeFileSync, readFileSync} from 'fs';
import {generateKeyPair as cryptoGenerateKeyPair, createPrivateKey} from 'crypto';

import {exit} from './process';
import {createBaselineSettingsDirIfNotExists, getBaselinePath} from './baseline';

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
  } catch(e) {}

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
    if (!passphrase) exit();

    let spinner = ora({
      text: chalk.bold('Generating public/private key pair.'),
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

  if (!baselineKeysExist) {
    console.log(`\n  To keep things secure, we neet to setup a private key for you.`);
    ({passphrase} = await prompts({
      type: 'password',
      name: 'passphrase',
      message: 'Please enter a passphrase to encrypt the service access keys.',
      validate: function(value) {
        const isValid = value.length > 3;

        if (isValid) return true;

        this.reset();
        return  `Please enter at least 4 characters`;
      }
    }));

    ({privateKey, publicKey} = await generateKeyPair(passphrase));
  } else {
    console.log(`\n  Since you already have baselined before, we can dive right in.`);

    ({privateKey, publicKey} = await getKeys());

    ({passphrase} = await prompts({
      type: 'password',
      name: 'passphrase',
      message: 'Please enter the passphrase to decrypt the service access keys.',
      validate: function(value) {
        const isValid = isValidPassphrase(privateKey, value);

        if (isValid) return true;

        this.reset();
        return 'Please enter the correct passphrase.'
      }
    }));

    if (!passphrase) exit();
  }

  return {passphrase, privateKey, publicKey};
}

export {
  runPublicPrivateKeyFlow
};
