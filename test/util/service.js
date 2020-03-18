import test from 'tape';

import {parseCredentials, runServiceCredentialFlow} from '../../src/util/service-credentials';
import env from '../_env';

env();

test('Placeholder', t => {
  t.plan(1);
  t.equal(typeof runServiceCredentialFlow, 'function', 'Baseline is a function');
});

test('Parses credentials', t => {
  t.plan(1);
  const credentials = process.env.FULL_CREDENTIALS;
  const parsedCredentials = parseCredentials(credentials);
  t.equal(parsedCredentials.length, 2);
});