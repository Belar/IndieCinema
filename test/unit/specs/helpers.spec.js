import helpers from 'client/helpers';

import videoData from '../utils/videoData.js';

describe('helpers', function () {
  it('removeDuplacets should be a function', function () {
    expect(typeof helpers.removeDuplicates).to.be.equal('function');
  });

  it('removeDuplicates should remove duplicates from an array', function () {
    let noDuplicates = videoData;
    let duplicates = noDuplicates.concat(videoData);

    let filtered = helpers.removeDuplicates(duplicates, 'uri');

    expect(filtered).to.be.deep.equal(noDuplicates);
  });
});
