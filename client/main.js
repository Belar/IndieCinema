/* eslint-disable */

import Vue from 'vue';
import VueResource from 'vue-resource'; // Web requests, Vue plugin
import VueRouter from 'vue-router'; // Routing , Vue plugin

Vue.use(VueRouter, 'localhost:3000'); //
Vue.use(VueResource);

// Views
import CustomGroupView from './CustomGroupView';
import NotFoundView from './NotFoundView';

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

router.map({
  '/': {
    name: 'home',
    component: CustomGroupView
  },
  '*': {
    component: NotFoundView
  }
});

router.start(App, '#app');
