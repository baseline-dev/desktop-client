import test from 'tape';

import {exit} from '../../src/util/process';

test('Placeholder', t => {
  t.plan(1);
  t.equal(typeof exit, 'function', 'Baseline is a function');
});
