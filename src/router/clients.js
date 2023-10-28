export default [
  // {
  //   path: '/clients',
  //   name: 'clients',
  //   component: () => import('@/views/Clients/index.vue'),
  //   meta: {
  //     pageTitle: '',
  //     breadcrumb: [
  //       {
  //         text: 'Клиенты',
  //         i18n: 'client_list.clients',
  //         active: false
  //       }
  //     ]
  //   }
  // },
  {
    path: '/clients/detail/:id',
    name: 'clients-detail',
    component: () => import('@/views/Clients/DetailClient.vue'),
    meta: {
      pageTitle: '',
      breadcrumb: [
        {
          text: 'Детали клиента',
          active: false
        }
      ]
    }
  }
]