export default {
    path: '/dashboard',
    component: () => import('../layout/DashboardLayout'),
    children:[
        {
            path:'',
            name:'dashboard',
            component:()=>import('../views/dashboard/Index')
        }      
    ]
}