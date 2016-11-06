<template>
  <div class="main-wrapper">
    <on-screen-message></on-screen-message>
    <channel-groups></channel-groups>
    <img class="logo" src="/assets/images/logo.svg" alt="">

    <content-management></content-management>

    <sorting></sorting>

    <video-grid></video-grid>
    <loading></loading>
    <scroll-to-top></scroll-to-top>
  </div>
</template>

<script>
'use strict';

import VideoGrid from './components/VideoGrid'; // Grid presenting videos
import OnScreenMessage from './components/OnScreenMessage'; // Message use for information - confirmations, errors
import ContentManagement from './components/ContentManagement'; // Content management for channels - add, remove, hide
import Sorting from './components/Sorting';
import Loading from './components/Loading'; // Loading indicator
import ScrollToTop from './components/ScrollToTop';
import ChannelGroups from './components/ChannelGroups'; // Menu for channel groups

export default {
  components: {
    VideoGrid,
    OnScreenMessage,
    Sorting,
    ContentManagement,
    Loading,
    ScrollToTop,
    ChannelGroups
  }
};
</script>

<style lang="sass">
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
