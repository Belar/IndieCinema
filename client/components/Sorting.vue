<template>
  <div class="sorting">
    <h5>Order by:</h5>
    <ul class="modes">
      <li :class="{'active' : this.sharedState.sortCondition === 'release_time'}" @click="changeOrder('release_time')">
        <svg class="icon icon-calendar">
          <use xlink:href="/assets/images/symbols_defs.svg#icon-calendar"></use>
        </svg>
        Release time</li>
      <li :class="{'active' : this.sharedState.sortCondition === 'indieCinema.order'}" @click="changeOrder('indieCinema.order')">
        <svg class="icon icon-box">
          <use xlink:href="/assets/images/symbols_defs.svg#icon-box"></use>
        </svg>
        Discovery time</li>
    </ul>
  </div>
</template>

<script>
'use strict';

import store from '../store';

export default {
  data: function() {
    return {
      sharedState: store.state // Global store
    };
  },
  methods: {
    changeOrder(condition) {
      store.setSortCondition(condition);
      if (condition === 'indieCinema.order') {
        return store.setSortOrder('asc');
      }
      return store.setSortOrder('desc');
    }
  }
};
</script>

<style lang="sass">
@import "./utils/sass/styling";
h5 {
  font-size: .95rem;
  color: rgba($dark, .7);
  margin: 0 0 .5rem 0;
}

.sorting {
  padding: 0 1rem;
  margin: 2rem auto;
  @include bp(md) {
    padding: 0 2rem;
  }
  @include bp(xlg) {
    padding: 0 4rem;
  }
}

.sorting .modes {
  display: inline;
  padding: 0;
  li {
    display: inline;
    font-weight: 600;
    margin: auto 1rem auto 0;
    transition: color .2s ease-in;
    cursor: pointer;
    color: rgba($dark, .7);
  }
  li:hover,
  li.active {
    color: $primary;
  }
  .icon {
    height: .75rem;
    width: .75rem;
    margin: 3px 5px 0 0;
  }
}
</style>
