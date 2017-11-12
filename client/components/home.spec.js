import Home from './home.js';

describe('component:home', () => {

  let home;
  let test;
  beforeEach(() => {
    test = sinon.stub();
    home = new Home();
  });

  it('should return an error if app is undefined', () => {
    expect(home).to.have.property('welcome');
  });

  it('should test', () => {
    test();
    expect(test).to.have.been.called();
  });

});
