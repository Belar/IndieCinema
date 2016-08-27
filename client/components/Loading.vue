<template>
  <div class="loading-bar" v-show="sharedState.loadingIndicator" transition="expand">
    <span class="loading-txt">Loading...</span>
    <img class="loading-indicator" src="/assets/images/dashinfinity.gif" alt="">
  </div>
</template>

<script>
import store from '../store';
export default {
  data: function() {
    return {
      sharedState: store.state
    };
  }
};
</script>

<style lang="scss">
@import "./utils/sass/styling";
.loading-bar {
  position: fixed;
  width: 100%;
  background: $light;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-indicator {
  height: 36px;
  display: inline-block;
}

.loading-txt {
  color: rgba($dark, .25);
  display: inline-block;
  vertical-align: top;
  margin: 0 .5rem 0 0;
}

.expand-transition {
  transition: all .3s ease;
  height: 50px;
}


/* .expand-enter defines the starting state for entering
.expand-leave defines the ending state for leaving */

.expand-enter,
.expand-leave {
  height: 0px;
}
</style>
