import proxy from 'express-http-proxy';
import envConfig from '../../environment/';

export default {
  description: `Proxy all api request to ${envConfig.PROXY_URL}`,
  method: 'USE',
  path: ['/api/*', '/api'],
  handler: proxy(envConfig.PROXY_URL),
};
