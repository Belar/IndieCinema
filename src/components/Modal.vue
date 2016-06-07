<template>
  <div class="modal-mask" v-show="show" @click="closeMovie()" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" @click.stop>
        <div class="modal-header clearfix">
          <button class="close modal-button button" @click="closeMovie()"> Close </button>
        </div>
        <div class="flex-video widescreen">
          <!-- TODO: Change to custom player or clean embed -->
          {{{ movie.embed.html }}}
        </div>
        <div class="movie-info">
          <h2 class="title">{{ movie.name }}</h2>
          <div class="by">by <span class="author">{{ movie.user.name }}</span></div>
          <div>
            {{ movie.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var Vue = require('vue')
  Vue.use(require('vue-resource')) // Web requests Vue plugin

  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      },
      video: {
        type: String,
        required: true
      }
    },

    data: function() {
      return {
        movie: []
      }
    },

    methods: {
      closeMovie() {
        // Remove class from body to return scrolling availability
        // TODO: Remove the class without cleaning others
        document.body.className = ''
        // Clear movie info
        this.movie = []
        // Hide modal
        this.show = false
      }
    },

    watch: {
      'show': function() {
        if (this.show === true) {
          // Get data about the video
          // TODO Remove request and use data from movieList in parent component
          this.$http({
            url: 'https://api.vimeo.com/' + this.video,
            method: 'GET',
            headers: {
              'Accept': 'application/vnd.vimeo.*+json;version=3.2',
              'Authorization': 'Bearer a3e6b53ec8b0d76e8d44e9854f914814'
            }
          }).then(function(response) {
            // Update information about the movie
            this.$set('movie', response.data)
          }, function(response) {
            return false
          })
        }
      }
    },

    ready: function() {
      // Closes modal on escape
      document.addEventListener('keydown', (event) => {
        // Check if modal is open and key is esc
        if (this.show && event.keyCode === 27) {
          this.closeMovie()
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  // TODO:
  // Add auto-prefixing
  $primary-dark: #14171e;
  $secondary-dark: #282a36;
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($secondary-dark, .8);
    transition: opacity .3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  }

  .modal-wrapper {
    position: absolute;
    z-index: 1010;
    margin: auto;
    left: 0;
    right: 0;
  }

  .modal-container {
    width: 100%;
    margin: 0px auto;
    background-color: rgba($primary-dark, .8);
    transition: all .3s ease;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    border-radius: 5px;
    text-align: left;
    @media (min-width: 40em) {
      width: 600px;
    }
  }

  .modal-button.close {
    float: right;
  }

  .movie-info {
    padding: 1rem;
  }
  /*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

  .modal-enter,
  .modal-leave {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
