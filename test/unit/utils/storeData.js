module.exports = {
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
  screenMessage: 'Dummy message',
  movieList: [],
  queryChannels: ['dummy', 'random', 'channel'], // Default, curated channels - indie film, music videos, documentary etc.
  hiddenChannels: ['secret', 'top'], // Channels videos to hide
  sortCondition: 'indieCinema.release_time', // Defines how movies are ordered
  sortOrder: 1, // Asc or desc
  currentPage: 5 // Current browsing page
};
