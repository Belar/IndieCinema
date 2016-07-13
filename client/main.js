import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource'; // Web requests, Vue plugin

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
});
