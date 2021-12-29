import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '用户信息确认',
        icon: 'dashboard',
        noCache: true
      }
    }]
  }

  // 404 page must be placed at the end !!!
]
export const asyncRoutes = [

  {
    path: '/',
    component: Layout,
    redirect: '/table',
    name: '教师录取',
    children: [
      {
        path: 'table',
        name: '录取',
        component: () => import('@/views/teacher/index'),
        meta: { title: '录取',
          icon: 'table',
          roles: ['teacher']
        }
      }

    ]
  },

  {
    path: '/base',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/base/index'),
        meta: { title: '基础信息填写',
          icon: 'form',
          roles: ['student']
        }
      }
    ]
  },

  {
    path: '/details',
    component: Layout,
    redirect: '/details/photo',
    name: 'details',
    meta: {
      title: '详细信息填写',
      icon: 'nested',
      roles: ['student']
    },
    children: [
      {
        path: 'photo',
        component: () => import('@/views/details/photo/index'),
        name: 'photo',
        meta: { title: '图片上传',
          noCache: true,
          roles: ['student']
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/details/detail/index'), // Parent router-view
        name: 'detail',
        meta: { title: '详细信息',
          roles: ['student'] },
        children: [
          {
            path: 'profile',
            component: () => import('@/views/details/detail/profile'),
            name: 'profile',
            meta: { title: '户档信息',
              roles: ['student'] }
          },
          {
            path: 'family',
            component: () => import('@/views/details/detail/family'),
            name: 'family',
            meta: { title: '家庭成员信息',
              roles: ['student'] },
            children: [
              {
                path: 'member1',
                component: () => import('@/views/details/detail/family/member1'),
                name: 'member1',
                meta: { title: '家庭成员信息1',
                  roles: ['student'] }
              },
              {
                path: 'member2',
                component: () => import('@/views/details/detail/family/member2'),
                name: 'member2',
                meta: { title: '家庭成员信息2',
                  roles: ['student'] }
              },
              {
                path: 'member3',
                component: () => import('@/views/details/detail/family/member3'),
                name: 'member3',
                meta: { title: '家庭成员信息3',
                  roles: ['student'] }
              }
            ]
          },
          {
            path: 'study',
            component: () => import('@/views/details/detail/study'),
            name: 'study',
            meta: { title: '学习工作信息',
              roles: ['student'] }
          }
        ]
      }
    ]
  },

  {
    path: '/wish',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Wish',
        component: () => import('@/views/wish/index'),
        meta: { title: '志愿填报', icon: 'table',
          roles: ['student'] }
      }
    ]
  },

  {
    path: '/admission',
    component: Layout,
    redirect: '/admission/table',
    name: '录取确认',
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/admission/index'),
        meta: { title: '录取确认', icon: 'table',
          roles: ['student'] }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
