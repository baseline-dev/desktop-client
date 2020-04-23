import {app, BrowserWindow, ipcMain, shell} from 'electron';
import url from "url";

const PROTOCOL_PREFIX = 'baseline';
app.setAsDefaultProtocolClient(PROTOCOL_PREFIX);

// Protocol handler for osx
app.on('open-url', function (event, src) {
  event.preventDefault();
  const parsed = url.parse(src);
  // if (parsed.host === 'baseline') app.emit('baseline');
});

ipcMain.on('online-status-changed', (event, status) => {

});

ipcMain.handle('/app/logs/open', (event, status) => {
  shell.openItem(app.getPath('logs'));
});

function getMainWindow() {
  const windows = BrowserWindow.getAllWindows();
  if (!windows) log.error('No windows are available');
  return windows[0]
}

export {getMainWindow}
