import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

//Create a router and set default
export function installRouter(app, router?) {
  //Add all routers
  const routes = buildRoutes()
  //
  if (!router) {
    //Create router here does not work well since routerViewLocationKey is different between this project and project to call this module
    router = createRouter({
      history: createWebHistory(),
      routes: routes
    })
  } else {
    //
    for (const route of routes) {
      if (!router.hasRoute(route.name)) {
        // console.log('Adding router:',route)
        router.addRoute(route)
      }
    }
  }
  //Please note ,it does not work if app.use(router) is already called before
  app.use(router)
  //
  return router
}

function buildRoutes() {
  const defaultRoutes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/workspaceManager/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/index.vue')
    },
    {
      path: '/design/:app?',
      name: 'App design',
      component: () => import('@/components/appEditor/appEditorWithRouter.vue')
    },
    {
      path: '/deploy',
      name: 'deploy',
      component: () => import('@/components/layout/index.vue'),
      children: [
        {
          path: ':app?/:page?',
          name: 'Page deployed',
          component: () => import('@/components/deployed/index.vue'),
          meta: {
            showBreadcrumb: false
          }
        }
      ]
    }
  ]
  //
  return defaultRoutes
}
