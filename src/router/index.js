import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: '',
    component: Register
  },
  {
    path: '/login',
    name: '',
    component: Login
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
