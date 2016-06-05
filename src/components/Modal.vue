<template>
  <div class="modal-mask" v-show="show" @click="show = false" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" @click.stop>
        <div class="flex-video">
          <!-- TODO: Change to custom player or clean embed -->
          {{{ movie.embed.html }}}
        </div>
        <button class="modal-button button" @click="show = false"> Close </button>
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
          this.show = false
        }
      })
    }
  }
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 600px;
    margin: 0px auto;
    background-color: #fff;
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-button {
    display: block;
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
