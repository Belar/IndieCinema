<template>
  <transition name="expand">
    <div class="loading-bar" v-show="sharedState.loadingIndicator">
      <span class="loading-txt">Loading...</span>
      <svg class="loading-indicator icon icon-spinner">
        <use xlink:href="/assets/images/symbols_defs.svg#icon-spinner"></use>
      </svg>
    </div>
  </transition>
</template>

<script>
'use strict';

import store from '../store';

export default {
  data: function() {
    return {
      sharedState: store.state
    };
  }
};
</script>

<style lang="sass" scoped>
@import "./utils/sass/styling";
.loading-bar {
  position: fixed;
  width: 100%;
  background: $light;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.loading-indicator {
  color: $primary;
  height: 36px;
  display: inline-block;
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.loading-txt {
  color: rgba($dark, .25);
  display: inline-block;
  vertical-align: top;
  margin: 0 .5rem 0 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all .3s ease;
}

.expand-enter,
.expand-leave-active {
  height: 0;
}

.expand-leave {
  height: 50px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
