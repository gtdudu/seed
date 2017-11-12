import {swagger} from '../';

export default {
  description: 'Returns the complete api swagger',
  method: 'GET',
  path: '/swagger',
  handler(req, res) {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(swagger, null, 4));
  }
};
