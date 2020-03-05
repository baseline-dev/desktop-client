#!/usr/bin/env node

import {runPublicPrivateKeyFlow} from './util/keys';
import {runServiceCredentialFlow} from './util/service';
import {baseline} from './util/baseline';

async function main() {
  const {passphrase, privateKey, publicKey} = await runPublicPrivateKeyFlow();
  const {credentials} = await runServiceCredentialFlow(publicKey);
  await baseline(credentials, privateKey, passphrase);
}

export {main};

if (require.main === module) {
  (async function () {
    await main();
  })();
}
