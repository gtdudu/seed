import _ from 'lodash';

import moulinette, { swaggerJson } from './index.js';
import version from './version/';
import swagger from './swagger/';

describe('/api/index', () => {

  let fakeApp;
  beforeEach(() => {
    fakeApp = {};
    fakeApp.get = sinon.stub();
    console.error = sinon.stub();
    console.info = sinon.stub();
  });

  it('should return an error if app is undefined', () => {
    moulinette(null, version);
    expect(fakeApp.get).not.to.have.been.called();
  });

  it('should return an error if version is not an array', () => {
    moulinette(fakeApp, null);
    expect(fakeApp.get).not.to.have.been.called();
  });

  it('should configure get routes', () => {
    moulinette(fakeApp, version);
    expect(fakeApp.get).to.have.been.calledOnce();
  });

  it('should accept array as arguments', () => {
    const monkeyVersion = _.cloneDeep(version);
    monkeyVersion.method = 'GET';
    moulinette(fakeApp, [monkeyVersion], swagger);
    console.log(swaggerJson);
    expect(fakeApp.get).to.have.been.calledOnce();
  });


  it('should return if trying to assign same config more than once', () => {
    const monkeyVersion = _.cloneDeep(version);
    monkeyVersion.method = 'GET';
    moulinette(fakeApp, monkeyVersion, monkeyVersion);
    expect(fakeApp.get).not.to.have.been.called();
  });

  it('should not registered unrecognized method', () => {
    const monkeyVersion = _.cloneDeep(version);
    monkeyVersion.method = 'NOT YET';
    moulinette(fakeApp, monkeyVersion);
    expect(fakeApp.get).not.to.have.been.called();
  });

  it('should return as soon as a method is not recognised', () => {
    const monkeyVersion = _.cloneDeep(version);
    monkeyVersion.method = 'NOT YET';
    moulinette(fakeApp, monkeyVersion);
    expect(fakeApp.get).not.to.have.been.called();
  });

});
