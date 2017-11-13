const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'dirty-chai', 'sinon-chai'],
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/@uirouter/angularjs/angular-ui-router.min.js',
      './client/**/*.js',

    ],
    preprocessors: {
      './client/**/*.js': ['babel', 'coverage'],
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        plugins: ['transform-es2015-modules-umd', 'babel-plugin-transform-class-properties']
      }
    },
    autoWatch: false,
    singleRun: true,
    reporters: ['spec', 'coverage-istanbul'],
    browsers: ['PhantomJS'],
    coverageIstanbulReporter: {

      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: ['text', 'lcov', 'text-summary'],

      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, 'coverage/client'),
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        global: { // thresholds for all files
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80
        },
      }

    },
  });
};
