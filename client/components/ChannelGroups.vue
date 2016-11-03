<template>
  <div class="channel-groups">
    <ul>
      <router-link tag="li" :to="{ path: '/group/'+group.name}" v-for="group in sharedState.channelGroups" class="group">
        <a class="group-name">{{ group.name }}</a>
      </router-link>
      <router-link tag="li" to="/" class="group" exact>
        <a class="group-name">Your channels</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
'use strict';

import store from '../store';

export default {
  data: function() {
    return {
      sharedState: store.state
    };
  }
};
</script>

<style lang="sass">
@import "./utils/sass/styling";
.channel-groups {
  border-bottom: 1px solid rgba($dark, .05);
  padding: 0 1rem;
  @include bp(md) {
    padding: 0 2rem;
  }
  @include bp(xlg) {
    padding: 0 4rem;
  }
  ul {
    padding: 0;
    margin: .5rem auto;
  }
  li {
    display: inline;
    margin-right: 1rem;
    &:hover a {
      color: $primary;
    }
    &.active a {
      color: $primary;
    }
  }
  a {
    color: rgba($dark, .5);
    font-size: .9rem;
    font-weight: 600;
    transition: color .15s ease-in;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
