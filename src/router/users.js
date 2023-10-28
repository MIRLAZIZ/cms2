export default [
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/Index.vue'),
        meta: {
            pageTitle: '',
            breadcrumb: [{
                text: 'users',
                i18n: 'users',
                active: true,
            }, ],
        },
    },
    {
        path: '/create',
        name: 'create',
        component: () => import('@/views/users/addEdit.vue'),
        meta: {
            pageTitle: '',
            breadcrumb: [{
                text: 'edit',
                i18n: 'edit',
                active: true,
            }, ],
        },
    },


]