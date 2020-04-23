const {remote} = require('electron');

function init() {
  return {
    tab: 'users',
    openExternalBrowser(link) {
      remote.shell.openExternal(link);
    },
  }
}