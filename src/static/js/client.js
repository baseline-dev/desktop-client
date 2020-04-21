const { ipcRenderer, remote } = require('electron');

const Menu = remote.Menu;

const InputMenu = Menu.buildFromTemplate([{
  label: 'Undo',
  role: 'undo',
}, {
  label: 'Redo',
  role: 'redo',
}, {
  type: 'separator',
}, {
  label: 'Cut',
  role: 'cut',
}, {
  label: 'Copy',
  role: 'copy',
}, {
  label: 'Paste',
  role: 'paste',
}, {
  type: 'separator',
}, {
  label: 'Select all',
  role: 'selectall',
},
]);

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  e.stopPropagation();

  let node = e.target;

  while (node) {
    if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
      InputMenu.popup(remote.getCurrentWindow());
      break;
    }
    node = node.parentNode;
  }
});

const app = remote.app;

const updateOnlineStatus = () => {
  ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
};

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline',  updateOnlineStatus);

updateOnlineStatus();

function init() {
  return {
    error: null,
    route: '',
    services: [],
    credentials: [],
    audits: [],
    reportUrl: undefined,
    init: async function() {
      ipcRenderer.on('navigate', async (event, route) => {
        await this.initRoute(route);
      });
    },
    // Routes
    initRoute: async function(route) {
      this.route = route;

      if (this.route === '/services' || this.route === '/audit/new') {
        this.getServices();
        this.getCredentials();
      }

      if (this.route === '/audits') {
        await this.getAudits();
      }

      if (this.route.indexOf('/audit/view') === 0) {
        const parts = route.split('=');
        await this.loadAudit(parts.length && parts[1]);
      }
    },
    navigate: function(path) {
      ipcRenderer.send('navigate', path);
    },
    navigateToNextRoute: async function() {
      const response = await ipcRenderer.invoke('/navigate/next');
      this.navigate(response.result);
    },
    // App
    openLogs: async function() {
      await ipcRenderer.invoke('/app/logs/open');
    },
    openExternalBrowser(link) {
      remote.shell.openExternal(link);
    },
    // Services
    getCredentials: async function() {
      const result = await ipcRenderer.invoke('/service/credentials');

      if (result.status === 'ok' && result.result) {
        this.credentials = result.result;
      }
    },
    getServices: async function() {
      const response = await ipcRenderer.invoke('/service/list');
      if (response.status === 'ok') {
        this.services = response.result;
      }
    },
    manageServices: function() {
      ipcRenderer.send('/service/credentials/manage');
    },
    hasAuthorizedService: function(serviceName) {
      return this.credentials && this.credentials.some((service) => {
        return service.name === serviceName;
      })
    },
    // Public / Private Keys
    validatePassphrase: async function(e) {
      e.preventDefault();
      const result = await ipcRenderer.invoke('/account/enter-passphrase', document.getElementById('keyPairPassphrase').value);

      if (result && result.status === 'error') {
        this.error = result.message;
        this.$refs.form.reset();
      } else {
        this.error = null;
        this.navigateToNextRoute();
      }
    },
    createKeyPair: async function(e) {
      e.preventDefault();
      const result = await ipcRenderer.invoke('/setup/create-key-pair', document.getElementById('keyPairPassphrase').value);

      if (result && result.status === 'error') {
        this.error = result.message;
        this.$refs.form.reset();
      } else {
        this.error = null;
        this.navigateToNextRoute();
      }
    },
    deleteKeyPair: async function() {
      await ipcRenderer.invoke('/account/key-pair/delete');
    },
    // Baseline access keys
    checkBaselineAccessKey: async function(e) {
      e.preventDefault();
      const result = await ipcRenderer.invoke('/account/access-key/validate', document.getElementById('accessKey').value);

      if (result && result.status === 'error') {
        this.error = result.message;
        this.$refs.form.reset();
      } else {
        this.error = null;
        this.navigateToNextRoute();
      }
    },
    deleteAccessKey: async function() {
      await ipcRenderer.invoke('/account/access-key/delete');
    },
    // Audits / Baselines
    baseline: async function() {
      ipcRenderer.send('/audit');
    },
    getAudits: async function() {
      this.isLoadingAudits = true;
      const response = await ipcRenderer.invoke('/baseline/audits');

      if (response.status === 'ok') {
        this.audits = response.result;
      }
      this.isLoadingAudits = false;
    },
    hasAudits: function() {
      return this.audits && this.audits.length;
    },
    openAudit: function() {
      this.navigate(`/audit/view?id=${this.$refs.audits.value}`)
    },
    deleteAudit: function() {
      ipcRenderer.send('/baseline/audit/delete', this.$refs.audits.value);
    },
    loadAudit: async function(id) {
      const response = await ipcRenderer.invoke('/baseline/audit/url', id);
      if (response.status === 'ok') {
        this.reportUrl = response.result;
      }
    },
    openAudits: async function() {
      await ipcRenderer.invoke('/baseline/audits/open');
    }
  }
}