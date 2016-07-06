<template>
  <div class="modal-mask" v-show="show" @click="closeMovie()" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-if="movie" @click.stop>
        <div class="modal-header">
          <i class="modal-close icon ion-close" @click="closeMovie()" @click.stop></i>
        </div>
        <div class="flex-video widescreen" v-if="movie.embed">
          <!-- TODO: Change to custom player or clean embed -->
          {{{ movie.embed.html }}}
        </div>
        <div class="movie-info">
          <h2 class="title">{{ movie.name }}</h2>
          <div class="by" v-if="movie.user">by <span class="author"><a v-bind:href="movie.user.link" target="_blank" rel="noreferrer">{{ movie.user.name }}</a></span></div>
          <div class="description">
            {{ movie.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  'use strict';

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
          // Add class to body limiting its scrolling with overflow
          document.body.classList.add('modal-open');
        } else {
          // Remove class from body to return scrolling availability
          document.body.classList.remove('modal-open');
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

<style lang="scss">
  @import "./utils/sass/styling";
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($dark, .9);
    transition: opacity .2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  }

  .modal-wrapper {
    z-index: 1010;
    margin: auto;
    left: 0;
    right: 0;
  }

  .modal-container {
    width: 100%;
    margin: 0px auto;
    background-color: $light;
    transition: all .3s ease;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: left;
    @include bp(md) {
      width: 600px;
    }
    @include bp(xl) {
      width: 960px;
    }
  }

  .modal-header {
    text-align: right;
    padding: .25rem .25rem;
  }
  .modal-close {
    font-size: 1.3rem;
    margin: 1px 5px 0 0;
    cursor: pointer;
    color: rgba($dark, .25);
    transition: color .2s ease-in;
    &:hover,
    &:active {
      color: $primary;
      opacity: 1;
    }
  }

  .flex-video {
    height: 0;
    padding-top: 25px;
    padding-bottom: 67.5%;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
    &.widescreen {
      padding-bottom: 56.34%;
    }
    iframe {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  .movie-info {
    position: relative;
    padding: 0 1rem 1rem;
    .title {
      margin: .5rem auto 0;
    }
    .by a {
      text-decoration: none;
      color: $primary;
      font-weight: 600;
      padding: 0 2px;
      transition: background .2s ease-in, color .2s ease-in;
      &:hover{
          background: $primary;
          color: $light;
      }
    }
    .description{
        margin: 1rem auto;
    }
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
