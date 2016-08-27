<template>
  <div class="main-wrapper">
    <channel-groups></channel-groups>
    <h1>IndieCinema</h1>
    <div class="not-found">
      <h2 class="info">Page you are looking for doesn't exist.</h2>
      Let's get you <a v-link="'/'">home.</a>
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

<style lang="scss">
@import "./utils/sass/styling";
.not-found {
  max-width: 960px;
  margin: 2rem auto 0;
  .info {
    font-weight: 400;
  }
}
</style>
