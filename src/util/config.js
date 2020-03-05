import productionConfig from '../../config/production';
import developmentConfig from '../../config/development';

async function config() {
  if (process.env.NODE_ENV === 'production') return productionConfig;
  return developmentConfig;
}

export {
  config as default
};
