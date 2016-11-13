<template>
  <transition name="fade">
    <div class="scroll-top" v-show="scrollAvailable" @click="toTheTop()" @click.stop>
      <svg class="icon icon-chevron-c-up">
        <use xlink:href="/assets/images/symbols_defs.svg#icon-chevron-c-up"></use>
      </svg>
    </div>
  </transition>
</template>

<script>
'use strict';

export default {
  data: function() {
    return {
      scrollAvailable: false
    };
  },
  methods: {
    toTheTop() {
      function scrollTop(duration) {
        let step = -document.body.scrollHeight / duration;
        let scrolling = setInterval(function() {
          if (window.scrollY !== 0) {
            return window.scrollBy(0, step);
          }
          return clearInterval(scrolling);
        }, duration / 24);
      }
      scrollTop(125);
    }
  },
  mounted: function() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        this.scrollAvailable = true;
        return;
      }
      this.scrollAvailable = false;
    });
  }
};
</script>

<style lang="sass">
@import "./utils/sass/styling";
.scroll-top {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  opacity: .5;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  @include bp(md) {
    bottom: 1rem;
    right: 2rem;
  }
  .icon {
    height: 1.5rem;
    width: 1.5rem;
    background: $light;
    color: $dark;
    padding: .5rem;
    border-radius: 1000px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease;
  opacity: .5;
}

.fade-leave-active {
  opacity: 0;
}
</style>
