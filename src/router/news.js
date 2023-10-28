export default [
    //news
    {
        path: '/news',
        name: 'news',
        component: () => import('@/views/News/index'),
        meta: {
            pageTitle: '',
            breadcrumb: [{
                text: 'Новости',
                i18n: 'news',
                active: true,
            }, ],
        },
    },
    {
        path: '/news-edit/:id',
        name: 'news-edit',
        component: () => import('@/views/News/Edit.vue'),
        meta: {
            pageTitle: '',
            breadcrumb: [{
                    text: 'Новости',
                    i18n: 'news',
                    to: '/news',
                    active: false,
                },
                {
                    text: 'Редактировать',
                    i18n: 'administration.edit_route',
                    active: true,
                },
            ],
        },
    },

    // {
    //     path: '/',
    //     name: 'journal',
    //     component: () => import('@/views/modules/Educator/Educator.vue'),
    //     meta: {
    //         breadcrumb: [{
    //                 text: 'Воспитатель',
    //                 i18n: 'Воспитатель',
    //                 active: true,
    //             },
    //             {
    //                 text: 'educator.kids_magazine',
    //                 i18n: 'educator.kids_magazine',
    //                 active: false,
    //             },
    //         ],
    //     },
    // },
    {
        path: '/news-create',
        name: 'news-create',
        component: () => import('@/views/News/Edit.vue'),
        meta: {
            pageTitle: '',
            breadcrumb: [{
                    text: 'Новости',
                    i18n: 'news',
                    to: '/news',
                    active: false,
                },
                {
                    text: 'Добавить',
                    i18n: 'generals.add',
                    active: true,
                },
            ],
        },
    },

]