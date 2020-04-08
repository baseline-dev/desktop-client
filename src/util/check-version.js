import fetch from 'got';
import config from './config';
import semver from 'semver';

const pjson = require('../../package.json');

async function checkForNewVersion() {
  try {
    const response = await fetch(`${config.baselineApiUrl}/v1/cli/version`, {
      responseType: 'json'
    });

    if (semver.gt(response.body.version, pjson.version)) {
      console.log(`\n  A new version of the Baseline CLI is available 🎉`);
      console.log(`  Please grab it at https://baseline.dev/download\n`);
      process.exit();
    }
  } catch(e) {}
}

export {
  checkForNewVersion
}