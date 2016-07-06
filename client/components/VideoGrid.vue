<template>
  <div id="movies" class="video-index">
    <h1>indie cinema</h1>
    <div class="add-new-channel-wrapper">
      <div class="add-new-channel">
        <label>Add channel</label>
        <input autofocus autocomplete="off" placeholder="e.g. staffpicks" v-model="newChannel" @keyup.enter="addChannel()">
        <i class="icon ion-plus-circled" @click="addChannel()"></i>
      </div>
    </div>
    <!-- <button class="button" v-on:click="resetChannels()">Reset Channels</button>-->
    <div class="action-bar clearfix">
      <div class="query-channels">
        <h5>Current channels:</h5>
        <ul>
          <li class="channel label " v-for="channel in queryChannels">
            <i class="close icon ion-close" @click="removeChannel(channel)" @click.stop></i> {{ channel }}</span>
          </li>
        </ul>
      </div>
      <div class="options">
        <i class="refresh-videos icon ion-refresh" v-show="!loadingIndicator" @click="getList()"></i>
        <loading :loading.sync="loadingIndicator"></loading>
      </div>
    </div>

    <div class="video-grid">
      <ul>
        <li class="single-movie" v-for="movie in movieList | orderBy 'release_time' -1">
          <div class="preview-wrapper" @click="showMovie(movie)">
            <!-- TODO: Utilize bigger preview image, but keep grid elements the same size -->
            <img v-bind:src="movie.pictures.sizes[2].link" alt="">
          </div>
          <h4>{{ movie.name }}</h4>
          <div class="description">
            {{ movie.description }}
          </div>
        </li>
        <!-- Hacky way to make elements of last row (when not full) behave when using justify: space-between -->
        <li class="single-movie"></li>
        <li class="single-movie"></li>
        <li class="single-movie"></li>
        <li class="single-movie"></li>
        <li class="single-movie"></li>
        <li class="single-movie"></li>
      </ul>
    </div>
  </div>
  <modal :show.sync="showModal" :video.sync="videoModal"></modal>
</template>

<script>
  'use strict';

  var Vue = require('vue');
  Vue.use(require('vue-resource')); // Web requests, Vue plugin

  import Modal from './Modal'; // Modal component
  import Loading from './Loading'; // Loading indicator component

  const localStorage = window.localStorage;
  var defaultChannels = ['staffpicks', 'shortoftheweek', '31259', 'everythinganimated', 'documentaryfilm', '8048']; // Default, curated channels - indie film, music videos, documentary etc.

  // const vimeoData = require('../vimeoData.js'); // Get JSON with dummy data (real Vimeo data, just stored for convenience)

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

  export default {
    components: {
      Modal,
      Loading
    },
    data: function() {
      return {
        movieList: [], // Assign dummy data TODO: Empty array populated with the latest videos
        queryChannels: defaultChannels, // Assign default channels
        showModal: false, // Modal's initial state
        loadingIndicator: false, // Loading indicator's state
        videoModal: {}, // Pass video info to modal TODO: Pass all data from movieList, remove query from the modal
        newChannel: '' // Placeholder for new channel
      };
    },
    methods: {
      addChannel() {
        // Show loading indicator
        this.loadingIndicator = true;
        // Remove whitespace on ends
        var addChannel = this.newChannel.trim();

        // Check if there is a valid(ish) value
        if (!addChannel) {
          return console.log('No channel to add');
        }

        // Check if channel already exists in the array of channels
        if (this.queryChannels.indexOf(addChannel) !== -1) {
          // TODO Error, return information for user
          return console.log('Channel already present');
        }

        var movies = this.movieList; // Get list of already showed movies

        this.$http({
          url: '/api/get-videos-single?channel=' + addChannel,
          method: 'GET'
        }).then(function(response) {
          // Add videos to array
          movies = movies.concat(response.data);
          // Clear duplicates
          var uniqueMovies = removeDuplicates(movies, 'uri');
          // Update list of videos
          this.$set('movieList', uniqueMovies);
          // Turn off loading
          this.loadingIndicator = false;
          // Add channel to the array with channels
          this.queryChannels.push(addChannel);
          localStorage.setItem('myChannels', JSON.stringify(this.queryChannels));
        }, function(response) {
          // Turn off loading
          this.loadingIndicator = false;
          return false;
        });
        // Clear input
        this.newChannel = '';
      },
      getList() {
        // Show loading indicator
        this.loadingIndicator = true;
        if (!this.queryChannels.length > 0) {
          // TODO: Proper error
          return console.log('No channels to query');
        }
        var movies = [];
        this.$http({
          url: '/api/get-videos?channels=' + this.queryChannels,
          method: 'GET'
        }).then(function(response) {
          movies = movies.concat(response.data);
          // Clear duplicates
          var uniqueMovies = removeDuplicates(movies, 'uri');
          // Turn off loading
          this.loadingIndicator = false;
          // Update list of videos
          this.$set('movieList', uniqueMovies);
        }, function(response) {
          // Turn off loading indicator
          this.loadingIndicator = false;
          return false;
        });
      },
      showMovie(video) {
        // Show modal and pass movie's URI for data query
        this.videoModal = video;
        this.showModal = true;
      },
      removeChannel(channel) {
        var channelPosition = this.queryChannels.indexOf(channel);
        this.queryChannels.splice(channelPosition, 1);

        if (!this.queryChannels.length > 0) {
          return this.$set('movieList', []);
        }
        localStorage.setItem('myChannels', JSON.stringify(this.queryChannels));
        this.getList();
      },
      resetChannels() {
        this.$set('queryChannels', defaultChannels);
        this.getList();
      }
    },
    created: function() {
      var customChannels = localStorage.getItem('myChannels');
      if (customChannels) {
        this.$set('queryChannels', JSON.parse(customChannels));
      }
    },
    ready: function() {
      this.getList();
    }
  };
