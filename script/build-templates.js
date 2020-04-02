import {readFileSync, writeFileSync} from 'fs';
import template from 'lodash.template';

const TEMPLATE_PATH = './src/template/src';
const OUTPUT_PATH = './src/template/compiled';

[
  'report',
  'header',
  'service-container',
  'service-details-github',
  'service-details-aws',
  'service-details-slack',
  'service-details-cloudflare',
  'service-details-google',
  'user-item'
].forEach((file) => {
  const compiledTemplate = template(readFileSync(`${TEMPLATE_PATH}/${file}.ejs`, 'utf8'), {
    variable: 'data'
  });
  writeFileSync(`${OUTPUT_PATH}/${file}.js`, `const template = ${compiledTemplate.source};\nexport {template as default}`);
});
