import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PostitsView from '../views/PostitsView.vue'
import PostitInfoView from '../views/PostitInfoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/postits/:id',
    name: 'PostitInfoView',
    component: PostitInfoView,
    props: true,
  },
  {
    path: '/postits',
    name: 'PostitsView',
    component: PostitsView,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
