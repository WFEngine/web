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
            path:'new',
            name:'newsolution',
            component:()=>import('../views/solution/New')
        }
    ]
}