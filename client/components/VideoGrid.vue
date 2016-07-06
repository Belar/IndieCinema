<template>
  <div id="movies" class="video-index">
    <h1>indie cinema</h1>
    <div class="add-new-channel-wrapper">
      <div class="add-new-channel">
        <label>Add channel</label>
        <input autofocus autocomplete="off" placeholder="e.g. staffpicks" v-model="newChannel" @keyup.enter="addChannel()">
        <i class="close icon ion-plus-circled" @click="addChannel()"></i>
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
        <i class="refresh-videos close icon ion-refresh" @on:click="getList()"></i>
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

<style>
  h1 {
    color: #FF004D;
  }

  input {
    color: black;
  }

  .query-channels {
    list-style-type: none;
  }

  .query-channels li {
    display: inline-block;
    margin: auto .25rem;
  }

  ul.video-grid {
    margin: auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    list-style-type: none;
  }

  li.single-movie {
    max-width: 100%;
    margin: .5rem;
    flex: 300px 1;
  }

  .thumbnail:hover {
    cursor: pointer;
  }

  img {
    height: auto;
  }
</style>
