import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    name: 'home',
    path: '/',
    component: () => import('../views/Home')
  },
  {
    name: 'navigate',
    path: '/:id',
    beforeEnter (to, from, next) {
      // next
      next()
    },
    component: () => import('../views/Navigate')
  }
  ]
})
