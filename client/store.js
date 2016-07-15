var store = {
  state: {
    screenMessage: '',
    movieList: [],
    hiddenChannels: [], // Channels videos to hide
    sortCondition: 'indieCinema.order', // Defines how movies are ordered
    sortOrder: 1 // Asc or desc
  },
  setMessage: function (message) {
    this.state.screenMessage = message;
  },
  setMovies: function (movies) {
    this.state.movieList = movies;
  },
  toggleHideChannel: function (channel) {
    // Toggle channel from invisible channels
    var channelPosition = this.state.hiddenChannels.indexOf(channel);
    if (channelPosition !== -1) {
      return this.state.hiddenChannels.splice(channelPosition, 1);
    }
    return this.state.hiddenChannels.push(channel);
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
