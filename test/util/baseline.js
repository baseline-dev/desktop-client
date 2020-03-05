import test from 'tape';

import {baseline} from '../../src/util/baseline';

test('Placeholder', t => {
  t.plan(1);
  t.equal(typeof baseline, 'function', 'Baseline is a function');
});
