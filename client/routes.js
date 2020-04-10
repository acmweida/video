import Vue from 'vue'

import NotFound from '../imports/ui/NotFound'
import Home from '../imports/ui/page/home/home'
import Login from '../imports/ui/login'
import Register from '../imports/ui/register'
import Upload from '../imports/ui/page/upload/upload'
import VideoPlay from '../imports/ui/page/video/videoplay'

export default [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/upload', name: 'upload', component: Upload },
  { path: '/video/:id', name: 'videoplay', component: VideoPlay },
  { path: '*', name: 'not-found', component: NotFound },
]
