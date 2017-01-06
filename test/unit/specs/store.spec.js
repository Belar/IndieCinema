import axios from 'axios';
import store from 'client/store';

import videoData from '../utils/videoData.js';
import storeData from '../utils/storeData.js';

describe('store state', function () {
  it('state should be an object', function () {
    expect(typeof store.state).to.be.equal('object');
  });
  it('channelGroups should be an array, not empty', function () {
    expect(store.state.channelGroups).to.be.an('array');
    expect(store.state.channelGroups).to.be.not.empty;
  });
  it('loadingIndicator should be set to false', function () {
    expect(store.state.loadingIndicator).to.be.a('boolean');
    expect(store.state.loadingIndicator).to.be.false;
  });
  it('screenMessage should exist', function () {
    expect(store.state.screenMessage).to.be.a('string');
  });
  it('movieList should be an array', function () {
    expect(store.state.movieList).to.be.an('array');
  });
  it('queryChannels should be an array', function () {
    expect(store.state.queryChannels).to.be.an('array');
  });
  it('hiddenChannels should be an array', function () {
    expect(store.state.hiddenChannels).to.be.an('array');
  });
  it('sortCondition should be an array', function () {
    expect(store.state.sortCondition).to.be.a('string');
    expect(store.state.sortCondition).to.be.not.empty;
  });
  it('sortOrder should be a number and not empty', function () {
    expect(store.state.sortOrder).to.be.a('number');
    expect(store.state.sortOrder).to.be.not.empty;
  });
  it('currentPage should be a number and not empty', function () {
    expect(store.state.currentPage).to.be.a('number');
    expect(store.state.currentPage).to.be.not.empty;
  });
});

describe('store methods', function () {
  it('setLoading should alter loadingIndicator state', function () {
    store.state.loadingIndicator = false;

    store.setLoading(true);
    expect(store.state.loadingIndicator).to.be.true;
  });
  it('setMessage should alter screenMessage state', function () {
    store.state.screenMessage = '';

    store.setMessage(storeData.screenMessage);
    expect(store.state.screenMessage).to.be.equal(storeData.screenMessage);
  });
  it('setMovies should alter movieList state', function () {
    store.state.movieList = [];

    store.setMovies(videoData);
    expect(store.state.movieList).to.be.equal(videoData);
  });

  let promiseCall;
  store.state.queryChannels = storeData.queryChannels;

  beforeEach(function () {
    promiseCall = sinon.stub(axios, 'get').returnsPromise();

    // Set spies
    sinon.spy(store, 'setMovies');
    sinon.spy(store, 'setLoading');
    sinon.spy(store, 'setMessage');
  });
  afterEach(function () {
    axios.get.restore();
    window.localStorage.clear();

    // Reset spies
    store.setMovies.restore();
    store.setLoading.restore();
    store.setMessage.restore();
  });
  it('getMovies should process data from AJAX response [success]', function (done) {
    promiseCall.resolves({
      data: videoData
    });

    store.getMovies();
    expect(store.setMovies).to.be.called;
    expect(store.setLoading).to.be.calledTwice;
    done();
  });
  it('getMovies should process error message from AJAX response [fail]', function (done) {
    promiseCall.rejects({
      data: {
        'statusCode': 400,
        'error': 'Bad Request',
        'message': 'invalid query'
      }
    });

    store.getMovies();
    expect(store.setMovies).to.be.not.called;
    expect(store.setLoading).to.be.calledTwice;
    expect(store.setMessage).to.be.called;
    done();
  });
  it('getMovies should show error message on emptyQueryChannels [fail]', function (done) {
    store.state.queryChannels = [];

    store.getMovies();
    expect(store.setMovies).to.be.not.called;
    expect(store.setMessage).to.be.called;
    done();
  });

  it('setHiddenChannels should alter hiddenChannels state', function () {
    store.state.hiddenChannels = [];

    store.setHiddenChannels(storeData.hiddenChannels);
    expect(store.state.hiddenChannels).to.be.equal(storeData.hiddenChannels);
  });
  it('toggleHideChannel should add channel to hiddenChannels', function () {
    store.state.hiddenChannels = [];

    store.toggleHideChannel('hidden');
    expect(store.state.hiddenChannels).to.include('hidden');
  });
  it('toggleHideChannel should remove channel from hiddenChannels', function () {
    store.state.hiddenChannels = ['hidden'];

    store.toggleHideChannel('hidden');
    expect(store.state.hiddenChannels).to.not.include('hidden');
  });

  it('setQueryChannels should alter queryChannels state', function () {
    store.state.queryChannels = [];

    store.setQueryChannels(storeData.queryChannels);
    expect(store.state.queryChannels).to.be.equal(storeData.queryChannels);
  });
  it('addQueryChannel should add channel to queryChannels', function () {
    store.state.queryChannels = [];

    store.addQueryChannel('query');
    expect(store.state.queryChannels).to.include('query');
  });
  it('removeQueryChannel should remove channel from queryChannels', function () {
    store.state.queryChannels = ['query'];

    store.removeQueryChannel('query');
    expect(store.state.queryChannels).to.not.include('query');
  });
  it('setSortCondition should change condition in sortCondition', function () {
    store.state.sortCondition = 'indieCinema.order';

    store.setSortCondition(storeData.sortCondition);
    expect(store.state.sortCondition).to.be.equal(storeData.sortCondition);
  });
  it('setSortOrder should change order in sortCondition', function () {
    store.state.sortOrder = 1;

    store.setSortOrder('desc');
    expect(store.state.sortOrder).to.be.equal(-1);
    store.setSortOrder('asc');
    expect(store.state.sortOrder).to.be.equal(1);
  });
  it('setCurrentPage should update page, alter currentPage state', function () {
    store.state.currentPage = 1;

    store.setCurrentPage(storeData.currentPage);
    expect(store.state.currentPage).to.be.equal(storeData.currentPage);
  });
});
