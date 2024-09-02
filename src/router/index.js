import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
    { path: '/Home', name: 'Home', component: Home },   
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