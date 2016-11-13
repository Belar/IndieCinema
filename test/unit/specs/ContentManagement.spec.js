import Vue from 'vue';
import ContentManagement from 'client/components/ContentManagement';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import store from 'client/store';
import videoData from '../utils/videoData.js';

const vm = new Vue(ContentManagement);

describe('ConentManagement.vue component', function () {
  it('should set correct default data', function () {
    expect(typeof ContentManagement.data).to.be.equal('function');
    let defaultData = ContentManagement.data();
    expect(defaultData.deleteChannels).to.be.false;
  });

  it('should contain proper methods', function () {
    expect(typeof vm.addChannel).to.be.equal('function');
    expect(typeof vm.allowRemoval).to.be.equal('function');
    expect(typeof vm.removeChannel).to.be.equal('function');
    expect(typeof vm.hideChannel).to.be.equal('function');
  });

  let promiseCall;

  beforeEach(function () {
    promiseCall = sinon.stub(Vue, 'http').returnsPromise();
    vm.newChannel = '';
    vm.sharedState.queryChannels = ['remove', 'hide'];

    // Set spies
    sinon.spy(store, 'setMovies');
    sinon.spy(store, 'setLoading');
    sinon.spy(store, 'addQueryChannel');
    sinon.spy(store, 'removeQueryChannel');
    sinon.spy(store, 'toggleHideChannel');
    sinon.spy(store, 'setQueryChannels');
    sinon.spy(store, 'setHiddenChannels');
    sinon.spy(store, 'setMessage');
  });
  afterEach(function () {
    Vue.http.restore();
    window.localStorage.clear();

    // Reset spies
    store.setMovies.restore();
    store.setLoading.restore();
    store.addQueryChannel.restore();
    store.removeQueryChannel.restore();
    store.toggleHideChannel.restore();
    store.setQueryChannels.restore();
    store.setHiddenChannels.restore();
    store.setMessage.restore();
  });

  // https://github.com/substantial/sinon-stub-promise
  it('addChannel should process data from AJAX response [success]', function (done) {
    promiseCall.resolves({
      data: videoData
    });
    vm.newChannel = 'dummy';
    vm.addChannel();
    expect(store.setMovies).to.be.called;
    expect(store.setLoading).to.be.calledTwice;
    expect(store.addQueryChannel).to.be.called;
    done();
  });

  it('addChannel should process error message from AJAX response [fail]', function (done) {
    promiseCall.rejects({
      data: {
        'statusCode': 400,
        'error': 'Bad Request',
        'message': 'invalid query'
      }
    });
    vm.newChannel = 'dummy';
    vm.addChannel();
    expect(store.setLoading).to.be.calledTwice;
    expect(store.setMessage).to.be.called;
    done();
  });

  it('allowRemoval should toggle removal flag', function (done) {
    vm.allowRemoval();
    expect(vm.deleteChannels).to.be.true;
    vm.allowRemoval();
    expect(vm.deleteChannels).to.be.false;
    done();
  });

  it('removeChannel should remove it from queryChannels and movie list', function (done) {
    vm.removeChannel('remove');
    expect(store.removeQueryChannel).to.be.called;
    expect(store.setMovies).to.be.called;
    done();
  });

  it('hideChannel should call channel toggling', function (done) {
    vm.hideChannel('remove');
    expect(store.toggleHideChannel).to.be.called;
    done();
  });
});
