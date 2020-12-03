export default {
    path: '/project',
    component: () => import('../layout/DashboardLayout'),
    children: [
        {
            path: 'new',
            name: 'newproject',
            component: () => import('../views/project/New')
        }
    ]
}