import Vue from 'vue'

import NotFound from '../imports/ui/NotFound'
import Home from '../imports/ui/home'
import Home2 from '../imports/ui/page/home/home'
import Login from '../imports/ui/login'
import Register from '../imports/ui/register'
import Upload from '../imports/ui/page/upload/upload'
import VideoPlay from '../imports/ui/page/video/videoplay'
import Channel from '../imports/ui/page/channel/channel'
import Activit from '../imports/ui/page/activit/activit'
import Admin from '../imports/ui/admin/home'
import AdminLogin from "../imports/ui/admin/page/login"
import AdminMain from "../imports/ui/admin/page/layout"
import Main from '../imports/ui/admin/page/main'
import PersonManger from '../imports/ui/admin/page/person'
import VideoManger from '../imports/ui/admin/page/video'
import commitManger from '../imports/ui/admin/page/video'
import myNabger from '../imports/ui/admin/page/my'
import permissionManger from '../imports/ui/admin/page/permission'
export default [
  {
    path: '/user', name: 'home', component: Home,
    children: [
      { path: '', name: 'home2', component: Home2 },
      { path: 'login', name: 'login', component: Login },
      { path: 'register', name: 'register', component: Register },
      { path: 'upload', name: 'upload', component: Upload },
      { path: 'video/:id', name: 'videoplay', component: VideoPlay },
      { path: 'c/:id', name: 'channel', component: Channel },
      { path: 'a/:id', name: 'activit', component: Activit }
    ]
  },
  {
    path: '/admin', name: 'admin', component: Admin,
    children: [
      { path: 'login', hidden: true, name: 'adminlogin', component: AdminLogin },
      {
        path: "main", name: 'main', component: AdminMain,
        children: [
          { path: '', name: 'content', component: Main },
          { path: 'person', name: 'mangperson', component: PersonManger },
          { path: 'video', name: 'mangvideo', component: VideoManger },
          { path: 'commit', name: 'mangcommit', component: commitManger },
          { path: 'my', name: 'mangmy', component: myNabger },
          { path: 'permission', name: 'mangvideo', component: permissionManger }
        ]
      },

    ]
  },
  { path: '*', name: 'not-found', component: NotFound }

]
