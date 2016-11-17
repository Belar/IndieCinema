import Vue from 'vue';
import Sorting from 'client/components/Sorting';
import store from 'client/store';

import storeData from '../utils/storeData.js';

const vm = new Vue(Sorting).$mount();

describe('Sorting.vue component', function () {
  it('should have access to sortCondition in store', function () {
    expect(typeof Sorting.data).to.be.equal('function');
    let defaultData = Sorting.data();
    expect(defaultData.sharedState.sortCondition).to.exist;
  });

  before(function () {
    // Set spies
    sinon.spy(store, 'setSortOrder');
    sinon.spy(store, 'setSortCondition');
  });
  after(function () {
    store.setSortOrder.restore();
    store.setSortCondition.restore();
  });
  it('should execute sort condition and order change', function () {
    vm.changeOrder(storeData.sortCondition);

    expect(store.setSortCondition).to.be.called;
    expect(store.setSortOrder).to.be.called;
  });
});
