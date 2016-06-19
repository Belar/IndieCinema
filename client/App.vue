<template>
  <div id="app" class="main-wrapper">
    <div class="row expanded column">
      <video-grid></video-grid>
    </div>
  </div>
</template>

<script>
  import VideoGrid from './components/VideoGrid';

  export default {
    components: {
      VideoGrid
    }
  };
</script>

<style>
  .main-wrapper {
    color: rgba(0,0,0,.8);
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }
</style>
