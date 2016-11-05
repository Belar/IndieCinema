import Loading from 'client/components/Loading';

describe('Loading.vue component', function () {
  it('should have access to loading indicator in store', function () {
    expect(typeof Loading.data).to.be.equal('function');
    var defaultData = Loading.data();
    expect(defaultData.sharedState.loadingIndicator).to.exist;
  });
});
