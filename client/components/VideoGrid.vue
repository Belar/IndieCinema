<template>
  <div class="video-index">
    <div class="video-grid">
      <ul>
        <li class="single-movie" v-for="movie in movieListEdited">
          <div class="preview-wrapper" @click="showMovie(movie)">
            <img class="lazyload" v-bind:src="movie.pictures.sizes[0].link" v-bind:data-src="movie.pictures.sizes[2].link" alt="">
          </div>
          <div class="excerpt">
            <h4>{{ movie.name }}</h4>
            <div class="description">
              {{ movie.description }}
            </div>
          </div>
        </li>
        <!-- Hacky way to make elements of last row (when not full) behave when using justify: space-between -->
        <li class="single-movie"></li>
        <li class="single-movie"></li>
        <li class="single-movie"></li>
        <li class="single-movie"></li>
        <li class="single-movie"></li>
        <li class="single-movie"></li>
      </ul>
    </div>
  </div>
  <modal :show.sync="showModal" :video.sync="videoModal"></modal>
</template>

<script>
'use strict';

import Modal from './Modal'; // Modal component
import store from '../store';
import 'lazysizes';

export default {
  components: {
    Modal
  },
  data: function() {
    return {
      showModal: false, // Modal's initial state
      videoModal: {}, // Pass video info to modal
      sharedState: store.state // Global store
    };
  },
  computed: {
    movieListEdited: function() {
      var movies = this.sharedState.movieList;
      var hiddenChannels = this.sharedState.hiddenChannels;
      var sortCondition = this.sharedState.sortCondition;
      var sortOrder = this.sharedState.sortOrder;

      function sortBy(condition, order) {
        var props = condition.split('.');

        return function(a, b) {
          props.forEach(function(prop) {
            a = a[prop];
            b = b[prop];
          });
          if (a < b) {
            return -1 * order;
          } else if (a > b) {
            return 1 * order;
          } else {
            return 0;
          }
        };
      };

      function filterOutHidden(movie) {
        if (hiddenChannels.indexOf(movie.indieCinema.channel) === -1) {
          return true;
        }
      };

      return movies.filter(filterOutHidden).sort(sortBy(sortCondition, sortOrder));
    }
  },
  methods: {
    showMovie(video) {
      // Show modal and pass movie's URI for data query
      this.videoModal = video;
      this.showModal = true;
    }
  }
};
</script>

<style lang="scss">
@import "./utils/sass/styling";
h1 {
  font-family: 'Old Standard TT', serif;
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
  @include bp(md) {
    margin: 2rem 0 0 0;
    font-size: 2.5rem;
  }
  @include bp(lg) {
    margin: 4rem 0 0 0;
    font-size: 3rem;
  }
}

.video-grid {
  clear: both;
  padding: 0 1rem;
  @include bp(md) {
    padding: 0 2rem;
  }
  @include bp(xlg) {
    padding: 0 4rem;
  }
  ul {
    padding: 0;
    margin: auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    list-style-type: none;
  }
  .single-movie {
    max-width: 100%;
    flex: 295px 1;
    margin: 0 auto 2rem;
    img {
      width: 100%;
      height: auto;
    }
  }
}

.preview-wrapper {
  cursor: pointer;
}

.excerpt {
  padding: 0 .5rem;
  h4 {
    margin: .25rem auto;
    font-size: .95rem;
    font-weight: 700;
  }
  .description {
    max-width: 100%;
    width: 250px;
    height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .9rem;
  }
}
</style>
