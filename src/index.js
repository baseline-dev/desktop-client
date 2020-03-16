import ora from 'ora';
import {program} from 'commander';
import {runPublicPrivateKeyFlow} from './util/keys';
import {runServiceCredentialFlow} from './util/service';
import {baseline} from './util/baseline';
import {clean} from './util/clean';

program
  .action(main);

program.command('clean')
  .action(clean);

program.command('baseline')
  .action(main);

program.parse(process.argv);

async function main() {
  console.log(`\n  👋 Hi friend! Let's get started.`);
  const {passphrase, privateKey, publicKey} = await runPublicPrivateKeyFlow();

  const spinner = new ora({});
  const {credentials} = await runServiceCredentialFlow(publicKey, spinner);
  await baseline(credentials, privateKey, passphrase, spinner);
}