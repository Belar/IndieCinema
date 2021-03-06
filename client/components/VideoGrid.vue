<template>
  <div>
    <div class="video-index">
      <div class="video-grid">
        <ul>
          <li class="single-movie" v-for="movie in movieListEdited" :key="movie.uri">
            <div class="preview-wrapper" @click="showMovie(movie)">
              <img :class="'lazyload'" v-bind:src="movie.pictures.sizes[0].link" v-bind:data-src="movie.pictures.sizes[2].link" :alt="'Preview of ' + movie.name + ' video'">
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
    <modal :show="showModal" :video="videoModal" @closeModal="hideMovie()"></modal>
  </div>
</template>

<script>
'use strict';

import Modal from './Modal'; // Modal component
import store from '../store';
import 'lazysizes'; // Image loading lib

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
      // Computed property, generates list of movies based on hidden channels, sorting conditions, order etc.
      let movies = this.sharedState.movieList;
      let hiddenChannels = this.sharedState.hiddenChannels;
      let sortCondition = this.sharedState.sortCondition;
      let sortOrder = this.sharedState.sortOrder;

      function sortBy(condition, order) {
        let props = condition.split('.');

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
      // Show modal and pass movie's data - no query, data comes from movies array (store)
      this.videoModal = video;
      this.showModal = true;
    },
    hideMovie() {
      // Show modal and pass movie's data - no query, data comes from movies array (store)
      this.videoModal = {};
      this.showModal = false;
    }
  },
  mounted: function() {
    // Infine scrolling, orders new batch of movies via store
    window.addEventListener('scroll', () => {
      let scrollHeight = document.body.scrollHeight;
      let scrollTop = document.body.scrollTop || window.pageYOffset;
      let windowHeight = window.innerHeight;
      let offset = 250;
      if (scrollTop >= scrollHeight - windowHeight - offset && this.sharedState.loadingIndicator === false) {
        let nextPage = this.sharedState.currentPage + 1;
        store.setCurrentPage(nextPage);
        return store.getMovies();
      }
    });
  }
};
</script>

<style lang="sass">
@import "./utils/sass/styling";
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
