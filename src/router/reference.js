export default [
  {
    path: '/reference',
    name: 'reference',
    component: () => import('@/views/reference/'),
    meta: {
      pageTitle: '',
      breadcrumb: [
        {
          text: 'Справочник',
          active: true,
        },
      ],
    },
  },
]
