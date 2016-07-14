<template>
  <div class="message-bar" v-show="sharedState.screenMessage" transition="expand">
    <div class="message-body">
      {{sharedState.screenMessage}}
    </div>
  </div>
</template>

<script>
  import store from '../store';

  export default {
    data: function() {
      return {
        sharedState: store.state
      };
    },
    watch: {
      'sharedState.screenMessage': function() {
        if (this.sharedState.screenMessage) {
          setTimeout(function() {
            store.setMessage('');
          }, 3000);
        }
      }
    }
  };
</script>

<style lang="scss">
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
