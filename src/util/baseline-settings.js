import path from 'path';
import prompts from 'prompts';
import {createBaselineSettingsDirIfNotExists, getBaselinePath} from './baseline';
import {existsSync, writeFileSync, readFileSync} from 'fs';

import fetch from 'got';
import {exit} from './process';
import config from './config';

async function credentialsExist() {
  return existsSync(path.join(getBaselinePath(), 'settings'));
}

async function isValidCredential(credential) {
  try {
    const response = await fetch.post(`${config.baselineApiUrl}/v1/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${credential.trim()}`
      }
    });
    return response.statusCode === 200;
  } catch(e) {}
  return false
}

async function writeCredentialToDisk(credential) {
  await createBaselineSettingsDirIfNotExists();
  await writeFileSync(path.join(getBaselinePath(), 'settings'), credential);
}

function getCredentials() {
  const jwtFile = path.join(getBaselinePath(), 'settings');
  if (existsSync(jwtFile)) {
    return readFileSync(jwtFile).toString().trim();
  }
}

async function runCredentialFlow() {
  let credentials;
  const hasCredentials = await credentialsExist();
  if (!hasCredentials) {
    console.log(`\n  To keep things secure, we neet to setup a private key for you.`);
    ({credentials} = await prompts({
      type: 'text',
      name: 'credentials',
      message: 'Please enter the credentials we provided to you.',
      validate: async function(value) {
        const isValid = await isValidCredential(value);

        if (isValid) return true;

        this.reset();
        return `The credentials don't appear to be valid. Please double check or reach out to support@baseline.dev 🙏`;
      }
    }));

    if (!credentials) exit();

    await writeCredentialToDisk(credentials);
  }
}

export {runCredentialFlow, getCredentials}