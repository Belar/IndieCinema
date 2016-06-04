<template>

  <div id="movies" class="viemo">
    <h1>Indie Cinema</h1>
    <button class="button" v-on:click="getList">Get latest Indie movies</button>
    <modal :show.sync="showModal" :video.sync="videoModal"></modal>
    <ul>
      <li class="single-movie" v-for="movie in movieList | orderBy 'created_time'">
        <div class="thumbnail" @click="showMovie(movie.uri)">
          <img v-bind:src="movie.pictures.sizes[1].link_with_play_button" alt="">
        </div>
        {{ movie.name }}
      </li>
    </ul>
  </div>

</template>

<script>
  var Vue = require('vue')
  Vue.use(require('vue-resource')) // Web requests, Vue plugin

  import Modal from './Modal' // Modal component

  const config = require('../../config/secret.js') // Config with settings that shouldn't make it to the repo (e.g. accessToken for Viemo API)
  const vimeoData = require('../vimeoData.js') // Get JSON with dummy data (real Vimeo data, just stored for convenience)

  export default {
    components: {
      Modal
    },
    data: function() {
      return {
        movieList: vimeoData, // Assign dummy data TODO: Empty array populated with the latest videos
        showModal: false, // Modal's initial state
        videoModal: '' // Pass video info to modal TODO: Pass all data from movieList, remove query from the modal
      }
    },
    methods: {
      getList() {
        // GET request
        // This is a simple query based on manually generated token to bypass the CORS, normally it should be use unauthenticated token from the provider TODO: move to back-end and cache
        this.$http({
          url: 'https://api.vimeo.com/groups/indie/videos',
          method: 'GET',
          headers: {
            'Accept': 'application/vnd.vimeo.*+json;version=3.2',
            'Authorization': 'Bearer ' + config.vimeoAccessToken
          }
        }).then(function(response) {
          // Update list of videos
          this.$set('movieList', response.data.data)
        }, function(response) {
          return false
        })
      },
      showMovie(videoUri) {
        // Show modal and pass movie's URI for data query
        this.videoModal = videoUri
        this.showModal = true
      }
    }
  }
</script>

<style scoped lang="scss">
  h1 {
    color: #FF004D;
  }

  .thumbnail:hover {
    cursor: pointer;
  }

  img {
    max-width: 200px;
    height: auto;
  }

  ul {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
    list-style-type: none;
    li {
      flex: 1;
    }
  }
</style>
