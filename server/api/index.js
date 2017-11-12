import _ from 'lodash';

export const swagger = {};

export default function moulinette(app, ...routes) {

  if (_.isUndefined(app) || _.isNull(app)) {
    console.error('error: version needs to be an array');
    return;
  }

  _.forEach(routes, (config) => {

    const conf = _.isArray(config) ? config : [config];
    _.forEach(conf, (conf) => {
      try {

        if (!swagger[conf.path]) {
          swagger[conf.path] = {};
        }

        if (swagger[conf.path] && swagger[conf.path][conf.method.toLowerCase()]) {
          throw new Error(`Method ${conf.method} for route ${conf.path} already exists!`);
        }
        swagger[conf.path][conf.method.toLowerCase()] = conf.description || 'todo: add a description field to route definition';
        app[conf.method.toLowerCase()](conf.path, conf.handler);
        console.info(`apis: Registered method ${conf.method} for route ${conf.path}`);

      } catch (e) {
        console.error('apis: ', e);
        return e;
      }
    });
  });

  return swagger;
}
