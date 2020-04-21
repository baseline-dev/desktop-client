import {ipcMain, BrowserWindow, app, Menu} from "electron";
import url from "url";
import path from "path";
import {getMainWindow} from './app';
import log from 'electron-log';
import {hasValidAccessKey} from './account';
import {hasKeyPair, providedValidPassphrase} from './keys';
import {getMenuTemplate} from './menu';

const TEMPLATES = {
  'report': 'report/report.njk',
  'main': 'index.njk'
};

const STATE = {
  currentRoute: '/audits'
};

const ROUTES = {
  '/setup/baseline-access-key': {
    template: 'index.njk'
  },
  '/setup/create-key-pair': {
    template: 'index.njk'
  },
  '/account/enter-passphrase': {
    template: 'index.njk'
  },
  '/audits': {
    template: 'index.njk'
  },
  '/audit/view': {
    template: 'index.njk'
  },
  '/audit/new': {
    template: 'index.njk'
  },
  '/audit/baselining': {
    template: 'index.njk'
  },
  '/services': {
    template: 'index.njk'
  },
  '/settings': {
    template: 'index.njk'
  },
};

ipcMain.on('navigate', async (event, route, forceReload = false) => {
  if (!route) route = await getCurrentRoute();
  try {
    renderTemplate(route, forceReload);
    updateMenu();
  } catch(e) {
    log.error(`Path ${path} not found`);
  }
});

ipcMain.handle('/navigate/next', async () => {
  return {
    status: 'ok',
    result: await getCurrentRoute()
  }
});

function renderTemplate(route, forceReload) {
  STATE.currentRoute = route;

  const parsed = url.parse(STATE.currentRoute);
  const template = ROUTES[parsed.pathname].template;

  if (template === STATE.currentTemplate && !forceReload) {
    getMainWindow().webContents.send('navigate', STATE.currentRoute);
  } else {
    const mainWindow = getMainWindow();
    STATE.currentTemplate = template;
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '..', 'template', template),
      protocol: 'file:',
      slashes: true
    }));

    mainWindow.once('ready-to-show', async () => {
      mainWindow.show();
      getMainWindow().webContents.send('navigate', STATE.currentRoute);
    });
  }

}

async function getCurrentRoute() {
  // 1. There are a few steps to setup the app. Those need to be checked before the user can use the app.
  //    This is 1. Providing an access key
  //    This is 2. Having a private / public keypair setup, with passphrase.
  // 2. Once this condition is met. There are static views which can be changed.
  //    This is stored in STATE.view and is returned.
  if (!await hasValidAccessKey()) {
    return '/setup/baseline-access-key';
  } else if (!await hasKeyPair()) {
    return '/setup/create-key-pair';
  } else if (!await providedValidPassphrase()) {
    return '/account/enter-passphrase';
  } else {
    return '/audits';
  }
}

function updateMenu() {
  const menu = Menu.buildFromTemplate(getMenuTemplate());
  Menu.setApplicationMenu(menu);
}

export {
  renderTemplate
}
