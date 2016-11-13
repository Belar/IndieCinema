import Vue from 'vue';
import OnScreenMessage from 'client/components/OnScreenMessage';
import store from 'client/store';

import storeData from '../utils/storeData.js';

new Vue(OnScreenMessage).$mount();

describe('OnScreenMessage.vue component', function () {
  it('should have access to screenMessage in store', function () {
    expect(typeof OnScreenMessage.data).to.be.equal('function');
    let defaultData = OnScreenMessage.data();
    expect(defaultData.sharedState.screenMessage).to.exist;
  });

  before(function () {
    // Set spies
    sinon.spy(store, 'setMessage');
  });
  after(function () {
    store.setMessage.restore();
  });
  it('should alter screenMessage after 3 second', function (done) {
    this.timeout(3500);
    store.state.screenMessage = storeData.screenMessage;

    setTimeout(function () {
      expect(store.setMessage).to.be.called;
      done();
    }, 3250);
  });
});
