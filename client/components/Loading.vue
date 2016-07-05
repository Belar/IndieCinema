<template>
  <div class="loading-bar" v-show="loading" transition="expand">
    <img class="loading-indicator" src="/images/dashinfinity.gif" alt=""> <span class="loading-txt">Loading...</span>
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean
      }
    },
    watch: {
      'loading': function() {
        console.log('Loading');
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
    max-height: 100%;
    display: inline-block;
  }

  .loading-txt {
    display: inline-block;
    vertical-align: top;
    margin: .5rem 0 0 .5rem;
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
