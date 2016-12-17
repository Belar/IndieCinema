<template>
  <transition name="modal">
    <div class="modal-mask" v-show="show" @click="closeMovie()">
      <div class="modal-wrapper">
        <div class="modal-container" v-if="video" @click.stop>
          <div class="modal-header">
            <svg class="modal-close icon icon-cross" @click="closeMovie()" @click.stop>
              <use pointer-events="visible" xlink:href="/assets/images/symbols_defs.svg#icon-cross"></use>
            </svg>
          </div>
          <div class="flex-video widescreen" v-if="video.embed" v-html="video.embed.html"></div>
          <div class="movie-info">
            <h2 class="title">{{ video.name }}</h2>
            <div class="by" v-if="video.user">by
              <span class="author"><a v-bind:href="video.user.link" target="_blank" rel="noreferrer">{{ video.user.name }}</a></span>
            </div>
            <div class="description">
              {{ video.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
'use strict';

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    video: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeMovie() {
      // Hide modal
      this.$emit('closeModal');
    }
  },
  watch: {
    'show': function() {
      let appWrapper = document.getElementById('body-content-wrapper');
      if (this.show === true) {
        // Add class to body limiting its scrolling with overflow
        appWrapper.classList.add('modal-open');
      } else {
        // Remove class from body to return scrolling availability
        appWrapper.classList.remove('modal-open');
      }
    }
  },

  mounted: function() {
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

<style lang="sass">
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
  margin: 3px 5px 0 0;
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
    &:hover {
      background: $primary;
      color: $light;
    }
  }
  .description {
    margin: 1rem auto;
    white-space: pre-line;
    line-height: 1.5;
    font-size: .95rem;
    line-height: 1.5;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
