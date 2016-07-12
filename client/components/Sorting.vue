<template>
  <div class="sorting">
    <h5>Order by:</h5>
    <ul class="modes">
      <li :class="{'active' : sortCondition === 'release_time'}" @click="changeOrder('release_time')"><i class="ion ion-calendar"></i>Release time</li>
      <li :class="{'active' : sortCondition === 'indieCinema.order'}" @click="changeOrder('indieCinema.order')"><i class="ion ion-ribbon-b"></i> Discovery time</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      sortCondition: {
        type: String,
        required: true,
        twoWay: true
      },
      order: {
        type: Number,
        required: true,
        twoWay: true
      }
    },
    methods: {
      changeOrder(condition) {
        this.$set('sortCondition', condition);
        if (condition === 'indieCinema.order') {
          return this.$set('order', 1);
        }
        this.$set('order', -1);
      }
    }
  };
</script>

<style lang="scss">
  @import "./utils/sass/styling";
  h5 {
    font-size: .95rem;
    color: rgba($dark, .5);
    margin: 0 0 .5rem 0;
  }

  .sorting .modes {
    display: inline;
    li {
      display: inline;
      font-weight: 600;
      margin: auto 1rem auto 0;
      transition: color .2s ease-in;
      cursor: pointer;
      color: rgba($dark, .5);
    }
    li:hover,
    li.active {
      color: $primary;
    }
    i {
      margin: 1px 5px 0 0;
    }
  }
</style>
