import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import VueMeteorTracker from 'vue-meteor-tracker';   
Vue.use(VueMeteorTracker);   
Vue.use(VueRouter);
import  './buffer.js'
import './main.html';

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});
