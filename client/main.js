import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import VueMeteorTracker from 'vue-meteor-tracker';   


Vue.use(VueMeteorTracker);   
Vue.use(VueRouter);
import './main.html';
import '../imports/startup/client/start.js'
import './settings'



Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});
