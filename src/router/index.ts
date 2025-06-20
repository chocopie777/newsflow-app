import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CategoriesView from '@/views/CategoriesView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import NewsView from '../views/NewsView.vue'
import ArticleView from '@/views/ArticleView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/news' // Перенаправление с корня на /news
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/categories/:category',
    name: 'categories',
    component: CategoriesView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  },
  {
    path: '/article/:id',
    name: 'article',
    component: ArticleView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
