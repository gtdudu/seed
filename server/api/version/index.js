import * as helpers from './helper';

export default {
  description: 'Returns app version',
  method: 'GET',
  path: '/version',
  handler(req, res) {
    res.send(helpers.getVersion());
  }
};
