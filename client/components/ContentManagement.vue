<template>
  <div class="add-new-channel-wrapper">
    <div class="add-new-channel">
      <label>Add channel</label>
      <input autofocus autocomplete="off" placeholder="e.g. eoadaily" v-model="newChannel" @keyup.enter="addChannel()">
      <i class="icon ion-plus-circled" @click="addChannel()"></i>
    </div>
  </div>
  <!-- <button class="button" v-on:click="resetChannels()">Reset Channels</button>-->
  <div class="action-bar clearfix">
    <div class="query-channels">
      <h5>Current channels:</h5>
      <ul>
        <li class="channel label " v-for="channel in queryChannels">
          <i class="channel-visibility icon ion-eye" :class="{'inactive' : this.sharedState.hiddenChannels.indexOf(channel) !== -1}" v-show="!deleteChannels" @click="hideChannel(channel)" @click.stop></i>
          <i class="close icon ion-close" v-show="deleteChannels" @click="removeChannel(channel)" @click.stop></i> {{ channel }}</span>
        </li>
      </ul>
    </div>
    <div class="options">
      <i class="delete-channels icon ion-trash-b" @click="allowRemoval()"></i>
      <i class="refresh-videos icon ion-refresh" v-show="!loadingIndicator" @click="getList()"></i>
      <loading :loading.sync="loadingIndicator"></loading>
    </div>
  </div>
</template>

<script>
  'use strict';

  import Loading from './Loading'; // Loading component
  import store from '../store';

  const localStorage = window.localStorage;
  var defaultChannels = ['staffpicks', 'shortoftheweek', '31259', 'everythinganimated', 'documentaryfilm', '8048']; // Default, curated channels - indie film, music videos, documentary etc.

  // Accepts array of objects and removes duplicates
  function removeDuplicates(array, prop) {
    var uniqueArray = [];
    var uniqueObject = {};
    var arrayLength = array.length;

    // Generate objects identified by prop as key
    for (var i = 0; i < arrayLength; i++) {
      uniqueObject[array[i][prop]] = array[i];
    }
    // Insert objects into array
    for (i = 0 in uniqueObject) {
      uniqueArray.push(uniqueObject[i]);
    }
    return uniqueArray;
  }

  export default {
    components: {
      Loading
    },
    data: function() {
      return {
        queryChannels: defaultChannels, // Assign default channels
        loadingIndicator: false, // Loading indicator's state
        newChannel: '', // Placeholder for new channel
        deleteChannels: false, // Option to delete channel
        sharedState: store.state // Global store
      };
    },
    methods: {
      addChannel() {
        // Remove whitespace on ends
        var addChannel = this.newChannel.trim();

        // Check if there is a valid(ish) value
        if (!addChannel) {
          return store.setMessage('Channel name can not be empty');
        }

        if (/^[A-Za-z\u00C0-\u017F]+$/.test(addChannel)) {
          return store.setMessage('Channel name can not contain accented characters');
        }

        // Check if channel already exists in the array of channels
        if (this.queryChannels.indexOf(addChannel) !== -1) {
          return store.setMessage('This channel is already present');
        }

        var movies = this.sharedState.movieList; // Get list of already showed movies
        this.loadingIndicator = true;

        this.$http({
          url: '/api/get-videos-single?channel=' + addChannel,
          method: 'GET'
        }).then(function(response) {
          // Add videos to array
          movies = movies.concat(response.data);
          // Clear duplicates
          var uniqueMovies = removeDuplicates(movies, 'uri');
          // Update list of videos
          store.setMovies(uniqueMovies);
          // Turn off loading
          this.loadingIndicator = false;
          // Add channel to the array with channels
          this.queryChannels.push(addChannel);
          localStorage.setItem('myChannels', JSON.stringify(this.queryChannels));
        }, function(error) {
          // Turn off loading
          this.loadingIndicator = false;
          return store.setMessage(error.data.message);
        });
        // Clear input
        this.newChannel = '';
      },
      getList() {
        // Check if there are channel to get videos
        if (!this.queryChannels.length > 0) {
          return store.setMessage('There are no channels to show videos from');
        }

        // Show loading indicator
        this.loadingIndicator = true;
        var movies = [];
        this.$http({
          url: '/api/get-videos?channels=' + this.queryChannels,
          method: 'GET'
        }).then(function(response) {
          movies = movies.concat(response.data);
          // Clear duplicates
          var uniqueMovies = removeDuplicates(movies, 'uri');
          // Turn off loading
          this.loadingIndicator = false;
          // Update list of videos
          store.setMovies(uniqueMovies);
        }, function(error) {
          // Turn off loading
          this.loadingIndicator = false;
          return store.setMessage(error.data.message);
        });
      },
      allowRemoval() {
        if (this.deleteChannels === false) {
          return this.$set('deleteChannels', true);
        }
        this.$set('deleteChannels', false);
      },
      removeChannel(channel) {
        var channelPosition = this.queryChannels.indexOf(channel);
        this.queryChannels.splice(channelPosition, 1);

        if (!this.queryChannels.length > 0) {
          return this.$set('movieList', []);
        }
        localStorage.setItem('myChannels', JSON.stringify(this.queryChannels));
        this.getList();
      },
      hideChannel(channel) {
        store.toggleHideChannel(channel);
        localStorage.setItem('hiddenChannels', JSON.stringify(this.sharedState.hiddenChannels));
      },
      resetChannels() {
        this.$set('queryChannels', defaultChannels);
        this.getList();
      }
    },
    created: function() {
      // Get list of channels
      var customChannels = localStorage.getItem('myChannels');
      if (customChannels) {
        this.$set('queryChannels', JSON.parse(customChannels));
      }
      // Get list of hidden channels
      var hiddenChannels = JSON.parse(localStorage.getItem('hiddenChannels'));
      if (hiddenChannels) {
        var hiddenChannelsLength = hiddenChannels.length;
        for (var i = 0; i < hiddenChannelsLength; i++) {
          store.toggleHideChannel(hiddenChannels[i]);
        }
      }
    },
    ready: function() {
      this.getList();
    }
  };
