// scripts/open-examples.js (ESM)
import { createRequire } from 'module';
import path from 'path';
import { exec } from 'child_process';

const require = createRequire(import.meta.url);
const pkgJson = 'eve-icons-react/package.json';
const pkgJsonPath = require.resolve(pkgJson);
const pkgRoot = path.dirname(pkgJsonPath);
const examplesIndex = path.join(pkgRoot, 'examples', 'index.html');

function openFile(file) {
  const cmd = process.platform === 'win32'
    ? `start "" "${file}"`
    : process.platform === 'darwin'
    ? `open "${file}"`
    : `xdg-open "${file}"`;
  exec(cmd, (err) => { if (err) console.error('Open failed:', err); });
}

openFile(examplesIndex);