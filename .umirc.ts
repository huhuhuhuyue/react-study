import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/about', component: '@/pages/about' },
        { path: '/more', component: '@/pages/more' },
        { path: '/product/:id', component: '@/pages/product/[id]' },  // 动态路由
        {
          path: '/user/:id',
          component: '@/pages/user',
          routes: [
            {
              path: '/user/:id',
              component: '@/pages/user/[id]',
            }
          ]
        },
        {component: '@/pages/404'}
      ],
    }
  ]
});
