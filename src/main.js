import {app, ipcMain, BrowserWindow} from 'electron';
import nunjucks from './lib/nunjucks';
import path from 'path';
import {autoUpdater} from 'electron-updater';
import {initServer} from './util/server';
import log from 'electron-log';

require('./util/app');
require('./util/service');
require('./util/baseline');
require('./util/navigate');

nunjucks.install(app, {
  path: './template/',
  globals: {
    baselineStaticAssetsUrl: path.join(__dirname, 'static')
  }
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minHeight: 300,
    minWidth: 500,
    useContentWidth: true,
    titleBarStyle: 'hiddenInset',
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  ipcMain.emit('navigate', null, null, true);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

app.once('ready', async function () {
  createWindow();
  await initServer();

  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

