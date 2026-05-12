import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../viwes/Home.vue'
import Quiz from '../viwes/Quiz.vue'
import Result from '../viwes/Result.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/quiz', component: Quiz },
  { path: '/result', component: Result }


  
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router