import {app} from 'electron';
import productionConfig from '../../config/production';
import developmentConfig from '../../config/development';

let config;
if (app.isPackaged) config = productionConfig;
else config = developmentConfig;

export {
  config as default
};
