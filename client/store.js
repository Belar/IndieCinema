var store = {
  state: {
    screenMessage: '',
    movieList: [],
    invisibleChannels: [], // Channels videos to hide
    sortCondition: 'indieCinema.order', // Defines how movies are ordered
    sortOrder: 1 // Asc or desc
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
  },
  setSortCondition: function (condition) {
    this.state.sortCondition = condition;
  },
  setSortOrder: function (order) {
    if (order === 'asc') {
      this.state.sortOrder = 1;
    } else {
      this.state.sortOrder = -1;
    }
  }
};

export default store;
