<template>

  <div id="movies" class="video-index">
    <h1>Indie Cinema</h1>
    <button class="button" v-on:click="getList()">Get latest Indie movies</button>
    <input class="new-channel" autofocus autocomplete="off" placeholder="Channel name..." v-model="newChannel" @keyup.enter="addChannel()">
    <button class="button" v-on:click="addChannel()">+</button>
    <ul>
      <li class="single-movie" v-for="movie in movieList | orderBy 'release_time' -1">
        <div @click="showMovie(movie.uri)">
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

  const config = require('../../config/secret.js'); // Config with settings that shouldn't make it to the repo (e.g. accessToken for Viemo API)
  const vimeoData = require('../vimeoData.js'); // Get JSON with dummy data (real Vimeo data, just stored for convenience)

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
        movieList: vimeoData, // Assign dummy data TODO: Empty array populated with the latest videos
        queryChannels: ['staffpicks', 'welikeitindietv', 'indiefilms'], // Assign dummy data TODO: Empty array populated with the latest videos
        showModal: false, // Modal's initial state
        videoModal: '', // Pass video info to modal TODO: Pass all data from movieList, remove query from the modal
        newChannel: '' // Placeholder for new channel
      };
    },
    methods: {
      // TODO addChannel and getList is the same query, restructure and reuse
      addChannel() {
        // Check if there is a valid(ish) value
        var value = this.newChannel && this.newChannel.trim();
        if (!value) {
          return;
        }

        // Remove whitespace on ends
        var addChannel = this.newChannel.trim();

        // Check if channel already exists in the array of channels
        if (this.queryChannels.indexOf(addChannel) !== -1) {
          // TODO Error, return information for user
          return;
        }

        // Add channel to the array with channels
        this.queryChannels.push(addChannel);

        var movies = this.movieList; // Get list of already showed movies
        this.$http({
          url: 'https://api.vimeo.com/channels/' + addChannel + '/videos?per_page=10&sort=added&direction=desc',
          method: 'GET',
          headers: {
            'Accept': 'application/vnd.vimeo.*+json;version=3.2',
            'Authorization': 'Bearer ' + config.vimeoAccessToken
          }
        }).then(function(response) {
          // Add videos to array
          movies = movies.concat(response.data.data);
          // Clear duplicates
          var uniqueMovies = removeDuplicates(movies, 'uri');
          // Update list of videos
          this.$set('movieList', uniqueMovies);
        }, function(response) {
          return false;
        });
        // Clear input
        this.newChannel = '';
      },
      getList() {
        // GET request
        // This is a simple query based on manually generated token to bypass the CORS, normally it should be use unauthenticated token from the provider
        // TODO: Move to back-end and cache
        // TODO: Make clear duplicates and update movieList executed outside for loop (sync)
        var movies = [];
        var queryLength = this.queryChannels.length;
        for (var i = 0; i < queryLength; i++) {
          this.$http({
            url: 'https://api.vimeo.com/channels/' + this.queryChannels[i] + '/videos?per_page=10&sort=added&direction=desc',
            method: 'GET',
            headers: {
              'Accept': 'application/vnd.vimeo.*+json;version=3.2',
              'Authorization': 'Bearer ' + config.vimeoAccessToken
            }
          }).then(function(response) {
            // Add videos to array
            movies = movies.concat(response.data.data);
            // Clear duplicates
            var uniqueMovies = removeDuplicates(movies, 'uri');
            // Update list of videos
            this.$set('movieList', uniqueMovies);
          }, function(response) {
            return false;
          });
        }
      },
      showMovie(videoUri) {
        // Show modal and pass movie's URI for data query
        this.videoModal = videoUri;
        this.showModal = true;
        // Add class to body limiting its scrolling with overflow
        document.body.className += ' modal-open';
      }
    }
  };
</script>

<style scoped lang="scss">
  h1 {
    color: #FF004D;
  }

  input {
    color: black;
  }

  .single-movie {
    max-width: 100%;
    margin: .5rem;
  }

  .thumbnail:hover {
    cursor: pointer;
  }

  img {
    height: auto;
  }

  ul {
    margin: auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    list-style-type: none;
    li {
      flex: 300px 1;
    }
  }
</style>
