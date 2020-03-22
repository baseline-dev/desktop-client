import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import path from 'path';
import prompts from 'prompts';
import open from 'open';
import querystring from 'querystring';
import {homedir} from 'os';
import chalk from 'chalk';

import {getBaselinePath} from './baseline';
import {getAvailablePort} from './port';
import {exit} from './process';
import {startServer, stopServer} from './server';
import config from './config';
import {getEventBus} from './event-bus';
import {SERVICES} from '../const/service';

const eventBus = getEventBus();

function servicesExist() {
  const baselinePath = getBaselinePath();
  return existsSync(path.join(baselinePath, 'service-credentials'));
}

async function getServiceNamesFromCredentials() {
  if (!servicesExist()) return;

  const baselinePath = getBaselinePath();

  let serviceNames;
  let credentials = await readFileSync(path.join(baselinePath, 'service-credentials')).toString('utf8');
  try {
    credentials = parseCredentials(credentials);
    serviceNames = credentials.map((service) => {
      return SERVICES[service.id].name;
    });
  } catch(e) {
    console.log('Error parding credentials');
  }

  return serviceNames;
}

async function getServiceCredentials() {
  if (!servicesExist()) return;

  const baselinePath = getBaselinePath();
  let credentials = await readFileSync(path.join(baselinePath, 'service-credentials')).toString('utf8');
  try {
    credentials = parseCredentials(credentials);
  } catch(e) {
    console.log('Error parsing credentials');
  }

  return credentials;
}

async function useExistingCredentials(serviceNames) {
  let prompt = `\n  You have stored credentials for the following service: ${serviceNames.join(', ')}.`;
  if (serviceNames.length > 1) {
    prompt = `\n  You have stored credentials for the following services: ${serviceNames.join(', ')}.`;
  }
  console.log(prompt);

  const {useExistingCredentials} = await prompts({
    type: 'confirm',
    name: 'useExistingCredentials',
    message: `Would you like to use these credentials to baseline ${serviceNames.join(', ')}?`,
    initial: true
  });

  if (typeof useExistingCredentials === 'undefined') exit();

  return useExistingCredentials;
}

function parseCredentials(credentials) {
  return JSON.parse(Buffer.from(credentials, 'base64').toString('ascii'));
}

function waitForCredentials(port) {
  return new Promise((resolve, reject) => {
    ((async function() {
      const server = await startServer(port);

      eventBus.on('received-service-credentials', async (credentials) => {
        await writeServiceCredentialsToDisk(credentials);
        await stopServer(server);

        try {
          credentials = parseCredentials(credentials);
          resolve(credentials);
        } catch(e) {
          reject(e);
        }
      });
    })());
  });
}

async function openBrowser(publicKey, port) {
  const query = {
    port: port,
    publicKey
  };

  await open(`${config.baselineUrl}?${querystring.stringify(query)}`);
}

async function writeServiceCredentialsToDisk(keys) {
  const file = path.join(homedir(), '.baseline', 'service-credentials');

  if (!existsSync(file)) {
    await mkdirSync(path.join(homedir(), '.baseline'), {recursive: true});
  }

  await writeFileSync(file, keys);
}

async function runServiceCredentialFlow(publicKey, spinner) {
  let credentials;
  const serviceNames = await getServiceNamesFromCredentials();
  const shouldCreateNewServiceCredentials = (serviceNames && !await useExistingCredentials(serviceNames)) || !serviceNames;

  console.log('\n  Ok, lets get to the real work:');
  if (shouldCreateNewServiceCredentials) {
    const port = await getAvailablePort();
    spinner.text = chalk.bold('Opening browser to get service credentials.');
    spinner.start();

    await openBrowser(publicKey, port);

    credentials = await waitForCredentials(port);
  } else {
    spinner.text = chalk.bold('Loading service credentials.');
    spinner.start();

    credentials = await getServiceCredentials();
  }

  return {credentials};
}

export {
  runServiceCredentialFlow,
  parseCredentials
};