import test from 'tape';

import {startServer, stopServer} from '../../src/util/server';

test('Placeholder', t => {
  t.plan(2);
  t.equal(typeof stopServer, 'function', 'Baseline is a function');
  t.equal(typeof startServer, 'function', 'Baseline is a function');
});
