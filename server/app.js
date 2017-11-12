import packageJson from '../package.json';
import buildApi from './api/';
import version from './api/version/';
import swagger from './api/swagger/';
import proxy from './api/proxy/';

export default function bootstrapApp(app) {
  console.log(`APP: version: ${packageJson.version}`);
  buildApi(app, version, swagger, proxy);
}
