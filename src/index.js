import ora from 'ora';
import {runPublicPrivateKeyFlow} from './util/keys';
import {runServiceCredentialFlow} from './util/service';
import {baseline} from './util/baseline';

async function main() {
  console.log(`\n  👋 Hi friend! Let's get started.`);
  const {passphrase, privateKey, publicKey} = await runPublicPrivateKeyFlow();

  const spinner = new ora({});
  const {credentials} = await runServiceCredentialFlow(publicKey, spinner);
  await baseline(credentials, privateKey, passphrase, spinner);
}

export {main};

if (require.main === module) {
  (async function () {
    await main();
  })();
}
