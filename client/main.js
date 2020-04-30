import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import VueMeteorTracker from 'vue-meteor-tracker';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VueMeteorTracker);
Vue.use(SuiVue);
Vue.use(ElementUI)
Vue.use(VueRouter);
import './main.html';
import '../imports/startup/client/start.js'
import './settings'
import routes from './routes'
import '../imports/util/Util'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

Meteor.startup(() => {
  const router = new VueRouter({
    mode: 'history',
    routes,
  });
  
  new Vue({
    el: '#app',
    router,
    ...App,
  });

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "linear",
    "hideEasing": "linear",
    "showMethod": "slideDown",
    "hideMethod": "slideUp"
  }
  Session.set("remoteSettings",Meteor.settings.remote);
});



