import ora from 'ora';
import {program} from 'commander';
import {runPublicPrivateKeyFlow} from './util/keys';
import {runServiceCredentialFlow} from './util/service-credentials';
import {baseline} from './util/baseline';
import {clean} from './util/clean';
import {runCredentialFlow} from './util/baseline-settings';
import {initServer} from './util/server';
import prompts from 'prompts';
import {exit} from './util/process';

program
  .action(main);

program.command('clean')
  .action(clean);

program.command('baseline')
  .action(main);

program.parse(process.argv);

async function main() {
  console.log(`\n  Welcome to Baseline 🎉`);

  const server = await initServer();
  const spinner = new ora({});

  await runCredentialFlow();
  const {passphrase, privateKey, publicKey} = await runPublicPrivateKeyFlow();

  const {credentials} = await runServiceCredentialFlow(publicKey, server.port, spinner);
  await baseline(credentials, privateKey, passphrase, spinner);

  // Set a timeout because the server needs to finish its response.
  // If you remove this, the baseline request from the services page will die.
  setTimeout(exit, 1000);
}