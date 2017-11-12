import version from './index.js';

describe('/api/ifezfzendex', () => {

  let res;
  let req;

  beforeEach(() => {
    res = {};
    res.send = sinon.stub();
    res.header = sinon.stub();
    console.error = sinon.stub();
    console.info = sinon.stub();
  });

  it('send should be called', () => {
    version.handler(req, res);
    expect(res.send).to.have.been.called();
    expect(res.header).to.have.been.called();
  });
});
