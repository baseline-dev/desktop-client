import {app} from 'electron';

const allowedModules = new Set([]);
const proxiedModules = new Map([]);
const allowedElectronModules = new Set(['shell', 'Menu']);
const allowedGlobals = new Set();

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
});

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
});

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
});

app.on('remote-get-current-window', (event, webContents) => {
  // event.preventDefault()
});

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
});