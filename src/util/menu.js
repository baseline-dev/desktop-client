import {deleteKeys} from './keys';
import {ipcMain} from "electron";
import {deleteAccessKey} from './account';

const {app, shell, dialog, remote} = require('electron');
const Store = require('electron-store');

const isMac = process.platform === 'darwin';

const store = new Store();

function getMenuTemplate() {
  const hasAccessKey = store.get('baselineAccessKey');
  const hasKeyPair = store.get('baselineKeyPair');
  return [
    { role: 'appMenu' },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'pasteandmatchstyle'
        },
        {
          role: 'delete'
        },
        {
          role: 'selectall'
        }
      ]
    },
    {
      label: 'Baseline',
      submenu: [
        ...(hasAccessKey ? [{
            label: 'Clear Access Key',
            click: async () => {
              const result = await dialog.showMessageBox({
                message: 'Do you want to remove your Baseline access key? You will need to re-enter your access key to use Baseline again.',
                buttons: ['Yes', 'No']
              });

              if (result.response === 0) {
                deleteAccessKey();
                store.delete('baselineAccessKey');
              }
            }
        }] : []),
        ...(hasKeyPair ? [{
          label: 'Clear Public/Private Key Pair',
          click: async () => {
            const result = await dialog.showMessageBox({
              message: 'Do you want to remove your Baseline public/private key pair? This will also remove all service credentials. You need to re-authenticate your services for your next Baseline audit.',
              buttons: ['Yes', 'No']
            });

            if (result.response === 0) {
              deleteKeys();
            }
          }
        }] : []),
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Baseline Docs',
          click: async () => {
            await shell.openExternal('https://docs.baseline.dev')
          }
        }
      ]
    }
  ];
}

export {getMenuTemplate}