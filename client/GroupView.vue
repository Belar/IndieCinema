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

import VideoGrid from './components/VideoGrid';
import OnScreenMessage from './components/OnScreenMessage';
import Sorting from './components/Sorting'; // Loading indicator component
import Loading from './components/Loading'; // Loading indicator component
import ScrollToTop from './components/ScrollToTop'; // Loading indicator component
import ChannelGroups from './components/ChannelGroups'; // Loading indicator component

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
      sharedState: store.state // Global store
    };
  },
  route: {
    data: function() {
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
