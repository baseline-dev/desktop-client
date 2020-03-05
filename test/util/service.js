import test from 'tape';

import {runServiceCredentialFlow} from '../../src/util/service';

test('Placeholder', t => {
  t.plan(1);
  t.equal(typeof runServiceCredentialFlow, 'function', 'Baseline is a function');
});
