import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'build/cli.js',
    format: 'cjs'
  },
  plugins: [json(), commonjs()]
};