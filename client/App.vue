<template>
  <div id="app" class="main-wrapper">
    <video-grid></video-grid>
  </div>
</template>

<script>
  'use strict';

  import VideoGrid from './components/VideoGrid';

  export default {
    components: {
      VideoGrid
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
