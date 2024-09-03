import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import CoinSearch from '@/pages/CoinSearch.vue'

const routes = [
    { path: '/home', name: 'Home', component: Home },   
    { path: '/coinsearch', name: 'CoinSearch', component: CoinSearch },   
    
]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
//   router.beforeEach((to, from, next) => {
//     const isAuthenticated = !!localStorage.getItem('token')

//     if(to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//       next('/login')
//     } else {
//       next()
//     }
//   })
  export default router