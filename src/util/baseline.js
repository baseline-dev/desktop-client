import {app as electronApp, app, ipcMain, shell} from 'electron';
import Store from 'electron-store';
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  rmdirSync,
  writeFileSync,
  existsSync,
  lstatSync
} from 'fs';
import fetch from 'got';
import path from 'path';
import config from './config';
import {getPort} from './server';
import {decryptServiceKeys} from './keys';
import {getServices} from './service';
import nunjucks from 'nunjucks';

const store = new Store();

ipcMain.handle('/baseline/audits', async () => {
  const dir = app.getPath('userData');
  const source = path.join(dir, 'reports');

  let result;
  try {
    const isDirectory = source => lstatSync(source).isDirectory();
    result = readdirSync(path.resolve(source))
      .map(name => path.join(source, name))
      .filter(isDirectory)
      .map(source => path.basename(source));
  } catch(e) {
    result = [];
  }

  return {
    status: 'ok',
    result
  }
});

ipcMain.handle('/baseline/audits/open', async () => {
  shell.openItem(path.join(app.getPath('userData'), 'reports'));
});

ipcMain.on('/audit', async () => {
  ipcMain.emit('navigate', null, '/audit/baselining');

  const credentials = store.get('baselineCredentials');
  const serviceKeys = decryptServiceKeys(credentials);

  const response = await fetch.post(`${config.baselineApiUrl}/v1/baseline`, {
    json: serviceKeys,
    headers: {
      Authorization: `Bearer ${store.get('baselineAccessKey')}`
    },
    responseType: 'json'
  });

  storeReport(response.body.result);

  ipcMain.emit('navigate', null, '/audit/view');
});

ipcMain.on('/baseline/audit/delete', async (event, audit) => {
  const dir = app.getPath('userData');
  rmdirSync(path.resolve(path.join(dir, 'reports', audit)), {recursive: true});
  ipcMain.emit('navigate', null, '/audits');
});


ipcMain.handle('/baseline/audit/url', async (event, report = '') => {
  return {
    status: 'ok',
    result: `http://localhost:${getPort()}/baseline/report?report=${report}`
  }
});

function formatDateTime(date) {
  return `${date.getFullYear().toString().padStart(4, '0')}-${
    (date.getMonth()+1).toString().padStart(2, '0')}-${
    date.getDate().toString().padStart(2, '0')}T${
    date.getHours().toString().padStart(2, '0')}-${
    date.getMinutes().toString().padStart(2, '0')}-${
    date.getSeconds().toString().padStart(2, '0')}`;
}

function storeReport(report) {
  const dir = app.getPath('userData');
  const reportPath = formatDateTime(new Date);
  mkdirSync(path.join(dir, 'reports', reportPath), {recursive: true});
  writeFileSync(path.join(dir, 'reports', reportPath, 'report.json'), JSON.stringify(report, null, 2));
}

function getMostRecentReport(dir) {
  return new Promise((resolve, reject) => {
    dir = path.resolve(dir);
    const files = readdirSync(dir);

    const sorted = files.map(function (v) {
      const filepath = path.resolve(dir, v);
      return {
        name: v,
        time: statSync(filepath).ctime.getTime()
      };
    })
      .sort(function (a, b) {
        return b.time - a.time;
      })
      .map(function (v) {
        return v.name;
      });

    if (sorted.length > 0) {
      resolve(sorted[0]);
    } else {
      reject('There are no Baseline reports');
    }

  });
}

async function getReportDirectory(report) {
  const dir = electronApp.getPath('userData');

  if (!report || !report.length) {
    report = await getMostRecentReport(path.join(dir, 'reports'));
  } else {
    report = report;
  }

  return path.join(dir, 'reports', report);
}

async function renderReport(report) {
  report = await getReportDirectory(report);

  const reportJson = JSON.parse(readFileSync(path.join(report, 'report.json'), 'utf-8'));
  const services = await getServices();

  const renderedReport = nunjucks.render(path.join(__dirname, '..', 'template', 'report', 'report.njk'), {
    users: reportJson.users || [],
    resources: reportJson.resources.reduce((prev, next) => {
      if (!prev[next.service]) {
        prev[next.service] = [];
      }
      prev[next.service].push(next);
      return prev;
    }, {}),
    errors: reportJson.errors || [],
    services: services.result.reduce((prev, service) => {
      prev[service.name] = service;
      return prev;
    }, {})
  });

  mkdirSync(report, {recursive: true});
  writeFileSync(path.join(report, 'report.html'), renderedReport);

  return renderedReport;
}

async function loadReport(report) {
  const reportPath = await getReportDirectory(report);
  if (existsSync(path.join(reportPath, 'report.html'))) {
    return readFileSync(path.join(reportPath, 'report.html'), 'utf8').toString();
  } else {
    return await renderReport(report);
  }
}

export {loadReport}