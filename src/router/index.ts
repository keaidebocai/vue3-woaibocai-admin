import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import IndexView from '@/views/IndexView.vue'
import { useTokenStore } from '@/stores/mytoken'
// const store = useTokenStore()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      //是否需要登录才能浏览
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: IndexView
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/views/article/ArticleIndex.vue')
        },
        {
          path: '/writeArticle',
          name: 'writeArticle',
          component: () => import('@/views/article/WriteArticle.vue')
        },
        {
          path: '/tagList',
          name: 'tagList',
          component: () => import('@/views/tag/tagList.vue')
        },
        {
          path: '/friendsList',
          name: 'friendsList',
          component: () => import('@/views/friend/FriendsList.vue')
        },
        {
          path: '/categoryList',
          name: 'categoryList',
          component: () => import('@/views/category/CategoryList.vue')
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/AboutView.vue')
        },
        {
          path: '/:xxx(.*)*',
          name: 'ErrorPage',
          component: () => import('@/views/ErrorPage.vue')
        }
      ]
    }
  ]
})
/*
  matchd会把地址拆分
  /aa/bb/cc/dd
  :
  /aa
  /aa/bb/
  /aa/bb/cc
  /aa/bb/cc/dd
*/
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta?.requiresAuth)) {
    const store = useTokenStore()
    if (!store.token?.token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router
