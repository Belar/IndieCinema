<template>
  <div id="app" class="main-wrapper">
    <on-screen-message></on-screen-message>
    <h1>indie cinema</h1>

    <content-management></content-management>

    <div class="grid-options">
      <sorting></sorting>
    </div>

    <video-grid></video-grid>
  </div>
</template>

<script>
  'use strict';

  import VideoGrid from './components/VideoGrid';
  import OnScreenMessage from './components/OnScreenMessage';
  import ContentManagement from './components/ContentManagement'; // Loading indicator component
  import Sorting from './components/Sorting'; // Loading indicator component

  export default {
    components: {
      VideoGrid,
      OnScreenMessage,
      Sorting,
      ContentManagement
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

  .grid-options {
    padding: 0 1rem;
    margin: 2rem 0 0 0;
    @include bp(md) {
      padding: 0 1rem;
      margin: 2rem 0 0 0;
    }
    @include bp(xlg) {
      padding: 0 2.5rem;
      margin: 2rem 0 0 0;
    }
  }
</style>
