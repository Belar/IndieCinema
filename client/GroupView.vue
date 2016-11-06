<template>
  <div class="main-wrapper">
    <on-screen-message></on-screen-message>
    <channel-groups></channel-groups>
    <img class="logo" src="/assets/images/logo.svg" alt="IndieCinema logo">

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
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    getData: function() {
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
