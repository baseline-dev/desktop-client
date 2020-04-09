import {readFileSync, writeFileSync} from 'fs';
import template from 'lodash.template';

const TEMPLATE_PATH = './src/template/src';
const OUTPUT_PATH = './src/template/compiled';

[
  'report',
  'header',
  'user-item',
  'resources-container',
  'resources-gcloud',
  'resources-aws',
  'service-container',
  'service-errors',
  'service-details-github',
  'service-details-aws',
  'service-details-slack',
  'service-details-cloudflare',
  'service-details-google',
  'service-details-wordpress-selfhosted',
  'service-details-intercom'
].forEach((file) => {
  const compiledTemplate = template(readFileSync(`${TEMPLATE_PATH}/${file}.ejs`, 'utf8'), {
    variable: 'data'
  });
  writeFileSync(`${OUTPUT_PATH}/${file}.js`, `const template = ${compiledTemplate.source};\nexport {template as default}`);
});
