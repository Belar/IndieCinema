import Vue from 'vue';
import helpers from './helpers';

const store = {
  state: {
    channelGroups: [{
      'name': 'mix',
      'channels': ['staffpicks', '893369', 'shortoftheweek', '31259', 'everythinganimated', 'documentaryfilm', '8048']
    }, {
      'name': 'film',
      'channels': ['shortoftheweek', '31259', 'filmmakers', 'thefilmmakers', 'bfc']
    }, {
      'name': 'music',
      'channels': ['8048', 'musicall', 'hdmusicvideos', 'musicvideos', 'musicvideoland']
    }, {
      'name': 'creative',
      'channels': ['designcollector', '1nspirational', 'thegoodstuff', '5vimeobest', 'nothingshortof']
    }, {
      'name': 'planet',
      'channels': ['eoadaily', 'hdtime', 'landandwater', 'planethd']
    }],
    loadingIndicator: false,
    screenMessage: '',
    movieList: [],
    queryChannels: [], // Default, curated channels - indie film, music videos, documentary etc.
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
  getMovies: function () {
    // Check if there are channel to get videos
    if (!this.state.queryChannels.length > 0) {
      return store.setMessage('There are no channels to show videos from');
    }

    // Show loading indicator
    store.setLoading(true);
    let movies = this.state.movieList;
    let fetchPage = this.state.currentPage;
    Vue.http.get('/api/get-videos?channels=' + this.state.queryChannels + '&page=' + fetchPage).then((response) => {
      movies = movies.concat(response.data);
      // Clear duplicates
      let uniqueMovies = helpers.removeDuplicates(movies, 'uri');
      // Turn off loading
      store.setLoading(false);
      // Update list of videos
      store.setMovies(uniqueMovies);
    }, (error) => {
      // Turn off loading
      store.setLoading(false);
      return store.setMessage(error.data.message);
    });
  },
  setHiddenChannels: function (channels) {
    this.state.hiddenChannels = channels;
  },
  toggleHideChannel: function (channel) {
    // Toggle channel from invisible channels
    let channelPosition = this.state.hiddenChannels.indexOf(channel);
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
    let channelPosition = this.state.queryChannels.indexOf(channel);
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
