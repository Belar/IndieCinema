var store = {
  state: {
    channelGroups: [{
      'name': 'mix',
      'channels': ['staffpicks', 'shortoftheweek', '31259', 'everythinganimated', 'documentaryfilm', '8048']
    }, {
      'name': 'film',
      'channels': ['shortoftheweek', '31259', 'filmmakers', 'thefilmmakers', 'bfc']
    }, {
      'name': 'music',
      'channels': ['8048', 'musicall', 'hdmusicvideos', 'musicvideos', 'musicvideoland']
    }, {
      'name': 'creative',
      'channels': ['designcollector', '1nspirational', 'thegoodstuff', '5vimeobest', 'nothingshortof']
    }],
    loadingIndicator: false,
    screenMessage: '',
    movieList: [],
    queryChannels: ['staffpicks', 'shortoftheweek', '31259', 'everythinganimated', 'documentaryfilm', '8048'], // Default, curated channels - indie film, music videos, documentary etc.
    hiddenChannels: [], // Channels videos to hide
    sortCondition: 'indieCinema.order', // Defines how movies are ordered
    sortOrder: 1, // Asc or desc
    currentPage: 1 // Current browsing page
  },
  setLoading: function (state) {
    this.state.loadingIndicator = state;
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
  setQueryChannels: function (channels) {
    this.state.queryChannels = channels;
  },
  addQueryChannel: function (channel) {
    this.state.queryChannels.push(channel);
  },
  removeQueryChannel: function (channel) {
    var channelPosition = this.state.queryChannels.indexOf(channel);
    if (channelPosition !== -1) {
      return this.state.queryChannels.splice(channelPosition, 1);
    }
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
  },
  setCurrentPage: function (pageNo) {
    this.state.currentPage = pageNo;
  }
};

export default store;
