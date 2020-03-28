import path from 'path';
import {homedir} from 'os';
import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {privateDecrypt} from 'crypto';
import open from 'open';
import chalk from 'chalk';
import {post} from './request';
import config from './config';
import {exitRequestInvite} from './process';
import {SERVICES} from '../const/service';
import {getEventBus} from './event-bus';

import REPORT from '../template/report';
import HEADER from '../template/header';
import SERVICE_CONTAINER from '../template/service-container';
import DETAILS_GITHUB from '../template/service-details-github';
import DETAILS_SLACK from '../template/service-details-slack';
import DETAILS_AWS from '../template/service-details-aws';
import USER_ITEM from '../template/user-item';

const TEMPLATES = {
  REPORT,
  HEADER,
  SERVICE_CONTAINER,
  DETAILS_GITHUB,
  DETAILS_SLACK,
  DETAILS_AWS,
  USER_ITEM
};

const eventBus = getEventBus();

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
      Object.keys(service.credentials).forEach((key) => {
        if (service.credentials[key]) {
          service.credentials[key] = privateDecrypt({
            key: privateKey,
            passphrase: passphrase
          }, Buffer.from(service.credentials[key], 'base64')).toString('utf8');
        }
      });
    } catch(e) {
      console.log(e)
      console.error(`\n  Something went wrong baselining ${SERVICES[service.serviceId].name}`);
    }
    return service;
  });
}

async function baseline(serviceKeys, privateKey, passphrase, spinner) {
  serviceKeys = decryptServiceKeys(serviceKeys, privateKey, passphrase);

  spinner.text = chalk.bold('Baselining services, please be patient.');

  const response = await post(`/v1/baseline`, serviceKeys);

  if (response.status === 401) {
    eventBus.emit('baseline-fail');
    spinner.fail(chalk.bold('Failed baselining your accounts.'));
    return exitRequestInvite();
  } else if (response.status === 200) {
    spinner.succeed(chalk.bold('Baselining complete. Opening results in your browser.'));

    const file = await REPORT({
      users: response.body.result,
      baselineStaticAssetsUrl: config.baselineStaticAssetsUrl,
      templates: TEMPLATES
    });

    const baselinePath = getBaselinePath();
    const report = path.join(baselinePath, 'report', 'baseline.html');

    mkdirSync(path.join(baselinePath, 'report'), {recursive: true});
    writeFileSync(report, file);

    eventBus.emit('baseline-success', {
      reportLocation: report
    });

    await open(report);
  } else {
    eventBus.emit('baseline-error');
    spinner.fail(chalk.bold('Failed baselining your accounts.'));
  }
}

export {
  createBaselineSettingsDirIfNotExists,
  getBaselinePath,
  baseline
};
