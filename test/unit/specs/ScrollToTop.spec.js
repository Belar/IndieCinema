import ScrollToTop from 'client/components/ScrollToTop';

describe('ScrollToTop.vue component', function () {
  it('should have scrollAvailable variable', function () {
    expect(typeof ScrollToTop.data).to.be.equal('function');
    let defaultData = ScrollToTop.data();
    expect(defaultData.scrollAvailable).to.be.a('boolean');
  });
});
