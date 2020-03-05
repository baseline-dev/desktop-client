import test from 'tape';

import {main} from '../src/index';

test('Placeholder', t => {
  t.plan(1);
  t.equal(typeof main, 'function', 'Baseline is a function');
});
