import path from 'path';
import {homedir} from 'os';
import {existsSync, mkdirSync, writeFileSync, readFileSync} from 'fs';
import {privateDecrypt} from 'crypto';
import open from 'open';
import chalk from 'chalk';
import {post} from './request';
import config from './config';
import {exit, exitRequestInvite} from './process';
import {SERVICES} from '../const/service';

import REPORT from '../template/report';
import HEADER from '../template/header';
import SERVICE_CONTAINER from '../template/service-container';
import DETAILS_GITHUB from '../template/service-details-github';
import DETAILS_SLACK from '../template/service-details-slack';
import USER_ITEM from '../template/user-item';

const TEMPLATES = {
  REPORT,
  HEADER,
  SERVICE_CONTAINER,
  DETAILS_GITHUB,
  DETAILS_SLACK,
  USER_ITEM
};

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

function decryptServiceKeys(serviceKeys, privateKey, passphrase) {
  return serviceKeys.map((service) => {
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
      console.error(`  Something went wrong baselining ${SERVICES[service.id].name}`);
    }
    return service;
  });
}

async function baseline(serviceKeys, privateKey, passphrase, spinner) {
  serviceKeys = decryptServiceKeys(serviceKeys, privateKey, passphrase);

  spinner.text = chalk.bold('Baselining services, please be patient.');

  try {
    const users = await post(`${config.baselineApiUrl}/v1/baseline`, serviceKeys);
    spinner.succeed(chalk.bold('Baselining complete. Opening results in your browser.'));

    const file = await REPORT({
      users,
      baselineStaticAssetsUrl: config.baselineStaticAssetsUrl,
      templates: TEMPLATES
    });

    const baselinePath = getBaselinePath();
    mkdirSync(path.join(baselinePath, 'report'), {recursive: true});
    writeFileSync(path.join(baselinePath, 'report', 'baseline.html'), file);

    await open(path.join(baselinePath, 'report', 'baseline.html'));
    exit();
  } catch(e) {
    console.log(e)
    spinner.fail(chalk.bold('Failed baselining your accounts.'));

    if (e.status === 401) {
      return exitRequestInvite();
    }

    exit();
  }
}

export {
  createBaselineSettingsDirIfNotExists,
  getBaselinePath,
  baseline
};
