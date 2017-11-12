import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiThings from 'chai-things';
import chaiHttp from 'chai-http';
import dirtyChai from 'dirty-chai';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiThings);
chai.use(chaiHttp);
chai.use(dirtyChai);

global.sinon = sinon;
global.expect = expect;
global.chai = chai;

// Chai as Promised extends Chai with a fluent language for asserting facts about promises.
chai.use(require('chai-as-promised'));

// Chai Things adds support to Chai for assertions on array elements.
chai.use(require('chai-things'));

// Extend Chai Assertion library with tests for http apis
chai.use(require('chai-http'));

// Function form for terminating assertion properties.
chai.use(require('dirty-chai'));

// make all loggers global
// _.forEach(config.loggers, (val, key) => {
//   global[key] = {
//     log: _.noop,
//     error: _.noop,
//     warn: _.noop,
//     info: _.noop,
//     verbose: _.noop,
//     debug: _.noop,
//     silly: _.noop,
//   };
// });
