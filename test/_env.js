import path from 'path';
import env from 'node-env-file';

// loads .env variables to test locally
function envForTesting() {
  const mode = process.env.NODE_ENV;
  const isDev = typeof mode === 'undefined' || mode === 'development';
  if (isDev) {
    env(path.join(process.cwd(), '.env'))
  }
}

export {envForTesting as default}