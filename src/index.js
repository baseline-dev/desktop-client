import ora from 'ora';
import {program} from 'commander';
import {runPublicPrivateKeyFlow} from './util/keys';
import {runServiceCredentialFlow} from './util/service-credentials';
import {baseline} from './util/baseline';
import {clean} from './util/clean';
import {runCredentialFlow} from './util/baseline-settings';

program
  .action(main);

program.command('clean')
  .action(clean);

program.command('baseline')
  .action(main);

program.parse(process.argv);

async function main() {
  console.log(`\n  Welcome to Baseline 🎉`);
  await runCredentialFlow();
  const {passphrase, privateKey, publicKey} = await runPublicPrivateKeyFlow();

  const spinner = new ora({});
  const {credentials} = await runServiceCredentialFlow(publicKey, spinner);
  await baseline(credentials, privateKey, passphrase, spinner);
}