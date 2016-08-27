<template>
  <div class="channel-groups">
    <ul>
      <li class="group" v-for="group in sharedState.channelGroups">
        <a class="group-name" v-link="{ path: '/group/'+group.name, activeClass: 'active' }">{{ group.name }}</a>
      </li>
      <li class="group">
        <a class="group-name" v-link="{ path: '/', activeClass: 'active', exact: true }">Your channels</a>
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
    padding: 0;
    margin: .5rem auto;
  }
  li {
    display: inline;
    margin-right: 1rem;
  }
  a {
    color: rgba($dark, .5);
    font-size: .9rem;
    font-weight: 600;
    transition: color .15s ease-in;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: $primary;
    }
    &.active{
      color: $primary;
    }
  }
}
</style>
