import credentials from './credentials.js';

export default {
  PROXY_URL: credentials('fezfaz') || 'google.com',
};
