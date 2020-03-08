/**
 * @file nunjuncks commonjs PrecompiledLoader
 * @author cdatou <chen.zsheng@gmail.com>
 */

'use strict';

import {posix as path} from 'path';
import {PrecompiledLoader} from './nunjucks';

var EnhancePrecompiledLoader = PrecompiledLoader.extend({
  resolve: function(from, to) {
    return path.normalize(path.join(path.dirname(from), to));
  }
});

export {
  EnhancePrecompiledLoader as default
};