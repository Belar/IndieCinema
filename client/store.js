import Vue from 'vue';

// Accepts array of objects and removes duplicates
function removeDuplicates(array, prop) {
  var uniqueArray = [];
  var uniqueObject = {};
  var arrayLength = array.length;

  // Generate objects identified by prop as key
  for (var i = 0; i < arrayLength; i++) {
    uniqueObject[array[i][prop]] = array[i];
  }
  // Insert objects into array
  for (i = 0 in uniqueObject) {
    uniqueArray.push(uniqueObject[i]);
  }
  return uniqueArray;
}

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
  getMovies: function () {
    // Check if there are channel to get videos
    if (!this.state.queryChannels.length > 0) {
      return store.setMessage('There are no channels to show videos from');
    }

    // Show loading indicator
    store.setLoading(true);
    var movies = this.state.movieList;
    var fetchPage = this.state.currentPage;
    Vue.http({
      url: '/api/get-videos?channels=' + this.state.queryChannels + '&page=' + fetchPage,
      method: 'GET'
    }).then(function (response) {
      movies = movies.concat(response.data);
      // Clear duplicates
      var uniqueMovies = removeDuplicates(movies, 'uri');
      // Turn off loading
      store.setLoading(false);
      // Update list of videos
      store.setMovies(uniqueMovies);
    }, function (error) {
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
