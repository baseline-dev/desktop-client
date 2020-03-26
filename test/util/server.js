import test from 'tape';

import {Server} from '../../src/util/http';

test('Placeholder', t => {
  t.plan(1);
  t.equal(typeof Server, 'function', 'Baseline is a function');
});
