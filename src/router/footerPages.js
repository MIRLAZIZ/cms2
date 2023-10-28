export default [
  {
    path: '/pages',
    name: 'pages',
    component: () => import('@/views/footerPages/'),
    meta: {
      pageTitle: '',
      breadcrumb: [
        {
          text: 'Страницы',
          active: true,
        },
      ],
    },
  },

  {
    path: '/pages/add',
    name: 'pages',
    component: () => import('@/views/footerPages/addEdit.vue'),
    meta: {
      pageTitle: '',
      breadcrumb: [
        {
          text: 'Добавление страницы',
          active: true,
        },
      ],
    },
  },

  {
    path: '/pages/:id',
    name: 'pages-view',
    component: () => import('@/views/footerPages/addEdit.vue'),
    meta: {
      pageTitle: '',
      breadcrumb: [
        {
          text: 'Страницы',
          active: true,
        },
      ],
    },
  },
]
