import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Upload from './views/Upload.vue'
import Search from './views/Search.vue'
import Test from './views/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
