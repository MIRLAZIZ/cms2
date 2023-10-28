export default [
  {
    path: '/shoplist',
    name: 'shoplist',
    component: () => import('@/views/shopList/'),
    meta: {
      pageTitle: '',
      breadcrumb: [
        {
          text: 'Список магазинов',
          i18n: 'shop_list.shop_list',
          active: true,
        },
      ],
    },
  },
  {
    path: '/shoplist/edit-shoplist/:id/',
    name: 'edit-shoplist',
    component: () => import('@/views/shopList/EditOneShopList.vue/'),
    meta: {
      pageTitle: '',
      breadcrumb: [
        {
          text: 'Список магазинов',
          i18n: 'shop_list.shop_list',
          active: false,
          to: '/shoplist',
        },
        {
          text: 'Редактирование',
          i18n: 'shop_list.edit',
          active: true,
        },
      ],
    },
  },
]
