import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/common/About.vue'
import JobCreate from '@/views/job/JobCreate.vue'
// import TopPage from '../views/common/TopPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   component: TopPage,
  //   name: 'topPage'
  // },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/aboutaa',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/job/create/1',
    name: 'JobCreate',
    component: JobCreate
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
