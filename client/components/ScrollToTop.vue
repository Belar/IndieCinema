<template>
  <div class="scroll-top" v-show="scrollAvailable" transition="fade" @click="toTheTop()" @click.stop>
    <i class="ion ion-chevron-up"></i>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      scrollAvailable: false
    };
  },
  methods: {
    toTheTop() {
      function scrollTop(duration) {
        var step = -document.body.scrollHeight / duration;
        var scrolling = setInterval(function() {
          if (window.scrollY !== 0) {
            return window.scrollBy(0, step);
          }
          return clearInterval(scrolling);
        }, duration / 24);
      }
      scrollTop(125);
    }
  },
  ready: function() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        return this.$set('scrollAvailable', true);
      }
      return this.$set('scrollAvailable', false);
    });
  }
};
</script>

<style lang="scss">
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
  i {
    background: $light;
    color: $dark;
    padding: .5rem;
    border-radius: 1000px;
  }
}

.fade-transition {
  transition: all .3s ease;
  opacity: .5;
}


/* .expand-enter defines the starting state for entering */


/* .expand-leave defines the ending state for leaving */

.fade-enter,
.fade-leave {
  opacity: 0;
}
</style>
