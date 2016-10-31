<template>
  <transition name="expand">
    <div class="message-bar" v-show="sharedState.screenMessage">
      <div class="message-body">
        {{sharedState.screenMessage}}
      </div>
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
  },
  watch: {
    'sharedState.screenMessage': function() {
      // Removes message after X ms
      if (this.sharedState.screenMessage) {
        setTimeout(function() {
          store.setMessage('');
        }, 3000);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./utils/sass/styling";
.message-bar {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  background: rgba($dark, .5);
  color: $light;
  font-weight: 600;
  height: 50px;
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
</style>
