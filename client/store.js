var store = {
  state: {
    screenMessage: '',
    movieList: [],
    invisibleChannels: [] // Channels videos to hide
  },
  setMessage: function (message) {
    this.state.screenMessage = message;
  },
  setMovies: function (movies) {
    this.state.movieList = movies;
  },
  hideChannel: function (channel) {
    var channelPosition = this.state.invisibleChannels.indexOf(channel);
    if (channelPosition !== -1) {
      return this.state.invisibleChannels.splice(channelPosition, 1);
    }
    return this.state.invisibleChannels.push(channel);
  }
};

export default store;
