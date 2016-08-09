<template>
  <div id="app" class="main-wrapper">
    <on-screen-message></on-screen-message>
    <h1>IndieCinema</h1>

    <content-management></content-management>

    <sorting></sorting>

    <video-grid></video-grid>
    <loading></loading>
    <scroll-to-top></scroll-to-top>
  </div>
</template>

<script>
  'use strict';

  import VideoGrid from './components/VideoGrid';
  import OnScreenMessage from './components/OnScreenMessage';
  import ContentManagement from './components/ContentManagement'; // Loading indicator component
  import Sorting from './components/Sorting'; // Loading indicator component
  import Loading from './components/Loading'; // Loading indicator component
  import ScrollToTop from './components/ScrollToTop'; // Loading indicator component

  export default {
    components: {
      VideoGrid,
      OnScreenMessage,
      Sorting,
      ContentManagement,
      Loading,
      ScrollToTop
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
