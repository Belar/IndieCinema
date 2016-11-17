import Vue from 'vue';
import VideoGrid from 'client/components/VideoGrid';

import storeData from '../utils/storeData.js';

const vm = new Vue(VideoGrid);

describe('VideoGrid.vue component', function () {
  it('should have correct default data and access to store', function () {
    expect(typeof VideoGrid.data).to.be.equal('function');
    let defaultData = VideoGrid.data();
    expect(defaultData.showModal).to.exist;
    expect(defaultData.videoModal).to.exist;
    expect(defaultData.sharedState.movieList).to.exist;
    expect(defaultData.sharedState.hiddenChannels).to.exist;
    expect(defaultData.sharedState.sortCondition).to.exist;
    expect(defaultData.sharedState.sortOrder).to.exist;
    expect(defaultData.sharedState.currentPage).to.exist;
  });

  it('showModal should be false by default', function () {
    let defaultData = VideoGrid.data();
    expect(defaultData.showModal).to.be.false;
  });

  it('should have computed property with edited movie list', function () {
    expect(vm.movieListEdited).to.exist;
  });

  it('showMovie should set active video data and trigger modal', function () {
    vm.showMovie(storeData[0]);

    expect(vm.videoModal).to.be.equal(storeData[0]);
    expect(vm.showModal).to.be.true;
  });
});
