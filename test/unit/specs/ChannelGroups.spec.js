import ChannelGroups from 'client/components/ChannelGroups';

describe('ChannelGroups.vue component', function () {
  it('should have access to channel groups in store', function () {
    expect(typeof ChannelGroups.data).to.be.equal('function');
    let defaultData = ChannelGroups.data();
    expect(defaultData.sharedState.channelGroups).to.exist;
  });
});
