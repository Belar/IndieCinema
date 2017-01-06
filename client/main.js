/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router'; // Routing , Vue plugin
require('es6-promise').polyfill();

Vue.use(VueRouter, 'localhost:3000'); //

// Views
import CustomGroupView from './CustomGroupView';
import GroupView from './GroupView';
import NotFoundView from './NotFoundView';

//Store
import store from './store';

const routes = [{
  path: '/',
  component: CustomGroupView
}, {
  path: '/group/:groupName',
  component: GroupView
}, {
  path: '*',
  component: NotFoundView
}];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  store.setCurrentPage(1);
  store.setMovies([]);
  store.setHiddenChannels([]);
  next();
});

const App = new Vue({
  router
}).$mount('#app');
