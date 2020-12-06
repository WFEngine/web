export default {
    path: '/solution',
    component: () => import('../layout/DashboardLayout'),
    children: [
        {
            path: '',
            name: 'solution',
            component: () => import('../views/solution/Index')
        },
        {
            path: 'list',
            name: 'solutionList',
            component: () => import('../views/solution/Index')
        },
        {
            path: 'new',
            name: 'newsolution',
            component: () => import('../views/solution/New')
        },
        {
            path: 'update/:id',
            name: 'updatesolution',
            component: () => import('../views/solution/Update')
        },
        {
            path: 'view/:id',
            name: 'viewsolution',
            component: () => import('../views/solution/View')
        }
    ]
}