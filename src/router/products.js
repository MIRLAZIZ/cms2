export default [{
    path: '/products',
    name: 'products',
    component: () => import('@/views/Products/index'),
    meta: {
      pageTitle: '',
      breadcrumb: [{
        text: 'Продукты',
        active: true,
      }, ],
    },
  },

  {
    path: '/products/create-product',
    name: 'create-product',
    component: () => import('@/views/Products/createProduct'),
    meta: {
      pageTitle: '',
      breadcrumb: [{
          text: 'Продукты',
          active: false,
          to: '/products',
        },
        {
          text: 'Добавить продукт',
          active: true,
        },
      ],
    },
  },
  {
    path: '/products/edit-product/:id',
    name: 'edit-product',
    component: () => import('@/views/Products/createProduct'),
    meta: {
      pageTitle: '',
      breadcrumb: [{
          text: 'Продукты',
          active: false,
          to: '/products',
        },
        {
          text: 'Изменить',
          active: true,
        },
      ],
    },
  },

  // lots
  {
    path: '/lots',
    name: 'lots',
    component: () => import('@/views/Lots/index'),
    meta: {
      pageTitle: '',
      breadcrumb: [{
        text: 'Лоты',
        active: true,
      }, ],
    },
  },
  {
    path: '/lots/add',
    name: 'lots-add',
    component: () => import('@/views/Lots/components/AddEdit.vue'),
    meta: {
      pageTitle: '',
      breadcrumb: [{
          text: 'Лоты',
          to: '/lots',
          active: false,
        },
        {
          text: 'Добавить',
          active: true,
        },
      ],
    },
  },
  {
    path: '/lots/edit/:id',
    name: 'lots-edit',
    component: () => import('@/views/Lots/components/AddEdit.vue'),
    props: {
      view: false,
    },
    meta: {
      pageTitle: '',
      breadcrumb: [{
          text: 'Лоты',
          to: '/lots',
          active: false,
        },
        {
          text: 'Редактировать лоты',
          active: true,
        },
      ],
    },
  },
  {
    path: '/lots/view/:id',
    name: 'lots-view',
    component: () => import('@/views/Lots/components/AddEdit.vue'),
    props: {
      view: true,
    },
    meta: {
      pageTitle: '',
      breadcrumb: [{
          text: 'Лоты',
          to: '/lots',
          active: false,
        },
        {
          text: 'Видеть',
          active: true,
        },
      ],
    },
  }
]