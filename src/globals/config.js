const electron = window.require('electron');
const remote = electron.remote;
const { app } = remote;

const path = window.require('path');

const config = {
  appDataDirectory: path.join(app.getPath('appData'), 'electron-react-file-explorer')
};

export default config;