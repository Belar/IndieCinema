<template>
  <div class="loading-bar" v-show="loading" transition="expand">
    <span class="loading-txt">Loading...</span> <img class="loading-indicator" src="/images/dashinfinity.gif" alt="">
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean
      }
    }
  };
</script>

<style lang="scss">
  @import "./utils/sass/styling";
  .loading-bar {
    position: absolute;
    background: $light;
  }

  .loading-indicator {
    height: 36px;
    display: inline-block;
  }

  .loading-txt {
    color: rgba($dark, .25);
    display: inline-block;
    vertical-align: top;
    margin: .5rem .5rem 0;
  }

  .expand-transition {
    transition: all .3s ease;
    height: 50px;
  }
  /* .expand-enter defines the starting state for entering */
  /* .expand-leave defines the ending state for leaving */

  .expand-enter,
  .expand-leave {
    height: 0px;
  }
</style>
