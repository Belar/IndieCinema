<template>
  <div id="movies" class="video-index">
    <h1>Indie Cinema</h1>
    <button class="button" v-on:click="getList()">Refresh list</button>
    <input class="new-channel" autofocus autocomplete="off" placeholder="Channel name..." v-model="newChannel" @keyup.enter="addChannel()">
    <button class="button" v-on:click="addChannel()">+</button>
    <ul class="video-grid">
      <li class="single-movie" v-for="movie in movieList | orderBy 'release_time' -1">
        <div @click="showMovie(movie)">
          <!-- TODO: Utilize bigger preview image, but keep grid elements the same size -->
          <img v-bind:src="movie.pictures.sizes[2].link" alt="">
        </div>
        {{ movie.name }}
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

  <modal :show.sync="showModal" :video.sync="videoModal"></modal>
</template>

<script>
  var Vue = require('vue');
  Vue.use(require('vue-resource')); // Web requests, Vue plugin

  import Modal from './Modal'; // Modal component

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
      Modal
    },
    data: function() {
      return {
        movieList: [], // Assign dummy data TODO: Empty array populated with the latest videos
        queryChannels: ['staffpicks', 'welikeitindietv', 'indiefilms'], // Assign dummy data TODO: Empty array populated with the latest videos
        showModal: false, // Modal's initial state
        videoModal: {}, // Pass video info to modal TODO: Pass all data from movieList, remove query from the modal
        newChannel: '' // Placeholder for new channel
      };
    },
    methods: {
      addChannel() {
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
          // Add channel to the array with channels
          this.queryChannels.push(addChannel);
        }, function(response) {
          return false;
        });
        // Clear input
        this.newChannel = '';
      },
      getList() {
        var movies = [];
        this.$http({
          url: '/api/get-videos?channels=' + this.queryChannels,
          method: 'GET'
        }).then(function(response) {
          movies = movies.concat(response.data);
          // Clear duplicates
          var uniqueMovies = removeDuplicates(movies, 'uri');
          // Update list of videos
          this.$set('movieList', uniqueMovies);
        }, function(response) {
          return false;
        });
      },
      showMovie(video) {
        // Show modal and pass movie's URI for data query
        this.videoModal = video;
        this.showModal = true;
        // Add class to body limiting its scrolling with overflow
        document.body.className += ' modal-open';
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
