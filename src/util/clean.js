import {getBaselinePath} from './baseline';
import {rmdirSync, mkdirSync} from 'fs';

async function clean() {
  const path = getBaselinePath();
  console.log(`\n  Cleaning everything in ${path}`);
  rmdirSync(path, { recursive: true });
  mkdirSync(path, { recursive: true });
  console.log(`  Done. You have a clean setup now 👋\n`);
}

export {clean}