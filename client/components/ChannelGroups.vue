<template>
  <div class="channel-groups">
    <ul>
      <li class="group" v-for="group in sharedState.channelGroups">
        <span class="group-name" @click="">{{ group.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../store';

export default {
  data: function() {
    return {
      sharedState: store.state
    };
  }
};
</script>

<style lang="scss">
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
    padding:0;
    margin: .5rem auto;
  }
  li {
    display: inline;
    margin-right: 1rem;
  }
  .group {
    color: rgba($dark, .5);
    font-size: .9rem;
    font-weight: 600;
    transition: color .15s ease-in;
    cursor: pointer;
    &:hover {
      color: $primary;
    }
  }
}
</style>
