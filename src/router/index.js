import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/general',
    component: Layout,
    redirect: '/general/table',
    name: '疫情概况',
    meta: { title: '疫情概况', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '表格可视化',
        component: () => import('@/views/table/index'),
        meta: { title: '表格可视化', icon: 'table' }
      },
      {
        path: 'edit/:id',
        name: '更新数据',
        component: () => import('@/views/table/edit'),
        meta: { title: '更新数据', icon: 'tree' },
        hidden:true
      },
      {
        path: 'map',
        name: '地图可视化',
        component: () => import('@/views/tree/index'),
        meta: { title: '地图可视化', icon: 'tree' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: '/frequency',
    component: Layout,
    redirect: '/nested/menu1',
    name: '词频统计',
    meta: {
      title: '词频统计',
      icon: 'form'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: '新冠词频统计',
        meta: { title: '新冠词频统计' },
        // children: [
        //   {
        //     path: 'menu1-1',
        //     component: () => import('@/views/nested/menu1/menu1-1'),
        //     name: 'Menu1-1',
        //     meta: { title: 'Menu1-1' }
        //   },
        //   {
        //     path: 'menu1-2',
        //     component: () => import('@/views/nested/menu1/menu1-2'),
        //     name: 'Menu1-2',
        //     meta: { title: 'Menu1-2' },
        //     children: [
        //       {
        //         path: 'menu1-2-1',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        //         name: 'Menu1-2-1',
        //         meta: { title: 'Menu1-2-1' }
        //       },
        //       {
        //         path: 'menu1-2-2',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        //         name: 'Menu1-2-2',
        //         meta: { title: 'Menu1-2-2' }
        //       }
        //     ]
        //   },
        //   {
        //     path: 'menu1-3',
        //     component: () => import('@/views/nested/menu1/menu1-3'),
        //     name: 'Menu1-3',
        //     meta: { title: 'Menu1-3' }
        //   }
        // ]
      },
      // {
      //   path: 'menu2',
      //   component: () => import('@/views/nested/menu2/index'),
      //   meta: { title: 'menu2' }
      // }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: '感情分析',
    meta: {
      title: '感情分析',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu2/index'), // Parent router-view
        name: '疫情忧虑情绪',
        meta: { title: '疫情忧虑情绪' },
        // children: [
        //   {
        //     path: 'menu1-1',
        //     component: () => import('@/views/nested/menu1/menu1-1'),
        //     name: 'Menu1-1',
        //     meta: { title: 'Menu1-1' }
        //   },
        //   {
        //     path: 'menu1-2',
        //     component: () => import('@/views/nested/menu1/menu1-2'),
        //     name: 'Menu1-2',
        //     meta: { title: 'Menu1-2' },
        //     children: [
        //       {
        //         path: 'menu1-2-1',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        //         name: 'Menu1-2-1',
        //         meta: { title: 'Menu1-2-1' }
        //       },
        //       {
        //         path: 'menu1-2-2',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        //         name: 'Menu1-2-2',
        //         meta: { title: 'Menu1-2-2' }
        //       }
        //     ]
        //   },
        //   {
        //     path: 'menu1-3',
        //     component: () => import('@/views/nested/menu1/menu1-3'),
        //     name: 'Menu1-3',
        //     meta: { title: 'Menu1-3' }
        //   }
        // ]
      },
      // {
      //   path: 'menu2',
      //   component: () => import('@/views/nested/menu2/index'),
      //   meta: { title: '疫情忧虑情绪' }
      // }
    ]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/dashboard',
    name: '关于我们',
    hidden: false,
    children: [{
      path: 'index',
      meta: { title: '关于我们', icon: 'link' },
      component: () => import('@/views/about/index')
    }]
  },
  // {
  //   path: '/about/index',
  //   component: () => import('@/views/about/index'),
  //   children: [
  //     {
  //       path: '/about/index',
  //       meta: { title: '关于我们', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
