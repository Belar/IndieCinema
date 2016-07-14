<template>
  <div id="movies" class="video-index">
    <h1>indie cinema</h1>

    <content-management></content-management>

    <div class="grid-options">
      <sorting></sorting>
    </div>

    <div class="video-grid">
      <ul>
        <li class="single-movie" v-for="movie in movieListEdited">
          <div class="preview-wrapper" @click="showMovie(movie)">
            <!-- TODO: Utilize bigger preview image, but keep grid elements the same size -->
            <img v-bind:src="movie.pictures.sizes[2].link" alt="">
          </div>
          <h4>{{ movie.name }}</h4>
          <div class="description">
            {{ movie.description }}
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
  import ContentManagement from './ContentManagement'; // Loading indicator component
  import Sorting from './Sorting'; // Loading indicator component
  import store from '../store';

  export default {
    components: {
      Modal,
      Sorting,
      ContentManagement
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
        var invisibleChannels = this.sharedState.invisibleChannels;
        var sortCondition = this.sharedState.sortCondition;
        var sortOrder = this.sharedState.sortOrder;
        var filteredMovies = [];

        function sortBy(condition, order) {
          var prop = condition.split('.');
          var propCount = prop.length;

          return function(a, b) {
            for (var i = 0; i < propCount; i++) {
              a = a[prop[i]];
              b = b[prop[i]];
            }
            if (a < b) {
              return -1 * order;
            } else if (a > b) {
              return 1 * order;
            } else {
              return 0;
            }
          };
        };

        for (var i = 0; i < movies.length; i++) {
          if (invisibleChannels.indexOf(movies[i].indieCinema.channel) === -1) {
            filteredMovies.push(movies[i]);
          }
        }

        return filteredMovies.sort(sortBy(sortCondition, sortOrder));
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
    ul {
      padding: 0;
      margin: auto;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-around;
      list-style-type: none;
      @include bp(md) {
        margin: 2rem 0 0 0;
      }
      @include bp(lg) {
        margin: 3rem 0 0 0;
      }
    }
    .single-movie {
      max-width: 100%;
      flex: 295px 1;
      margin: 1rem .5rem;
      @include bp(md) {
        margin: 2rem .5rem;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
    .preview-wrapper {
      cursor: pointer;
    }
    h4 {
      margin: .25rem auto;
      font-size: .95rem;
      font-weight: 700;
    }
    .description {
      width: 295px;
      height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: .9rem;
    }
  }

  .grid-options {
    padding: 0 1rem;
    margin: 2rem 0 0 0;
    @include bp(md) {
      width: 60%;
      padding: 0 1rem;
      margin: 2rem 0 0 0;
    }
    @include bp(xlg) {
      width: 80%;
      padding: 0 2.5rem;
      margin: 2rem 0 0 0;
    }
  }
</style>