</script>

<style lang="scss">
  @import "./utils/sass/styling";
  .add-new-channel-wrapper {
    text-align: center;
    @include bp(md) {
      margin: 2rem 0 0 0;
      font-size: 2.5rem;
    }
    @include bp(lg) {
      margin: 4rem 0 0 0;
      font-size: 3rem;
    }
  }

  .add-new-channel {
    display: inline-block;
    text-align: center;
    margin: auto;
    label {
      display: block;
      text-align: left;
      margin: auto auto .5rem 1.5rem;
      font-size: .95rem;
      font-weight: 600;
      color: $dark;
    }
    input {
      height: 48px;
      border-radius: 1000px;
      border: 2px solid rgba($dark, .25);
      padding: 0 1.5rem;
      vertical-align: top;
      font-size: .95rem;
      font-style: italic;
      width: 200px;
      transition: border-color .2s ease-in;
      &:focus {
        outline: 0;
        border-color: $primary;
      }
      @include bp(md) {
        width: 500px;
      }
    }
    i {
      font-size: 48px;
      color: rgba($primary, .25);
      transition: color .2s ease-in;
      &:hover {
        color: rgba($primary, 1);
      }
    }
  }

  .query-channels {
    padding: 0 .5rem;
    margin: 2rem 0 0 0;
    width: 70%;
    float: left;
    @include bp(md) {
      padding: 0 1rem;
    }
    @include bp(xlg) {
      width: 70%;
      padding: 0 2.5rem;
      margin: 4rem 0 0 0;
    }
    h5 {
      font-size: .95rem;
      margin: 0 0 .5rem 0;
      color: rgba($dark, .5);
    }
    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    li {
      display: inline-block;
      margin: .5rem 1rem .5rem 0;
      font-weight: 600;
      font-size: .95rem;
      @include bp(xlg) {
        margin: auto 1.5rem auto 0;
      }
    }
    .icon {
      height: 15px;
      width: 15px;
      margin: 1px 5px 0 0;
      float: left;
      cursor: pointer;
      color: rgba($dark, .25);
      transition: color .2s ease-in;
      &:hover,
      &:active {
        color: $primary;
      }
    }
    .channel-visibility {
      color: $primary;
      &.inactive {
        color: rgba($dark, .25);
      }
    }
    .channel-name {
      float: right;
      font-size: .95rem;
    }
  }

  .options {
    padding: 0 1rem;
    margin: 2rem 0 0 0;
    text-align: right;
    width: 15%;
    float: right;
    @include bp(md) {
      padding: 0 1rem;
    }
    @include bp(xlg) {
      padding: 0 2.5rem;
      margin: 4rem 0 0 0;
    }
    .icon {
      cursor: pointer;
      margin: 0rem .25rem;
      display: inline-block;
      font-size: 24px;
      color: rgba($dark, .25);
      transition: color .2s ease-in;
      &:hover,
      &:active {
        color: $primary;
        opacity: 1;
      }
    }
    // VideoGrid specific styling for Loading component
    .loading-bar {
      right: 0;
      padding: 0 2.5rem;
    }
  }
</style>
