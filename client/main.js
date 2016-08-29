/* eslint-disable */

import Vue from 'vue';
import VueResource from 'vue-resource'; // Web requests, Vue plugin
import VueRouter from 'vue-router'; // Routing , Vue plugin

Vue.use(VueRouter, 'localhost:3000'); //
Vue.use(VueResource);

// Views
import CustomGroupView from './CustomGroupView';
import GroupView from './GroupView';
import NotFoundView from './NotFoundView';

//Store
import store from './store';

var App = Vue.extend();

var router = new VueRouter({
  history: true
});

// new Vue({
//   el: 'body',
//   components: {
//     App
//   }
// });

router.beforeEach(function () {
  store.setCurrentPage(1);
  store.setMovies([]);
  store.setHiddenChannels([]);
});

router.map({
  '/': {
    component: CustomGroupView
  },
  '/group/:groupName': {
    component: GroupView
  },
  '*': {
    component: NotFoundView
  }
});

router.start(App, '#app');
