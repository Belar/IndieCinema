<template>
  <div class="main-wrapper">
    <channel-groups></channel-groups>
    <img class="logo" src="/assets/images/logo.svg" alt="IndieCinema logo">

    <div class="not-found">
      <h2 class="info">Page you are looking for doesn't exist.</h2>
      Let's get you
      <router-link to="/"><a>home/</a></router-link>
    </div>
  </div>
</template>

<script>
'use strict';

import ChannelGroups from './components/ChannelGroups'; // Loading indicator component

export default {
  components: {
    ChannelGroups
  }
};
</script>

<style lang="sass">
@import "./utils/sass/styling";
.not-found {
  max-width: 960px;
  margin: 2rem auto 0;
  .info {
    font-weight: 400;
  }
}
</style>
