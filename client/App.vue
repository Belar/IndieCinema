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

<style>
  .main-wrapper {
    font-family: Source Sans Pro, Helvetica, sans-serif;
  }
</style>
