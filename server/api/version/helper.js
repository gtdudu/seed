import packageJson from '../../../package.json';

export function getVersion() {
  return `App version: ${packageJson.version}`;
}
