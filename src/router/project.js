export default {
    path: '/project',
    component: () => import('../layout/DashboardLayout'),
    children: [
        {
            path: 'new',
            name: 'newproject',
            component: () => import('../views/project/New')
        },
        {
            path:'view/:id',
            name:'viewproject',
            component:()=>import('../views/project/View.vue')
        },
        {
            path:'update/:id',
            name:'updateproject',
            component:()=>import('../views/project/Update.vue')
        }
    ]
}