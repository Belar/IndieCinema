<template>
  <div id="app" class="main-wrapper">
    <on-screen-message></on-screen-message>
    <video-grid></video-grid>
  </div>
</template>

<script>
  'use strict';

  import VideoGrid from './components/VideoGrid';
  import OnScreenMessage from './components/OnScreenMessage';

  export default {
    components: {
      VideoGrid,
      OnScreenMessage
    }
  };
</script>

<style lang="scss">
  @import "./utils/sass/styling";
  body {
    background: $light;
    font-family: 'Open Sans', Helvetica, sans-serif;
  }

  .modal-open {
    position: absolute;
    overflow-y: hidden;
  }
</style>
