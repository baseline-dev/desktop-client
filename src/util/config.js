import productionConfig from '../../config/production';
import developmentConfig from '../../config/development';

let config;
if (process.pkg) config = productionConfig;
else config = developmentConfig;

export {
  config as default
};
