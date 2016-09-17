<template>
  <div class="main-wrapper">
    <on-screen-message></on-screen-message>
    <channel-groups></channel-groups>
    <h1>IndieCinema</h1>

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
import Sorting from './components/Sorting';
import Loading from './components/Loading'; // Loading indicator
import ScrollToTop from './components/ScrollToTop';
import ChannelGroups from './components/ChannelGroups'; // Menu for channel groups

import store from './store';

export default {
  components: {
    VideoGrid,
    OnScreenMessage,
    Sorting,
    Loading,
    ScrollToTop,
    ChannelGroups
  },
  data: function() {
    return {
      sharedState: store.state
    };
  },
  route: {
    data: function() {
      // Based on active group, assigns current channels and orders a fetch
      function findChannelGroup(group) {
        return group.name === currentGroup;
      }

      var currentGroup = this.$route.params.groupName;
      var queryChannels = this.sharedState.channelGroups.find(findChannelGroup).channels;

      store.setQueryChannels(queryChannels);
      store.getMovies();
    }
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