</script>

<style lang="scss">
  @import "./utils/sass/styling";
  h1 {
    font-family: 'Old Standard TT', serif;
    font-weight: bold;
    text-align: center;
    font-size: 2rem;
    @include bp(md) {
      margin: 2rem 0 0 0;
      font-size: 2.5rem;
    }
    @include bp(lg) {
      margin: 4rem 0 0 0;
      font-size: 3rem;
    }
  }

  .add-new-channel-wrapper {
    text-align: center;
    @include bp(md) {
      margin: 2rem 0 0 0;
      font-size: 2.5rem;
    }
    @include bp(lg) {
      margin: 4rem 0 0 0;
      font-size: 3rem;
    }
  }

  .add-new-channel {
    display: inline-block;
    text-align: center;
    margin: auto;
    label {
      display: block;
      text-align: left;
      margin: auto auto .5rem 1.5rem;
      font-size: 1rem;
      color: $dark;
    }
    input {
      height: 48px;
      border-radius: 1000px;
      border: 2px solid rgba($dark, .25);
      padding: 0 1.5rem;
      vertical-align: top;
      font-size: 1rem;
      font-style: italic;
      width: 200px;
      transition: border-color .2s ease-in;
      &:focus {
        outline: 0;
        border-color: $primary;
      }
      @include bp(md) {
        width: 500px;
      }
    }
    button {
      background: none;
      border: none;
    }
    i {
      font-size: 48px;
      color: rgba($dark, .25);
      transition: color .2s ease-in;
      &:hover {
        color: $primary;
      }
    }
  }

  .query-channels {
    padding: 0 1rem;
    margin: 2rem 0 0 0;
    width: 70%;
    float: left;
    @include bp(md) {
      width: 60%;
      padding: 0 1rem;
      margin: 2rem 0 0 0;
    }
    @include bp(xlg) {
      width: 80%;
      padding: 0 2.5rem;
      margin: 4rem 0 0 0;
    }
    h5 {
      font-size: 1rem;
      margin: 0 0 .5rem 0;
      opacity: .75;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    li {
      display: inline-block;
      margin: .5rem 1rem .5rem 0;
      font-weight: 600;
      @include bp(xlg) {
        margin: auto 1.5rem auto 0;
      }
    }
    .close {
      margin: 1px 5px 0 0;
      float: left;
      cursor: pointer;
      color: rgba($dark, .25);
      transition: color .2s ease-in;
      &:hover,
      &:active {
        color: $primary;
        opacity: 1;
      }
    }
    .channel-name {
      float: right;
      font-size: .95rem;
    }
  }

  .options {
    padding: 0 1rem;
    margin: 2rem 0 0 0;
    text-align: right;
    width: 10%;
    float: right;
    @include bp(md) {
      padding: 0 1rem;
    }
    @include bp(xlg) {
      padding: 0 2.5rem;
      margin: 4rem 0 0 0;
    }
    .refresh-videos {
      cursor: pointer;
      margin-top: 2rem;
      font-size: 24px;
      color: rgba($dark, .25);
      transition: color .2s ease-in;
      &:hover,
      &:active {
        color: $primary;
        opacity: 1;
      }
      @include bp(md) {
        margin-top: 1rem;
      }
    }
    // VideoGrid specific styling for Loading component
    .loading-bar {
      right: 0;
      padding: 0 2.5rem;
    }
  }

  .video-grid {
    clear: both;
    ul {
      padding: 0;
      margin: auto;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-around;
      list-style-type: none;
      @include bp(md) {
        margin: 2rem 0 0 0;
      }
      @include bp(lg) {
        margin: 3rem 0 0 0;
      }
    }
    .single-movie {
      max-width: 100%;
      flex: 295px 1;
      margin: 1rem .5rem;
      @include bp(md) {
        margin: 2rem .5rem;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
    .preview-wrapper {
      cursor: pointer;
    }
    h4 {
      margin: .25rem auto;
      font-size: .95rem;
      font-weight: 700;
    }
    .description {
      width: 295px;
      height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
