import test from 'tape';

import {getAvailablePort} from '../../src/util/port';

test('Placeholder', t => {
  t.plan(1);
  t.equal(typeof getAvailablePort, 'function', 'Baseline is a function');
});
