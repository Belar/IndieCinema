<template>
  <div class="modal-mask" v-show="show" @click="closeMovie()" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-if="movie" @click.stop>
        <div class="modal-header clearfix">
          <button class="close modal-button button" @click="closeMovie()"> Close </button>
        </div>
        <div class="flex-video widescreen" v-if="movie.embed">
          <!-- TODO: Change to custom player or clean embed -->
          {{{ movie.embed.html }}}
        </div>
        <div class="movie-info">
          <h2 class="title">{{ movie.name }}</h2>
          <div class="by" v-if="movie.user">by <span class="author"><a v-bind:href="movie.user.link" target="_blank" rel="noreferrer">{{ movie.user.name }}</a></span></div>
          <div>
            {{ movie.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var Vue = require('vue');
  Vue.use(require('vue-resource')); // Web requests Vue plugin

  // const config = require('../../config/secret.js'); // Config with settings that shouldn't make it to the repo (e.g. accessToken for Viemo API)

  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      },
      video: {
        type: Object,
        required: true
      }
    },

    data: function() {
      return {
        movie: {}
      };
    },

    methods: {
      closeMovie() {
        // Remove class from body to return scrolling availability
        // TODO: Remove the class without cleaning others
        document.body.className = '';
        // Clear movie info
        this.movie = {};
        // Hide modal
        this.show = false;
      }
    },

    watch: {
      'show': function() {
        if (this.show === true) {
          this.$set('movie', this.video);
        }
      }
    },

    ready: function() {
      // Closes modal on escape
      document.addEventListener('keydown', (event) => {
        // Check if modal is open and key is esc
        if (this.show && event.keyCode === 27) {
          this.closeMovie();
        }
      });
    }
  };
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
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
    background-color: rgba(255, 255, 255, 1);
    transition: all .3s ease;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: left;
  }

  @media (min-width: 40em) {
    .modal-container {
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
